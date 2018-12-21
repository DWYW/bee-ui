import LoadingBody from './_src/index.vue'
import { romveEmpty } from '../utils/object'

const Loading = {
  stack: {},
  idx: 0,
  getOptions: function (options) {
    let _options = Object.assign({}, {
      parent: document.body,
      type: 0,
      display: 'block',
      text: '加载中'
    }, romveEmpty(options))

    return _options
  },
  onShow: function (instance) {
    return () => {
      instance._vm = instance.$mount()
      instance._dom = instance._vm.$el
      instance._idx = Loading.idx++
      instance.toggle = true
      instance.parent.appendChild(instance._dom)
      Loading.stack[instance._idx] = instance
    }
  },
  onHide: function (instance) {
    return () => {
      instance.toggle = false
      delete Loading.stack[instance._idx]
    }
  },
  install: function (Vue) {
    const Constructor = Vue.extend(LoadingBody)

    Vue.prototype.$_createLoading = function (options) {
      let _options = Loading.getOptions(options)
      let instance = new Constructor({ data: _options })
      instance.__onShow = Loading.onShow(instance)
      instance.__onHide = Loading.onHide(instance)
      return instance
    }

    this.directive(Vue)
  },

  directive: function (Vue) {
    Vue.directive('loading', {
      inserted: function (el, binding, vnode) {
        if (binding.value && !binding.def.beeLoading) {
          el.dataset.loadingId = Vue.prototype.$_createLoading(romveEmpty({
            parent: el,
            display: el.dataset.display,
            type: el.dataset.type >> 0,
            text: el.dataset.text
          })).show()._idx
        }
      },

      update: function (el, binding) {
        console.log(binding)
        if (binding.value !== binding.oldValue) {
          // add loading
          if (binding.value && !el.dataset.loadingId) {
            el.dataset.loadingId = Vue.prototype.$_createLoading(romveEmpty({
              parent: el,
              display: el.dataset.display,
              type: el.dataset.type >> 0,
              text: el.dataset.text
            })).show()._idx
          }

          // remove loading
          if (!binding.value && el.dataset.loadingId) {
            Loading.stack[el.dataset.loadingId].hide()
            delete el.dataset.loadingId
          }
        }
      },

      unbind: function (el, binding) {
        if (binding.def.beeLoading) {
          Loading.stack[el.dataset.loadingId].hide()
          delete el.dataset.loadingId
        }
      }
    })
  }
}

export default Loading

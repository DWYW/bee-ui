import helpers from '../utils/helpers'
import LoadingBody from './_src/index.vue'

let instances = {}

export default {
  install: function (Vue) {
    const Constructor = Vue.extend(LoadingBody)

    Vue.prototype.$_createLoading = function (options) {
      let instance = new Constructor({
        data: helpers.clearEmpty(options)
      }).$mount()

      return instance
    }

    Vue.directive('loading', {
      inserted: function (el, binding, vnode) {
        if (!binding.value) return

        const { loadingType, loadingBlock, loadingText } = el.dataset
        const instance = Vue.prototype.$_createLoading(helpers.clearEmpty({
          parent: el,
          type: loadingType,
          block: !/(false)/.test(loadingBlock),
          text: loadingText
        })).show()

        el.dataset.loadingId = instance._uid
        instances[instance._uid] = instance
      },
      update: function (el, binding) {
        if (binding.value === binding.oldValue) return

        if (binding.value) {
          const { loadingType, loadingBlock, loadingText } = el.dataset
          const instance = Vue.prototype.$_createLoading(helpers.clearEmpty({
            parent: el,
            type: loadingType,
            block: !/(false)/.test(loadingBlock),
            text: loadingText
          })).show()

          el.dataset.loadingId = instance._uid
          instances[instance._uid] = instance
        } else {
          if (!instances[el.dataset.loadingId]) return

          instances[el.dataset.loadingId].hide()
          delete instances[el.dataset.loadingId]
          delete el.dataset.loadingId
        }
      },
      unbind: function (el) {
        if (!el.dataset || !instances[el.dataset.loadingId]) return

        instances[el.dataset.loadingId].hide()
        delete instances[el.dataset.loadingId]
        delete el.dataset.loadingId
      }
    })
  }
}

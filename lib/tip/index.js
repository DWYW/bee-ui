import TipBody from './_src/index.vue'

const BeeTip = {
  install: function (Vue) {
    const Constructor = Vue.extend(TipBody)
    const stack = {}
    let idx = 0

    Vue.prototype.$_createTip = function (options) {
      let _options = Object.assign({}, {
        content: '',
        align: 'left',
        position: 'top',
        scrollDom: document
      }, options)

      let instance = new Constructor({ data: _options })

      instance.__onShow = function () {
        instance._vm = instance.$mount()
        instance._dom = instance._vm.$el
        instance._idx = idx++
        instance.toggle = true
        document.body.appendChild(instance._dom)
        stack[instance._idx] = instance
      }

      instance.__onClose = function () {
        instance.toggle = false
        delete stack[instance._idx]
      }

      return instance
    }
  }
}

export default BeeTip

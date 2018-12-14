import MessageBody from './_src/index.vue'

const BeeMessage = {
  install: function (Vue) {
    const Constructor = Vue.extend(MessageBody)
    const stack = {}
    let idx = 0

    Vue.prototype.$_createMessage = function (options) {
      let _options = Object.assign({}, {
        duration: 3,
        html: null,
        message: '请填写提示内容',
        align: false
      }, options)

      _options.duration = _options.duration >> 0
      !_options.type ? _options.type = 'warn' : null

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

export default BeeMessage

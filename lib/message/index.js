import MessageBody from './_src/index.vue'
import { romveEmpty } from '../utils/object'

const BeeMessage = {
  stack: {},
  idx: 0,
  getOptions: function (options) {
    const _options = Object.assign({}, {
      type: 'warn',
      duration: 3,
      html: null,
      message: '请填写提示内容',
      align: false
    }, romveEmpty(options))

    _options.duration = _options.duration >> 0

    return _options
  },
  onShow: function (instance) {
    return () => {
      instance._vm = instance.$mount()
      instance._dom = instance._vm.$el
      instance._idx = BeeMessage.idx++
      instance.toggle = true
      document.body.appendChild(instance._dom)
      BeeMessage.stack[instance._idx] = instance
    }
  },
  onHide: function (instance) {
    return () => {
      instance.toggle = false
      delete BeeMessage.stack[instance._idx]
    }
  },
  install: function (Vue) {
    const Constructor = Vue.extend(MessageBody)

    Vue.prototype.$_createMessage = function (options) {
      let _options = BeeMessage.getOptions(options)
      let instance = new Constructor({ data: _options })
      instance.__onShow = BeeMessage.onShow(instance)
      instance.__onHide = BeeMessage.onHide(instance)
      return instance
    }
  }
}

export default BeeMessage

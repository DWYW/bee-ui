import NotifyBody from './_src/index.vue'
import { romveEmpty } from '../utils/object'

const titles = {
  info: '信息',
  warn: '警告',
  success: '成功',
  error: '失败'
}

const BeeNotify = {
  stack: [],
  idx: 0,
  getOptions: function (options) {
    const _options = Object.assign({}, {
      duration: 3,
      message: '请填写提示内容',
      type: 'info'
    }, romveEmpty(options))

    _options.duration = _options.duration >> 0
    _options.distance = 10

    if (_options.title === undefined) {
      _options.title = titles[_options.type] || titles.info
    }

    return _options
  },
  onShow: function (instance) {
    return () => {
      let offset = instance.distance
      instance._vm = instance.$mount()
      instance._dom = instance._vm.$el
      instance._idx = BeeNotify.idx++

      BeeNotify.stack.forEach((item) => {
        offset += item._dom.offsetHeight + instance.distance
      })

      instance.offset = offset
      instance.toggle = true
      document.body.appendChild(instance._dom)
      BeeNotify.stack.push(instance)
    }
  },
  onHide: function (instance) {
    return () => {
      let _index = BeeNotify.stack.findIndex(item => item._idx === instance._idx)

      if (_index === -1) return false

      instance.__offsetHeight = instance._dom.offsetHeight
      instance.toggle = false
      BeeNotify.stack.splice(_index, 1)

      BeeNotify.stack.forEach((item) => {
        if (item._idx > instance._idx) {
          item.offset -= instance.__offsetHeight + instance.distance
        }
      })
    }
  },
  install: function (Vue) {
    const Constructor = Vue.extend(NotifyBody)

    Vue.prototype.$_createNotify = function (options) {
      let _options = BeeNotify.getOptions(options)
      let instance = new Constructor({ data: _options })
      instance.__onShow = BeeNotify.onShow(instance)
      instance.__onHide = BeeNotify.onHide(instance)
      return instance
    }
  }
}

export default BeeNotify

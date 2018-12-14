import NotifyBody from './_src/index.vue'

const BeeNotify = {
  install: function (Vue) {
    const Constructor = Vue.extend(NotifyBody)
    const titles = {
      info: '信息',
      warn: '警告',
      success: '成功',
      error: '失败'
    }
    const stack = []
    let idx = 0

    Vue.prototype.$_createNotify = function (options) {
      let _options = Object.assign({}, {
        duration: 3,
        message: '请填写提示内容'
      }, options)

      _options.duration = _options.duration >> 0
      _options.distance = 10

      if (!_options.type) _options.type = 'info'

      if (_options.title === undefined) {
        _options.title = titles[_options.type] || titles.info
      }

      let instance = new Constructor({ data: _options })

      instance.__onShow = function () {
        instance._vm = instance.$mount()
        instance._dom = instance._vm.$el
        instance._idx = idx++

        let offset = _options.distance

        stack.forEach((item) => {
          offset += item._dom.offsetHeight + _options.distance
        })

        instance.offset = offset
        instance.toggle = true
        document.body.appendChild(instance._dom)
        stack.push(instance)
      }

      instance.__onClose = function () {
        let _index = stack.findIndex(item => item._idx === instance._idx)

        if (_index === -1) return false

        instance.__offsetHeight = instance._dom.offsetHeight

        instance.toggle = false
        stack.splice(_index, 1)

        stack.forEach((item) => {
          if (item._idx > instance._idx) {
            item.offset -= instance.__offsetHeight + _options.distance
          }
        })
      }

      return instance
    }
  }
}

export default BeeNotify

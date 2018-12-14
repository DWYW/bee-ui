import AlertBody from './_src/index.vue'

const Alert = {
  install: function (Vue) {
    const Constructor = Vue.extend(AlertBody)
    const stack = {}
    let idx = 0

    const getOptions = function (options) {
      let _options = Object.assign({
        title: '提示',
        message: '请添加提示信息',
        html: null,
        align: null,
        cancelBtnText: '取消',
        cancelBtnFun: null,
        cancelBtnVisiable: true,
        confirmBtnText: '确定',
        confirmBtnFun: null,
        confirmBtnVisiable: true,
        closeBtnVisiable: true,
        closeBtnFun: null
      }, options)

      return _options
    }

    Vue.prototype.$_createAlert = function (options) {
      let _options = getOptions(options)
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

export default Alert

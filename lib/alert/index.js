import AlertBody from './_src/index.vue'
import { romveEmpty } from '../utils/object'

const Alert = {
  stack: {},
  idx: 0,
  getOptions: function (options) {
    return Object.assign({
      title: '提示',
      message: '请添加提示信息',
      html: null,
      align: null,
      cancelBtnText: '取消',
      cancelBtnFun: null,
      cancelBtnVisible: true,
      confirmBtnText: '确定',
      confirmBtnFun: null,
      confirmBtnVisible: true,
      closeBtnVisible: true,
      closeBtnFun: null
    }, romveEmpty(options))
  },
  onShow: function (instance) {
    return () => {
      instance._vm = instance.$mount()
      instance._dom = instance._vm.$el
      instance._idx = Alert.idx++
      instance.toggle = true
      document.body.appendChild(instance._dom)
      Alert.stack[instance._idx] = instance
    }
  },
  onHide: function (instance) {
    return () => {
      instance.toggle = false
      delete Alert.stack[instance._idx]
    }
  },
  install: function (Vue) {
    const Constructor = Vue.extend(AlertBody)

    Vue.prototype.$_createAlert = function (options) {
      let _options = Alert.getOptions(options)
      let instance = new Constructor({ data: _options })
      instance.__onShow = Alert.onShow(instance)
      instance.__onHide = Alert.onHide(instance)
      return instance
    }
  }
}

export default Alert

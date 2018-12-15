import TipBody from './_src/index.vue'
import { romveEmpty } from '../utils/object'

const BeeTip = {
  stack: {},
  idx: {},
  getOptions: function (options) {
    return Object.assign({}, {
      content: '',
      align: 'left',
      position: 'top',
      scrollDom: document
    }, romveEmpty(options))
  },
  onShow: function (instance) {
    return () => {
      instance._vm = instance.$mount()
      instance._dom = instance._vm.$el
      instance._idx = BeeTip.idx++
      instance.toggle = true
      document.body.appendChild(instance._dom)
      BeeTip.stack[instance._idx] = instance
    }
  },
  onHide: function (instance) {
    return () => {
      instance.toggle = false
      delete BeeTip.stack[instance._idx]
    }
  },
  install: function (Vue) {
    const Constructor = Vue.extend(TipBody)

    Vue.prototype.$_createTip = function (options) {
      let _options = BeeTip.getOptions(options)
      let instance = new Constructor({ data: _options })
      instance.__onShow = BeeTip.onShow(instance)
      instance.__onHide = BeeTip.onHide(instance)
      return instance
    }
  }
}

export default BeeTip

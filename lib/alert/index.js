import BeeAlertBody from './_src/index.vue'

class BeeAlert {
  constructor (bodyConstructor) {
    this._bodyConstructor = bodyConstructor
  }

  registre (options) {
    const { data, listeners } = this.getOptions(options)
    let instance = new this._bodyConstructor({
      name: 'BeeAlert',
      data: data,
      computed: {
        listeners () {
          return Object.assign({
            afterLeave: this.afterLeave
          }, listeners)
        }
      }
    }).$mount()

    return instance
  }

  getOptions (options) {
    const optionKeys = [
      'title', 'center',
      'message', 'html',
      'closeVisible',
      'cancelVisible', 'cancelText',
      'confirmVisible', 'confirmText'
    ]

    const listenerKeys = ['onclose', 'oncancel', 'onconfirm']

    return Object.entries(options).reduce((acc, [key, item]) => {
      if (optionKeys.indexOf(key) > -1) {
        if (item !== undefined && item !== null) acc.data[key] = item
      } else if (listenerKeys.indexOf(key) > -1) {
        if (item !== undefined && item !== null) acc.listeners[key.slice(2)] = item
      }

      return acc
    }, {
      data: {},
      listeners: {}
    })
  }
}

export default {
  install: function (Vue) {
    const _BeeAlert = Vue.extend(BeeAlertBody)

    Vue.prototype.$_createAlert = function (options = {}) {
      return new BeeAlert(_BeeAlert).registre(options)
    }
  }
}

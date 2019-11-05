import MessagePanel from './_src/index.vue'

export default {
  install: function (Vue) {
    const Constructor = Vue.extend(MessagePanel)

    Vue.prototype.$_createMessage = function (options = {}) {
      // Filter the options of bee-message.
      options = Object.entries(options).reduce((acc, [key, item]) => {
        if (/^(type|duration|html|message|align)$/.test(key) && item !== undefined && item !== null) {
          acc[key] = item
        }

        return acc
      }, {})

      // Get the instance of BeeMessage.
      const instance = new Constructor({
        name: 'BeeMessage',
        data: options
      }).$mount()

      return instance
    }
  }
}

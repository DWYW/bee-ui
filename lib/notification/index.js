import MessagePanel from './_src/index.vue'

const distance = 10
let stack = []

export default {
  install: function (Vue) {
    const Constructor = Vue.extend(MessagePanel)

    Vue.prototype.$_createNotification = function (options = {}) {
      // Filter the options of bee-message.
      let _data = Object.entries(options).reduce((acc, [key, item]) => {
        if (/^(type|title|message|duration)$/.test(key) && item !== undefined && item !== null) {
          acc[key] = item
        }

        return acc
      }, {})

      // Get the instance of BeeNotification.
      const instance = new Constructor({
        name: 'BeeNotification',
        data: _data,
        methods: {
          beforeEnter () {
            let top = distance

            // Update item the top of position.
            stack.forEach((item) => {
              if (item.open) {
                item.boundingTop = top
                top += (item.$el.offsetHeight + distance)
              }
            })

            instance._showstamp = Date.now()
            instance.boundingTop = top
            stack.push(instance)
          },

          beforeLeave () {
            const index = stack.findIndex(item => item._uid === instance._uid)

            if (index === -1) return

            stack.splice(index, 1)
            const _height = instance.$el.offsetHeight + distance

            // Update item the top of position.
            stack.forEach(item => {
              if (item._showstamp >= instance._showstamp) {
                item.boundingTop -= _height
              }
            })
          }
        }
      }).$mount()

      return instance
    }
  }
}

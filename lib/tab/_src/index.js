import getComponentProps from '../../utils/getComponentProps'
import renderHelpers from './render'
import './index.less'

export default {
  name: 'BeeTab',
  props: {
    type: String,
    value: {
      type: Number,
      default: 0
    },
    barPosition: {
      type: String,
      validator: (value) => {
        return /top|bottom/.test(value)
      },
      default: 'top'
    }
  },
  data () {
    return {
      barStyle: {}
    }
  },
  computed: {
    labels () {
      if (!this.$slots.default) return []

      return this.$slots.default.reduce((acc, vNode, index) => {
        if (vNode.componentOptions && vNode.componentOptions.tag === 'bee-tab-item') {
          acc.push({
            props: getComponentProps(vNode),
            index: index,
            active: index === this.value
          })
        }

        return acc
      }, [])
    },
    slot () {
      if (!this.$slots.default) return [null, 0]

      const current = this.labels.find(item => item.index === this.value)

      if (!current) return [null, 0]

      return [this.$slots.default[current.index], current.index]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setBarStyle()
    })
  },
  methods: {
    setBarStyle () {
      if (!this.$el) return

      const lableElms = this.$el.querySelectorAll('.bee-tab--label')
      let i = -1
      let width = 0
      let left = 0

      while (i++ < this.value) {
        if (!lableElms[i]) continue

        if (i === this.value) {
          width = lableElms[i].offsetWidth
        } else {
          left += lableElms[i].offsetWidth
        }
      }

      this.$set(this.barStyle, 'width', `${width}px`)
      this.$set(this.barStyle, 'left', `${left}px`)

      if (this.barPosition === 'bottom') {
        this.$set(this.barStyle, 'bottom', `0px`)
      } else {
        this.$set(this.barStyle, 'top', `0px`)
      }
    },
    onChange (data) {
      if (this.value === data) return

      // Emit events.
      const events = ['input', 'change']
      events.forEach((event) => {
        this.$listeners[event] && this.$listeners[event](data)
      })

      this.$nextTick(() => {
        this.setBarStyle()
      })
    }
  },
  watch: {
    'value': function (value, oldValue) {
      if (value !== oldValue) {
        this.setBarStyle()
      }
    }
  },
  render (h) {
    return h('section', {
      class: ['bee-tab', {
        'bee-tab__card': this.type === 'card',
        'bee-tab__header': this.type === 'header'
      }]
    }, [
      renderHelpers.tabHeader(h)(this.labels, this.barStyle, this.onChange),
      this.type !== 'header' ? renderHelpers.tabBody(h)(...this.slot) : ''
    ])
  }
}

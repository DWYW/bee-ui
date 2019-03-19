import './index.less'

export default {
  name: 'BeeTab',
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    type: String
  },
  data () {
    return {
      visibleKey: this.activeIndex
    }
  },
  computed: {
    labels () {
      if (!this.$slots.default) return []

      const data = []

      this.$slots.default.forEach((vNode, key) => {
        if (vNode.componentOptions && vNode.componentOptions.tag === 'bee-tab-item') {
          data.push({
            label: this.vNodeProps(vNode).label,
            offset: key
          })
        }
      })

      return data
    }
  },
  methods: {
    tabChange (key) {
      if (key !== this.visibleKey) {
        this.visibleKey = key
        this.$emit('change', key)
      }
    },
    vNodeProps (vNode) {
      let _component = new vNode.componentOptions.Ctor(vNode.componentOptions.propsData)

      return _component.$options._propKeys.reduce((target, key) => {
        if (_component.$options[key] !== undefined) {
          target[key] = _component.$options[key]
        }

        return target
      }, _component._props)
    }
  },
  watch: {
    'activeIndex': function (current) {
      if (current !== this.visibleKey) {
        this.visibleKey = current
      }
    }
  },
  render (createElement) {
    const Labels = createElement('section', {
      class: 'tab--labels'
    }, this.labels.map((item, key) => {
      return createElement('div', {
        class: {
          'tab-label--item': true,
          'tab-label--item__active': key === this.visibleKey
        },
        on: {
          click: () => {
            this.tabChange(key)
          }
        }
      }, [item.label])
    }))

    const contents = () => {
      const currentLabel = this.labels.find((item, key) => this.visibleKey === key)

      return [createElement('section', {
        class: 'tab--items',
        key: `content${this.visibleKey}`
      }, [this.$slots.default ? this.$slots.default[currentLabel.offset] : null])]
    }

    const tabContents = createElement('TransitionGroup', {
      class: {
        'tab--contents': true
      },
      props: {
        name: 'tab-change',
        tag: 'section'
      }
    }, contents())

    return createElement('section', {
      class: {
        'tab--wp': true,
        'tab--wp__card': this.type === 'card'
      }
    }, [Labels, tabContents])
  }
}

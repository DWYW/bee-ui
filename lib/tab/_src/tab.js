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
      visiableKey: this.activeIndex
    }
  },
  computed: {
    tabItems () {
      if (!this.$slots.default) return []

      const items = []

      this.$slots.default.forEach((vNode) => {
        if (vNode.componentOptions && vNode.componentOptions.tag === 'bee-tab-item') {
          items.push(vNode)
        }
      })

      return items
    }
  },
  methods: {
    tabChange (key) {
      this.visiableKey = key
      this.$emit('change', key)
    }
  },
  watch: {
    'activeIndex': function (current) {
      if (current !== this.visiableKey) {
        this.visiableKey = current
      }
    }
  },
  render (createElement) {
    const vNodeProps = (vNode) => {
      let _component = new vNode.componentOptions.Ctor(vNode.componentOptions.propsData)

      return _component.$options._propKeys.reduce((target, key) => {
        if (_component.$options[key] !== undefined) {
          target[key] = _component.$options[key]
        }

        return target
      }, _component._props)
    }

    const Labels = createElement('section', {
      class: 'tab--labels'
    }, this.tabItems.map((item, key) => {
      const itemProps = vNodeProps(item)

      return createElement('div', {
        class: {
          'tab-label--item': true,
          'tab-label--item__active': key === this.visiableKey
        },
        on: {
          click: () => {
            this.tabChange(key)
          }
        }
      }, [itemProps.label])
    }))

    const contents = () => {
      const child = this.tabItems.find((item, key) => this.visiableKey === key)

      return [createElement('section', {
        class: 'tab-items',
        key: `content${this.visiableKey}`
      }, [child])]
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

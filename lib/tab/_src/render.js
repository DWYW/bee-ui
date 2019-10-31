export default {
  tabHeader (h) {
    return (configures, barStyle, onChange) => {
      return h('section', {
        class: ['bee-tab--header']
      }, [
        h('div', {
          class: 'bee-tab-bar',
          style: barStyle
        })
      ].concat(
        configures.map((item, key) => {
          return h('div', {
            class: ['bee-tab--label', {
              'bee-tab--label__active': item.active
            }],
            on: {
              click: () => {
                onChange(key)
              }
            }
          }, [item.props.label])
        })
      ))
    }
  },
  tabBody (h) {
    return (slot, index) => {
      return h('transition-group', {
        class: ['bee-tab--body'],
        props: {
          name: 'bee-tab',
          tag: 'section'
        }
      }, [
        h('section', {
          key: index
        }, [slot])
      ])
    }
  }
}

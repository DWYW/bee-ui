import { shallowMount } from "@vue/test-utils"
import { expect } from 'chai'
import BeeIcon from '../../../icon/_src/index.vue'

function _createWrapper(options = {}) {
  return shallowMount(BeeIcon, {
    stubs: {
      'bee-icon': BeeIcon
    },
    ...options
  })
}

describe(`\x1b[46m bee-icon \x1b[0m`, () => {
  describe(`The prop of "fontFamily"`, () => {
    it(`match classes of default`, () => {
      const wrapper = _createWrapper()
      expect(wrapper.classes()).to.deep.eq(['bee-icon', 'beefont', 'bee-undefined'])
    })

    it(`match classes of custom fontFamily`, () => {
      const wrapper = _createWrapper({
        propsData: {
          'fontFamily': 'iconfont'
        }
      })
      expect(wrapper.classes()).to.deep.eq(['bee-icon', 'iconfont'])
    })
  })

  describe(`The prop of "icon"`, () => {
    it(`match classes`, () => {
      const wrapper = _createWrapper({
        propsData: {
          'icon': 'close'
        }
      })
      expect(wrapper.classes()).to.deep.eq(['bee-icon', 'beefont', 'bee-close'])
    })
  })

  describe(`The default slot setting`, () => {
    it(`content match`, () => {
      const wrapper = _createWrapper({
        propsData: {
          'icon': 'close'
        },
        slots: {
          default: ['test content']
        }
      })
      expect(wrapper.text()).to.contain('test content')
    })
  })


  describe('The events', () => {
    const events = ['click', 'mouseenter', 'mouseleave']

    events.forEach((_event) => {
      it(`${_event}`, () => {
        let eventType = null
        let listeners = {}

        listeners[_event] = (e) => {
          if (_event === 'enter') {
            eventType = 'enter'
          } else {
            eventType = e.type
          }
        }

        const wrapper = _createWrapper({
          propsData: {
            icon: 'user'
          },
          listeners: listeners
        })

        wrapper.trigger(_event)
        expect(eventType).to.eq(_event)
      })
    })
  })
})

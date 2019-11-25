import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import BeeIcon from '../../../icon/_src/index.vue'
import BeeRadioGroup from '../../../radio/_src/radio-group.vue'
import BeeRadio from '../../../radio/_src/radio-item.vue'
import { groups } from './_data'

function _createWrapper(options = {}) {
  return shallowMount(BeeRadioGroup, {
    stubs: {
      'bee-icon': BeeIcon,
      'bee-radio': BeeRadio
    },
    ...options
  })
}

describe(`\x1b[46m bee-radio-group \x1b[0m`, () => {
  describe(`render items`, () => {
    const wrapper = _createWrapper({
      propsData: {
        groups: groups
      }
    })

    it(`option length`, () => {
      expect(wrapper.findAll(BeeRadio).length).to.eq(groups.length)
    })

    it(`nothing select`, () => {
      let radios = wrapper.findAll(BeeRadio)

      for (let i = 0; i < radios.length; i++) {
        expect(radios.at(i).props('value')).not.ok
      }
    })
  })

  describe(`The prop of "block"`, () => {
    it(`the wrapper classes should be contain bee-group--item__block node element`, () => {
      const wrapper = _createWrapper({
        propsData: {
          groups: groups,
          block: true
        }
      })

      expect(wrapper.contains('.bee-group--item__block')).to.ok
    })
  })

  describe(`The events`, () => {
    it(`v-model`, () => {
      const wrapper = _createWrapper({
        propsData: {
          groups: groups
        },
        listeners: {
          input: (value) => {
            wrapper.setProps({ value })
          }
        }
      })

      // init with value
      wrapper.findAll('.bee-group-item--radio').wrappers.forEach((_wrapper) => {
        expect(_wrapper.classes()).not.include('bee-radio__selected')
      })

      // select another
      wrapper.findAll(BeeRadio).at(0).trigger('click')
      expect(wrapper.props('value')).to.eq(0)
      wrapper.findAll(BeeRadio).at(2).trigger('click')
      expect(wrapper.props('value')).to.eq(2)

      // item disabeld
      wrapper.findAll(BeeRadio).at(1).trigger('click')
      expect(wrapper.props('value')).not.eq(1)
    })

    it('change', () => {
      const wrapper = _createWrapper({
        propsData: {
          groups: groups
        },
        listeners: {
          change: (value) => {
            wrapper.setProps({ value })
          }
        }
      })

      wrapper.findAll(BeeRadio).at(1).trigger('click')
      expect(wrapper.props('value')).not.ok

      wrapper.findAll(BeeRadio).at(2).trigger('click')
      expect(wrapper.props('value')).to.eq(2)
    })
  })
})

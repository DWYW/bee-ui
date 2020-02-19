import { createWrapper, shallowMount } from "@vue/test-utils"
import { expect } from 'chai'
import Vue from 'vue'
import { delay } from "../../../../tests/helpers"
import BeeIcon from '../../../icon/_src/index.vue'
import BeeUI from '../../../index'
import BeePopper from '../../../popper/_src/index.vue'
import BeeCascader from '../../_src/index.vue'
import { cities, fruits } from './_data'
Vue.use(BeeUI)

function _createWrapper(propsData, listeners) {
  return shallowMount(BeeCascader, {
    stubs: {
      'bee-popper': BeePopper,
      'bee-icon': BeeIcon
    },
    propsData,
    listeners
  })
}

describe(`\x1b[46m bee-cascader \x1b[0m`, () => {
  describe(`The prop of "data"`, () => {
    it('the option must be empty because the data is an empty array.', () => {
      const wrapper = _createWrapper({
        data: []
      })

      wrapper.trigger('click')
      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      expect(optionWrapper.findAll('.options--item').length).to.eq(0)
    })

    it('the option cannot be empty because the data is not an empty array.', async () => {
      const wrapper = _createWrapper({
        data: fruits
      })
      wrapper.trigger('click')

      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      expect(optionWrapper.findAll('.options--item').length).to.eq(fruits.length)
    })
  })

  describe(`The prop of "placeholder`, () => {
    it(`should be the set value`, async () => {
      const placeholder = '请选择'
      const wrapper = _createWrapper({
        data: fruits,
        placeholder: placeholder
      })
      expect(wrapper.find('.placeholder').text()).to.eq('请选择')
    })
  })

  describe(`The prop of "disabled`, () => {
    it(`global disabled`, async () => {
      const wrapper = _createWrapper({
        data: fruits,
        disabled: true
      })

      expect(wrapper.classes()).to.includes('bee-cascader__disabled')
    })

    it(`item disalbed`, async () => {
      const wrapper = _createWrapper({
        data: cities
      })
      wrapper.trigger('click')
      await delay(10)

      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      expect(optionWrapper.findAll('.bee-cascader-item-options').at(0).findAll('.options--item').at(1).classes()).to.includes('options--item__disabled')
    })
  })

  describe(`The event`, () => {
    it(`v-model`, async () => {
      const wrapper = _createWrapper({
        data: fruits
      }, {
        input: (value) => {
          wrapper.setProps({
            value
          })
        }
      })
      wrapper.trigger('click')
      await delay(10)

      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      optionWrapper.findAll('.bee-cascader-item-options').at(0).findAll('.options--item').at(0).trigger('click')
      optionWrapper.findAll('.bee-cascader-item-options').at(1).findAll('.options--item').at(0).trigger('click')

      await delay(10)
      expect(wrapper.find('.selected--label').text()).to.have.string(fruits[0].label, fruits[0].children[0].label)
      expect(wrapper.props('value')).to.deep.eq([fruits[0].value, fruits[0].children[0].value])
    })

    it(`change`, async () => {
      let count = 0
      const wrapper = _createWrapper({
        data: fruits
      }, {
        change: () => {
          count++
        }
      })

      wrapper.trigger('click')
      await delay(10)
      let optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      optionWrapper.findAll('.bee-cascader-item-options').at(0).findAll('.options--item').at(0).trigger('click')
      optionWrapper.findAll('.bee-cascader-item-options').at(1).findAll('.options--item').at(0).trigger('click')

      await delay(10)
      expect(count).to.eq(1)

      wrapper.trigger('click')
      await delay(10)
      optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      optionWrapper.findAll('.bee-cascader-item-options').at(0).findAll('.options--item').at(0).trigger('click')
      optionWrapper.findAll('.bee-cascader-item-options').at(1).findAll('.options--item').at(0).trigger('click')

      await delay(10)
      expect(count).to.eq(1)
    })

    it(`beforeOpen and closed`, async () => {
      let open = 0
      let closed = 0
      const wrapper = _createWrapper({
        data: fruits
      }, {
        beforeOpen: () => {
          open++
        },
        closed: () => {
          closed++
        }
      })

      wrapper.trigger('click')
      await delay(100)
      wrapper.trigger('click')
      await delay(300)
      expect(open).to.eq(1)
      expect(closed).to.eq(1)
    })
  })
})

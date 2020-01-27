import { createWrapper, shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import Vue from 'vue'
import { delay } from "../../../../tests/helpers"
import BeeIcon from '../../../icon/_src/index.vue'
import BeeUI from '../../../index'
import BeePopper from '../../../popper/_src/index.vue'
import BeeAlias from '../../_src/index.vue'

Vue.use(BeeUI)

const fruits = ['香蕉', '苹果', '奇异果']
const excelTitles = [{
  name: '姓名'
}, {
  name: '年龄'
}, {
  name: '手机号'
}]


function _createWrapper(options) {
  return shallowMount(BeeAlias, {
    stubs: {
      'bee-popper': BeePopper,
      'bee-icon': BeeIcon
    },
    ...options
  })
}

describe(`\x1b[46m bee-alias \x1b[0m`, () => {
  describe(`the prop of "placeholder"`, () => {
    const wrapper = _createWrapper()

    it(`should be empty`, () => {
      expect(wrapper.find('.alias-name').text()).to.eq('')
    })

    it(`should be equal seted`, () => {
      const _placeholder = 'placeholder'
      wrapper.setProps({
        placeholder: _placeholder
      })

      expect(wrapper.find('.alias-name').text()).to.eq(_placeholder)
    })

    it(`the placeholder is be invisible when the value is not empty.`, () => {
      wrapper.setProps({
        value: 'value'
      })

      expect(wrapper.find('.placeholder').exists()).not.ok
    })
  })


  describe(`the prop of "options"`, () => {
    it(`select options render`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          options: fruits
        }
      })

      wrapper.find('.alias-name').trigger('click')
      await delay(10)

      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      const _options = optionWrapper.findAll('.option--item')
      expect(_options.length).to.eq(fruits.length)

      for (let i = 0; i < _options.length; i++) {
        expect(_options.at(i).text()).to.eq(fruits[i])
      }
    })
  })

  describe(`the prop of "optionKey"`, () => {
    it(`select options render`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          options: excelTitles,
          optionKey: 'name'
        }
      })

      wrapper.find('.alias-name').trigger('click')
      await delay(10)

      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      const _options = optionWrapper.findAll('.option--item')
      expect(_options.length).to.eq(excelTitles.length)

      for (let i = 0; i < _options.length; i++) {
        expect(_options.at(i).text()).to.eq(excelTitles[i].name)
      }
    })
  })

  describe(`the prop of "maxWidth"`, () => {
    it(`should be equal seted`, async () => {
      const _maxWidth = '200px'
      const wrapper = _createWrapper({
        propsData: {
          options: fruits,
          maxWidth: _maxWidth
        }
      })

      wrapper.find('.alias-name').trigger('click')
      await delay(10)

      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      expect(optionWrapper.find('.bee-popper--body').find(':first-child').attributes('style')).to.include(`max-width: ${_maxWidth}`)
    })
  })

  describe(`the prop of "minHeight"`, () => {
    it(`should be equal seted`, async () => {
      const _minHeight = '200px'
      const wrapper = _createWrapper({
        propsData: {
          options: fruits,
          minHeight: _minHeight
        }
      })

      wrapper.find('.alias-name').trigger('click')
      await delay(10)

      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      expect(optionWrapper.find('.bee-popper--body').find(':first-child').attributes('style')).to.include(`min-height: ${_minHeight}`)
    })
  })

  describe(`the remove button visible`, () => {
    it(`should be invisible`, () => {
      const wrapper = _createWrapper({
        propsData: {
          options: fruits
        }
      })
      wrapper.trigger('mouseenter')
      expect(wrapper.find('.remove-button').isVisible()).not.ok
    })

    it(`should be visible`, () => {
      const wrapper = _createWrapper({
        propsData: {
          value: fruits[0],
          options: fruits
        }
      })
      wrapper.trigger('mouseenter')
      expect(wrapper.find('.remove-button').isVisible()).to.ok
    })
  })

  describe(`events`, () => {
    it(`v-model`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          options: fruits
        },
        listeners: {
          input: (value) => {
            wrapper.setProps({ value })
          }
        }
      })

      expect(wrapper.props('value')).not.ok
      wrapper.find('.alias-name').trigger('click')
      await delay(10)

      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      optionWrapper.findAll('.option--item').at(0).trigger('click')
      await delay(10)
      expect(wrapper.props('value')).to.eq(fruits[0])
    })

    it('change', async () => {
      let count = 0
      let optionWrapper = null
      const wrapper = _createWrapper({
        propsData: {
          options: fruits
        },
        listeners: {
          input: (value) => {
            wrapper.setProps({ value })
          },
          change: () => {
            count++
          }
        }
      })

      wrapper.find('.alias-name').trigger('click')
      await delay(10)
      optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      optionWrapper.findAll('.option--item').at(0).trigger('click')
      await delay(300)
      expect(count).to.eq(1)

      wrapper.find('.alias-name').trigger('mouseenter')
      wrapper.find('.remove-button').trigger('click')
      expect(count).to.eq(2)
    })
  })
})


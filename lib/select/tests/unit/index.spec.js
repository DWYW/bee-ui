import { createWrapper, shallowMount } from "@vue/test-utils"
import { expect } from 'chai'
import Vue from 'vue'
import { delay } from "../../../../tests/helpers"
import BeeIcon from '../../../icon/_src/index.vue'
import BeeUI from '../../../index'
import BeePopper from '../../../popper/_src/index.vue'
import BeeSelect from '../../../select/_src/index.vue'
import { customOptions, options } from './_data'

Vue.use(BeeUI)

function _createWrapper(propsData, listeners) {
  return shallowMount(BeeSelect, {
    stubs: {
      'bee-popper': BeePopper,
      'bee-icon': BeeIcon
    },
    propsData,
    listeners
  })
}

describe(`\x1b[46m bee-select \x1b[0m`, () => {
  describe(`The prop of "options"`, () => {
    it('the option must be empty because the options is an empty array.', () => {
      const wrapper = _createWrapper({
        options: []
      })

      wrapper.trigger('click')
      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      expect(optionWrapper.findAll('.options__empty').length).to.ok
    })

    it('the option cannot be empty because the options is not an empty array.', async () => {
      const wrapper = _createWrapper({
        options: options
      })
      wrapper.trigger('click')

      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      expect(optionWrapper.findAll('.option--item').length).to.eq(options.length)
    })
  })

  describe(`The prop of "optionKey`, () => {
    it('the label of option should be specified by optionKey.label', () => {
      const wrapper = _createWrapper({
        options: customOptions,
        optionKey: {
          label: 'person.name',
          value: 'author.id'
        }
      })
      wrapper.trigger('click')

      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      const items = optionWrapper.findAll('.option--item')

      for (let i = 0; i < items.length; i++) {
        expect(items.at(i).text()).to.eq(customOptions[i]['person']['name'])
      }
    })
  })

  describe(`The prop of "placeholder`, () => {
    it(`sigle mode`, async () => {
      const wrapper = _createWrapper({
        options: options,
        placeholder: '请选择'
      })
      expect(wrapper.find('.placeholder').text()).to.eq('请选择')
    })

    it(`search mode`, async () => {
      const wrapper = _createWrapper({
        options: options,
        placeholder: '请选择',
        searchLength: 1
      })

      expect(wrapper.find('.placeholder').text()).to.eq('请选择')
    })

    it(`multiple mode`, async () => {
      const wrapper = _createWrapper({
        options: options,
        placeholder: '请选择',
        multiple: true
      })
      expect(wrapper.find('.placeholder').text()).to.eq('请选择')
    })
  })

  describe(`The prop of "diabled`, () => {
    const wrapper = _createWrapper({
      options: options,
      disabled: true
    })

    it(`the wrapper classes must include "bee-select__disabled"`, () => {
      expect(wrapper.classes()).to.includes('bee-select__disabled')
    })

    it(`the options cannot open`, () => {
      wrapper.trigger('click')
      expect(wrapper.vm._optionsInstance).to.a('undefined')
    })
  })

  describe(`The prop of "value`, () => {
    it(`single mode`, async () => {
      const wrapper = _createWrapper({
        value: 'apple',
        options: options
      })

      await delay(10)
      expect(wrapper.find('.bee-selected--label').text()).to.eq('apple')
    })

    it('search mode', async () => {
      const wrapper = _createWrapper({
        value: 'apple',
        options: options,
        searchLength: 1
      })
      await delay(10)
      expect(wrapper.find('.bee-search--input').element.value).to.eq('apple')
      expect(wrapper.find('.bee-search--input').attributes('readonly')).to.ok
    })

    it('multiple mode', async () => {
      const wrapper = _createWrapper({
        value: 'apple',
        options: options,
        multiple: true
      })
      await delay(10)
      expect(wrapper.findAll('.bee-select--item').length).to.eq(1)
      expect(wrapper.findAll('.bee-select--item').at(0).text()).to.eq('apple')
      expect(wrapper.findAll('.bee-select--item').at(0).find(BeeIcon)).to.ok
    })
  })

  describe(`The search function of option`, () => {
    it(`show all options initialized`, () => {
      const wrapper = _createWrapper({
        value: 'apple',
        options: options,
        searchLength: 1
      })
      wrapper.trigger('click')
      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      expect(optionWrapper.findAll('.option--item').length).to.eq(options.length)
    })

    it(`nothing search`, async () => {
      const wrapper = _createWrapper({
        value: 'apple',
        options: options,
        searchLength: 1
      })
      wrapper.trigger('click')
      await delay(300)
      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      wrapper.find('.bee-search--input').setValue('text')
      await delay(10)
      expect(optionWrapper.findAll('.option--item').length).not.ok
    })

    it(`search someone`, async () => {
      const wrapper = _createWrapper({
        value: 'apple',
        options: options,
        searchLength: 1
      })
      wrapper.trigger('click')
      await delay(300)
      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      wrapper.find('.bee-search--input').setValue('banana')
      await delay(10)
      expect(optionWrapper.findAll('.option--item').length).to.eq(1)
    })

    it(`restore the label when it closed`, async() => {
      const wrapper = _createWrapper({
        value: 'apple',
        options: options,
        searchLength: 1
      })
      wrapper.trigger('click')
      wrapper.find('.bee-search--input').setValue('banana')
      wrapper.trigger('click')
      await delay(10)
      expect(wrapper.find('.bee-search--input').element.value).to.eq('apple')
    })
  })

  describe(`Remove selected of multipl`, () => {
    let _value = ['apple', 'banana']

    const wrapper = _createWrapper({
      options: options,
      value: _value,
      multiple: true
    }, {
      change: (value) => {
        _value = value
      }
    })

    it('item has remove button', () => {
      const selecteds = wrapper.findAll('.bee-select--item')

      for (let i = 0; i < selecteds.length; i++) {
        expect(selecteds.at(i).find(BeeIcon)).to.ok
      }
    })

    it(`remove item`, () => {
      const selecteds = wrapper.findAll('.bee-select--item')
      selecteds.at(0).find(BeeIcon).trigger('click')
      expect(_value).to.deep.eq(['banana'])
    })
  })

  describe(`The event`, () => {
    it(`v-model`, async () => {
      const wrapper = _createWrapper({
        options: options
      }, {
        input: (value) => {
          wrapper.setProps({
            value
          })
        }
      })
      wrapper.trigger('click')
      await delay(300)
      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      optionWrapper.findAll('.option--item').at(0).trigger('click')
      await delay(10)
      expect(wrapper.find('.bee-select--body').text()).to.contain(options[0].label)
      expect(wrapper.props('value')).to.eq(options[0].value)
    })

    it(`change evnet of single mode`, async () => {
      const wrapper = _createWrapper({
        options: options
      }, {
        change: (value) => {
          wrapper.setProps({
            value
          })
        }
      })
      wrapper.trigger('click')
      await delay(300)
      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      optionWrapper.findAll('.option--item').at(0).trigger('click')
      await delay(10)
      expect(wrapper.find('.bee-select--body').text()).to.contain(options[0].label)
      expect(wrapper.props('value')).to.eq(options[0].value)
      await delay(300)
      expect(document.body.contains(optionWrapper.vm.$el)).not.ok
    })

    it(`change event of multiple mode`, async () => {
      const wrapper = _createWrapper({
        options: options,
        multiple: true
      }, {
        change: (value) => {
          wrapper.setProps({
            value
          })
        }
      })
      wrapper.trigger('click')
      await delay(300)
      const optionWrapper = createWrapper(wrapper.vm._optionsInstance)
      optionWrapper.findAll('.option--item').at(0).trigger('click')
      await delay(10)
      // select the first.
      expect(wrapper.props('value')).to.deep.eq([options[0].value])
      expect(wrapper.findAll('.bee-select--item').length).to.eq(1)
      expect(wrapper.findAll('.bee-select--item').at(0).text()).to.eq(options[0].label)

      // cancel select the first
      optionWrapper.findAll('.option--item').at(0).trigger('click')
      await delay(10)
      expect(wrapper.props('value')).to.deep.eq([])
      expect(wrapper.findAll('.bee-select--item').length).to.eq(0)
      expect(wrapper.find('.placeholder')).to.ok
    })
  })
})

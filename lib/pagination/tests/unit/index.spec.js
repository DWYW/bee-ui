import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import Vue from 'vue'
import { delay } from "../../../../tests/helpers"
import BeeButton from '../../../button/_src/index.vue'
import BeeUI from '../../../index'
import BeeInput from '../../../input/_src/index.vue'
import BeePagination from '../../../pagination/_src/index.vue'

Vue.use(BeeUI)

function _createWrapper(options = {}) {
  return shallowMount(BeePagination, {
    stubs: {
      'bee-input': BeeInput,
      'bee-button': BeeButton
    },
    ...options
  })
}

describe(`\x1b[46m bee-pagination \x1b[0m`, () => {
  describe(`The prop of "pageTotal"`, () => {
    it(`when the value is undefined, the wrapper should be empty`, () => {
      const wrapper = _createWrapper()
      expect(wrapper.isEmpty()).to.ok
    })

    it(`when the value lt 1, the wrapper should be empty`, () => {
      const wrapper = _createWrapper({
        propsData: {
          pageTotal: 0
        }
      })
      expect(wrapper.isEmpty()).to.ok
    })

    it(`when the value gt 0, the wrapper should not be empty`, () => {
      const wrapper = _createWrapper({
        propsData: {
          pageTotal: 10
        }
      })
      expect(wrapper.isEmpty()).not.ok
    })

    it(`when the value is 1, the buttons should be disabled`, () => {
      const wrapper = _createWrapper({
        propsData: {
          pageTotal: 1
        }
      })
      wrapper.findAll(BeeButton).wrappers.forEach(item => {
        expect(item.attributes('disabled')).to.ok
      })
    })

    it(`when the value gt 1, the input handler should be exists`, () => {
      const wrapper = _createWrapper({
        propsData: {
          pageTotal: 10
        }
      })
      expect(wrapper.find('.bee-pagination--quick').exists()).to.ok
    })
  })

  describe(`The prop of "page"`, () => {
    it('the current button will be acitved', async () => {
      const wrapper = _createWrapper({
        propsData: {
          pageTotal: 10,
          page: 2
        }
      })
      expect(wrapper.findAll(".bee-pagination--button").at(2).classes()).to.includes('bee-pagination--button__actived')

      wrapper.setProps({
        page: 2
      })
      await delay(10)
      expect(wrapper.findAll(".bee-pagination--button").at(2).classes()).to.contain('bee-pagination--button__actived')
    })
  })

  describe(`The prop of "total"`, () => {
    it(`the value is undefined or eq 0, the total will be not exists`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          page: 1,
          pageTotal: 10
        }
      })
      expect(wrapper.find('.bee-pagination--total').exists()).not.ok

      wrapper.setProps({
        total: 0
      })
      expect(wrapper.find('.bee-pagination--total').exists()).not.ok

      wrapper.setProps({
        total: 10
      })
      await delay(10)
      expect(wrapper.find('.bee-pagination--total').exists()).to.ok
    })
  })

  describe(`The prop of "totalVisible"`, () => {
    const wrapper = _createWrapper({
      propsData: {
        page: 1,
        pageTotal: 10,
        total: 200
      }
    })

    it(`default`, () => {
      expect(wrapper.find('.bee-pagination--total').exists()).to.ok
    })

    it(`the value is false, total tap should be not exists`, async () => {
      wrapper.setProps({
        totalVisible: false
      })

      await delay(10)
      expect(wrapper.find('.bee-pagination--total').exists()).not.ok
    })
  })

  describe(`The prop of "maxlength"`, () => {
    it(`the number of consecutive page button should be gt 0 and lt maxlength`, () => {
      const wrapper = _createWrapper({
        propsData: {
          page: 1,
          pageTotal: 10
        }
      })

      let _length = wrapper.findAll(BeeButton).wrappers.reduce((acc, cur) => {
        if (acc < 0 && cur.text() === '1') {
          acc = 1
        } else if (acc > 0 && cur.text() === (acc + 1).toString()) {
          acc++
        }

        return acc
      }, -1)
      expect(_length > 0 && _length <= wrapper.props('maxlength')).to.ok


      wrapper.setProps({
        page: 5
      })

      _length = wrapper.findAll(BeeButton).wrappers.reduce((acc, cur) => {
        if (acc < 0 && cur.text() === '1') {
          acc = 1
        } else if (acc > 0 && cur.text() === (acc + 1).toString()) {
          acc++
        }

        return acc
      }, -1)
      expect(_length > 0 && _length <= wrapper.props('maxlength')).to.ok
    })
  })

  describe(`The events`, () => {
    it('change', () => {
      const wrapper = _createWrapper({
        propsData: {
          pageTotal: 10,
          page: 1
        },
        listeners: {
          change: (page) => {
            wrapper.setProps({ page })
          }
        }
      })

      wrapper.findAll(BeeButton).at(1).trigger('click')
      expect(wrapper.props('page')).to.eq(1)

      // page button
      wrapper.findAll(BeeButton).at(2).trigger('click')
      expect(wrapper.props('page')).to.eq(2)

      // page input
      wrapper.find(BeeInput).find('input').setValue(8)
      wrapper.findAll(BeeButton).wrappers.find(item => item.text() === item.vm.$_language("CONFIRM")).trigger('click')
      expect(wrapper.props('page')).to.eq(8)
    })
  })
})

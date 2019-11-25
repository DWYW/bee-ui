import { shallowMount } from "@vue/test-utils"
import { expect } from 'chai'
import Vue from 'vue'
import BeeEmpty from '../../../empty/_src/index.vue'
import BeeUI from '../../../index'

function _createWrapper(options = {}) {
  return shallowMount(BeeEmpty, {
    stubs: {},
    ...options
  })
}

Vue.use(BeeUI)

describe(`\x1b[46m bee-empty \x1b[0m`, () => {
  describe(`The prop of "size"`, () => {
    it(`default`, () => {
      const wrapper = _createWrapper()
      expect(wrapper.find('.bee-empty--icon').attributes('style')).to.contain('width: 64px; height: 64px;')
    })

    it(`custom`, () => {
      const size = 100
      const wrapper = _createWrapper({
        propsData: {
          size: size
        }
      })
      expect(wrapper.find('.bee-empty--icon').attributes('style')).to.contain(`width: ${size}px; height: ${size}px;`)
    })
  })

  describe(`The prop of "placeholder"`, () => {
    it('default', () => {
      const wrapper = _createWrapper()
      expect(wrapper.find('.placeholder').text()).to.ok
    })

    it(`custom`, () => {
      const placeholder = 'placeholder'
      const wrapper = _createWrapper({
        propsData: {
          placeholder: placeholder
        }
      })
      expect(wrapper.find('.placeholder').text()).to.eq(placeholder)
    })
  })
})

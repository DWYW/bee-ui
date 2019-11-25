import { createWrapper, shallowMount } from "@vue/test-utils"
import { expect } from 'chai'
import Vue from 'vue'
import { delay } from "../../../../tests/helpers"
import BeeUI from '../../../index'
import BeeTooltip from '../../../tooltip/_src/index.vue'

Vue.use(BeeUI)

function _createWrapper(options = {}) {
  return shallowMount(BeeTooltip, {
    stubs: {},
    ...options
  })
}

describe(`\x1b[46m bee-tooltip \x1b[0m`, () => {
  describe(`The prop of "content"`, () => {
    it(`render`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          content: 'content'
        }
      })
      wrapper.trigger('mouseenter')
      expect(wrapper.vm._popperInstance).to.ok

      await delay(300)
      const instance = createWrapper(wrapper.vm._popperInstance)
      expect(instance.text()).to.contain('content')
    })
  })

  describe(`The prop of "position"`, () => {
    const wrapper = _createWrapper({
      propsData: {
        content: 'content'
      }
    })

    const positions = [
      'top start', 'top', 'top end',
      'bottom start', 'bottom', 'bottom end',
      'left start', 'left', 'left end',
      'right start', 'right', 'right end',
    ]

    positions.forEach((_position) => {
      it(_position, async () => {
        wrapper.setProps({
          position: _position
        })
        wrapper.trigger('mouseenter')
        await delay(300)
        const instance = createWrapper(wrapper.vm._popperInstance)
        expect(instance.find('.bee-popper').attributes('placement')).to.eq(_position)
        wrapper.trigger('mouseleave')
      })
    })
  })

  describe(`The prop of "theme"`, () => {
    it(`default`, async () => {
      const wrapper = _createWrapper()
      wrapper.trigger('mouseenter')
      await delay(300)
      const instance = createWrapper(wrapper.vm._popperInstance)
      expect(instance.classes()).to.contain('bee-tooltip-content__dark')
    })

    it(`light`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          theme: 'light'
        }
      })
      wrapper.trigger('mouseenter')
      await delay(300)
      const instance = createWrapper(wrapper.vm._popperInstance)
      expect(instance.classes()).to.contain('bee-tooltip-content__light')
    })
  })
})

import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import { delay } from "../../../../tests/helpers"
import BeeDrawer from '../../../drawer/_src/index.vue'

const transitionStub = () => ({
  render: function(h) {
    return this.$options._renderChildren
  }
})

function _createWrapper(options = {}) {
  return shallowMount(BeeDrawer, {
    stubs: {
      'transition': transitionStub()
    },
    ...options
  })
}

describe(`\x1b[46m bee-drawer \x1b[0m`, () => {
  describe(`the prop of "position"`, () => {
    const wrapper = _createWrapper()

    wrapper.setProps({
      value: true
    })

    it(`should include position_right`, () => {
      expect(wrapper.classes()).to.include('position_right')
    })

    it(`should include position_left`, () => {
      wrapper.setProps({
        position: 'left'
      })
      expect(wrapper.classes()).to.include('position_left')
    })

    it(`should include position_top`, () => {
      wrapper.setProps({
        position: 'top'
      })
      expect(wrapper.classes()).to.include('position_top')
    })

    it(`should include position_bottom`, () => {
      wrapper.setProps({
        position: 'bottom'
      })
      expect(wrapper.classes()).to.include('position_bottom')
    })
  })

  describe(`the prop of "width"`, () => {
    it(`should be equal seted`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          width: '50%',
          value: true
        }
      })
      await delay(10)
      expect(wrapper.find('.bee-drawer-body').attributes('style')).to.include('width: 50%;')
    })
  })

  describe(`the prop of "height"`, () => {
    it(`should be equal seted`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          height: '50%',
          value: true
        }
      })
      await delay(10)
      expect(wrapper.find('.bee-drawer-body').attributes('style')).to.include('height: 50%;')
    })
  })
})

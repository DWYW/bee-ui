import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import { delay } from "../../../../tests/helpers"
import BeeButton from '../../../button/_src/index.vue'
import BeeIcon from '../../../icon/_src/index.vue'

function _createWrapper(options = {}) {
  return shallowMount(BeeButton, {
    stubs: {
      'bee-icon': BeeIcon
    },
    ...options
  })
}

describe(`\x1b[46m bee-button \x1b[0m`, () => {
  describe(`The prop of "animation"`, () => {
    const wrapper = _createWrapper({
      propsData: {
        animation: true
      }
    })

    it('contains animation wrapper', () => {
      expect(wrapper.contains('.bee-button--animation')).to.ok
    })

    it('create animation', () => {
      wrapper.trigger('click')
      expect(wrapper.findAll('.bee-button--animation span').length).to.eq(1)
    })

    it(`delay 500ms animation completed`, async () => {
      await delay(500)
      expect(wrapper.findAll('.bee-button--animation span').length).to.eq(0)
    })
  })

  describe(`The prop of "disabled"`, () => {
    const wrapper = _createWrapper({
      propsData: {
        disabled: true
      }
    })

    it(`wrapper attributes include disabled`, () => {
      expect(wrapper.attributes('disabled')).to.eq('disabled')
    })

    it(`event cannot response`, () => {
      wrapper.trigger('click')
      expect(wrapper.emitted().click).to.eq(undefined)
    })
  })

  describe(`The prop of "icon"`, () => {
    it('match wrapper classes', () => {
      const wrapper = _createWrapper({
        propsData: {
          icon: 'add'
        }
      })
      expect(wrapper.find(BeeIcon).classes()).to.include.members(['bee-icon', 'beefont', 'bee-add'])
    })

    it('set icon fontFamily', () => {
      const wrapper = _createWrapper({
        propsData: {
          icon: {
            icon: 'close',
            fontFamily: 'test-iconfont'
          }
        }
      })
      expect(wrapper.find(BeeIcon).classes()).to.include.members(['bee-icon', 'test-iconfont', 'close'])
    })
  })

  describe(`The prop of "size"`, () => {
    it('default', () => {
      const wrapper = _createWrapper()
      expect(wrapper.classes()).to.include('bee-button__md')
    })

    it('sm', () => {
      const wrapper = _createWrapper({
        propsData: {
          size: 'sm'
        }
      })
      expect(wrapper.classes()).to.include('bee-button__sm')
    })

    it('lg', () => {
      const wrapper = _createWrapper({
        propsData: {
          size: 'lg'
        }
      })
      expect(wrapper.classes()).to.include('bee-button__lg')
    })
  })

  describe(`The prop of "theme"`, () => {
    it('defult', () => {
      const wrapper = _createWrapper()
      expect(wrapper.classes()).to.include('bee-button__default')
    })

    it('primary', () => {
      const wrapper = _createWrapper({
        propsData: {
          theme: 'primary'
        }
      })
      expect(wrapper.classes()).to.include('bee-button__primary')
    })

    it('success', () => {
      const wrapper = _createWrapper({
        propsData: {
          theme: 'success'
        }
      })
      expect(wrapper.classes()).to.include('bee-button__success')
    })

    it('error', () => {
      const wrapper = _createWrapper({
        propsData: {
          theme: 'error'
        }
      })
      expect(wrapper.classes()).to.include('bee-button__error')
    })
  })

  describe('The events', () => {
    const events = ['click', 'mouseenter', 'mouseleave']

    events.forEach((_event) => {
      it(`${_event}`, () => {
        let eventType = null
        let listeners = {}

        listeners[_event] = (e) => {
          eventType = e.type
        }

        const wrapper = _createWrapper({
          listeners: listeners
        })

        wrapper.trigger(_event)
        expect(eventType).to.eq(_event)
      })
    })
  })
})

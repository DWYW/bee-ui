import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import { BeeButton, BeeIcon } from '../../lib'

describe('button', () => {
  it('props.theme', () => {
    const button = shallowMount(BeeButton, {})
    expect(button.classes()).to.deep.eq(['bee-button', 'bee-button__default', 'bee-button__md'])

    button.setProps({
      theme: 'primary'
    })
    expect(button.classes()).to.deep.eq(['bee-button', 'bee-button__primary', 'bee-button__md'])

    button.setProps({
      theme: 'success'
    })
    expect(button.classes()).to.deep.eq(['bee-button', 'bee-button__success', 'bee-button__md'])

    button.setProps({
      theme: 'error'
    })
    expect(button.classes()).to.deep.eq(['bee-button', 'bee-button__error', 'bee-button__md'])
  })

  it('props.size', () => {
    const button = shallowMount(BeeButton, {
      propsData: {
        size: 'sm'
      }
    })
    expect(button.classes()).to.deep.eq(['bee-button', 'bee-button__default', 'bee-button__sm'])

    button.setProps({
      size: 'lg'
    })

    expect(button.classes()).to.deep.eq(['bee-button', 'bee-button__default', 'bee-button__lg'])
  })

  it('props.animation', () => {
    const button = shallowMount(BeeButton, {
      propsData: {
        animation: true
      }
    })

    expect(button.contains('.bee-button--animation')).to.ok
  })

  it('props.disalbed', () => {
    const button = shallowMount(BeeButton, {
      propsData: {
        disabled: true
      }
    })

    button.trigger('click')
    expect(button.emitted().click).to.eq(undefined)
  })

  it('props.icon', () => {
    const button = shallowMount(BeeButton, {
      stubs: {
        'bee-icon': BeeIcon
      },
      propsData: {
        icon: 'add'
      }
    })

    expect(button.contains('i.bee-add')).to.ok

    button.setProps({
      icon: {
        icon: 'add'
      }
    })

    expect(button.contains('i.bee-add')).to.ok
  })

  it('events', () => {
    const events = {
      click: 0,
      mouseenter: 0,
      mouseleave: 0
    }

    let icon = shallowMount(BeeButton, {
      listeners: Object.keys(events).reduce((listeners, event) => {
        listeners[event] = (e) => {
          events[event]++
        }

        return listeners
      }, {})
    })

    Object.keys(events).forEach(event => {
      icon.trigger(event)
      expect(events[event]).to.eq(1)
    })
  })
})

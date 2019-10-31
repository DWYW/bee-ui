import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import { BeeInput } from '../../lib'

describe('bee-input', () => {
  it('props.type', () => {
    let types = ['text', 'number', 'email']
    let input = shallowMount(BeeInput)

    types.forEach((type) => {
      input.setProps({
        type: type
      })

      expect(input.find('input').attributes('type')).to.eq(type)
    })
  })

  it('props.placeholder', () => {
    let input = shallowMount(BeeInput, {
      propsData: {
        placeholder: 'placeholder'
      }
    })

    expect(input.find('input').attributes('placeholder')).to.eq('placeholder')
  })

  it('props.disabled', () => {
    let input = shallowMount(BeeInput, {
      propsData: {
        disabled: true
      }
    })

    expect(input.find('input').attributes('disabled')).to.eq('disabled')
  })

  it('props.disabled', () => {
    let input = shallowMount(BeeInput, {
      propsData: {
        disabled: true
      }
    })

    expect(input.find('input').attributes('disabled')).to.eq('disabled')
  })

  it('props.readonly', () => {
    let input = shallowMount(BeeInput, {
      propsData: {
        readonly: true
      }
    })

    expect(input.find('input').attributes('readonly')).to.eq('readonly')
  })

  it('events', () => {
    let events = {
      click: 0,
      change: 0,
      mouseenter: 0,
      mouseleave: 0
    }

    let input = shallowMount(BeeInput, {
      listeners: Object.keys(events).reduce((listeners, event) => {
        listeners[event] = (e) => {
          events[event]++
        }

        return listeners
      }, {})
    })

    Object.keys(events).forEach(event => {
      input.find('input').trigger(event)
      expect(events[event]).to.eq(1)
    })
  })

  it('@enter', () => {
    let count = 0

    let input = shallowMount(BeeInput, {
      listeners: {
        enter: (e) => {
          count++
        }
      }
    })

    input.find('input').trigger('keyup.enter')

    expect(count).to.eq(1)
  })
})

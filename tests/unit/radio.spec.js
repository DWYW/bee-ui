import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import { BeeIcon, BeeRadio } from './_components'

describe('bee-radio', () => {
  it('props.icons', () => {
    let radio = shallowMount(BeeRadio, {
      stubs: {
        'bee-icon': BeeIcon
      },
      propsData: {
        icons: [{
          icon: 'user'
        }, {
          icon: 'mobile'
        }]
      }
    })
    expect(radio.findAll(BeeIcon).at(0).isVisible()).to.ok
    expect(radio.findAll(BeeIcon).at(1).isVisible()).to.false
    expect(radio.findAll(BeeIcon).at(0).classes()).to.contain('bee-user')
    expect(radio.findAll(BeeIcon).at(1).classes()).to.contain('bee-mobile')
  })

  it('props.disabled', () => {
    let radio = shallowMount(BeeRadio, {
      stubs: {
        'bee-icon': BeeIcon
      },
      propsData: {
        disabled: true
      }
    })

    expect(radio.findAll(BeeIcon).at(0).isVisible()).to.ok
    expect(radio.findAll(BeeIcon).at(1).isVisible()).to.false

    radio.trigger('click')
    expect(radio.findAll(BeeIcon).at(0).isVisible()).to.ok
    expect(radio.findAll(BeeIcon).at(1).isVisible()).to.false
  })

  it('slots.default', () => {
    let radio = shallowMount(BeeRadio, {
      stubs: {
        'bee-icon': BeeIcon
      },
      slots: {
        default: ['test content']
      }
    })
    expect(radio.text()).to.contain('test content')
  })

  it('v-model', () => {
    let input = false
    let radio = shallowMount(BeeRadio, {
      stubs: {
        'bee-icon': BeeIcon
      },
      slots: {
        default: ['test content']
      },
      propsData: {
        value: input
      },
      listeners: {
        input: (value) => {
          input = value
        }
      }
    })
    radio.trigger('click')
    expect(input).to.ok
  })

  it('events', () => {
    const events = {
      click: 0,
      change: 0,
      mouseenter: 0,
      mouseleave: 0
    }

    let radio = shallowMount(BeeIcon, {
      propsData: {
        icon: 'user'
      },
      listeners: Object.keys(events).reduce((listeners, event) => {
        listeners[event] = (e) => {
          events[event]++
        }

        return listeners
      }, {})
    })

    Object.keys(events).forEach(event => {
      radio.trigger(event)
      expect(events[event]).to.eq(1)
    })
  })
})

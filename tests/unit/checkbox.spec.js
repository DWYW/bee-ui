import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import { BeeCheckbox, BeeIcon } from '../../lib'

describe('bee-checkbox', () => {
  it('props.icons', () => {
    let checkbox = shallowMount(BeeCheckbox, {
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
    expect(checkbox.findAll(BeeIcon).at(0).isVisible()).to.ok
    expect(checkbox.findAll(BeeIcon).at(1).isVisible()).to.false
    expect(checkbox.findAll(BeeIcon).at(0).classes()).to.contain('bee-user')
    expect(checkbox.findAll(BeeIcon).at(1).classes()).to.contain('bee-mobile')
  })

  it('props.disabled', () => {
    let checkbox = shallowMount(BeeCheckbox, {
      stubs: {
        'bee-icon': BeeIcon
      },
      propsData: {
        disabled: true
      }
    })

    expect(checkbox.findAll(BeeIcon).at(0).isVisible()).to.ok
    expect(checkbox.findAll(BeeIcon).at(1).isVisible()).to.false

    checkbox.trigger('click')
    expect(checkbox.findAll(BeeIcon).at(0).isVisible()).to.ok
    expect(checkbox.findAll(BeeIcon).at(1).isVisible()).to.false
  })

  it('slots.default', () => {
    let checkbox = shallowMount(BeeCheckbox, {
      stubs: {
        'bee-icon': BeeIcon
      },
      slots: {
        default: ['test content']
      }
    })
    expect(checkbox.text()).to.contain('test content')
  })

  it('v-model', () => {
    let input = false
    let checkbox = shallowMount(BeeCheckbox, {
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
    checkbox.trigger('click')
    expect(input).to.ok
  })

  it('events', () => {
    const events = {
      click: 0,
      change: 0,
      mouseenter: 0,
      mouseleave: 0
    }

    let checkbox = shallowMount(BeeIcon, {
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
      checkbox.trigger(event)
      expect(events[event]).to.eq(1)
    })
  })
})

import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import { BeeIcon } from './_components'

describe('bee-icon', () => {
  it('class attribute', () => {
    let icon = shallowMount(BeeIcon)
    expect(icon.classes()).to.deep.equal(['bee-icon', 'beefont', 'bee-undefined'])

    icon.setProps({
      icon: 'user'
    })
    expect(icon.classes()).to.deep.equal(['bee-icon', 'beefont', 'bee-user'])

    icon.setProps({
      icon: 'user',
      fontFamily: 'iconfont'
    })
    expect(icon.classes()).to.deep.equal(['bee-icon', 'iconfont', 'user'])
  })

  it('slot content', () => {
    let icon = shallowMount(BeeIcon, {
      slots: {
        default: ['test content']
      }
    })
    expect(icon.text()).to.contain('test content')
  })

  it('events', () => {
    const events = ['click', 'mouseenter', 'mouseleave']

    let icon = shallowMount(BeeIcon, {
      propsData: {
        icon: 'user'
      },
      listeners: events.reduce((listeners, envent) => {
        listeners[envent] = (e) => {
          expect(e.type).to.eq(envent)
        }

        return listeners
      }, {})
    })

    events.forEach(envent => {
      icon.trigger(envent)
    })
  })
})

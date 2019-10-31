import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import { BeeIcon, BeeRadio, BeeRadioGroup } from '../../lib'

describe('bee-radio-group', () => {
  const groups = [{
    label: '香蕉'
  }, {
    label: '苹果',
    disabled: true
  }, {
    label: '菠萝'
  }, {
    label: '奇异果'
  }]

  it('render', () => {
    const group = shallowMount(BeeRadioGroup, {
      stubs: {
        'bee-icon': BeeIcon,
        'bee-radio': BeeRadio
      },
      propsData: {
        groups: groups
      }
    })

    let radios = group.findAll(BeeRadio)
    expect(radios.length).to.eq(4)

    for (let i = 0; i < radios.length; i++) {
      expect(radios.at(i).props('value')).to.eq(false)
    }
  })

  it('props.block', () => {
    const group = shallowMount(BeeRadioGroup, {
      stubs: {
        'bee-icon': BeeIcon,
        'bee-radio': BeeRadio
      },
      propsData: {
        groups: groups,
        block: true
      }
    })

    expect(group.contains('.bee-group--item__block')).to.eq(true)
  })

  it('v-model', () => {
    let selected = null
    let group = shallowMount(BeeRadioGroup, {
      stubs: {
        'bee-icon': BeeIcon,
        'bee-radio': BeeRadio
      },
      propsData: {
        groups: groups,
        value: selected
      },
      listeners: {
        input: (value) => {
          selected = value
        }
      }
    })

    group.findAll(BeeRadio).at(1).trigger('click')
    expect(selected).to.eq(null)

    group.findAll(BeeRadio).at(2).trigger('click')
    expect(selected).to.eq(2)
  })

  it('onchange', () => {
    let selected = null

    let group = shallowMount(BeeRadioGroup, {
      stubs: {
        'bee-icon': BeeIcon,
        'bee-radio': BeeRadio
      },
      propsData: {
        groups: groups
      },
      listeners: {
        change: (value) => {
          selected = value
        }
      }
    })

    group.findAll(BeeRadio).at(1).trigger('click')
    expect(selected).to.eq(null)

    group.findAll(BeeRadio).at(2).trigger('click')
    expect(selected).to.eq(2)
  })
})

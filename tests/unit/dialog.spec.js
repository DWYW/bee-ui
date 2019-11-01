import { shallowMount, TransitionStub } from '@vue/test-utils'
import { expect } from 'chai'
import Vue from 'vue'
import BeeUI from '../../lib'
import { BeeButton, BeeDialog, BeeIcon } from './_components'

describe('bee-dialog', () => {
  Vue.use(BeeUI)

  it('default', () => {
    const dialog = shallowMount(BeeDialog, {
      stubs: {
        'transition': TransitionStub,
        'bee-button': BeeButton,
        'bee-icon': BeeIcon
      },
      propsData: {}
    })

    expect(dialog.props('value')).to.eq(false)
    expect(dialog.props('title')).to.eq('提示')
    expect(dialog.props('width')).to.eq('500px')
    expect(dialog.props('closeVisible')).to.ok
    expect(dialog.props('cancelVisible')).to.ok
    expect(dialog.props('confirmVisible')).to.ok
    expect(dialog.props('cancelText')).to.eq('取消')
    expect(dialog.props('confirmText')).to.eq('确定')
    expect(dialog.props('autoHide')).to.ok
    expect(dialog.props('stopPenetrate')).not.ok
  })

  it('toggle', () => {
    let toggle = true

    const dialog = shallowMount(BeeDialog, {
      stubs: {
        'transition': TransitionStub,
        'bee-button': BeeButton,
        'bee-icon': BeeIcon
      },
      propsData: {
        value: toggle
      },
      listeners: {
        input: (value) => {
          toggle = value
        }
      }
    })

    dialog.find('.bee-dialog--btn__confirm').trigger('click')
    expect(toggle).not.ok

    toggle = true
    dialog.find('.bee-dialog--btn__cancel').trigger('click')
    expect(toggle).not.ok

    toggle = true
    dialog.find('.bee-dialog--close').trigger('click')
    expect(toggle).not.ok
  })

  it('props.title', () => {
    const dialog = shallowMount(BeeDialog, {
      stubs: {
        'transition': TransitionStub,
        'bee-button': BeeButton,
        'bee-icon': BeeIcon
      },
      propsData: {
        value: true,
        title: 'this is test title'
      }
    })

    expect(dialog.find('.bee-dialog--title').text()).to.contain('this is test title')
  })

  it('props.width', () => {
    const dialog = shallowMount(BeeDialog, {
      stubs: {
        'transition': TransitionStub,
        'bee-button': BeeButton,
        'bee-icon': BeeIcon
      },
      propsData: {
        value: true,
        width: '50%'
      }
    })

    expect(dialog.find('.bee-dialog--panel').attributes('style')).to.contain('width: 50%;')
  })

  it('props.closeVisible', () => {
    const dialog = shallowMount(BeeDialog, {
      stubs: {
        'transition': TransitionStub,
        'bee-button': BeeButton,
        'bee-icon': BeeIcon
      },
      propsData: {
        value: true,
        closeVisible: false
      }
    })

    expect(dialog.find('.bee-dialog--close').exists()).not.ok
  })

  it('props.cancelVisible', () => {
    const dialog = shallowMount(BeeDialog, {
      stubs: {
        'transition': TransitionStub,
        'bee-button': BeeButton,
        'bee-icon': BeeIcon
      },
      propsData: {
        value: true,
        cancelVisible: false
      }
    })

    expect(dialog.find('.bee-dialog--btn__cancel').exists()).not.ok
  })

  it('props.confirmVisible', () => {
    const dialog = shallowMount(BeeDialog, {
      stubs: {
        'transition': TransitionStub,
        'bee-button': BeeButton,
        'bee-icon': BeeIcon
      },
      propsData: {
        value: true,
        confirmVisible: false
      }
    })

    expect(dialog.find('.bee-dialog--btn__confirm').exists()).not.ok
  })

  it('props.cancelText', () => {
    const dialog = shallowMount(BeeDialog, {
      stubs: {
        'transition': TransitionStub,
        'bee-button': BeeButton,
        'bee-icon': BeeIcon
      },
      propsData: {
        value: true,
        cancelText: 'text content'
      }
    })

    expect(dialog.find('.bee-dialog--btn__cancel').text()).to.contain('text content')
  })

  it('props.confirmText', () => {
    const dialog = shallowMount(BeeDialog, {
      stubs: {
        'transition': TransitionStub,
        'bee-button': BeeButton,
        'bee-icon': BeeIcon
      },
      propsData: {
        value: true,
        confirmText: 'text content'
      }
    })

    expect(dialog.find('.bee-dialog--btn__confirm').text()).to.contain('text content')
  })
})

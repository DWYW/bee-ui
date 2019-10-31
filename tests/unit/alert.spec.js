import { createWrapper } from '@vue/test-utils'
import { expect } from 'chai'
import Vue from 'vue'
import BeeUI, { BeeDialog } from '../../lib'

describe('$_createAlert', () => {
  Vue.use(BeeUI)
  const vue = new Vue()

  it('install', () => {
    expect(vue).to.have.property('$_createAlert')
    expect(vue.$_createAlert).to.be.a('function')
  })

  it('default', () => {
    const alert = createWrapper(vue.$_createAlert())

    const dialog = alert.find(BeeDialog)

    expect(dialog.props().width).to.ok
    expect(dialog.props().closeVisible).to.ok
    expect(dialog.props().cancelVisible).to.ok
    expect(dialog.props().confirmVisible).to.ok
    expect(dialog.props().title).to.eq('提示')
    expect(dialog.props().cancelText).to.eq('取消')
    expect(dialog.props().confirmText).to.eq('确定')
    expect(dialog.contains('.bee-dialog__center')).not.ok
  })
})

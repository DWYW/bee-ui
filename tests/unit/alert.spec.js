import { createWrapper } from '@vue/test-utils'
import { expect } from 'chai'
import Vue from 'vue'
import BeeUI from '../../lib'
import { BeeDialog, delay } from './_components'

describe('$_createAlert', () => {
  Vue.use(BeeUI)
  const vue = new Vue()

  it('install', () => {
    expect(vue).to.have.property('$_createAlert')
    expect(vue.$_createAlert).to.be.a('function')
  })

  it('default', () => {
    const alert = vue.$_createAlert()
    const alertWrapper = createWrapper(alert)
    const dialogWrapper = alertWrapper.find(BeeDialog)

    expect(dialogWrapper.props().width).to.ok
    expect(dialogWrapper.props().closeVisible).to.ok
    expect(dialogWrapper.props().cancelVisible).to.ok
    expect(dialogWrapper.props().confirmVisible).to.ok
    expect(dialogWrapper.props().title).to.eq('提示')
    expect(dialogWrapper.props().cancelText).to.eq('取消')
    expect(dialogWrapper.props().confirmText).to.eq('确定')
    expect(dialogWrapper.contains('.bee-dialog__center')).not.ok
  })

  it('toggle', async () => {
    const alert = vue.$_createAlert()
    const alertWrapper = createWrapper(alert)
    const dialogWrapper = alertWrapper.find(BeeDialog)

    expect(dialogWrapper.isEmpty()).to.ok

    alert.show()
    await delay(300)
    expect(dialogWrapper.isEmpty()).not.ok

    alert.hide()
    await delay(300)
    expect(dialogWrapper.isEmpty()).to.ok
  })

  it('options.title', async () => {
    const alert = vue.$_createAlert({
      title: 'test title'
    }).show()
    const alertWrapper = createWrapper(alert)

    await delay(300)
    expect(alertWrapper.find('.bee-dialog-title--text').text()).to.contain('test title')
  })

  it('options.cancelText', async () => {
    const alert = vue.$_createAlert({
      cancelText: 'cancel'
    }).show()
    const alertWrapper = createWrapper(alert)

    await delay(300)
    expect(alertWrapper.find('.bee-dialog--btn__cancel').text()).to.contain('cancel')
  })

  it('options.confirmText', async () => {
    const alert = vue.$_createAlert({
      confirmText: 'confrim'
    }).show()
    const alertWrapper = createWrapper(alert)

    await delay(300)
    expect(alertWrapper.find('.bee-dialog--btn__confirm').text()).to.contain('confrim')
  })

  it('options.closeVisible', async () => {
    const alert = vue.$_createAlert({
      closeVisible: false
    }).show()
    const alertWrapper = createWrapper(alert)

    await delay(300)
    expect(alertWrapper.find('.bee-dialog--close').exists()).not.ok
  })

  it('options.cancelVisible', async () => {
    const alert = vue.$_createAlert({
      cancelVisible: false
    }).show()
    const alertWrapper = createWrapper(alert)

    await delay(300)
    expect(alertWrapper.find('.bee-dialog--cancel').exists()).not.ok
  })

  it('options.confirmVisible', async () => {
    const alert = vue.$_createAlert({
      confirmVisible: false
    }).show()
    const alertWrapper = createWrapper(alert)

    await delay(300)
    expect(alertWrapper.find('.bee-dialog--confirm').exists()).not.ok
  })

  it('options.onclose', async () => {
    let count = 0

    const alert = vue.$_createAlert({
      onclose: () => {
        count += 1
      }
    }).show()
    const alertWrapper = createWrapper(alert)

    await delay(300)
    alertWrapper.find('.bee-dialog--close').trigger('click')

    expect(count).to.eq(1)
  })

  it('options.oncancel', async () => {
    let count = 0

    const alert = vue.$_createAlert({
      oncancel: () => {
        count += 1
      }
    }).show()
    const alertWrapper = createWrapper(alert)

    await delay(300)
    alertWrapper.find('.bee-dialog--btn__cancel').trigger('click')

    expect(count).to.eq(1)
  })

  it('options.onconfirm', async () => {
    let count = 0

    const alert = vue.$_createAlert({
      onconfirm: () => {
        count += 1
      }
    }).show()
    const alertWrapper = createWrapper(alert)

    await delay(300)
    alertWrapper.find('.bee-dialog--btn__confirm').trigger('click')

    expect(count).to.eq(1)
  })
})

import { createWrapper } from "@vue/test-utils"
import { expect } from 'chai'
import Vue from 'vue'
import { delay } from "../../../../tests/helpers"
import BeeDialog from '../../../dialog/_src/index.vue'
import BeeIcon from '../../../icon/_src/index.vue'
import BeeUI from '../../../index'

Vue.use(BeeUI)

function _createWrapper (options = {}) {
  const vm = Vue.prototype.$_createAlert(options).show()
  return createWrapper(vm)
}

describe(`\x1b[46m $_createAlert \x1b[0m`, () => {
  describe(`default render`, () => {
    const wrapper = _createWrapper({
      title: 'title'
    })

    it(`title should visible`, () => {
      expect(wrapper.find('.bee-dialog-title--text').exists()).to.ok
      expect(wrapper.find('.bee-dialog-title--text').text()).to.ok
    })

    it(`close btn should exists`, () => {
      expect(wrapper.find('.bee-dialog--close').exists()).to.ok
    })

    it(`content text should be ""`, () => {
      expect(wrapper.find('.alert-content').text()).to.eq("")
    })

    it(`cancel button should exists`, () => {
      expect(wrapper.find('.bee-dialog--btn__cancel').exists()).to.ok
      expect(wrapper.find('.bee-dialog--btn__cancel').text()).to.ok
    })

    it(`confirm button should exists`, () => {
      expect(wrapper.find('.bee-dialog--btn__confirm').exists()).to.ok
      expect(wrapper.find('.bee-dialog--btn__confirm').text()).to.ok
    })
  })

  describe(`The option of "title"`, () => {
    it(`should be setted`, async () => {
      const title = 'custom title'
      const wrapper = _createWrapper({
        title: title
      })
      await delay(300)
      expect(wrapper.find(BeeDialog).find('.bee-dialog-title--text').text()).to.eq(title)
    })
  })

  describe(`The option of "message"`, () => {
    it(`should be the set value`, async () => {
      const message = 'custom context'
      const wrapper = _createWrapper({
        message: message
      })

      await delay(300)
      expect(wrapper.find(BeeDialog).find('.alert-content').text()).to.eq(message)
    })
  })

  describe(`The option of "html"`, () => {
    it(`should be the set value`, async () => {
      const html = '<span id="test_context">custom context</span>'
      const wrapper = _createWrapper({
        html: html
      })

      await delay(300)
      expect(wrapper.find(BeeDialog).find('.alert-content').html()).to.contain(html)
    })
  })

  describe(`The option of "center"`, () => {
    it(`wrapper classes should contain bee-dialog__center`, async () => {
      const wrapper = _createWrapper({
        center: true
      })

      await delay(300)
      expect(wrapper.find(BeeDialog).classes()).to.contain('bee-dialog__center')
    })
  })

  describe(`The option of "closeVisible"`, () => {
    it(`close button should be non-exists`, async () => {
      const wrapper = _createWrapper({
        closeVisible: false
      })

      await delay(300)
      expect(wrapper.find(BeeDialog).find(BeeIcon).exists()).not.ok
    })
  })

  describe(`The option of "cancelVisible"`, () => {
    it(`cancel button should be non-exists`, async () => {
      const wrapper = _createWrapper({
        cancelVisible: false
      })

      await delay(300)
      expect(wrapper.find(BeeDialog).find('.bee-dialog--btn__cancel').exists()).not.ok
    })
  })

  describe(`The option of "cancelText"`, () => {
    it(`cancel button text should be the set value`, async () => {
      const cancelText = 'cancel tap'
      const wrapper = _createWrapper({
        cancelText
      })

      await delay(300)
      expect(wrapper.find(BeeDialog).find('.bee-dialog--btn__cancel').text()).to.eq( cancelText)
    })
  })

  describe(`The option of "confirmVisible"`, () => {
    it(`confirm button should be non-exists`, async () => {
      const wrapper = _createWrapper({
        confirmVisible: false
      })

      await delay(300)
      expect(wrapper.find(BeeDialog).find('.bee-dialog--btn__confirm').exists()).not.ok
    })
  })

  describe(`The option of "confirmText"`, () => {
    it(`confirm button should be non-exists`, async () => {
      const confirmText = 'confirm tap'
      const wrapper = _createWrapper({
        confirmText
      })

      await delay(300)
      expect(wrapper.find(BeeDialog).find('.bee-dialog--btn__confirm').text()).to.eq(confirmText)
    })
  })

  describe(`The events`, () => {
    it(`onclose by close active`, async () => {
      let count = 0
      const wrapper = _createWrapper({
        onclose: () => {
          count++
        }
      })
      await delay(300)
      wrapper.find(BeeDialog).find(BeeIcon).trigger('click')
      expect(count).to.eq(1)
    })

    it(`onclose by close cancel`, async () => {
      let count = 0
      const wrapper = _createWrapper({
        onclose: () => {
          count++
        }
      })
      await delay(300)
      wrapper.find(BeeDialog).find('.bee-dialog--btn__cancel').trigger('click')
      expect(count).to.eq(1)
    })

    it(`oncancel`, async () => {
      let count = 0
      const wrapper = _createWrapper({
        oncancel: () => {
          count++
        }
      })
      await delay(300)
      wrapper.find(BeeDialog).find('.bee-dialog--btn__cancel').trigger('click')
      expect(count).to.eq(1)
    })

    it(`onconfirm`, async () => {
      let count = 0
      const wrapper = _createWrapper({
        onconfirm: () => {
          count++
        }
      })
      await delay(300)
      wrapper.find(BeeDialog).find('.bee-dialog--btn__confirm').trigger('click')
      expect(count).to.eq(1)
    })
  })
})

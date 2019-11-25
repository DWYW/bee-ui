import { RouterLinkStub, shallowMount } from "@vue/test-utils"
import { expect } from 'chai'
import BeeBreadcrumb from '../../../breadcrumb/_src/index.vue'
import { crumbs } from './_data'

function _createWrapper(options = {}) {
  return shallowMount(BeeBreadcrumb, {
    stubs: {
      'router-link': RouterLinkStub
    },
    ...options
  })
}

describe(`\x1b[46m bee-breadcrumb \x1b[0m`, () => {
  describe(`render`, () => {
    const wrapper = _createWrapper({
      propsData: {
        crumbs: crumbs
      }
    })

    it(`children length should be crumbs.length`, () => {
      expect(wrapper.findAll('.breadcrumb--item').length).to.eq(crumbs.length)
    })

    it(`router-link length should be crumbs.length - 1`, () => {
      expect(wrapper.findAll(RouterLinkStub).length).to.eq(crumbs.length - 1)
    })

    it(`the last child classes should contain breadcrumb--item__active`, () => {
      expect(wrapper.findAll('.breadcrumb--item').at(crumbs.length - 1).classes()).to.contain('breadcrumb--item__active')
    })
  })
})

import { expect } from 'chai'
import Vue from 'vue'
import BeeLanguage from '../../../language'

Vue.use(BeeLanguage)

describe(`\x1b[46m $_language \x1b[0m`, () => {
  const vue = new Vue()

  it('default', () => {
    expect(vue).to.have.property('$_language')
    expect(vue.$_language).to.be.a('function')
    expect(vue.$_language('TAP')).to.be.a('string').eq('提示')
    expect(vue.$_language('TAP.MESSAGE')).to.be.a('undefined')
  })

  it('has params', () => {
    const day = 3
    expect(vue.$_language('PICKER_MAX_DAYS', { day })).to.eq(`您最多可以选择${day}天`)
  })
})

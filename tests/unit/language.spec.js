import { expect } from 'chai'
import Vue from 'vue'
import { BeeLanguage } from '../../lib'

describe('language:', () => {
  it('default', () => {
    Vue.use(BeeLanguage)
    const vue = new Vue()
    expect(vue).to.have.property('$_language')
    expect(vue.$_language).to.be.a('function')
    expect(vue.$_language('TAP')).to.be.a('string').eq('提示')
    expect(vue.$_language('TAP.MESSAGE')).to.be.a('undefined')
  })
})

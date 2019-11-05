import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import Vue from 'vue'
import BeeUI from '../../lib'
import { BeeEmpty } from './_components'

describe('bee-empty', () => {
  Vue.use(BeeUI)

  it('default', () => {
    const empty = shallowMount(BeeEmpty)
    expect(empty.text()).to.contain('暂无数据')
    expect(empty.find('.bee-empty--icon').attributes('style')).to.contain('width: 64px; height: 64px;')
  })

  it('props.placeholder', () => {
    const empty = shallowMount(BeeEmpty, {
      propsData: {
        placeholder: 'data empty'
      }
    })

    expect(empty.text()).to.contain('data empty')
  })

  it('props.size', () => {
    const empty = shallowMount(BeeEmpty, {
      propsData: {
        size: 200
      }
    })

    expect(empty.find('.bee-empty--icon').attributes('style')).to.contain('width: 200px; height: 200px;')
  })
})

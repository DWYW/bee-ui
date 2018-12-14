import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import BeeBotton from '../../lib/button/_src/index.vue'

describe('BeeBotton.vue', () => {
  it('renders props.disabled when passed', () => {
    const wrapper = shallowMount(BeeBotton, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.attributes('disabled')).to.include('disabled')
  })
})

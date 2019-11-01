import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import { BeeBreadcrumb } from './_components'

describe('bee-breadcrumb', () => {
  it('props.crumbs', () => {
    const breadcrumb = shallowMount(BeeBreadcrumb, {
      stubs: {
        RouterLink: RouterLinkStub
      },
      propsData: {
        crumbs: [{
          label: '首页',
          route: {
            path: '/'
          }
        }, {
          label: '安装',
          route: '/components/install'
        }, {
          label: '面包屑',
          route: ''
        }]
      }
    })

    expect(breadcrumb.text()).to.contain('首页 > 安装 > 面包屑')
  })
})

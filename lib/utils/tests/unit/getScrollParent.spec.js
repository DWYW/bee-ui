import { expect } from 'chai'
import getScrollParent from '../../../utils/getScrollParent'

describe(`\x1b[46m getScrollParent \x1b[0m`, () => {
  it('body', () => {
    expect(getScrollParent().nodeName).to.eq('BODY')
    expect(getScrollParent(document.body).nodeName).to.eq('BODY')
    expect(getScrollParent(document).nodeName).to.eq('BODY')
    expect(getScrollParent(document.documentElement).nodeName).to.eq('BODY')
    expect(getScrollParent(window).nodeName).to.eq('BODY')
    expect(getScrollParent(1).nodeName).to.eq('BODY')
    expect(getScrollParent('body').nodeName).to.eq('BODY')
  })

  it('div', () => {
    const root = document.createElement('div')
    root.style.overflow = 'auto'
    root.innerHTML = `
      <div class='level1'>
        <div class='level2'></div>
      </div>
      <div class='level1'></div>
    `

    document.body.appendChild(root)

    expect(getScrollParent(document.querySelector('.level1'))).to.eq(root)
    expect(getScrollParent(document.querySelector('.level2'))).to.eq(root)
  })
})

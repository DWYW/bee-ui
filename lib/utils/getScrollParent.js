import helpers from './helpers'
/**
 * Get the scrolling parent of the given element.
 * @param {Element} element given element
 * @returns {Element} scroll parent
 */
export default function getScrollParent (element) {
  if (!/element/.test(helpers.typeof(element))) return document.body

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body
    case '#document':
      return element.body
  }

  const overflow = helpers.getCss(element, 'overflow')
  const overflowX = helpers.getCss(element, 'overflowX')
  const overflowY = helpers.getCss(element, 'overflowY')

  if (/auto|scroll/.test(overflow + overflowX + overflowY)) return element

  return getScrollParent(element.parentNode)
}

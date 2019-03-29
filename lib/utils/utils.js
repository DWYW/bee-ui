export default class Utils {
  static typeof (data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
  }

  static eq (a, b) {
    const type = Utils.typeof(a)

    if (type !== Utils.typeof(b)) return false

    switch (type) {
      case 'string':
        return a === b
      case 'number':
        return a === b
      case 'date':
        return a.toString() === b.toString()
      case 'undefined':
        return true
      case 'null':
        return true
      default:
        return JSON.stringify(a) === JSON.stringify(b)
    }
  }

  /**
   * get css attribute
   * @param  {HTMLDOM} element target html dom
   * @param  {String} attr     css attribute
   * @return {String}
   */
  static getCss (element, attr) {
    if (element.currentStyle) {
      return element.currentStyle[attr]
    } else if (window.getComputedStyle && window.getComputedStyle(element, null)) {
      return window.getComputedStyle(element, null).getPropertyValue(attr)
    } else {
      return element.style[attr]
    }
  }
}

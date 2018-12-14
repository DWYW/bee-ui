export default class Listener {
  /**
   * DOM add event listener.
   */
  static addListener (target, type, listener, useCapture = false) {
    if (target.addEventListener) {
      target.addEventListener(type, listener, useCapture)
    } else if (target.attachEvent) {
      target.attachEvent(`on${type}`, listener, useCapture)
    } else {
      target[`on${type}`] = listener
    }
  }

  /**
   * DOM remove event listener.
   */
  static removeListener (target, type, listener, useCapture = false) {
    if (target.removeEventListener) {
      target.removeEventListener(type, listener, useCapture)
    } else if (target.detachEvent) {
      target.detachEvent(`on${type}`, listener, useCapture)
    } else {
      target[`on${type}`] = null
    }
  }
}

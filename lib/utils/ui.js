export default class UI {
  /**
   * 获取屏屏信息
   */
  static availScreen () {
    return {
      width: Math.min(window.innerWidth, document.documentElement.clientWidth),
      height: Math.min(window.innerHeight, document.documentElement.clientHeight),
      ratio: window.devicePixelRatio
    }
  }
}

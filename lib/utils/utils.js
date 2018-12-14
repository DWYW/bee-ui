export default class Utils {
  static typeof (data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
  }
}

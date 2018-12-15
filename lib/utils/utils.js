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
}

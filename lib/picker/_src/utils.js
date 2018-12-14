class Utils {
  /**
   * 将一位数字转化成2位字符串
   * @param {Number} number 要转换的数字
   */
  two (number) {
    return number < 10 ? `0${number}` : `${number}`
  }

  /**
   * 时间戳转成日期
   * @param {Number|String} stamp 时间戳或时间戳字符串
   */
  stamp2date (stamp) {
    let _stamp = Number(stamp)

    if (_stamp >= 0) {
      // 后台返回的时间戳是10位的精确到秒的
      if (_stamp.toString().length === 10) {
        _stamp = _stamp * 1000
      }

      return new Date(_stamp)
    }
  }

  /**
   * 日期转成时间戳
   * @param {Date} date 要转换的日期
   */
  date2Stamp (date) {
    if (this.typeof(date) !== 'date') return null
    return date.getTime()
  }

  /**
   * 将日期转换成需要的具体数据
   * @param {Date} date 要转换的日期
   */
  date2object (date) {
    if (this.typeof(date) !== 'date') return null

    let _data = {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      times: date.getTime(),
      day: date.getDay()
    }
    _data['days'] = new Date(_data.year, _data.month + 1, 0, 0, 0, 0).getDate()
    _data['prevMonthDays'] = new Date(_data.year, _data.month, 0, 0, 0, 0).getDate()
    _data['prevDays'] = _data.day
    _data['nextDays'] = 6 * 7 - _data.days - _data.prevDays

    return _data
  }

  /**
   * 日期格式化
   * @param {Date} date 要转化的日期
   * @param {String} format 转换格式
   */
  format (date, format = 'YYYY-MM-DD') {
    if (this.typeof(date) !== 'date') return null

    let _format = format.replace(/(^\s+)|(\s+$)/g, '')
    let dateData = this.date2object(date)
    let datas = {
      'YYYY': dateData.year.toString(),
      'YY': dateData.year.toString().substr(2),
      'MM': this.two(dateData.month + 1),
      'M': (dateData.month + 1).toString(),
      'DD': this.two(dateData.date),
      'D': dateData.date.toString(),
      'hh': this.two(dateData.hour),
      'h': dateData.hour.toString(),
      'mm': this.two(dateData.minute),
      'm': dateData.minute.toString(),
      'ss': this.two(dateData.second),
      's': dateData.second.toString()
    }

    Object.keys(datas).forEach((keyName) => {
      let _tmpReg = new RegExp(keyName)
      _format = _format.replace(_tmpReg, datas[keyName])
    })

    _format = _format.replace(/[YMDhms]+/g, '')
    return _format
  }

  /**
   * 格式化后的日期转化为Date类型数据
   * @param {DateString} date 要转化的日期格式化的字符串
   * @param {String} format 转换格式 默认'YYYY-MM-DD hh:mm:ss'
   */
  getDate (date, format) {
    if (this.typeof(date) !== 'date') return null

    let _format = format || 'YYYY-MM-DD hh:mm:ss'

    if (new Date(date).toString() !== 'Invalid Date') {
      return new Date(date)
    } else {
      let year = parseInt(date.toString().slice(_format.toString().indexOf('YYYY')))
      let month = parseInt(date.toString().slice(_format.toString().indexOf('MM'))) - 1
      let day = parseInt(date.toString().slice(_format.toString().indexOf('DD')))

      let hour = _format.toString().indexOf('hh') !== -1 ? parseInt(date.toString().slice(_format.toString().indexOf('hh'))) : 0
      let minute = _format.toString().indexOf('mm') !== -1 ? parseInt(date.toString().slice(_format.toString().indexOf('mm'))) : 0
      let second = _format.toString().indexOf('ss') !== -1 ? parseInt(date.toString().slice(_format.toString().indexOf('ss'))) : 0
      return new Date(year, month, day, hour, minute, second)
    }
  }

  /**
   * 获取数据的数据类型
   * @param  {any} data target data
   * @return {String}
   */
  typeof (data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
  }
}

export default new Utils()

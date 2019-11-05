import helpers from './helpers'

export default {
  two (num) {
    return num < 10 ? `0${num}` : `${num}`
  },

  date2object (date) {
    if (helpers.typeof(date) !== 'date') return

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
    _data['prevDays'] = new Date(_data.year, _data.month, 1, 0, 0, 0).getDay()
    _data['nextDays'] = 6 * 7 - _data.days - _data.prevDays

    return _data
  },

  format (date, format = 'YYYY-MM-DD') {
    if (helpers.typeof(date) !== 'date') return ''

    const data = this.date2object(date)
    let dateStr = helpers.trim(format)

    let formats = [
      [/Y{4,}/, data.year],
      [/Y{2,}/, data.year.toString().substr(2)],
      [/M{2,}/, this.two(data.month + 1)],
      [/M/, data.month + 1],
      [/D{2,}/, this.two(data.date)],
      [/D/, data.date],
      [/h{2,}/, this.two(data.hour)],
      [/h/, data.hour],
      [/m{2,}/, this.two(data.minute)],
      [/m/, data.minute],
      [/s{2,}/, this.two(data.second)],
      [/s/, data.second]
    ]

    let i = 0

    while (i < formats.length) {
      const [reg, value] = formats[i]
      dateStr = dateStr.replace(reg, value)
      i++
    }

    return dateStr
  }
}

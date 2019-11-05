import helpers from '../utils/helpers'
import ZhCn from './_src/zh-cn'

export default {
  languages: {
    'zh-cn': ZhCn
  },
  language: 'zh-cn',
  use: function (language, config) {
    this.language = language

    if (config) {
      this.languages[language] = config
    }
  },
  install: function (Vue, options) {
    if (options && options.language) {
      this.use(options.language)
    }

    Vue.prototype.$_language = (path, datas) => {
      let text = helpers.getValueByPath(this.languages[this.language], path)

      if (helpers.typeof(datas) !== 'object') return text

      for (let key in datas) {
        text = text.replace(new RegExp(`{${key}}`), datas[key])
      }

      return text
    }
  }
}

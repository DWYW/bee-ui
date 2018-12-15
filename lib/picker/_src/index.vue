<template>
  <div :class='["picker--wp", {
    "picker__date": type === "date",
    "picker__datetime": type === "datetime",
    "picker__range": type === "range",
    "picker__rangetime": type === "rangetime"
  }]'>
    <quick-btns v-if='hasQuickBtns'
      :callback="quickCallback"
      :quick-btns='getQuickBtns()'
      :quick-btns-type='quickBtnsType'
      :is-range='isRange'
      :value='value'></quick-btns>

    <bee-input ref='input'
      :read-only='true'
      :icon='iconConfig'
      :placeholder='placeholder'
      :value='picker.label'
      @click='openPicker' />
  </div>
</template>

<script>
import Vue from 'vue'
import langs from './lang'
import Picker from './Picker.vue'
import QuickBtns from './QuickBtns.vue'
import Listener from '../../utils/listener'
import utils from './utils'

const PickerConstructor = Vue.extend(Picker)

export default {
  name: 'BeePicker',
  components: {
    QuickBtns
  },
  props: {
    // 滚动事件的目标元素
    scrollDom: null,
    // 语言类型
    lang: {
      type: String,
      default: 'zh_cn'
    },
    // 日期格式字符串
    format: String,
    // 最终显示在input框中的label值 参数为选中的日期或者日期范围
    labelFormat: Function,
    // 日期选择的样式 date 或者 range
    type: {
      type: String,
      validator: function (value) {
        return ['date', 'datetime', 'range', 'rangetime'].indexOf(value) !== -1
      },
      default: 'date'
    },
    // 日期不可用过滤
    disabled: Function,
    timeDisabled: Object,
    placeholder: String,
    // 快捷按钮
    quickBtns: Array,
    quickBtnsType: {
      type: String,
      validator: function (value) {
        return ['inner', 'outer'].indexOf(value) !== -1
      },
      default: 'inner'
    },
    maxDays: [Number, String],
    value: [Date, Array]
  },
  data () {
    return {
      _instance: null,
      picker: {
        label: null,
        value: null
      }
    }
  },
  computed: {
    iconConfig () {
      return {
        icon: 'date',
        position: 'left'
      }
    },
    _TEXT () {
      return langs[this.lang]
    },
    isRange () {
      return /^range/.test(this.type)
    },
    isNeedTime () {
      return /time$/.test(this.type)
    },
    hasQuickBtns () {
      let quickBtns = this.getQuickBtns()
      return quickBtns && quickBtns.length && this.quickBtnsType === 'outer'
    }
  },
  mounted () {},
  methods: {
    openPicker () {
      if (this._instance) return

      let { value, ...props } = this._props

      const _config = Object.assign({}, props, {
        followDom: this.$refs.input.$el,
        scrollDom: this.scrollDom,
        callback: this.pickerCallBack,
        quickCallback: this.quickCallback,
        isRange: this.isRange,
        text: this._TEXT,
        format: this.getFormat(),
        quickBtns: this.getQuickBtns(),
        value: this.picker.value,
        isNeedTime: this.isNeedTime,
        closePicker: this.closePicker
      })

      this._instance = new PickerConstructor({ data: _config })
      this._instance.vm = this._instance.$mount()
      this._instance.dom = this._instance.vm.$el
      document.body.appendChild(this._instance.dom)

      setTimeout(() => {
        Listener.addListener(document, 'click', this.closePicker)
      })
    },

    /**
     * 关闭options选择层
     */
    closePicker () {
      if (this._instance) {
        this._instance.vm.$destroy()
        document.body.removeChild(this._instance.dom)
        this._instance = null
        Listener.removeListener(document, 'click', this.closePicker)
      }
    },

    /**
     * 获取格式化的方式
     */
    getFormat () {
      return this.format ? this.format : /time$/.test(this.type) ? 'YYYY-MM-DD hh:mm:ss' : 'YYYY-MM-DD'
    },

    /**
     * 过滤获取快速选择按钮
     */
    getQuickBtns () {
      if (utils.typeof(this.quickBtns) !== 'array') {
        return []
      }

      let btns = []

      this.quickBtns.forEach((item) => {
        if (this.isRange && item) {
          let { label, value } = item

          if (label && utils.typeof(value) === 'array' && ((utils.typeof(value[0]) === 'date' && utils.typeof(value[1]) === 'date') || (utils.typeof(value[0]) === 'date' && utils.typeof(value[1]) === 'date'))) {
            btns.push(item)
          }
        }

        if (!this.isRange && item) {
          let { label, value } = item

          if (label && utils.typeof(value) === 'date') {
            btns.push(item)
          }
        }
      })

      return btns
    },

    /**
     * 快速选择按钮选择后的回调
     * @param {Object} data 选中的按钮数据
     */
    quickCallback (data) {
      this.$set(this.picker, 'label', data.label)
      this.$set(this.picker, 'value', data.value)
      this.closePicker()
      this.$emit('input', data.value)
    },

    /**
     * 选取后的回调
     * @param {Date|Array Date} date 回调值
     * @param {String} type 回调类型 picker|quickBtn
     */
    pickerCallBack (date, type) {
      this.updatedValue(date)
      this.$emit('input', date)

      if (!this.isNeedTime) {
        this.closePicker()
      }
    },

    /**
     * 更新选择的日期时间的值
     * @param {Date|Array Date} date 设置的值
     */
    updatedValue (date) {
      let _label = ''

      if (date) {
        let isUpdateRange = this.isRange && utils.typeof(date) === 'array' && utils.typeof(date[0]) === 'date' && utils.typeof(date[1]) === 'date'
        let isUpdateDate = !this.isRange && utils.typeof(date) === 'date'

        if (isUpdateRange) {
          if (utils.typeof(this.labelFormat) === 'function') {
            _label = this.labelFormat(date)
          } else {
            _label = date.map((item) => utils.format(item, this.getFormat())).join(this._TEXT.join)
          }
        } else if (isUpdateDate) {
          if (utils.typeof(this.labelFormat) === 'function') {
            _label = this.labelFormat(date)
          } else {
            _label = utils.format(date, this.getFormat())
          }
        }

        this.$set(this.picker, 'label', _label)
        this.$set(this.picker, 'value', date)
      } else {
        this.$set(this.picker, 'label', null)
        this.$set(this.picker, 'value', null)
      }
    }
  },
  watch: {
    'value': function (value, oldValue) {
      if (utils.typeof(value) !== utils.typeof(oldValue)) {
        this.updatedValue(value)
      } else {
        if (value && value.toString() !== oldValue.toString()) {
          this.updatedValue(value)
        }
      }
    }
  }
}
</script>

<style lang="less">
@import '../../theme.less';
@root: picker;

.@{root}--wp {
  display: inline-block;
  color: @font-color;

  .ipt--wp {
    vertical-align: middle;
    width: 100%;

    .icon--wp {
      font-size: 15px;
      top: 1px;
    }
  }

  &.@{root}__date .ipt--wp{
    width: 160px;
  }

  &.@{root}__datetime .ipt--wp{
    width: 180px;
  }

  &.@{root}__range .ipt--wp{
    width: 210px;
  }

  &.@{root}__rangetime .ipt--wp{
    width: 340px;
  }
}
</style>

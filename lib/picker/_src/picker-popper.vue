<template>
  <bee-popper :class="['bee-picker-popper', {
    'bee-picker-popper__has-quick-button': quickButtonConfigurations.length && quickBtnsType === 'inner'
  }]"
    :scroll-parent="scrollParent"
    :reference="reference"
    @beforeEnter='beforeEnter'
    @afterEnter='afterEnter'
    @afterLeave='afterLeave'
    v-model='open'
  >
    <div class="bee-picker-popper--body">
      <!-- quick buton -->
      <quick-buttons v-if="quickButtonConfigurations.length && quickBtnsType === 'inner' && pickerType === 'date'"
        :quick-btns="quickButtonConfigurations"
        :quick-btns-type="quickBtnsType"
        :callback="quickCallback"
        :value="value"
      ></quick-buttons>

      <!-- picker date -->
      <picker-date v-if="pickerType === 'date'"
        :type="type"
        :value="value"
        :disabled="disabled"
        :max-days="maxDays"
        :default-time="defaultTime"
        :callback="dateCallback"
      ></picker-date>

      <!-- picker time -->
      <picker-time v-if="pickerType == 'time'"
        :type="type"
        :value="value"
        :disabled='timeDisabled'
        :visible='timeVisible'
        :callback="timeCallback"
      ></picker-time>
    </div>
    <div v-if="/time/i.test(type)" :class="['bee-picker-popper--footer', {
      'bee-picker-popper--footer__disabled': pickerTimeDisabled
    }]">
      <span class="change-to-time" v-show="pickerType === 'date'" @click="pickerTypeSwitch('time')">
        {{$_language("PICKER_SELECT_TIME")}}
      </span>

      <span class="change-to-date" v-show="pickerType === 'time'" @click="pickerTypeSwitch('date')">
        {{$_language("PICKER_SELECT_DATE")}}
      </span>

      <span class="bee-picker--confirm" @click='pickerConfirm'>{{$_language("CONFIRM")}}</span>
    </div>
  </bee-popper>
</template>

<script>
import PickerDate from './picker-date.vue'
import PickerTime from './picker-time.vue'
import QuickButtons from './quick-buttons.vue'
import helpers from '../../utils/helpers'

export default {
  components: {
    PickerDate,
    PickerTime,
    QuickButtons
  },
  data () {
    return {
      open: false,
      pickerType: 'date',
      type: null,
      quickBtnsType: null,
      disabled: null,
      timeDisabled: null,
      timeVisible: null,
      autoChange: null,
      maxDays: null,
      defaultTime: null,
      value: null,
      scrollParent: null,
      reference: null,
      quickButtonConfigurations: [],
      pickerCallback: null,
      format: null
    }
  },
  computed: {
    pickerTimeDisabled () {
      return !this.value || helpers.equal(this.value, []) || helpers.equal(this.value, [null, null])
    }
  },
  mounted () {
    document.body.appendChild(this.$el)

    this.$nextTick(() => {
      this.open = true
    })
  },
  beforeDestroy () {
    if (this._vnode.elm.parentNode) {
      this._vnode.elm.parentNode.removeChild(this._vnode.elm)
    }
  },
  methods: {
    beforeEnter () {},

    afterLeave () {
      this.$destroy()
    },

    pickerTypeSwitch (type) {
      if (this.pickerTimeDisabled) return false

      this.pickerType = type
    },

    quickCallback (data) {
      this.value = helpers.deepCopy(data.value)
      helpers.typeof(this.pickerCallback, 'function') && this.pickerCallback(data)
    },

    dateCallback (value) {
      this.value = value

      helpers.typeof(this.pickerCallback, 'function') && this.pickerCallback({
        value: helpers.deepCopy(value),
        type: 'date'
      })

      if (this.autoChange) {
        setTimeout(() => {
          this.pickerTypeSwitch('time')
        }, 80)
      }
    },

    timeCallback (value) {
      this.value = value

      helpers.typeof(this.pickerCallback, 'function') && this.pickerCallback({
        value: helpers.deepCopy(value),
        type: 'time'
      })
    },

    pickerConfirm () {
      helpers.typeof(this.pickerCallback, 'function') && this.pickerCallback({
        type: 'confirm',
        value: null
      })
    }
  }
}
</script>

<style lang="less">
  @import './picker-popper.less';
</style>

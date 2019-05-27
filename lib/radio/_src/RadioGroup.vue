<template>
  <div class='radio-group--wp'>
    <div :class="['group--item', {
      'group--item__block': block,
      'group--item__disable': radio.disabled
    }]" v-for='(radio, $index) in groups' :key='$index'>
      <bee-radio class="group-item--radio"
        :disabled='radio.disabled'
        :value='value === $index'
        @input='itemSelected($event, $index)'
      >
        {{radio.label}}
      </bee-radio>

      <span class="group-item--desc">{{radio.desc}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeeRadioGroup',
  props: {
    groups: {
      type: Array,
      default: () => []
    },
    block: Boolean,
    value: Number
  },
  data () {
    return {}
  },
  mounted () {
    // if the value can`t used, reset the value.
    if (this.value >= this.groups.length || this.value < 0) {
      this.$emit('input', null)
    }
  },
  methods: {
    itemSelected (value, index) {
      if (value) {
        this.$emit('input', index)
      }
    }
  }
}
</script>

<style lang='less'>
@import '../../theme.less';

.radio-group--wp {
  display: inline-block;

  .group--item {
    display: inline-block;
    white-space: nowrap;

    .group-item--radio {
      padding-right: 4px;
    }

    .group-item--desc {
      padding-right: 15px;
      line-height: @radio-line-height;
    }

    &.group--item__block {
      display: block;

      .group-item--desc {
        display: block;
        padding-left: 24px;
      }
    }

    &.group--item__disable {
      .group-item--desc {
        color: @radio-color-unselected;
      }
    }
  }
}
</style>

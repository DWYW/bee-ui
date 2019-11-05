<template>
  <div class='bee-step'>
    <div class="bee-step--body">
      <div :class="['bee-step--item', {
        'bee-step--item__actived': Number(step) >= index + 1
      }]" v-for="(item, index) in labels" :key='index'
      :style="itemStyle">
        <section class="bee-step--line"></section>

        <section class="bee-step-item--main">
          <bee-icon icon='correct' v-if="Number(step) > index + 1"></bee-icon>
          <template v-else>{{index + 1}}</template>
        </section>

        <p class="bee-step-item--label">
          <template v-if='isString(item)'>{{item}}</template>
          <template v-else>{{item.label}}</template>
        </p>
        <p class="bee-step-item--desc" v-if='item && item.desc'>{{item.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import helpers from '../../utils/helpers'

export default {
  name: 'BeeStep',
  props: {
    labels: {
      type: Array,
      required: true
    },
    step: {
      type: [Number, String],
      default: 1
    }
  },
  computed: {
    itemStyle () {
      return {
        width: `${100 / this.labels.length}%`
      }
    },
    isString () {
      return data => helpers.typeof(data, 'string')
    }
  }
}
</script>

<style lang='less'>
@import './index.less';
</style>

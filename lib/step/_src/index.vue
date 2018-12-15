<template>
  <div class='bee-step--wp'>
    <div class="bee-step--bar">
      <div :class='["bar--item", {
          "bar--item__complated": isCompleted(key + 1),
          "bar--item__current": isCurrent(key + 1)
        }]'
        v-for='(label, key) in labels'
        :key='"bar_" + key'
      >
        <div class='bar-item--rect'></div>
      </div>
    </div>

    <div class="bee-step--body">
      <div :class='["body--item", {
        "body--item__complated": isCompleted(key + 1),
        "body--item__current": isCurrent(key + 1)
      }]'
        v-for='(label, key) in labels'
        :key='"body_" + key'
      >
        <div class='body-item--icon'>{{key + 1}}</div>
        <div class='body-item--label'>{{label}}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BeeStep',
  props: {
    // 每个步骤的说明文字数组
    labels: {
      type: Array,
      required: true
    },

    // 当前所在的步骤位置
    step: {
      type: [Number, String],
      default: 1
    }
  },
  computed: {
    isCompleted () {
      return (key) => {
        return key < (this.step << 0)
      }
    },
    isCurrent () {
      return (key) => {
        return key === (this.step << 0)
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    getItemWidth () {
      return `${100 / this.step.length}%`
    }
  }
}
</script>

<style lang='less'>
@import '../../theme.less';
@root: bee-step;
@bar: bar;
@body: body;

.@{root}--wp {
  position: relative;
  user-select: none;

  .@{root}--bar {
    position: absolute;
    top: (@step-icon-size - @step-bar-height) / 2;
    left: 0;
    height: @step-bar-height;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-around;

    .@{bar}--item {
      width: 100%;
      height: 100%;

      .@{bar}-item--rect {
        background-color: @step-bg;
        width: 100%;
        height: 100%;

      }

      &:first-child .@{bar}-item--rect{
        width: 50%;
        margin-left: 50%;
      }

      &:last-child .@{bar}-item--rect{
        width: 50%;
        margin-right: 50%;
      }
    }
    .@{bar}--item__complated, .@{bar}--item__current {
      .@{bar}-item--rect {
        background-color: @step-completed-bg;
      }
    }
  }

  .@{root}--body {
    display: flex;
    justify-content: space-around;
    position: relative;

    .@{body}--item {
      text-align: center;

      .@{body}-item--icon {
        width: @step-icon-size;
        height: @step-icon-size;
        line-height: @step-icon-size;
        background-color: @step-bg;
        color: @step-color;
        display: inline-block;
        border-radius: 100%;
        text-align: center;
        font-size: 18px;
        overflow: hidden;
        font-weight: bold;
      }

      .@{body}-item--label {
        color: @step-bg;
        line-height: @step-icon-size;
        font-size: 16px;
      }

      &.@{body}--item__complated, &.@{body}--item__current {
        .@{body}-item--icon {
          background-color: @step-completed-bg;
          color: @step-completed-color;
        }
        .@{body}-item--label {
          color: @step-completed-bg;
        }
      }
    }
  }
}
</style>

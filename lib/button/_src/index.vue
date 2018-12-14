<template>
  <button :class='["btn--wp", "btn__" + theme,
    size ? "btn__" + size : null,  {
    "btn__animation": animation
  }]' :disabled='disabled' @click='hanlderClick' ref='btn'>
    <!-- anmation wrapper -->
    <span class="btn--animation" ref='animation' v-if='animation'></span>
    <!-- content wrapper -->
    <span class="btn--content">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'BeeButton',
  props: {
    disabled: {
      type: [Boolean, String],
      default: false
    },
    theme: {
      type: String,
      default: 'default'
    },
    animation: {
      type: Boolean,
      default: false
    },
    size: String
  },
  data () {
    return {

    }
  },
  methods: {
    hanlderClick (evt) {
      if (this.animation) this.addAnimation(evt)

      this.$emit('click', evt)
    },

    addAnimation (evt) {
      const { left, top, width } = this.$refs.btn.getBoundingClientRect()
      const size = Math.max(evt.pageX - left, width - (evt.pageX - left))
      const animationConfig = {
        size: size * 2,
        top: evt.pageY - (document.body.scrollTop || document.documentElement.scrollTop) - top - size,
        left: evt.pageX - (document.body.scrollLeft || document.documentElement.scrollLeft) - left - size
      }
      const child = this.createAnimation(animationConfig)
      this.$refs.animation.insertBefore(child, this.$refs.animation.firstChild)

      window.setTimeout(() => {
        this.$refs.animation.removeChild(child)
      }, 499)
    },

    createAnimation (config) {
      const span = document.createElement('span')
      span.className = 'btn-animation--item'
      span.style.left = `${config.left}px`
      span.style.top = `${config.top}px`
      span.style.width = `${config.size}px`
      span.style.height = `${config.size}px`
      return span
    }
  }
}

</script>

<style lang="less">
@import '../../theme.less';
@root: btn;

.@{root}--wp {
  display: inline-block;
  min-width: @btn-width;
  height: @btn-height;
  line-height: @btn-height - 2;
  border: 0;
  border-radius: @border-radius;
  text-align: center;
  font-size: 14px;
  user-select: none;
  font-weight: normal;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  position: relative;
  border: 1px solid transparent;

  &.@{root}__sm {
    min-width: @btn-sm-width;
    height: @btn-sm-height;
    line-height: @btn-sm-height;
  }

  &.@{root}__lg {
    min-width: @btn-lg-width;
    height: @btn-lg-height;
    line-height: @btn-lg-height;
  }

  .@{root}--animation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .@{root}-animation--item {
      position: absolute;
      display: block;
      border-radius: 100%;
      transform-origin: center;
      animation: btnClick .5s ease;
    }
  }

  .@{root}--content {
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
  }

  // default
  &.@{root}__default {
    background-color: @btn-default-bg;
    color: @btn-default-color;
    border-color: @border-color;
    transition: border 0.15s, color 0.15s;

    &.@{root}__sm {
      line-height: @btn-sm-height - 2;
    }

    &.@{root}__lg {
      line-height: @btn-lg-height - 2;
    }

    &:active {
      color: @btn-default-color-active;
      border-color: @btn-default-border-color-active;
    }

    &.@{root}__animation {
      .@{root}--animation .@{root}-animation--item {
        background-color: @btn-default-animation-bg;
      }

      &:active {
        color: @btn-default-color;
        border-color: @border-color;
        background-color: @btn-default-bg;
      }
    }
  }

  // primary
  &.@{root}__primary {
    background-color: @btn-primary-bg;
    color: @btn-primary-color;
    transition: background 0.15s;

    &:hover {
      background-color: @btn-primary-bg-hover;
    }

    &:active {
      background-color: @btn-primary-bg-active;
    }

    &.@{root}__animation {
      border: none;

      .@{root}--animation .@{root}-animation--item {
        background-color: @btn-primary-animation-bg;
      }

      &:hover {
        background-color: @btn-primary-bg;
      }

      &:active {
        background-color: @btn-primary-bg;
      }
    }
  }

  // success
  &.@{root}__success {
    background-color: @btn-success-bg;
    color: @btn-success-color;
    transition: background 0.15s;

    &:hover {
      background-color: @btn-success-bg-hover;
    }

    &:active {
      background-color: @btn-success-bg-active;
    }

    &.@{root}__animation {
      border: none;

      .@{root}--animation .@{root}-animation--item {
        background-color: @btn-success-animation-bg;
      }

      &:hover {
        background-color: @btn-success-bg;
      }

      &:active {
        background-color: @btn-success-bg;
      }
    }
  }

  // error
  &.@{root}__error {
    background-color: @btn-error-bg;
    color: @btn-error-color;
    transition: background 0.15s;

    &:hover {
      background-color: @btn-error-bg-hover;
    }

    &:active {
      background-color: @btn-error-bg-active;
    }

    &.@{root}__animation {
      border: none;

      .@{root}--animation .@{root}-animation--item {
        background-color: @btn-error-animation-bg;
      }

      &:hover {
        background-color: @btn-error-bg;
      }

      &:active {
        background-color: @btn-error-bg;
      }
    }
  }

  // disabled
  &[disabled] {
    cursor: no-drop;
    border-color: @border-color;
    opacity: .5;

    &.@{root}__default {
      color: @font-tint-color;
      &:active {
        color: @font-tint-color;
        border-color: @border-color;
      }
    }

    &.@{root}__primary, &.@{root}__success, &.@{root}__error {
      background-color: @btn-disabled-bg;

      &:hover {
        background-color: @btn-disabled-bg;
      }

      &:active {
        background-color: @btn-disabled-bg;
      }
    }
  }
}

@keyframes btnClick {
  0% {
    transform: scale(.1);
  }
  100% {
    transform: scale(1.2);
  }
}
</style>

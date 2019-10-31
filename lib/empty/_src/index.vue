<template>
  <div class="bee-empty">
    <div class="bee-empty--icon" :style='style'></div>
    <div class="placeholder">{{placeholder}}</div>
  </div>
</template>

<script>
export default {
  name: 'BeeEmpty',
  props: {
    placeholder: {
      type: String,
      default: function () {
        return this.$_language('DATA_EMPTY')
      }
    },
    size: {
      type: Number,
      default: 64
    }
  },
  computed: {
    style () {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      }
    }
  }
}
</script>

<style lang="less">
@import '../../theme.less';

.bee-empty {
  display: flex;
  overflow: hidden;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px 0;

  .bee-empty--icon {
    flex: 0 1 auto;

    opacity: .7;
    background-image: @empty-image;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .placeholder {
    color: @empty-color_placeholder;

    line-height: 32px;
  }
}
</style>

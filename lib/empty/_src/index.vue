<template>
  <div class="bee--empty">
    <div class="empty--icon" :style='style'></div>
    <div class="empty--placeholder">{{placeholder}}</div>
  </div>
</template>

<script>
export default {
  name: 'BeeEmpty',
  props: {
    placeholder: {
      type: String,
      default: '暂无数据'
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

.bee--empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 20px 0;
  box-sizing: border-box;

  .empty--icon {
    flex: 0 1 auto;
    background-image: @empty-image;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    opacity: .7;
  }
  .empty--placeholder {
    color: #aaaaaa;
    line-height: 32px;
  }
}
</style>

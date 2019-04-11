<template>
  <div :class='["system-header", {
    "fixed": fixed
  }]'>
   <div class="header-content">
      <router-link class='to-home' to='/'></router-link>

      <ul class="header-nav">
        <li class="nav-item">
          <router-link :class='[{
            "actived": /components/.test($route.path)
          }]' to='/components/install'>组件</router-link>
        </li>

        <li class="nav-item github">
          <a href='https://github.com/DWYW/bee-ui' target="_blank"></a>
        </li>
      </ul>
   </div>
  </div>
</template>

<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less">
@import '../style/size.less';

.system-header {
  width: 100%;
  height: @header-height;
  background-color: @header-bg-color;
  position: relative;
  overflow: hidden;

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }

  .header-content {
    max-width: @page-width;
    position: relative;
    margin: 0 auto;
  }

  .to-home {
    width: 140px;
    height: @header-height;
    position: absolute;
    top: 0;
    left: 5px;
    display: block;
    background-image: url(../assets/logo.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .header-nav {
    position: absolute;
    top: (@header-height - @header-nav-height) / 2;
    right: 10px;
    line-height: @header-nav-height;
    font-size: 16px;

    .nav-item {
      float: left;
      margin-right: 20px;

      a {
        color: inherit;
        text-decoration: none;
        display: inline-block;

        &:hover {
          color: @header-nav-color;
        }

        &.actived {
          color: @header-nav-color;
        }
      }

      &:last-child{
        margin-right: 0;
      }
    }
    .github {
      a {
        background-image: url(../assets/github.png);
        background-size: 24px;
        background-repeat: no-repeat;
        background-position: center;
        width: 40px;
        height: @header-nav-height;
      }
    }
  }
}
</style>

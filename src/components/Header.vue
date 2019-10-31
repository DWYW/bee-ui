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
  position: relative;

  overflow: hidden;

  width: 100%;
  height: @header-height;

  background-color: @header-bg-color;
  box-shadow: 0 0 6px rgba(0, 0, 0, .2);

  &.fixed {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
  }

  .header-content {
    position: relative;

    max-width: @page-width;
    margin: 0 auto;
  }

  .to-home {
    position: absolute;
    top: 0;
    left: 5px;

    display: block;

    width: 140px;
    height: @header-height;

    background-image: url(../assets/logo.gif);
    background-repeat: no-repeat;
    background-position: left center;
    background-size: contain;
  }

  .header-nav {
    position: absolute;
    top: (@header-height - @header-nav-height) / 2;
    right: 10px;

    font-size: 16px;
    line-height: @header-nav-height;

    .nav-item {
      float: left;

      margin-right: 20px;

      a {
        display: inline-block;

        text-decoration: none;

        color: inherit;

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
        width: 40px;
        height: @header-nav-height;

        background-image: url(../assets/github.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 24px;
      }
    }
  }
}
</style>

<template>
  <div class='system-nav' ref='nav' :style='{
    "left": left
  }'>
    <ul class="group-wrapper">
      <li class="group-item" v-for='(group, gIdx) in navs' :key='"group-" + gIdx'>
        <p class="group-label">{{group.label}}</p>

        <ul class="nav-wrapper" v-if='group.children'>
          <li class="nav-item"
            v-for='(nav, nIdx) in group.children'
            :key='"nav-" + gIdx + "-" + nIdx'
          >
            <router-link :to='"/components/" + nav.path' active-class="actived">{{nav.label}}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import NAVS from '@/router/components'
import Listener from '@/common/Listener'

export default {
  data () {
    return {
      navs: NAVS,
      left: null
    }
  },
  mounted () {
    this.mountLeft()
    Listener.add(window, 'resize', this.mountLeft)
  },
  beforeDestroy () {
    Listener.remove(window, 'resize', this.mountLeft)
  },
  methods: {
    mountLeft () {
      this.left = `${this.$refs.nav.parentNode.getBoundingClientRect().left + 10}px`
    }
  }
}
</script>

<style lang="less">
@import '../style/size.less';
@import '../style/color.less';

@inner-height: @header-height + 20px;

.system-nav {
  width: @nav-width;
  position: fixed;
  top: @inner-height;
  height: calc(~'100vh - ' @inner-height);

  .group-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;

    .group-item {
      width:  100%;
      margin-bottom: 20px;

      .group-label {
        color: @nav-group-label-color;
        font-weight: bold;
        font-size: 18px;
        line-height: 42px;
      }
    }
  }

  .nav-wrapper {
    width: 100%;
    .nav-item {
      width: 100%;
      a {
        width: 100%;
        display: inline-block;
        line-height: 28px;
        color: @nav-item-color;
        text-decoration: none;
        cursor: pointer;

        &.actived {
          color: @nav-item-actived-color;
        }
      }
    }
  }
}
</style>

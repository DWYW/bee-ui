<template>
  <div class='system-nav' ref='nav' :style='{
    "left": left
  }'>
    <bee-scrollbar show-type='hover'>
      <ul class="groupper">
        <li class="bee-group-item" v-for='(group, gIdx) in navs' :key='"group-" + gIdx'>
          <p class="group-label">{{group.label}}</p>

          <ul class="navper" v-if='group.children'>
            <li class="nav-item"
              v-for='(nav, nIdx) in group.children'
              :key='"nav-" + gIdx + "-" + nIdx'
            >
              <router-link :to='"/components/" + nav.path' active-class="actived">{{nav.label}}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </bee-scrollbar>
  </div>
</template>

<script>
import NAVS from '@/router/components'

export default {
  props: {
    left: null
  },
  data () {
    return {
      navs: NAVS
    }
  }
}
</script>

<style lang="less">
@import '../style/size.less';
@import '../style/color.less';

@inner-height: @header-height + 20px;

.system-nav {
  position: absolute;
  z-index: 9;
  top: 0;
  left: 0;

  width: @nav-width;
  height: calc(~'100vh - ' @inner-height);

  .groupper {
    overflow: hidden;

    width: 100%;

    .bee-group-item {
      width:  100%;
      margin-bottom: 20px;

      .group-label {
        color: @nav-group-label-color;

        font-size: 18px;
        font-weight: bold;
        line-height: 42px;
      }
    }
  }

  .navper {
    width: 100%;
    .nav-item {
      width: 100%;
      a {
        display: inline-block;

        width: 100%;

        cursor: pointer;
        text-decoration: none;

        color: @nav-item-color;

        line-height: 28px;

        &.actived {
          color: @nav-item-actived-color;
        }
      }
    }
  }
}
</style>

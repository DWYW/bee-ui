<template>
  <span class="bee-breadcrumb">
    <template v-for="(crumb, key) in crumbs">
      <span :key="'breadcrumb_' + key" v-if="crumb"
        :class="['breadcrumb--item', {
          'breadcrumb--item__active': key === (crumbs.length - 1)
        }]"
      >
        <router-link v-if="key + 1 < crumbs.length && crumb.route"
          :to="crumb.route" >
          {{crumb.label}}
        </router-link>

        <span v-else> {{crumb.label}} </span>

        <span v-if="key + 1 < crumbs.length">></span>
      </span>
    </template>

    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'BeeBreadcrumb',
  props: {
    crumbs: [Array]
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">
@import '../../theme.less';

.bee-breadcrumb {
  width: 100%;

  .breadcrumb--item {
    vertical-align: middle;

    color: @font-tint-color;

    font-size: 14px;

    a {
      text-decoration: none;

      color: @font-tint-color;

      &:link {
        text-decoration: none;

        color: @font-tint-color;
      }
    }

    &.breadcrumb--item__active {
      color: @primary-color;

      font-size: 16px;
    }
  }

}
</style>

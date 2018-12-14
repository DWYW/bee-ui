<template>
  <div class='bee-bread-crumb--wp'>
    <span  :class='["crumb--item", {
        "crumb--item__actived": $index === (crumbs.length - 1)
      }]'
      v-for='(crumb, $index) in crumbs'
      :key='"crumb_" + $index'
      v-if='crumb.route !== undefined'
    >
      <router-link :to='crumb.route' v-if='$index !== (crumbs.length - 1) && crumb.route'>{{crumb.label}}</router-link>
      <span v-else>{{crumb.label}}</span>
      <span v-if='$index !== (crumbs.length - 1)'>></span>
    </span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BeeBreadCrumb',
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
@root: bee-bread-crumb;

.@{root}--wp {
  width: 100%;
  padding: 20px 0 15px;
  border-bottom: 1px solid @border-color;
  margin-bottom: 20px;

  .crumb--item {
    font-size: 14px;
    vertical-align: middle;
    color: @font-tint-color;

    a {
      color: @font-tint-color;
      text-decoration: none;

      &:link {
        color: @font-tint-color;
        text-decoration: none;
      }
    }

    &.crumb--item__actived {
      color: @primary-color;
      font-size: 16px;
    }
  }

}
</style>

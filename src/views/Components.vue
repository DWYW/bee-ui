<template>
  <div class="components-page">
    <Header></Header>
    <Nav></Nav>

    <div class="page-wrapper">
      <router-view class="content-wrapper md"/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'

export default {
  components: {
    Header,
    Nav
  }
}
</script>

<style lang="less">
@import '../style/size.less';
.components-page {
  max-width: @page-width;
  margin: 0 auto;
  padding-left: 10px;
  padding-bottom: 50px;

  .page-wrapper{
    padding-left: @nav-width;
    padding-top: @header-height;
    box-sizing: border-box;

    .content-wrapper {
      padding: 0 10px;
      min-height: calc(~'100vh - 110px');
    }
  }
}
</style>

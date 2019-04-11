<template>
  <div class="components-page">
    <Header></Header>

    <div class="page-body">
      <Nav :left='left'></Nav>
      <bee-scroll>
        <div class="page-wraper" ref='PW'>
          <router-view class="content-wrapper md"/>
        </div>
      </bee-scroll>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'
import Listener from '@/common/Listener'

export default {
  components: {
    Header,
    Nav
  },
  data () {
    return {
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
      this.left = `${this.$refs.PW.getBoundingClientRect().left + 10}px`
    }
  }
}
</script>

<style lang="less">
@import '../style/size.less';
.components-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-top: @header-height;
  box-sizing: border-box;

  .page-body {
    width: 100%;
    height: calc(~'100vh - '@header-height);
    position: relative;

    .page-wraper {
      position: relative;
      max-width: @page-width;
      width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
      padding-left: @nav-width + 20px;
      padding-bottom: 50px;
      overflow: hidden;
    }
  }
  // margin: 0 auto;
  // padding-left: 10px;
  // padding-bottom: 50px;

  // .page-wrapper{
  //   padding-left: @nav-width;
  //   padding-top: @header-height;
  //   box-sizing: border-box;
  //   max-width: @page-width;

  //   .content-wrapper {
  //     padding: 0 10px;
  //     min-height: calc(~'100vh - 110px');
  //   }
  // }
}
</style>

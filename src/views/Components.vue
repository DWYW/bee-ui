<template>
  <div class="components-page">
    <Header></Header>

    <div class="page-body">
      <Nav :left='left'></Nav>
      <bee-scrollbar ref='scrollbar'>
        <div class="pageer" ref='PW'>
          <router-view class="contentper md"/>

          <iframe ref='reference' src="about:blank" frameborder="0" class='resize-reference'></iframe>
        </div>
      </bee-scrollbar>
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
      left: null,
      scrollDom: null
    }
  },
  mounted () {
    this.mountLeft()
    Listener.add(window, 'resize', this.mountLeft)

    this.$refs.reference.contentWindow.onresize = () => {
      this.$refs.scrollbar.updateSizeConfig()
    }
  },
  beforeDestroy () {
    Listener.remove(window, 'resize', this.mountLeft)
  },
  methods: {
    mountLeft () {
      this.left = `${this.$refs.PW.getBoundingClientRect().left + 10}px`
    }
  },
  watch: {
    '$route': function () {
      this.$nextTick(() => {
        // this.$refs.BeeScroll.init()
      })
    }
  }
}
</script>

<style lang="less">
@import '../style/size.less';
.components-page {
  overflow: hidden;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: @header-height;

  .page-body {
    position: relative;

    width: 100%;
    height: calc(~'100vh - '@header-height);

    .pageer {
      position: relative;

      overflow: hidden;

      box-sizing: border-box;
      width: 100%;
      max-width: @page-width;
      margin: 0 auto;
      padding-bottom: 50px;
      padding-left: @nav-width + 20px;
    }
  }
}

.resize-reference {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: 0;
}
</style>

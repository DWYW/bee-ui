<template>
  <transition name='loading'
    @before-enter='beforeEnter'
    @after-leave='afterLeave'
  >
    <section  v-if='open' :class="['bee-loading', {
      'bee-loading__block': block
    }]" :style="{
      'transition-delay': !open ? delay + 'ms' : null
    }">
      <section class="bee-loading--body">
        <component class="bee-loading--animation" :is="loading"></component>
        <span class="bee-loading--placeholder"> {{text}}</span>
      </section>
    </section>
  </transition>
</template>

<script>
import MainLoading from './main-loading.vue'
import PieLoading from './pie-loading.vue'
import UndulateLoading from './undulate-loading.vue'

export default {
  components: {
    MainLoading,
    PieLoading,
    UndulateLoading
  },
  data () {
    return {
      open: false,
      parent: document.body,
      type: 'main',
      block: true,
      text: this.$_language('LOADING_PLACEHOLDER'),
      delay: 400
    }
  },
  computed: {
    loading () {
      const components = {
        'main': 'MainLoading',
        'pie': 'PieLoading',
        'undulate': 'UndulateLoading'
      }

      return components[this.type]
    }
  },
  mounted () {
    this.parent && this.parent.appendChild(this.$el)
  },
  destroyed () {
    this._vnode.elm.parentNode && this._vnode.elm.parentNode.removeChild(this._vnode.elm)
  },
  methods: {
    show () {
      this.open = true
      return this
    },
    hide () {
      this.open = false
      return this
    },
    beforeEnter () {
      this.parent.classList.add('bee-loading--parent')
    },
    afterLeave () {
      this.$destroy()
      this.parent.classList.remove('bee-loading--parent')
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

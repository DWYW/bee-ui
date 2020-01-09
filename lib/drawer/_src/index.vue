<template>
  <section :class="[
    'bee-drawer', 'position_' + position
  ]" v-if='visible'>
    <div class="bee-drawer-mask" @click='hide'></div>

    <transition name='bee-drawer'
      @before-enter='beforeEnter'
      @before-leave='beforeLeave'
      @after-enter='afterEnter'
      @after-leave='afterLeave'
    >
      <div class="bee-drawer-body" v-show='show' :style='panelStyle'>
        <slot></slot>
      </div>
    </transition>
  </section>
</template>

<script>
import helpers from '../../utils/helpers'

export default {
  name: 'BeeDrawer',
  props: {
    position: {
      type: String,
      validator: (value) => {
        return /^(top|bottom|left|right)$/.test(value)
      },
      default: 'right'
    },
    width: String,
    height: String,
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      show: false
    }
  },
  computed: {
    panelStyle () {
      return helpers.clearEmpty({
        width: this.width,
        height: this.height
      })
    }
  },
  mounted () {
    this.updateSwitch()
  },
  methods: {
    updateSwitch () {
      const value = this.value

      if (value) {
        this.visible = value

        setTimeout(() => {
          this.show = value
        })
      } else {
        this.show = value
      }
    },

    beforeEnter () {
      this.$listeners.beforeOpen && this.$listeners.beforeOpen()
    },

    afterEnter () {
      this.$listeners.opened && this.$listeners.opened()
    },

    beforeLeave () {
      this.$listeners.beforeClose && this.$listeners.beforeClose()
    },

    afterLeave () {
      this.visible = false
      this.$listeners.input && this.$listeners.input(false)
      this.$listeners.closed && this.$listeners.closed()
    },

    hide () {
      this.show = false
    }
  },
  watch: {
    value: function (value) {
      this.updateSwitch()
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

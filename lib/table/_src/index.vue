<template>
  <section class="bee-table bee-table__scroll-start" :style="{
    'height': size.tableMaxHeight + 'px'
  }">
    <!-- table main -->
    <bee-scrollbar
      ref="scrollbar"
      :scroll-element.sync='scorllElement'
      @scroll="onScroll"
      @resize='onResize'
    >
      <table-main :style="{
        'min-width': size.tableMinWidth + 'px'
      }"
        :columns-config="columnsConfig"
        :data="data"
        :placeholder="placeholder"
        :row-class-name="rowClassName"
        :cell-class-name='cellClassName'
        :selections="selections"
        :slots="$slots.default"
        :summary="summary"
        :summary-text="summaryText"
        :summary-method="summaryMethod"
        @selection='onSelection'
      ></table-main>
    </bee-scrollbar>

    <!-- table header -->
    <section class="bee-table--header" :style="{
      'height': size.tableHeaderHeight + 'px'
    }" v-if="visible.header" ref="header">
      <table-main :style="{
        'min-width': size.tableMinWidth + 'px'
      }"
        :columns-config="columnsConfig"
        :data="data"
        :placeholder="placeholder"
        :cell-class-name='cellClassName'
        :selections="selections"
        :slots="$slots.default"
        @selection='onSelection'
      ></table-main>
    </section>

    <!-- table footer -->
    <section class="bee-table--footer" :style="{
      'height': size.tableFooterHeight + 'px'
    }" v-if="visible.footer" ref="footer">
      <table-main :style="{
        'min-width': size.tableMinWidth + 'px',
        'margin-top': size.tableFooterHeight + 'px'
      }"
        :columns-config="columnsConfig"
        :data="data"
        :placeholder="placeholder"
        :cell-class-name='cellClassName'
        :slots="$slots.default"
        :summary="summary"
        :summary-text="summaryText"
        :summary-method="summaryMethod"
      ></table-main>
    </section>

    <!-- table fixed left -->
    <section class="bee-table--left" :style="{
      'width': size.tableLeftWidth + 'px',
      'height': size.tableDrawerHeight + 'px'
    }" v-if="visible.left">
      <div class="bee-table--drawer" ref="left">
        <table-main :style="{
          'min-width': size.tableMinWidth + 'px'
        }"

          :columns-config="columnsConfig"
          :data="data"
          :placeholder="placeholder"
          :row-class-name="rowClassName"
          :cell-class-name='cellClassName'
          :selections="selections"
          :slots="$slots.default"
          :summary="summary"
          :summary-text="summaryText"
          :summary-method="summaryMethod"
          @selection='onSelection'
        ></table-main>
      </div>

      <!-- table header -->
      <section class="bee-table--header" :style="{
        'height': size.tableHeaderHeight + 'px'
      }" v-if="visible.header">
        <table-main :style="{
          'min-width': size.tableMinWidth + 'px'
        }"
          :columns-config="columnsConfig"
          :data="data"
          :placeholder="placeholder"
          :cell-class-name='cellClassName'
          :selections="selections"
          :slots="$slots.default"
          @selection='onSelection'
        ></table-main>
      </section>

      <!-- table footer -->
      <section class="bee-table--footer" :style="{
        'min-width': size.tableMinWidth + 'px',
        'height': size.tableFooterHeight + 'px'
      }" v-if="visible.footer">
        <table-main :style="{
          'margin-top': size.tableFooterHeight + 'px'
        }"
          :columns-config="columnsConfig"
          :data="data"
          :placeholder="placeholder"
          :cell-class-name='cellClassName'
          :slots="$slots.default"
          :summary="summary"
          :summary-text="summaryText"
          :summary-method="summaryMethod"
        ></table-main>
      </section>
    </section>

    <!-- table fixed right -->
    <section class="bee-table--right" :style="{
      'width': size.tableRightWidth + 'px',
      'height': size.tableDrawerHeight + 'px'
    }" v-if="visible.right">
      <div class="bee-table--drawer" ref="right">
        <table-main :style="{
          'margin-left': size.tableRightWidth - 1 + 'px',
          'min-width': size.tableMinWidth + 'px'
        }"

          :columns-config="columnsConfig"
          :data="data"
          :placeholder="placeholder"
          :cell-class-name='cellClassName'
          :row-class-name="rowClassName"
          :selections="selections"
          :slots="$slots.default"
          :summary="summary"
          :summary-text="summaryText"
          :summary-method="summaryMethod"
          @selection='onSelection'
        ></table-main>
      </div>

      <!-- table header -->
      <section class="bee-table--header" :style="{
        'height': size.tableHeaderHeight + 'px'
      }" v-if="visible.header">
        <table-main :style="{
          'margin-left': size.tableRightWidth - 1 + 'px',
          'min-width': size.tableMinWidth + 'px'
        }"
          :columns-config="columnsConfig"
          :data="data"
          :placeholder="placeholder"
          :cell-class-name='cellClassName'
          :selections="selections"
          :slots="$slots.default"
          @selection='onSelection'
        ></table-main>
      </section>

      <!-- table footer -->
      <section class="bee-table--footer" :style="{
        'min-width': size.tableMinWidth + 'px',
        'height': size.tableFooterHeight + 'px'
      }" v-if="visible.footer">
        <table-main :style="{
          'margin-left': size.tableRightWidth - 1 + 'px',
          'margin-top': size.tableFooterHeight + 'px'
        }"
          :columns-config="columnsConfig"
          :data="data"
          :placeholder="placeholder"
          :cell-class-name='cellClassName'
          :slots="$slots.default"
          :summary="summary"
          :summary-text="summaryText"
          :summary-method="summaryMethod"
        ></table-main>
      </section>
    </section>
  </section>
</template>

<script>
import TableMain from './table'
import getComponentProps from '../../utils/getComponentProps'
import helpers from '../../utils/helpers'

export default {
  name: 'BeeTable',
  components: {
    TableMain
  },
  props: {
    maxHeight: Number,
    data: {
      type: Array,
      required: true
    },
    placeholder: String,
    resetScroll: {
      type: Boolean,
      default: true
    },
    rowClassName: Function,
    cellClassName: Function,
    summary: {
      type: Boolean,
      default: false
    },
    summaryMethod: Function,
    summaryText: {
      type: String,
      default: '合计'
    }
  },
  data () {
    return {
      selections: [],
      columnsConfig: null,
      size: {
        tableMinWidth: null,
        tableMaxHeight: null,
        tableDrawerHeight: null,
        tableLeftWidth: null,
        tableRightWidth: null,
        tableHeaderHeight: null,
        tableFooterHeight: null
      },
      visible: {
        header: false,
        footer: false,
        left: false,
        right: false
      },
      scorllElement: null
    }
  },
  created () {
    this.updateTableConfig()
  },
  mounted () {
    this.$nextTick(() => {
      this.onResize()
    })
  },
  methods: {
    /**
     * Update the configurations of table.
     * @returns {Object}
     */
    updateTableConfig () {
      if (!this.$slots.default) return []

      let leftColumnsConfig = []
      let middleColumnsConfig = []
      let rightColumnsConfig = []

      let leftWidth = 0
      let middleWidth = 0
      let rightWidth = 0

      this.$slots.default.forEach((vNode, index) => {
        if (vNode.componentOptions && vNode.componentOptions.tag === 'bee-table-column') {
          const _config = Object.assign({
            slotIndex: index
          }, getComponentProps(vNode))

          const _width = parseInt(_config.width)

          switch (_config.fixed) {
            case 'left':
              leftWidth += _width
              leftColumnsConfig.push(_config)
              break
            case 'right':
              rightWidth += _width
              rightColumnsConfig.push(_config)
              break
            default:
              middleWidth += _width
              middleColumnsConfig.push(_config)
          }
        }
      })

      this.columnsConfig = [...leftColumnsConfig, ...middleColumnsConfig, ...rightColumnsConfig]
      this.size.tableMinWidth = leftWidth + middleWidth + rightWidth
      this.size.tableLeftWidth = leftWidth
      this.size.tableRightWidth = rightWidth
    },

    updateTableSize () {
      const table = this.$el.querySelector('table')

      this.size.tableHeaderHeight = table.querySelector('thead').offsetHeight + 1

      const borderWidth = {
        top: parseInt(helpers.getCss(this.$el, 'border-top-width')),
        bottom: parseInt(helpers.getCss(this.$el, 'border-bottom-width'))
      }

      let heights = [table.offsetHeight + borderWidth.top + borderWidth.bottom]

      if (this.maxHeight) {
        heights.push(this.maxHeight)
      }

      if (this.$el.parentNode) {
        heights.push(this.$el.parentNode.clientHeight)
      }

      this.size.tableMaxHeight = Math.min(...heights)

      // await dom update, prevent get the value that before update.
      this.$nextTick(() => {
        this.size.tableDrawerHeight = this.$el.clientHeight
      })

      if (table.querySelector('tfoot')) {
        this.size.tableFooterHeight = table.querySelector('tfoot').offsetHeight + 1
      }
    },

    updateVisible () {
      const table = this.$el.querySelector('table')

      this.visible.header = this.size.tableMaxHeight < table.offsetHeight
      this.visible.footer = this.summary && this.size.tableMaxHeight < table.offsetHeight
      this.visible.left = this.data.length > 0 && this.$el.clientWidth < table.offsetWidth && this.size.tableLeftWidth > 1
      this.visible.right = this.data.length > 0 && this.$el.clientWidth < table.offsetWidth && this.size.tableRightWidth > 1
    },

    onScroll (e) {
      e.preventDefault()

      const { header, footer, left, right } = this.$refs
      const _target = e.target

      if (header) {
        header.scrollLeft = _target.scrollLeft
      }

      if (footer) {
        footer.scrollLeft = _target.scrollLeft
      }

      if (left) {
        left.scrollTop = _target.scrollTop
      }

      if (right) {
        right.scrollTop = _target.scrollTop
      }

      const _classList = this.$el.classList

      if (_target.scrollLeft === 0) {
        _classList.add('bee-table__scroll-start')
        _classList.remove('bee-table__scroll-end')
      } else if (_target.scrollLeft + _target.clientWidth === _target.scrollWidth) {
        _classList.remove('bee-table__scroll-start')
        _classList.add('bee-table__scroll-end')
      } else {
        _classList.contains('bee-table__scroll-start') && _classList.remove('bee-table__scroll-start')
        _classList.contains('bee-table__scroll-end') && _classList.remove('bee-table__scroll-end')
      }
    },

    onResize () {
      this.updateTableSize()
      this.updateVisible()

      setTimeout(() => {
        this.$refs.scrollbar.updateSizeConfig()
      }, 0)
    },

    onSelection (data) {
      // If the item be selected.
      if (data.type === 'item') {
        const _index = this.selections.findIndex(item => helpers.equal(item, data.value))

        if (_index > -1) {
          this.selections.splice(_index, 1)
        } else {
          this.selections.push(data.value)
        }
      }

      // If toggle all.
      if (data.type === 'all') {
        this.data.forEach((item) => {
          const _index = this.selections.findIndex(_item => helpers.equal(_item, item))

          if (!data.value && _index < 0) {
            this.selections.push(item)
            return
          }

          if (data.value && _index > -1) {
            this.selections.splice(_index, 1)
          }
        })
      }

      this.$listeners.selection && this.$listeners.selection(this.selections)
    }
  },
  watch: {
    'data': function () {
      this.updateTableConfig()

      if (this.resetScroll) {
        this.scorllElement.scrollTop = 0
        this.scorllElement.scrollLeft = 0
      }

      this.$nextTick(() => {
        this.onResize()
      })
    },
    'maxHeight': function (value, oldValue) {
      if (value !== oldValue) {
        this.$nextTick(() => {
          this.onResize()
        })
      }
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

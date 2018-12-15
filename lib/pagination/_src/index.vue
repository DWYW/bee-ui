<template>
  <div class="bee-pagination--wp" v-if='pageTotal'>
    <bee-button class="bee-pagination--btn bee-pagination--btn__prev"
      :disabled='prevDisabled'
      @click='prev'
    >上一页</bee-button>

    <bee-button :class='["bee-pagination--btn", {
        "bee-pagination--btn__more": !item,
        "bee-pagination--btn__actived": page === item
      }]'
      :disabled='pageTotal === 1'
      v-for='(item, key) in btns'
      :key='"btn" + key'
      @click='specifyPage(item)'
    >
      {{item || '...'}}
    </bee-button>

    <bee-button class="bee-pagination--btn bee-pagination--btn__next"
      :disabled='nextDisabled'
      @click='next'
    >下一页</bee-button>

    <span class="bee-pagination--total" v-if='total && totalVisible'>共 <span>{{total}}</span> 条</span>

    <span class="bee-pagination--quick" v-if='pageTotal > 1'>
      <bee-input class='quick--ipt'
        placeholder='页数'
        v-model='insert'
        :enter-event='confirm'
        :reg='insertReg'
      ></bee-input>

      <bee-button class='quick--btn' theme='primary' @click='confirm'>确定</bee-button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'BeePagination',
  props: {
    page: {
      type: Number,
      default: 1
    },
    pageTotal: Number,
    total: Number,
    totalVisible: {
      type: Boolean,
      default: true
    },
    maxlength: {
      type: Number,
      validator: function (value) {
        return value % 2 === 1 && value >= 3
      },
      default: 5
    }
  },
  data () {
    return {
      insert: null
    }
  },
  computed: {
    btns () {
      if (!this.pageTotal) return null

      const pageTotal = this.pageTotal
      const page = this.page
      const maxlength = this.maxlength

      if (pageTotal < maxlength + 2) {
        return this.range(1, pageTotal)
      } else {
        const splitNum = Math.floor(maxlength / 2)

        if (page < maxlength) {
          return this.range(1, maxlength).concat([null, pageTotal])
        } else if (page >= pageTotal - splitNum) {
          return [1, null].concat(this.range(pageTotal - maxlength, pageTotal))
        } else {
          return [].concat([1, null], this.range(page - splitNum, page + splitNum), [null, pageTotal])
        }
      }
    },
    prevDisabled () {
      return this.page <= 1
    },
    nextDisabled () {
      return this.page >= this.pageTotal
    },
    insertReg () {
      return (page) => {
        if (page) {
          page = page << 0
          return page > 0 && page <= this.pageTotal ? page : this.insert
        } else {
          return page
        }
      }
    }
  },
  methods: {
    range (start, end) {
      let _range = []

      for (let i = start; i <= end; i++) {
        _range.push(i)
      }

      return _range
    },

    prev () {
      this.specifyPage(this.page - 1)
    },

    next () {
      this.specifyPage(this.page + 1)
    },

    specifyPage (page) {
      if (!page) return false

      this.$emit('change', page)
    },

    confirm () {
      if (this.insert) {
        this.specifyPage(this.insert << 0)
      }
    }
  }
}
</script>

<style lang="less">
@import '../../theme.less';
@root: bee-pagination;

.@{root}--wp {
  width: 100%;
  user-select: none;
  .@{root}--btn {
    min-width: 40px;
    margin-right: 5px;
    height: @pagination-btn-height;
    line-height: @pagination-btn-height - 2px;
    vertical-align: middle;
    color: @font-tint-color;

    &.@{root}--btn__more {
      border-color: transparent;
      cursor: default !important;

      &:active {
        color: @font-color;
        border-color: transparent;
      }
    }

    &.@{root}--btn__actived {
      color: @primary-color;
      border-color: @primary-color;
    }

    &[disabled] {
      background-color: @pagination-btn-disabled-color !important;
      border-color: @pagination-btn-disabled-color !important;

      &.@{root}--btn__actived, &:active {
        border-color: @pagination-btn-disabled-color !important;
        color: @font-tint-color !important;
      }
    }
  }

  .@{root}--total {
    color: @font-tint-color;
    font-size: 12px;
    vertical-align: middle;
    margin: 0 10px;

    > span {
      color: @primary-color;
    }
  }
  .@{root}--quick {
    vertical-align: middle;
    display: inline-block;

    .quick--ipt, .quick--btn {
      vertical-align: bottom;
    }

    .quick--ipt {
      width: 60px;
      margin-right: 6px;
      font-size: 14px;

      input {
        color: @font-tint-color;
        text-align: center;
        height: @pagination-btn-height;
        line-height: @pagination-btn-height;

      }
    }

    .quick--btn {
      width: 60px;
      min-width: 60px;
      height: @pagination-btn-height;
      line-height: @pagination-btn-height - 2px;
    }
  }
}
</style>

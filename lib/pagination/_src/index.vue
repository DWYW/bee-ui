<template>
  <div class="bee-pagination" v-if="pageTotal">
    <bee-button class="bee-pagination--button bee-pagination--button__prev"
      :disabled="prevDisabled"
      @click="prev"
    >{{$_language("PREV_PAGE")}}</bee-button>

    <template v-for="(item, key) in pages">

      <bee-button v-if="item" :key="'button' + key"
        :class="['bee-pagination--button', {
          'bee-pagination--button__actived': item === page && pageTotal !== 1
        }]"
        :disabled="pageTotal === 1"
        @click="specifyPage(item)"
      >
        {{item}}
      </bee-button>

      <span v-else :key="'button' + key"
        class="bee-pagination--button__more"
      >...</span>
    </template>

    <bee-button class="bee-pagination--button bee-pagination--button__next"
      :disabled="nextDisabled"
      @click="next"
    >{{$_language("NEXT_PAGE")}}</bee-button>

    <span class="bee-pagination--total" v-if="total && totalVisible">
      {{$_language("PAGE_COUNT")}} <span>{{total}}</span> {{$_language("PAGE_UNIT")}}
    </span>

    <span class="bee-pagination--quick" v-if="pageTotal > 1">
      <bee-input class="page--input"
        :placeholder="$_language('PAGE_PLACEHOLDER')"
        :reg="insertReg"
        @enter="confirm"
        v-model="pageInsert"
      ></bee-input>

      <bee-button class="quick--button" theme="primary" @click="confirm">{{$_language("CONFIRM")}}</bee-button>
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
      pageInsert: null
    }
  },
  computed: {
    pages () {
      if (!this.pageTotal) return

      const { pageTotal, page, maxlength } = this

      if (pageTotal < maxlength + 2) return this.pageRange(1, pageTotal)

      if (page < maxlength) return this.pageRange(1, maxlength).concat([null, pageTotal])

      const split = Math.floor(maxlength / 2)

      if (page >= pageTotal - split) return [1, null].concat(this.pageRange(pageTotal - maxlength, pageTotal))

      return [].concat([1, null], this.pageRange(page - split, page + split), [null, pageTotal])
    },
    prevDisabled () {
      return this.page <= 1
    },
    nextDisabled () {
      return this.page >= this.pageTotal
    },
    insertReg () {
      return (page) => {
        page = Number(page)

        if (!page) return ''

        if (page <= 0 || page > this.pageTotal) return this.pageInsert

        return page
      }
    }
  },
  methods: {
    pageRange (start, end) {
      let _range = []

      while (start <= end) {
        _range.push(start++)
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
      if (!page || page === this.page) return false

      this.$listeners.change && this.$listeners.change(page)
    },

    confirm () {
      const page = Number(this.pageInsert)
      page && this.specifyPage(page)
    }
  }
}
</script>

<style lang="less">
  @import './index.less';
</style>

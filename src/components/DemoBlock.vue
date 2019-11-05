<template>
  <div class="demo-block">
    <div class="demo-block-source">
      <slot name="source"></slot>
      <span class="demo-block-code-icon"
        v-if="!$slots.default"
        @click="showCode=!showCode">
          <span v-if='!showCode'>查看代码</span>
          <span v-else>收起代码</span>
        </span>
    </div>
    <div class="demo-block-meta"
      v-if="$slots.default">
      <slot></slot>
      <span v-if="$slots.default"
        class="demo-block-code-icon"
        @click="showCode=!showCode">
          <span v-if='!showCode'>查看代码</span>
          <span v-else>收起代码</span>
      </span>
    </div>
    <div class="demo-block-code"
      v-show="showCode">
      <slot name="highlight"></slot>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'DemoBlock',
  data () {
    return {
      showCode: false
    }
  }
}
</script>
<style lang='less'>
.demo-block {
  position: relative;

  display: inline-block;

  box-sizing: border-box;
  width: 100%;
  margin: 0 0 16px;

  -webkit-transition: all 0.2s;
  transition: all 0.2s;

  border: 1px solid #ebedf0;
  border-radius: 2px;
  border-radius: 2px;

  pre {
    border: none !important;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .demo-block-code-icon {
    position: absolute;
    right: 16px;
    bottom: 6px;

    height: 18px;

    cursor: pointer;
    user-select: none;
    text-align: center;

    color: #888888;

    line-height: 18px;

    img {
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      max-width: 100%;
      margin: 0;

      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-transition: all 0.4s;
      transition: all 0.4s;
      vertical-align: baseline;

      -webkit-box-shadow: none;
      box-shadow: none;
    }
  }

  .demo-block-source {
    position: relative;

    margin-bottom: -1px;
    padding: 20px 24px 30px;

    color: #444;
    border-bottom: 1px solid #ebedf0;
  }
  .demo-block-meta {
    position: relative;

    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: -1px;
    padding: 12px 50px 12px 20px;

    -webkit-transition: background-color 0.4s;
    transition: background-color 0.4s;

    color: #444;
    border-bottom: 1px dashed #ebedf0;
    border-radius: 0 0 2px 2px;
    border-radius: 0;

    font-size: 14px;
    font-size: 14px;
    line-height: 2;
  }

  .demo-block-meta {
    position: relative;

    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: -1px;
    padding: 12px 50px 12px 20px;

    -webkit-transition: background-color 0.4s;
    transition: background-color 0.4s;

    color: #444;
    border-bottom: 1px dashed #ebedf0;
    border-radius: 0 0 2px 2px;
    border-radius: 0;

    font-size: 14px;
    font-size: 14px;
    line-height: 2;
  }

  .demo-block-meta {
    position: relative;

    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: -1px;
    padding: 12px 50px 12px 20px;

    -webkit-transition: background-color 0.4s;
    transition: background-color 0.4s;

    color: #444;
    border-bottom: 1px dashed #ebedf0;
    border-radius: 0 0 2px 2px;
    border-radius: 0;

    font-size: 14px;
    font-size: 14px;
    line-height: 2;
  }

  .demo-block-meta {
    position: relative;

    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: -1px;
    padding: 12px 50px 12px 20px;

    -webkit-transition: background-color 0.4s;
    transition: background-color 0.4s;

    color: #444;
    border-bottom: 1px dashed #ebedf0;
    border-radius: 0 0 2px 2px;
    border-radius: 0;

    font-size: 14px;
    font-size: 14px;
    line-height: 2;
  }

  .demo-block-meta {
    position: relative;

    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: -1px;
    padding: 12px 50px 12px 20px;

    -webkit-transition: background-color 0.4s;
    transition: background-color 0.4s;

    color: #444;
    border-bottom: 1px dashed #ebedf0;
    border-radius: 0 0 2px 2px;
    border-radius: 0;

    font-size: 14px;
    font-size: 14px;
    line-height: 2;

    code {
      display: inline-block;

      height: 18px;
      margin: 0 4px;
      padding: 3px 7px;

      color: #444;
      border-radius: 3px;
      background-color: #e6effb;

      font-family: Menlo, Monaco, Consolas, Courier, monospace;
      font-size: 14px;
      line-height: 18px;
    }
  }

  .demo-block-code {
    box-sizing: border-box;
    padding: 16px 32px;

    background-color: #f7f7f7;

    font-size: 0;

    code {
      display: block;
      overflow: auto hidden;

      width: 100%;

      border: none;
      background-color: #f7f7f7;

      font-family: Consolas, Menlo, Courier, monospace;
      font-size: 14px;
    }
  }

  .demo-block-code pre {
    margin: 0;
    padding: 0;
  }
}
.sh-checkbox {
  position: relative;

  display: inline-block;

  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  color: #444;

  font-size: 14px;
  font-weight: 500;
}
</style>

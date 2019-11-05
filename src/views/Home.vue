<template>
  <div class="home">
    <div class="home--panel">
      <div style="position: relative;">
        <img src="../assets/logo.gif" alt="" class="logo">

        <div class='dependencies'>vue 2.4.0  &nbsp;&nbsp;&nbsp;&nbsp; less 2.3.0</div>

        <div class="home--btns">
          <router-link to='/components/install'>
            <span>开始使用</span>
          </router-link>
          <a href='https://github.com/DWYW/bee-ui' target="_blank">
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.home {
  width: 100%;
  height: 100vh;
  .home--panel {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 400px;

    transform: translate3d(-50%, -100%, 0);
    text-align: center;

    .logo {
      width: 400px;

      path {
        fill: #174a6e;
      }
    }

    .dependencies {
      position: absolute;
      top: 55%;
      right: 5%;

      color: #888888;

      font-size: 15px;
    }
  }
  .home--btns {
    display: flex;
    justify-content: space-between;

    margin-top: 60px;

    a {
      display: inline-block;

      box-sizing: border-box;
      width: 140px;
      padding: 6px;

      transition: color 0.2s, border-color 0.2s;
      text-decoration: none;

      color: #666666;
      border: 1px solid #88888888;
      border-radius: 500px;

      font-size: 20px;

      &:hover {
        color: #333333;
        border-color: #333333;
      }
    }
  }
}
</style>

<template>
  <div class="home">
    <div class="home--panel">
      <img src="../assets/logo.png" alt="" class="logo">

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
    width: 400px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -100%, 0);
    text-align: center;

    .logo {
      width: 400px;
      height: 78px;

      path {
        fill: #174a6e;
      }
    }
  }
  .home--btns {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;

    a {
      font-size: 20px;
      color: #666666;
      text-decoration: none;
      transition: color 0.3s, border-color 0.3s;
      border: 1px solid #88888888;
      padding: 6px;
      border-radius: 500px;
      display: inline-block;
      width: 140px;
      box-sizing: border-box;

      &:hover {
        color: #174a6e;
        border-color: #174a6e;
      }
    }
  }
}
</style>

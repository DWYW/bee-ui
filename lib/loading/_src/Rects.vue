<template>
  <div class='spinner'>
    <div :class='`rect${i}`' v-for='i in 5' :key='i'></div>
  </div>
</template>

<style lang='less'>
.spinner {
  width: 50px;
  height: 60px;
  text-align: center;
  font-size: 10px;
}

.spinner > div {
  background-color: #ff6701;
  height: 100%;
  width: 6px;
  display: inline-block;
  animation: stretchdelay 1.2s infinite ease-in-out;
  border-radius: 500px;
  margin-right: 3px;
}

.spinner {
  .rect2 {
    animation-delay: -1.1s;
  }

  .rect3 {
    animation-delay: -1.0s;
  }

  .rect4 {
    animation-delay: -0.9s;
  }
  .rect5 {
    animation-delay: -0.8s;
  }

  @keyframes stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1.0);
    }
  }
}
</style>

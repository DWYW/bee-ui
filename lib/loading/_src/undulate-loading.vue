<template>
  <div class='loading-undulate'>
    <div :class='`rect${i}`' v-for='i in 5' :key='i'></div>
  </div>
</template>

<style lang='less'>
@import '../../theme.less';

.loading-undulate {
  display: inline-block;

  height: 36px;

  text-align: center;

  font-size: 10px;
}

.loading-undulate > div {
  display: inline-block;

  width: 3px;
  height: 100%;
  margin-right: 3px;

  animation: stretchdelay 1.2s infinite ease-in-out;

  border-radius: 500px;
  background-color: @primary-color;
}

.loading-undulate {
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
    0% {
      transform: scaleY(0.5);
    }
    20% {
      transform: scaleY(1.0);
    }
    40% {
      transform: scaleY(0.5);
    }
    100% {
      transform: scaleY(0.5);
    }
  }
}
</style>

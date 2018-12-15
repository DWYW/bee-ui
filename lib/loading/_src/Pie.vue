<template>
  <svg class='loading-circle'>
    <circle class='lcc' cx='50%' cy='50%' r='40%' stroke-width='3' fill='none'></circle>
  </svg>
</template>

<style lang='less'>
.loading-circle {
  width: 36px;
  height: 36px;
  animation: rotate 1.6s linear infinite;

  .lcc {
    stroke-linecap: round;
    animation: lcc 1.6s ease infinite, colors 6.4s ease infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }

  @keyframes lcc {
    0% {
      stroke-dasharray: 0%, 400%;
      stroke-dashoffset: 0%;
    }
    50% {
      stroke-dasharray: 200%, 400%;
      stroke-dashoffset: -20%;
    }
    100% {
      stroke-dasharray: 0%, 400%;
      stroke-dashoffset: -250%;
    }
  }

  /*color*/
  @keyframes colors {
    0%,
    100% {
      stroke: #d62d20;
    }
    25% {
      stroke: #0057e7;
    }
    50% {
      stroke: #008744;
    }
    75% {
      stroke: #ffa700;
    }
  }
}
</style>

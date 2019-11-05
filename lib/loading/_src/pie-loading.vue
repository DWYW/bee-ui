<template>
  <svg class='loading-pie'>
    <circle class='pie' cx='50%' cy='50%' r='40%' stroke-width='2' fill='none'></circle>
  </svg>
</template>

<style lang='less'>
.loading-pie {
  display: inline-block;

  width: 32px;
  height: 32px;

  animation: rotate 1.6s linear infinite;

  .pie {
    animation: pie 1.6s ease infinite, colors 6.4s ease infinite;

    stroke-linecap: round;
  }

  @keyframes rotate {
    100% {
      transform: rotate(1turn);
    }
  }

  @keyframes pie {
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
    0% {
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
    100% {
      stroke: #d62d20;
    }
  }
}
</style>

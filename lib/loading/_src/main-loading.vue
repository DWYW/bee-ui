<template>
  <svg class='loading-logo'>
    <path d="M 2.25 25 C 2.5 33.75, 12.5 37.5, 20 30 C 20 30, 30 17.5 ,30 17.5" stroke="#ccc" fill="transparent" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 2.25 25 C 2.5 16.25, 12.5 12.5, 20 20 C 20 20, 30 32.5 ,30 32.5" stroke="#ccc" fill="transparent" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 62.5 25 C 62.5 33.75, 52.5 37.5, 45 30 C 45 30, 35 17.5 ,35 17.5" stroke="#ccc" fill="transparent" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 62.5 25 C 62.5 16.25, 52.5 12.5, 45 20 C 45 20, 35 32.5 ,35 32.5" stroke="#ccc" fill="transparent" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 11.25 12.5 C 20 0, 45 0, 53.75 12.5" stroke="#ccc" fill="transparent" stroke-width="2.5" stroke-linecap="round"/>

    <path d="M 2.25 25 C 2.5 33.75, 12.5 37.5, 20 30 C 20 30, 30 17.5 ,30 17.5" stroke="#ff6701" fill="transparent" stroke-width="2.5" stroke-linecap="round" class='logo-path1'/>
    <path d="M 2.25 25 C 2.5 16.25, 12.5 12.5, 20 20 C 20 20, 30 32.5 ,30 32.5" stroke="#ff6701" fill="transparent" stroke-width="2.5" stroke-linecap="round" class='logo-path1'/>
    <path d="M 62.5 25 C 62.5 33.75, 52.5 37.5, 45 30 C 45 30, 35 17.5 ,35 17.5" stroke="#ff6701" fill="transparent" stroke-width="2.5" stroke-linecap="round" class='logo-path1'/>
    <path d="M 62.5 25 C 62.5 16.25, 52.5 12.5, 45 20 C 45 20, 35 32.5 ,35 32.5" stroke="#ff6701" fill="transparent" stroke-width="2.5" stroke-linecap="round" class='logo-path1'/>
    <path d="M 11.25 12.5 C 20 0, 45 0, 53.75 12.5" stroke="#ff6701" fill="transparent" stroke-width="2.5" stroke-linecap="round" class='logo-path2'/>
  </svg>
</template>

<style lang='less'>
.loading-logo {
  display: inline-block;

  width: 65px;
  height: 38px;

  transform: scale(.8);

  .logo-path1 {
    animation: logoPath1 2s linear infinite;

    stroke-dasharray: 80.1708 80.1708;
  }

  .logo-path2 {
    animation: logoPath2 2s 1s linear infinite;

    stroke-dasharray: 96.4296;
  }
}

@keyframes logoPath1 {
  0% {
    stroke-dashoffset: 160.3416;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes logoPath2 {
  0% {
    stroke-dashoffset: 192.8592;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>

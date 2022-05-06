<template>
  <div id="app">
    <router-view/>
    <div class="cover"></div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/responsive.scss';
body {
  background: url('./assets/img/background.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  min-width: 320px;
  max-width: 1920px;
  margin: 0 auto !important;
}

.cover {
  background:rgba(34,34,34,.8);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
}

.bPattern {
  border: 2px solid #00ca8d;
  border-radius: 32px;
  background: none;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  transition: .2s;
  padding: 3px 20px 3px 20px;

  &:not(.withIcon) {
    padding: 3px 30px;
  }

  &:hover {
    background: #00ca8d;
  }

  &:disabled {
    opacity: .8;
    background: #444444;
    border-color: #444444;
    cursor: not-allowed;
  }

  @include d(xs) {
    font-size: 1.15rem;
  }
}

</style>

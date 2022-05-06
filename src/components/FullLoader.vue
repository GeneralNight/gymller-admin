<template>
  <div class="loader d-flex flex-column justify-content-center align-items-center">
    <p class="txtLoader mb-0">{{text}}</p>
    <div class="whellRotating"></div>
  </div>
</template>

<script>
export default {
name: "FullLoader",
props: ["text"]
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
.loader {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #202020de;
  top: 0;
  left: 0;
  z-index: 1000;

  .txtLoader {
    font-size: 2rem;
    color: #fff;
    font-weight: 700;
    text-align: center;
    @include d(md) {
      font-size: 1.5rem;
    }

    @include d(xs) {
      font-size: 1.25rem;
    }
  }

  .whellRotating {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 3px solid #fff;
    background: transparent;
    margin-top: 30px;
    border-right-color: transparent;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0%{transform: rotateZ(0deg);}
    100%{transform: rotateZ(360deg);}
  }
}
</style>
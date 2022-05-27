<template>
<div>
  <div class="loader d-flex flex-column justify-content-center align-items-center" v-if="!dark">
    <p class="txtLoader mb-0">{{text}}</p>
    <div class="whellRotating"></div>
  </div>
  <div class="loaderDark d-flex flex-column justify-content-center align-items-center" v-else>
    <p class="txtLoader mb-0" :class="{'smalltxt':textSmall}">{{text}}</p>
    <div class="whellRotating"></div>
  </div>
</div>
</template>

<script>
export default {
name: "LoaderInList",
props: ["text","dark","textSmall"]
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
.loader {
  .txtLoader {
      color: #fff;
      font-size: 2rem;
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

.smalltxt {
  font-size: 1.25rem !important;
}

.loaderDark {
  .txtLoader {
      color: #222;
      font-size: 2rem;
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
      border: 3px solid #222;
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
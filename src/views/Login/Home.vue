<template>
  <section id="containerLogin">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex flex-column justify-content-center align-items-center">
            <img src="@/assets/img/Logo.png" alt="Logo" class="logo">
            <p class="sysTitle">Gymller</p>
          </div>
          <FormLogin/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FormLogin from '@/components/Login/FormLogin.vue'
export default {
name: 'Home',
components: {
  FormLogin
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
#containerLogin {
  color: #fff;
  padding: 50px 0;
  .logo {
    max-width: 200px;
    position: relative;
        
    @include d(lg) {
      max-width: 150px;
    }
  }

  .sysTitle {
    margin-top: 20px;
    font-size: 2rem;
    font-weight: 700;

    @include d(xs) {
        font-size: 1.75rem;
        margin-top: 15px;
    }
  }
}
</style>
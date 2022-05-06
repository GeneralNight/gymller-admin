<template>
  <section id="containerRegister">
    <div class="container">
      <div class="row">
        <div class="col">
          <RegisterHeader/>
          <FormRegister/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RegisterHeader from '@/components/Login/RegisterHeader.vue'
import FormRegister from '@/components/Login/FormRegister.vue'
export default {
name: 'Register',
components: {
  FormRegister,
  RegisterHeader
}
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/responsive.scss";
#containerRegister {
  padding: 50px 0;
  @include d(xs) {
    padding: 30px 0;
  }
}
</style>
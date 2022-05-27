<template>
  <div>
    <Menu :slug="slug"/>
    <section id="containerEquipaments">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="d-flex justify-content-between align-items-center containrPageHeader">
              <p class="pageName mb-0"><i class="fas fa-dumbbell mr-2"></i> Aparelhos</p>
              
              <button class="bPattern withIcon" @click.prevent="goTo(`/${slug}/aparelhos/novo`)"><i class="fas fa-plus mr-2"></i>Novo</button>
              
            </div>
            <EquipamentsList :slug="slug"/>
          </div>
        </div>
      </div>
  </section>
  </div>
</template>

<script>
import EquipamentsList from '@/components/Gym/Equipaments/EquipamentsList.vue'
export default {
name: 'Equipaments',
props: ['slug'],
components: {
  EquipamentsList
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
#containerEquipaments {
    padding: 50px 0;
    @include d(xs) {
        padding: 30px 0;
    }

    .containrPageHeader {
        margin-bottom: 30px;
        .pageName{
            font-size: 2rem;
            color: #fff;
            font-weight: 700;
            i {
               transform: scale(.8);
            }
        }
    }    
}
</style>
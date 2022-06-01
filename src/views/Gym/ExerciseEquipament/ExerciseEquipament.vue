<template>
  <div>
    <Menu :slug="slug"/>
    <section id="containerExerciseEquipaments">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="d-flex justify-content-between align-items-center containrPageHeader">
              <p class="pageName mb-0"><i class="fas fa-dumbbell mr-2"></i>{{exerciseName?exerciseName:''}} Aparelhos</p>
              
              <button class="bPattern withIcon" @click.prevent="goTo(`/${slug}/exercicios/${exerciseId}/aparelhos/novo`)"><i class="fas fa-plus mr-2"></i>Novo</button>
              
            </div>
            <ExerciseEquipamentList :exerciseId="exerciseId" :slug="slug"/>
          </div>
        </div>
      </div>
  </section>
  </div>
</template>

<script>
import ExerciseEquipamentList from '@/components/Gym/ExerciseEquipament/ExerciseEquipamentList.vue'
import { mapState } from 'vuex'
export default {
name: 'ExerciseEquipament',
props: ['slug','exerciseId'],
components: {
  ExerciseEquipamentList
},
computed: {
    ...mapState(['exerciseName'])
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
#containerExerciseEquipaments {
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
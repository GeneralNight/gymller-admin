<template>
    <div>
        <Menu :slug="slug"/>
        <section id="containerExercises">
        <div class="container">
            <div class="row">
            <div class="col">
                <div class="d-flex justify-content-between align-items-center containrPageHeader">
                <p class="pageName mb-0"><i class="fas fa-running mr-2"></i> Exercícios</p>
                <div>
                    <button class="bPattern withIcon mr-4" @click.prevent="setModalOpen"><i class="fas fa-layer-group mr-2"></i>Categorias</button>
                    <button class="bPattern withIcon" @click.prevent="goTo(`/${slug}/exercicios/novo`)"><i class="fas fa-plus mr-2"></i>Novo</button>
                </div>
                </div>
                <ExercisesList :slug="slug"/>
                <ModalExercisesCategories :oppened="oppened" :slug="slug"/>
            </div>
            </div>
        </div>
    </section>
  </div>  
</template>

<script>
import ExercisesList from '@/components/Gym/Exercises/ExercisesList.vue'
import ModalExercisesCategories from '@/components/Gym/Exercises/ModalExercisesCategories.vue'
export default {
name: 'Exercises',
props: ['slug'],
data() {
    return {
        oppened: false
    }
},
methods: {
    setModalOpen() {
        this.oppened = !this.oppened
        this.openModal('modalExercisesCategories')
    }
},
components: {
    ExercisesList,
    ModalExercisesCategories
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
#containerExercises {
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
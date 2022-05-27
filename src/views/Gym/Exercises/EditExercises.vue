<template>
  <div>
        <Menu :slug="slug"/>
        <section id="containerUpdateExercises">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="d-flex justify-content-between align-items-center containrPageHeader">
                            <p class="pageName mb-0"><i class="fas fa-running mr-2"></i> Editar Exercício</p>
                            <button class="bPattern withIcon" @click.prevent="openModal('modalPreventErrorExercises')"><i class="fas fa-reply mr-2"></i>Voltar</button>
                        </div>
                        <FormEditExercises :exerciseId="exerciseId" :slug="slug"/>
                        <ModalPreventErrorExercises :slug="slug" :path="`/${slug}/exercicios/`" :origin="'edit'"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import ModalPreventErrorExercises from  '@/components/Gym/Exercises/ModalPreventErrorExercises.vue'
import FormEditExercises from  '@/components/Gym/Exercises/FormEditExercises.vue'
export default {
name: 'EditExercises',
props: ['slug','exerciseId'],
components: {
    ModalPreventErrorExercises,
    FormEditExercises
},
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
#containerUpdateExercises {
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

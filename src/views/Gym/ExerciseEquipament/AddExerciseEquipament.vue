<template>
    <div>
        <Menu :slug="slug"/>
        <section id="containerAddEquipaments">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="d-flex justify-content-between align-items-center containrPageHeader">
                            <p class="pageName mb-0"><i class="fas fa-dumbbell mr-2"></i>Conectar aparelhos ao exercício {{exerciseName ? exerciseName :''}}</p>
                            <button class="bPattern withIcon" @click.prevent="openModal('modalPreventErrorExerciseEquipaments')"><i class="fas fa-reply mr-2"></i>Voltar</button>
                        </div>
                        <FormAddExerciseEquipament :slug="slug" :exerciseId="exerciseId"/>
                        <ModalPreventErrorExerciseEquipaments :slug="slug" :path="`/${slug}/exercicios/${exerciseId}/aparelhos/`" :origin="'add'"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import FormAddExerciseEquipament from '@/components/Gym/ExerciseEquipament/FormAddExerciseEquipament.vue'
import ModalPreventErrorExerciseEquipaments from '@/components/Gym/ExerciseEquipament/ModalPreventErrorExerciseEquipaments.vue'
import { mapState } from 'vuex'
import { api } from '@/services.js'
export default {
name: 'AddExerciseEquipament',
props: ['slug','exerciseId'],
components: {
    FormAddExerciseEquipament,
    ModalPreventErrorExerciseEquipaments
},
data() {
    return {

    }
},
methods: {
    verifyExerciseName() {
        if(!this.exerciseName) {
            api.getExerciseName(this.slug,this.exerciseId).then(res=> {
                if(res.data.msg=='success') {
                    this.$store.commit('SET_EXERCISE_NAME',res.data.data.name)
                }
            }).catch(err=> {
                if(err.response.status==401) {
                    this.$router.push('/')
                }
            })
        }
    }
},
created() {
this.verifyExerciseName()
},
computed: {
    ...mapState(['exerciseName'])
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
#containerAddEquipaments {
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
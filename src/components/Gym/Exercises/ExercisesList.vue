<template>
    <div>
        <div class="defaultList" v-if="loaded">
            <div v-if="!someError">
                <div class="containerAllItems" v-if="exercises.length>0">
                    <div class="item d-flex justify-content-between align-items-center" v-for="(exercise,index) in exercises" :key="index">
                        <p class="itemName mb-0">{{exercise.name}}</p>
                        <div class="itemActions d-flex align-items-end">
                            <div @click.prevent="showEquipaments(exercise)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-dumbbell"></i></div>
                            <div @click.prevent="goTo(`/${slug}/exercicios/editar/${exercise.id}`)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-edit"></i></div>
                            <div @click.prevent="removeExercise(exercise)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-trash-alt"></i></div>
                        </div>
                    </div>
                    <ModalRemoveExercise :someDelete.sync="someDelete" :exercise="exerciseRemove" :slug="slug"/>
                </div>
                <div class="noExercises" v-else>
                    <b-alert variant="warning" show><i class="fas fa-info-circle mr-2"></i>Nenhum exercício cadastrado.</b-alert>
                </div>
            </div>
            <div class="noExercises" v-else>
                <b-alert variant="danger" show><i class="fas fa-info-circle mr-2"></i>{{someErrorMsg}}</b-alert>
            </div>
        </div>
        <LoaderInList v-else class="mt-5" :text="'Carregando exercícios...'"/>
    </div>
</template>

<script>
import LoaderInList from '@/components/LoaderInList.vue'
import ModalRemoveExercise from '@/components/Gym/Exercises/ModalRemoveExercise.vue'
export default {
name: 'ExercisesList',
props:['slug'],
components: {
    LoaderInList,
    ModalRemoveExercise
},
data() {
    return {
        loaded: false,
        someError: false,
        someErrorMsg: "",
        exerciseRemove: null,
        someDelete: false,
        exercises: [
           
        ]
    }
},
methods: {
    showEquipaments(exercise) {
        this.$store.commit("SET_EXERCISE_NAME",exercise.name)
        this.$router.push(`/${this.slug}/exercicios/${exercise.id}/aparelhos/`)
    },
    async loadExercises() {
        this.loaded = false
        try {
            await this.$api.getGymExercises(this.slug).then(res=> {
                if(res.data.msg=="success") {
                    this.exercises = res.data.data                    
                }else {
                    this.someErrorMsg = "Verifique o slug da url e tente novamente. Caso não resolva, saia e entre no sistema novamente."
                    this.someError = true
                }
            })
        } catch (error) {
            console.log(error)
            this.someErrorMsg = "Algum erro aconteceu ao carregar os exercícios. Tente novamente mais tarde!"
            this.someError = true
        }
        this.loaded = true
    },
    removeExercise(exercise) {
        this.exerciseRemove = exercise
        this.openModal("modalRemoveExercises")
    },
},
created() {
    this.loadExercises()
},
watch: {
    someDelete() {
        this.loadExercises()
    }
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
.defaultList {
    .openTime {
        color: #00ca8d;
    }
    .closeTime {
        color: #ca0000;
    }
    .containerAllItems {
        .item {
            color: #434343;
            background: #f6f6f6;
            padding: 15px 20px;
            border-radius: 5px;

            & + .item {
                margin-top: 30px;
            }

            .itemName {
                font-weight: 700;
                font-size: 1.25rem;

                @include d(xs) {
                    font-size: 1rem;
                }
            }

            .itemActions {
                .action {
                    background: #434343;
                    color: #fff;
                    height: 40px;
                    width: 40px;
                    font-size: 1.15rem;
                    border-radius: 5px;
                    box-shadow: 0 0 3px rgba(0,0,0,.5);
                    transition: .2s;
                    cursor: pointer;
                    @include d(xs) {
                        font-size: 1rem;
                        width: 35px;
                        height: 35px;
                    }
                    &:hover {
                        background: #00ca8d;
                    }
                    & + .action {
                        margin-left: 20px;
                        @include d(xs) {
                            margin-left: 15px;
                        }
                    }
                }
            }
        }
    }
}
</style>
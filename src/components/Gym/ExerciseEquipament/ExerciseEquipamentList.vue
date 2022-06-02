<template>
    <div class="defaultList" v-if="loaded">
        <div v-if="!someError">
            <div class="containerAllItems" v-if="equipaments.length>0">
                <div class="item d-flex justify-content-between align-items-center" v-for="(equipament,index) in equipaments" :key="index">
                    <div class="d-flex align-items-center">
                        <p class="itemName num mb-0 mr-3">{{
                            /* eslint-disable */
                            parseInt(equipament.number) < 10 ? `0${equipament.number}` : equipament.number}}</p>
                        <p class="itemName mb-0">{{equipament.name}}</p>
                    </div>
                    
                    <div class="itemActions d-flex align-items-end">
                        <!-- <div @click.prevent="showExercises(equipament.id)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-running"></i></div> -->
                        <!-- <div @click.prevent="goTo(`/${slug}/aparelhos/editar/${equipament.id}`)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-edit"></i></div> -->
                        <div @click.prevent="removeEquipament(equipament)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-trash-alt"></i></div>
                    </div>
                </div>
                <ModalRemoveExerciseEquipaments :someDelete.sync="someDelete" :exerciseid="exerciseId" :equipament="equipamentRemove" :slug="slug"/>
            </div>
            <div class="noEquipaments" v-else>
                <b-alert variant="warning" show><i class="fas fa-info-circle mr-2"></i>Nenhum aparelho relacionado ao exercício {{exerciseName?exerciseName:''}} cadastrado.</b-alert>
            </div>
        </div>
        <div class="noEquipaments" v-else>
            <b-alert variant="danger" show><i class="fas fa-info-circle mr-2"></i>{{someErrorMsg}}</b-alert>
        </div>
    </div>
    <LoaderInList v-else class="mt-5" :text="`Carregando aparelhos do ${exerciseName?exerciseName:''}...`"/>
</template>

<script>
import LoaderInList from '@/components/LoaderInList.vue'
import ModalRemoveExerciseEquipaments from '@/components/Gym/ExerciseEquipament/ModalRemoveExerciseEquipaments.vue'
import { mapState } from 'vuex'
export default {
name: 'ExerciseEquipamentList',
props: ['slug','exerciseId'],
components: {
    LoaderInList,
    ModalRemoveExerciseEquipaments
},
data() {
    return {
        loaded: false,
        someError: false,
        someErrorMsg: "",
        equipamentRemove: null,
        someDelete: false,
        equipaments: [
           
        ]
    }
},
methods: {
    showExercises(id) {
        this.$router.push(`/${this.slug}/aparelhos/${id}/exercicios/`)
    },
    async loadEquipaments() {
        this.loaded = false
        try {
            await this.$api.getExerciseEquipaments(this.slug,this.exerciseId).then(res=> {
                if(res.data.msg=="success") {
                    this.equipaments = res.data.data   
                    this.$store.commit('SET_EXERCISE_NAME',res.data.exercise[0].name)
                }else {
                    this.someErrorMsg = "Verifique o slug da url e tente novamente. Caso não resolva, saia e entre no sistema novamente."
                    this.someError = true
                }
            })
        } catch (error) {
            console.log(error)
            this.someErrorMsg = "Algum erro aconteceu ao carregar os aparelhos. Tente novamente mais tarde!"
            this.someError = true
        }
        this.loaded = true
    },
    removeEquipament(equipament) {
        this.equipamentRemove = equipament
        this.openModal("modalRemoveExerciseEquipaments")
    },
},
created() {
    this.loadEquipaments()
},
watch: {
    someDelete() {
        this.loadEquipaments()
    }
},
computed: {
    ...mapState(['exerciseName'])
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

            .num {
                background: #00ca8d;
                border-radius: 5px ;
                box-shadow: 0 0 5px rgba(0,0,0,.5);
                padding: 0 5px;
                color: #fff;
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
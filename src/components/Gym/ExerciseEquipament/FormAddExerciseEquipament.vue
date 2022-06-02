<template>
  <div class="d-flex flex-column">
      <p class="instructionText mb-0">Selecione abaixo, os aparelhos que são (ou podem ser) usados na execução do exercício selecionado.</p>
        <FullLoader :text="'Salvando dados'" v-if="savingData"/>
        <LoaderInList :text="loaderText" v-if="!loaded"/>
        <b-form @submit.prevent="addExerciseEquipament" id="formAddExerciseEquipament" v-else-if="loaded && !refreshForm">
            <b-alert show variant="warning" v-if="options.length==0"><i class="fas fa-info-circle mr-2"></i>Todos os aparelhos disponíveis já foram vinculados a ente exercício.</b-alert>
                <div v-else>
                    <div class="item d-flex justify-content-between align-items-center" v-for="(equipament,index) in options" :key="index">
                        <div class="d-flex align-items-center">
                            
                            <p class="itemName num mb-0 mr-3">{{/* eslint-disable */parseInt(equipament.number) < 10 ? `0${equipament.number}` : equipament.number}}</p>
                            <p class="itemName mb-0">{{equipament.name}}</p>
                        </div>
                        
                        <div class="itemActions d-flex align-items-end">
                            <div v-if="form.fields[index]==equipament.id" @click.prevent="toggleInList(equipament.id,index)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-check-square"></i></div>
                            <div v-else @click.prevent="toggleInList(equipament.id,index)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-square"></i></div>                   
                        </div>
                    </div>
                    <div class="d-flex justify-content-end mt-4">
                        <button type="submit" class="bPattern withIcon"><i class="fas fa-save mr-2"></i>Salvar</button>
                    </div>
                </div>
        </b-form>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import LoaderInList from '@/components/LoaderInList.vue'
import FullLoader from '@/components/FullLoader.vue'
import {api} from '@/services.js'
export default {
name: 'FormAddExerciseEquipament',
props:['slug','exerciseId'],
components: {
    Multiselect ,
    LoaderInList,
    FullLoader
},
data() {
    return {
        loaded: false,
        form: {
            fields: []
        },
        options: [],
        refreshForm:false,
        loaderText: '',
        savingData: false
    }
},
methods: {
    async addExerciseEquipament() {
        this.savingData = true
        await api.saveExerciseEquipament(this.slug,this.exerciseId,this.form).then(res=> {
            if(res.data.msg=="success") {
                this.loadOptions()
            }else {
                var resCode = err.data.code
                switch (resCode) {
                    case '001':
                        this.makeToast('warning','Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!')
                    break;
                    case '002': 
                        this.makeToast('danger','Não foi possível salvar o equipamentos, tente novamente mais tarde!')
                    break;
                    default:
                        this.makeToast('danger','Não foi possível salvar o equipamentos, tente novamente mais tarde!')
                    break;
                }
            }
        }).catch(err=> {
            if(err.response.status==401) {
                this.$router.push('/')
            }
        })  

        this.savingData = false
    },
    toggleInList(equipId,index) {
        console.log(equipId,index)
        if(this.form.fields[`${index}`] != equipId) {
            this.form.fields[`${index}`] = equipId
        }else [
            this.form.fields.splice(index, 1)
        ]
        this.refreshForm = true
        this.refreshForm = false
    },
    async loadOptions() {
        this.loaded = false
        this.loaderText= 'Carregando aparelhos'
        await api.getAllNullableEquipamentsId(this.slug,this.exerciseId).then(res=> {
            if(res.data.msg=="success") {
                // for(var i=0;i<res.data.data.length;i++) {
                //     var obj = {
                //         name: `${res.data.data[i].name}`
                //     }
                //     this.options.push(obj)
                // }
                this.options = res.data.data
            }else {
                var resCode = err.data.code
                switch (resCode) {
                    case '001':
                        this.makeToast('warning','Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!')
                    break;
                    case '002': 
                        this.makeToast('danger','Não foi possível listar o equipamentos, tente novamente mais tarde!')
                    break;
                    default:
                        this.makeToast('danger','Não foi possível listar o equipamentos, tente novamente mais tarde!')
                    break;
                }
            }
        }).catch(err=> {
            if(err.response.status==401){
                this.$router.push('/')
            }else {
                this.makeToast('danger','Não foi possível listar o equipamentos, tente novamente mais tarde!')
            }
        })
        this.loaded = true
    }
},
created() {
    this.loadOptions()
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
.instructionText {
    color: #fff;
    font-size: 1.15rem;
}
#formAddExerciseEquipament {
    color: #fff;
    margin-top: 30px;
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
</style>
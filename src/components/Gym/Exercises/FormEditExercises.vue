<template>
    <div>
        <FullLoader :text="loader.text" v-if="loader.visible"/>
        <b-form @submit.prevent="editExercise" id="formEditExercise">
            <b-alert :variant="alertRegister.variant" :show="alertRegister.status">{{alertRegister.text}}</b-alert>
            <div class="row" v-if="!blockAll">
                 <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="exerciseName">Nome</label>
                        <input type="text" class="form-control" id="exerciseName" required v-model="form.name">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="exerciseCategory">Categoria</label>
                        <select class="form-control" v-model="form.exercise_category_id" id="exerciseCategory" required>
                            <option disabled value="">Selecione</option>
                            <option :value="cat.id" v-for="(cat,index) in categories" :key="index">{{cat.description}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="exerciseDescription">Descrição</label>
                        <input type="text" class="form-control" id="exerciseDescription" required v-model="form.description">
                    </div>
                </div>
                <div class="col-12">
                    <div class="d-flex justify-content-end align-items-center mt-5">
                        <button :disabled="bRegister.disabled" type="button" class="bPattern withIcon mr-sm-4" @click.prevent="openModal('modalPreventErrorExercises')"><i class="fas fa-reply mr-2"></i>Voltar</button>
                        <button :disabled="bRegister.disabled" type="submit" class="bPattern withIcon"><i class="fas fa-edit mr-2"></i>{{bRegister.text}}</button>
                    </div>
                </div>
            </div>
        </b-form>
    </div>  
</template>

<script>
import FullLoader from '@/components/FullLoader.vue'
export default {
name: 'FormEditExercises',
props:['slug','exerciseId'],
components: {
    FullLoader
},
data() {
    return {
        blockAll: false,
        loader: {
            text: "",
            visible: false
        },
        bRegister: {
            disabled: false,
            text: "Editar"
        },
        alertRegister: {
            status: false,
            text: "",
            variant: ""
        },
        form: {
            name: "",
            exercise_category_id: "",
            description: ""
        },
        avaibleDays: [],
        categories: []
    }
},
methods: {
    async editExercise() {
        this.alertRegister.status = false
        this.bRegister.disabled = true
        this.bRegister.text = "Editando"
        this.loader.text = "Editando..."
        this.loader.visible = true
        
        await this.$api.updateGymExercises(this.slug, this.exerciseId,this.form).then(res=>{
            if(res.data.msg=='success') {
                this.alertRegister.text = "Exercício editado com sucesso!"
                this.alertRegister.variant = "success"                
            }else {
                var msgCode = res.data.code
                switch (msgCode) {
                    case '001':
                        this.alertRegister.text = "Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!"
                        this.alertRegister.variant = "warning"
                    break;
                    case '002':
                        this.alertRegister.text = "Não foi possível encontrar o exercício. Tente novamete!"
                        this.alertRegister.variant = "warning"
                    break;
                    case '003':
                        this.alertRegister.text = "Outro exercício já existe com esse nome!"
                        this.alertRegister.variant = "warning"
                    break;
                    default:
                        this.alertRegister.text = "Não foi possível realizar a edição, tente novamente mais tarde!"
                        this.alertRegister.variant = "danger"
                        this.blockAll = true
                    break;
                }
            }
            this.alertRegister.status = true
            window.scroll({
                top: 0,
                behavior: 'smooth'
            })
        })
        this.bRegister.disabled = false
        this.bRegister.text = "Editar"
        this.loader.visible = false
    },
    async loadCategories() {
        this.loader.visible = true
        this.loader.text = "Carregando categorias..."

        await this.$api.getGymExercisesCategory(this.slug).then(res=> {
            if(res.data.msg=='success') {
                this.categories = res.data.data
            }else {
                var msgCode = res.data.code
                switch (msgCode) {
                    case '001':
                        this.alertRegister.text = "Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!"
                        this.alertRegister.variant = "warning"
                    break;
                    case '002':
                        this.alertRegister.text = "Outro exercício já foi cadastrado com esse nome!"
                        this.alertRegister.variant = "warning"
                    break;
                    case '003':
                        this.alertRegister.text = "Outro exercício já foi cadastrado com esse número de identificação!"
                        this.alertRegister.variant = "warning"
                    break;
                    default:
                        this.alertRegister.text = "Não foi possível realizar o cadastro, tente novamente mais tarde!"
                        this.alertRegister.variant = "danger"
                        this.blockAll = true
                    break;
                }
            }
            this.alertRegister.status = true
            window.scroll({
                top: 0,
                behavior: 'smooth'
            })
        })

        this.loader.visible = false
    },
    async loadExercises() {
        this.loader.visible = true
        this.loader.text = "Carregando categorias..."

        await this.$api.indexGymExercises(this.slug,this.exerciseId).then(res=> {
            if(res.data.msg=='success') {
                this.form = res.data.data
            }else {
                var msgCode = res.data.code
                switch (msgCode) {
                    case '001':
                        this.alertRegister.text = "Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!"
                        this.alertRegister.variant = "warning"
                    break;
                    case '002':
                        this.alertRegister.text = "Não foi possível encontrar o exercício. Recarregue e tente novamente!"
                        this.alertRegister.variant = "warning"
                    break;
                    default:
                        this.alertRegister.text = "Não foi possível carregar os dados do exercício, tente novamente mais tarde!"
                        this.alertRegister.variant = "danger"
                        this.blockAll = true
                    break;
                }
                this.alertRegister.status = true
            }
            window.scroll({
                top: 0,
                behavior: 'smooth'
            })
        })
        this.loader.visible = false
    }
},
created() {
    this.loadCategories()
    this.loadExercises()
}
}
</script>

<style lang="scss" scoped>
#formEditExercise {
    color: #fff;
    .infoDetail {
        width: fit-content;
        background: rgb(255, 255, 255);
        box-shadow: 0 0 4px rgba(0,0,0,0.5);
        border-radius: 16px;
        padding: 5px 15px;
        color: #039c6e;
        font-weight: 700;
        font-size: .8rem;

        & + .infoDetail {
            margin-top: 15px;
        }

        &:last-child {
            margin-bottom: 15px;
        }
    }
}
</style>
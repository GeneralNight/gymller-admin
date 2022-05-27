<template>
    <b-modal id="modalExercisesCategories" title="Categorias de exercício" hide-footer no-close-on-backdrop no-close-on-esc>
        <div class="d-flex align-items-end justify-content-center flex-column">
            <button :disabled="!loaded || syncingData || bRegister.disabled || blockAll" class="bPatternDark withIcon" @click.prevent="loadCategories()"><i class="fas fa-sync mr-2"></i>Atualizar</button>
            
            <small class="mt-2" v-if="showUpdateMsg">Atualizado</small>
            
        </div>
        <LoaderInList :text="'Carregando categorias'" :textSmall="true" :dark="true" class="mt-4" v-if="!loaded"/>
        <div v-else-if="!someErrorInLoad">
            <b-form @submit.prevent="addExerciseCategory">
                <div class="card mt-4">
                    <div class="card-header">
                        Adicionar nova categoria
                    </div>
                    <div class="card-body">
                            <div class="form-group">
                                <label for="equipamentCategoryDescription">Descrição</label>
                                <input type="text" class="form-control" id="equipamentCategoryDescription"  min="1" required v-model="form.description">
                            </div>
                            <div class="d-flex justify-content-end">
                                <button :disabled="bRegister.disabled || blockAll" type="submit" class="bPatternDark withIcon"><i class="fas fa-plus mr-2"></i>{{bRegister.text}}</button>
                            </div>
                    </div>
                </div>
            </b-form>
            <div class="card mt-4">
                <div class="card-header"><i class="fas fa-layer-group mr-2"></i>Categorias</div>
                <div class="card-body">
                    <b-alert variant="warning" v-if="categories.length==0" :show="categories.length==0"><i class="fas fa-info-circle mr-2"></i>Nenhuma categoria cadastrada!</b-alert>
                    <div>
                        <div class="containerCategory d-flex align-items-center justify-content-between" v-for="(cat,index) in categories" :key="index">
                            <p class="catName mb-0" v-if="catEditing!=cat.id">{{cat.description}}</p>
                            <div  class="form-group d-flex align-items-center mb-0" v-else>
                                <input type="text" class="form-control mb-0" id="equipamentCategoryDescription" required v-model="formEditing.description">
                                <div :class="{'blockAll':blockAll}" class="action d-flex justify-content-center align-items-center ml-2" @click.prevent="cancelEditing">
                                    <i class="fas fa-times" style="cursor: pointer;"></i>
                                </div>
                            </div>
                            <div class="d-flex align-items-center justify-content-between">
                                <div :class="{'blockAll':blockAll}" @click.prevent="editCategory(cat)" class="action d-flex justify-content-center align-items-center" v-if="catEditing!=cat.id"><i class="fas fa-edit"></i></div>
                                <div :class="{'blockAll':blockAll}" class="action d-flex justify-content-center align-items-center ml-2" @click.prevent="saveCategory" v-else title="Salvar">
                                    <i class="fas fa-save" style="cursor: pointer;"></i>
                                </div>
                                <div :class="{'blockAll':blockAll}" @click.prevent="deleteCategory(cat)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-trash-alt"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-alert variant="danger" v-else :show="someErrorInLoad"><i class="fas fa-info-circle mr-2"></i>{{errorMsg}}</b-alert>
    </b-modal>
</template>

<script>
import LoaderInList from '@/components/LoaderInList.vue'
export default {
name: 'ModalExercisesCategories',
components: {
    LoaderInList
},
props:['slug','oppened'],
data() {
    return {
        loaded: false,
        syncingData: false,
        form: {
            description: ""
        },
        bRegister: {
            disabled: false,
            text: "Nova"
        },
        someErrorInLoad: false,
        categories: [],
        errorMsg: '',
        catEditing: null,
        formEditing: {
            description: ""
        },
        blockAll: false,
        showUpdateMsg: false
    }
},
methods: {
    async loadCategories() {
        this.loaded = false
        await this.$api.getGymExercisesCategory(this.slug).then(res=> {
            if(res.data.msg=='success') {
                this.categories = res.data.data
                this.showUpdateMsg = true
                setTimeout(() => {
                    this.showUpdateMsg = false
                }, 1500);
            }else {
                var msgCode = res.data.code
                switch (msgCode) {
                    case '001':
                        this.errorMsg = 'Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!' 
                    break;
                    default:
                        this.errorMsg = 'Erro ao carregar as categorias. Feche o box e tente novamente!'
                    break;
                }
                this.someErrorInLoad = true
            }
        })
        this.loaded = true
    },
    addExerciseCategory() {
        this.bRegister.disabled = true
        this.bRegister.text = 'Adicionando'
        this.$api.storeGymExercisesCategory(this.slug,this.form).then(res=> {
            if(res.data.msg=='success') {
                this.categories.push(res.data.data)
                this.form.description = ""
            }else {
                var msgCode = res.data.code
                switch (msgCode) {
                    case '001':
                        this.makeToast('warning','Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!')
                    break;
                    case '002':
                        this.makeToast('warning','Alguma outra categoria já possui esta descrição. Altere e tente novamente!')
                    break;
                    default:
                        this.makeToast('danger','Erro ao adicionar categoria. Tente novamente mais tarde!')
                    break;
                }
            }
        })
        this.bRegister.disabled = false
        this.bRegister.text = 'Nova'
    },
    editCategory(cat) {
        if(this.blockAll) {
            return
        }
        this.formEditing.description = cat.description
        this.catEditing = cat.id
    },
    cancelEditing() {
        if(this.blockAll) {
            return
        }
        this.formEditing.description = ""
        this.catEditing = null
    },
    async saveCategory() {
        if(this.blockAll) {
            return
        }
        this.blockAll = true
        this.$api.updateGymExercisesCategory(this.slug,this.catEditing, this.formEditing).then(res=> {
            if(res.data.msg=='success') {
                this.blockAll = false
                this.makeToast('success','Categoria salva com sucesso!')
                this.categories.filter(c=>c.id==this.catEditing)[0].description = this.formEditing.description
                this.cancelEditing()
            }else {
                var msgCode = res.data.code
                switch (msgCode) {
                    case '001':
                        this.makeToast('warning','Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!')
                    break;
                    case '002':
                        this.makeToast('warning','Alguma outra categoria já possui esta descrição. Altere e tente novamente!')
                    break;
                    default:
                        this.makeToast('danger','Erro ao salvar categoria. Tente novamente mais tarde!')
                    break;
                }
            }
        })
        this.blockAll = false
    },
    deleteCategory(cat) {
        if(this.blockAll) {
            return
        }
        this.blockAll = true
        this.$api.deleteGymExercisesCategory(this.slug,cat.id).then(res=> {
            if(res.data.msg=='success') {
                this.blockAll = false
                this.makeToast('success','Categoria salva com sucesso!')
                this.loadCategories()
            }else {
                var msgCode = res.data.code
                switch (msgCode) {
                    case '001':
                        this.makeToast('warning','Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!')
                    break;
                    case '002':
                        this.makeToast('warning','Não foi possível encontrar a categoria. Talvez ela já tenha sido excluída!')
                    break;
                    case '003':
                        this.makeToast('warning','Existem aparelhos que dependem desta categoria, desvincule todos e então volte aqui.')
                    break;
                    default:
                        this.makeToast('danger','Erro ao remover categoria. Tente novamente mais tarde!')
                    break;
                }
            }
        })
        this.blockAll = false
    }
},
watch: {
    oppened() {
        this.loadCategories()
    }
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
small {
    color: #434343;
}
.containerCategory {

    & + .containerCategory {
        margin-top: 20px;
    }
    .catName {
        font-size: 1.15rem;
        font-weight: 700;
        @include d(xs) {
            font-size: 1rem;
        }
    }
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
.blockAll {
    opacity: .8;
}
</style>
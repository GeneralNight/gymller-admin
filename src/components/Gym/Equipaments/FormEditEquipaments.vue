<template>
  <div>
      <FullLoader :text="loader.text" v-if="loader.visible"/>
        <b-form @submit.prevent="editEquipament" id="formEditEquipament">
            <b-alert :variant="alertRegister.variant" :show="alertRegister.status">{{alertRegister.text}}</b-alert>
            <div class="row" v-if="!blockAll">
                 <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="equipamentName">Nome</label>
                        <input type="text" class="form-control" id="equipamentName" required v-model="form.name">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="equipamentNumber">Número de identificação</label>
                        <input type="number" class="form-control" id="equipamentNumber"  min="1" required v-model="form.number">
                    </div>
                </div>
                <div class="col-12">
                    <div class="d-flex justify-content-end align-items-center mt-5">
                        <button :disabled="bRegister.disabled" type="button" class="bPattern withIcon mr-sm-4" @click.prevent="openModal('modalPreventErrorEquipaments')"><i class="fas fa-reply mr-2"></i>Voltar</button>
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
name: 'FormEditEquipaments',
props: ['slug','equipamentId'],
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
            number: "",
        },
        
    }
},
methods: {
    loadEquipament() {
        this.loader.visible = true
        this.loader.text = 'Carregando dados...'

        this.$api.indexEquipaments(this.slug,this.equipamentId).then(res=> {
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
                        this.alertRegister.text = "Outro aparelho já foi cadastrado com esse nome!"
                        this.alertRegister.variant = "warning"
                    break;
                    default:
                        this.alertRegister.text = "Não foi possível realizar o cadastro, tente novamente mais tarde!"
                        this.alertRegister.variant = "danger"
                        this.blockAll = true
                    break;
                }
                this.blockAll = true
            }
        }).catch(err=> {
            this.alertRegister.text = "Não foi possível realizar o cadastro, tente novamente mais tarde!"
            this.alertRegister.variant = "danger"
            this.blockAll = true
        })

        this.loader.visible = false
    },
    async editEquipament() {
        this.alertRegister.status = false
        this.bRegister.disabled = true
        this.bRegister.text = "Editando"
        this.loader.text = "Solicitando alteração..."
        this.loader.visible = true
        
        await this.$api.updateGymEquipaments(this.slug,this.equipamentId,this.form).then(res=>{
            if(res.data.msg=='success') {
                this.alertRegister.text = "Aparelho editado com sucesso!"
                this.alertRegister.variant = "success"                
                this.form = {
                    name: "",
                    number: "",
                }
            }else {
                var msgCode = res.data.code
                switch (msgCode) {
                    case '001':
                        this.alertRegister.text = "Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!"
                        this.alertRegister.variant = "warning"
                    break;
                    case '002':
                        this.alertRegister.text = "Nenhum equipamento cadastrado possui esse nome!"
                        this.alertRegister.variant = "warning"
                    break;
                    case '003':
                        this.alertRegister.text = "Outro aparelho já foi possui esse nome de identificação!"
                        this.alertRegister.variant = "warning"
                    break;
                    case '004':
                        this.alertRegister.text = "Outro aparelho já foi possui esse número de identificação!"
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
        }).catch(err=> {
            this.alertRegister.text = "Não foi possível realizar a edição, tente novamente mais tarde!"
            this.alertRegister.variant = "danger"
            this.blockAll = true
        })
        this.bRegister.disabled = false
        this.bRegister.text = "Editar"
        this.loader.visible = false
    },
},
created() {
    this.loadEquipament()
}
}
</script>

<style lang="scss" scoped>
#formEditEquipament {
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
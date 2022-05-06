<template>
    <div>
        <FullLoader :text="loader.text" v-if="loader.visible"/>
        <b-form @submit.prevent="editPosition" id="formEditPosition">
            <b-alert :variant="alertRegister.variant" :show="alertRegister.status">{{alertRegister.text}}</b-alert>
            <div class="row" v-if="!blockAll">
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerName">Nome</label>
                        <input type="text" class="form-control" id="workerName" required v-model="form.name">
                    </div>
                </div>
                <div class="col-12">
                    <div class="d-flex justify-content-end align-items-center mt-5">
                        <button :disabled="bRegister.disabled" type="button" class="bPattern withIcon mr-sm-4" @click.prevent="openModal('modalPreventErrorPositions')"><i class="fas fa-reply mr-2"></i>Voltar</button>
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
name: 'FormAddPositions',
props: ["slug","positionId"],
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
            name: ""
        }
    }
},
methods: {
    loadPosition() {
        this.loader.text = "Carregando dados..."
        this.loader.visible = true
        this.alertRegister.status = false
        this.$api.indexGymPositions(this.slug,this.positionId).then(res => {
            if(res.data.msg == 'success') {
                this.form = res.data.data
            }else {
                var msgCode = res.data.code
                switch (msgCode) {
                    case '001':
                        this.alertRegister.text = "Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!"
                        this.alertRegister.variant = "warning"                        
                    break;
                    case '002':
                        this.alertRegister.text = "Verifique o nível de acesso. É aconselhável voltar e selecionar o funcionário novamente!"
                        this.alertRegister.variant = "warning"                        
                    break;
                
                    default:
                        this.alertRegister.text = "Não foi possível carregar dados do usuário, tente novamente mais tarde!"
                        this.alertRegister.variant = "warning"  
                        this.blockAll = true
                    break;
                }
                this.alertRegister.status = true
            }
        })
        this.loader.visible = false
    },
    async editPosition() {
        this.alertRegister.status = false
        this.bRegister.disabled = true
        this.bRegister.text = "Editando"
        this.loader.text = "Solicitando atualização..."
        this.loader.visible = true
        this.form.name = this.form.name.trim()
        await this.$api.updateGymPositions(this.slug , this.positionId , this.form).then(res=>{
            if(res.data.msg=='success') {
                this.alertRegister.text = "Nível de acesso editado com sucesso!"
                this.alertRegister.variant = "success"
            }else {
                var msgCode = res.data.code
                switch (msgCode) {
                    case '001':
                        this.alertRegister.text = "Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!"
                        this.alertRegister.variant = "warning"
                    break;
                    case '002':
                        this.alertRegister.text = "Verifique o nível de acesso e tente novamente. É aconselhável voltar e selecionar o nível de acesso novamente!"
                        this.alertRegister.variant = "warning"
                    break;
                    case '003':
                        this.alertRegister.text = "Outro nível de acesso já está usando este nome!"
                        this.alertRegister.variant = "warning"
                    break;
                    default:
                        this.alertRegister.text = "Não foi possível realizar a atualização, tente novamente mais tarde!"
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
    }
},
created() {
    this.loadPosition()
}
}
</script>

<style lang="scss" scoped>
#formEditPosition {
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
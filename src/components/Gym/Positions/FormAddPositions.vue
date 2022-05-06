<template>
    <div>
        <FullLoader :text="loader.text" v-if="loader.visible"/>
        <b-form @submit.prevent="addPosition" id="formAddPosition">
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
                        <button :disabled="bRegister.disabled" type="submit" class="bPattern withIcon"><i class="fas fa-plus mr-2"></i>{{bRegister.text}}</button>
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
props: ["slug"],
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
            text: "Cadastrar"
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
    async addPosition() {
        this.alertRegister.status = false
        this.bRegister.disabled = true
        this.bRegister.text = "Cadastrando"
        this.loader.text = "Solicitando cadastro..."
        this.loader.visible = true
        this.form.name = this.form.name.trim()
        await this.$api.storeGymPositions(this.slug,this.form).then(res=>{
            if(res.data.msg=='success') {
                this.alertRegister.text = "Nível de acesso cadastrado com sucesso!"
                this.alertRegister.variant = "success"
                this.form = {
                    name: ""
                }
            }else {
                var msgCode = res.data.code
                switch (msgCode) {
                    case '001':
                        this.alertRegister.text = "Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!"
                        this.alertRegister.variant = "warning"
                    break;
                    case '002':
                        this.alertRegister.text = "Outro nível de acesso já está usando este nome!"
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
        this.bRegister.disabled = false
        this.bRegister.text = "Cadastrar"
        this.loader.visible = false
    }
}
}
</script>

<style lang="scss" scoped>
#formAddPosition {
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
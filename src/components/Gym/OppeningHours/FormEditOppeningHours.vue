<template>
    <div>
        <FullLoader :text="loader.text" v-if="loader.visible"/>
        <b-form @submit.prevent="editOppeningHour" id="formEditOppeningHour">
            <b-alert :variant="alertRegister.variant" :show="alertRegister.status">{{alertRegister.text}}</b-alert>
            <div class="row" v-if="!blockAll">
                <div class="col-12 col-md-6">
                   <label for="exampleFormControlSelect1">Dia da semana</label>
                    <select disabled v-model="form.week_day" class="form-control" id="exampleFormControlSelect1">
                        <option v-for="(day,index) in avaibleDays" :key="index" :value="day">{{setWeekDay(day)}}</option>
                    </select>
                </div>
                <div class="w-100 my-3"></div>
                <div class="col-12 d-flex flex-column">
                    <label for="exampleFormControlSelect1">Horário de abertura</label>
                    <div>
                        <b-time v-model="form.openning_hour" locale="pt"></b-time>
                    </div>
                </div>
                <div class="w-100 my-3"></div>
                <div class="col-12 d-flex flex-column">
                    <label for="exampleFormControlSelect1">Horário de fechamento</label>
                    <div>
                        <b-time v-model="form.closing_hour" locale="pt"></b-time>
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
name: 'FormEditOppeningHours',
props: ["slug","weekDay"],
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
            openning_hour: "",
            closing_hour: "",
            week_day: ""
        },
        avaibleDays: []
    }
},
methods: {
    async editOppeningHour() {
        this.alertRegister.status = false
        this.bRegister.disabled = true
        this.bRegister.text = "Cadastrando"
        this.loader.text = "Solicitando alteração..."
        this.loader.visible = true
        
        await this.$api.updateOppeningHours(this.slug,this.weekDay,this.form).then(res=>{
            if(res.data.msg=='success') {
                this.alertRegister.text = "Horário de funcionamento alterado com sucesso!"
                this.alertRegister.variant = "success"
                this.loadOppeningHours()
                this.form = {
                    openning_hour: "",
                    closing_hour: "",
                    week_day: ""
                }
            }else {
                var msgCode = res.data.code
                switch (msgCode) {
                    case '001':
                        this.alertRegister.text = "Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!"
                        this.alertRegister.variant = "warning"
                    break;
                    case '002':
                        this.alertRegister.text = "O horário não foi encontrado! Outro usuário pode ter removido instantes atrás! "
                        this.alertRegister.variant = "warning"
                    break;
                    default:
                        this.alertRegister.text = "Não foi possível realizar a alteração, tente novamente mais tarde!"
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
    async loadOppeningHours() {
        this.loaded = false
        this.loader.text = 'Carregando dados...'
        this.loader.visible = true
        try {
            await this.$api.indexOppeningHours(this.slug,this.weekDay).then(res=> {
                if(res.data.msg=="success") {
                    this.oppeningHours = res.data.data
                    this.form = res.data.data
                    this.avaibleDays.push(this.weekDay)
                }else {
                    var msgCode = res.data.code
                    switch (msgCode) {
                    case '001':
                        this.alertRegister.text = "Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!"
                        this.alertRegister.variant = "warning"                        
                    break;
                    case '002':
                        this.alertRegister.text = "Nenhum horário de funcionamento cadastrado neste dia da semana!"
                        this.alertRegister.variant = "warning"                        
                    break;
                
                    default:
                        this.alertRegister.text = "Não foi possível carregar dados do usuário, tente novamente mais tarde!"
                        this.alertRegister.variant = "warning"  
                        this.blockAll = true
                    break;
                }
                    this.alertRegister.status = true
                    this.blockAll = true
                }
            })
        } catch (error) {
            console.log(error)
            this.alertRegister.text = "Algum erro aconteceu ao carregar o horário de funcionamento. Tente novamente mais tarde!"
            this.alertRegister.variant = 'danger'
            this.alertRegister.status = true
            this.blockAll = true
        }
        this.loaded = true
        this.loader.visible = false
    }
},
created() {
    this.loadOppeningHours()
}
}
</script>

<style lang="scss" scoped>
#formEditOppeningHour {
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
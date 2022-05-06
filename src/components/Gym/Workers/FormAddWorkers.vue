<template>
    <div>
        <FullLoader :text="loader.text" v-if="loader.visible"/>
        <b-form @submit.prevent="addWorker" id="formAddWorker">
            <b-alert :variant="alertRegister.variant" :show="alertRegister.status">{{alertRegister.text}}</b-alert>
            <div class="row" v-if="!blockAll">
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerName">Nome</label>
                        <input type="text" class="form-control" id="workerName" required v-model="form.name">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerCpf">CPF</label>
                        <input type="text" class="form-control" v-mask="'###.###.###-##'" id="workerCpf" required v-model="form.cpf">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerRg">RG</label>
                        <input type="text" class="form-control" v-mask="'##.###.###-N'" id="workerRg" required v-model="form.rg">
                    </div>
                    <div class="infoDetail">
                        <p class="mb-0"><i class="fas fa-info-circle mr-2"></i>Caso o final seja 10, colocar X</p>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerCep">CEP</label>
                        <input type="text" class="form-control" id="workerCep" v-mask="'#####-###'" required v-model="form.cep" @change.prevent="loadAddress">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerAddress">Endereço</label>
                        <input type="text" class="form-control" id="workerAddress" required v-model="form.address">
                    </div>
                </div>                
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerNeighborhood">Bairro</label>
                        <input type="text" class="form-control" id="workeNeighborhoodf" required v-model="form.neighborhood">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerCity">Cidade</label>
                        <input type="text" class="form-control" id="workerCity" required v-model="form.city">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerState">Estado</label>
                        <b-form-select id="workerState" v-model="form.state" required :options="statesFromBrazil()"></b-form-select>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerNumber">Número</label>
                        <input type="text" class="form-control" v-mask="'#########'" id="workerNumber" required v-model="form.number">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerEmail">Email</label>
                        <input type="email" class="form-control" id="workerEmail" required v-model="form.email">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerSalary">Salário</label>
                        <!-- <input type="text" class="form-control" id="workerSalary" required v-model="form.salary"> -->
                        <currency-input v-model="form.salary" :options="options" required/>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerPhone">Telefone</label>
                        <input type="text" class="form-control" v-mask="'(##) #####-####'" id="workerPhone" required v-model="form.phone">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerUsername">Usuário</label>
                        <input type="text" class="form-control" id="workerUsername" required v-model="form.username">
                    </div>
                    <div class="infoDetail">
                        <p class="mb-0"><i class="fas fa-info-circle mr-2"></i>Caracteres especiais e acentos serão removidos.</p>
                    </div>
                    <div class="infoDetail">
                        <p class="mb-0"><i class="fas fa-info-circle mr-2"></i>Espaços serão substítuidos por "-".</p>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerPassword">Senha</label>
                        <input type="password" class="form-control" id="workerPassword" required v-model="form.password"> 
                    </div>
                   <div class="infoDetail">
                        <p class="mb-0"><i class="fas fa-info-circle mr-2"></i>No mínimo 8 caracteres.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="workerPosition">Nível</label>
                        <select class="form-control" v-model="form.position_id" id="workerPosition" required>
                            <option disabled value="">Selecione</option>
                            <option :value="position.id" v-for="(position,index) in gymPositions" :key="index">{{position.name}}</option>
                        </select>
                        <!-- <b-form-select id="workerPosition" v-model="form.position_id" required :options="statesFromBrazil()"></b-form-select> -->
                    </div>
                </div>
                <div class="col-12">
                    <div class="d-flex justify-content-end align-items-center mt-5">
                        <button :disabled="bRegister.disabled" type="button" class="bPattern withIcon mr-sm-4" @click.prevent="openModal('modalPreventErrorWorkers')"><i class="fas fa-reply mr-2"></i>Voltar</button>
                        <button :disabled="bRegister.disabled" type="submit" class="bPattern withIcon"><i class="fas fa-plus mr-2"></i>{{bRegister.text}}</button>
                    </div>
                </div>
            </div>
        </b-form>
    </div>
</template>

<script>
import FullLoader from '@/components/FullLoader.vue'
import CurrencyInput  from '@/components/CurrencyInput.vue'
export default {
name: 'FormAddWorkers',
props:["slug"],
components: {
    FullLoader,
    CurrencyInput 
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
        options: {
            currency: 'BRL',
            locale: 'pt-BR',
            currencyDisplay: 'hidden',
            autoDecimalDigits: true,
            precision: 2,
            autoSign: false,
            useGrouping:true,
            valueRange: {
                min:0,
                max:undefined
            },
            hideCurrencySymbolOnFocus:false,
            hideGroupingSeparatorOnFocus:false
        },
        gymPositions: null,
        form: {
            name: "",
            cpf: "",
            rg: "",
            cep: "",
            address: "",
            neighborhood: "",
            city: "",
            state: "",
            number: "",
            email: "",
            salary: 0.0,
            phone: "",
            position_id: "",
            username: "",
            password: ""
        }
    }
},
methods: {
    cleanStr(str) {
        str = str.replaceAll(/[`~!@#$%+^&*()_|\=?;:'",.<>\{\}\[\]\\\/]/gi, '')
        str = str.replaceAll("-"," ")
        str = str.replaceAll(/[ ]/g,"-")
        str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        return str
    },
    async loadGymPositions() {
        this.loader.text = "Carregando opções..."
        this.loader.visible = true
        this.alertRegister.status = false
        try {
            await this.$api.getGymPositions(this.slug).then(res=> {
                if(res.data.msg=='success') {
                    if(res.data.data.length>0){
                        this.gymPositions = res.data.data
                    }else {
                        this.alertRegister.variant = "warning"
                        this.alertRegister.text = "É preciso cadastrar no mínimo uma posição(nível) para cadastrar um funcionário!"
                        this.alertRegister.status = true
                        this.blockAll = true
                    }
                }else {
                    this.alertRegister.variant = "danger"
                    this.alertRegister.text = "Não foi possível carregar as opções, recarregue e tente novamente!"
                    this.alertRegister.status = true
                    this.blockAll = true
                }
            })
        } catch (error) {
            this.alertRegister.variant = "danger"
            this.alertRegister.text = "Não foi possível carregar as opções, recarregue e tente novamente!"
            this.alertRegister.status = true
            this.blockAll = true
        }
        this.loader.visible = false
    },
    async addWorker() {        
        this.alertRegister.status = false
        this.bRegister.disabled = true
        this.bRegister.text = "Cadastrando"
        this.loader.text = "Solicitando cadastro..."
        this.loader.visible = true

        if(this.form.password.length<8) {
            this.alertRegister.text = "A digitada senha não atende os requisitos."
            this.alertRegister.variant = "warning"
            this.alertRegister.status = true
            this.bRegister.text = "Cadastrar"
            this.bRegister.disabled = false
            this.loader.visible = false
            return
        }
        if(!this.TestaCPF(this.form.cpf)) {
            this.alertRegister.text = "Digite um CPF válido"
            this.alertRegister.variant = "warning"
            this.alertRegister.status = true
            this.bRegister.text = "Cadastrar"
            this.bRegister.disabled = false
            this.loader.visible = false
            return
        }
        if(this.form.rg.length<12) {
            this.alertRegister.text = "Digite um RG válido"
            this.alertRegister.variant = "warning"
            this.alertRegister.status = true
            this.bRegister.text = "Cadastrar"
            this.bRegister.disabled = false
            this.loader.visible = false
            return
        }else if(isNaN(this.form.rg[11]) && this.form.rg[11].toUpperCase()!='X') {
            this.alertRegister.text = "Digite um RG válido"
            this.alertRegister.variant = "warning"
            this.alertRegister.status = true
            this.bRegister.text = "Cadastrar"
            this.bRegister.disabled = false
            this.loader.visible = false
            return
        }
        this.form.username = this.cleanStr(this.form.username)
        this.form.cep = this.form.cep.replaceAll("-","")
        this.form.phone = this.form.phone.replaceAll("-", '')
        this.form.phone = this.form.phone.replaceAll(/[() ]/gi, '')
        this.form.cpf = this.form.cpf.replaceAll('.', '');
        this.form.cpf = this.form.cpf.replaceAll('-', '');
        this.form.rg = this.form.rg.replaceAll('-', '');
        this.form.rg = this.form.rg.replaceAll('.', '');
        
        await this.$api.storeWorkers(this.slug,this.form).then(res=>{
            if(res.data.msg == 'success') {
                this.alertRegister.text = "Funcionário cadastrado com sucesso!"
                this.alertRegister.variant = "success"
                this.form = {
                    name: "",
                    cpf: "",
                    rg: "",
                    cep: "",
                    address: "",
                    neighborhood: "",
                    city: "",
                    state: "",
                    number: "",
                    email: "",
                    salary: 0.0,
                    phone: "",
                    position_id: "",
                    username: "",
                    password: ""
                }
            }else {
                var msgCode = res.data.code
                switch (msgCode) {
                    case '001':
                        this.alertRegister.text = "Verifique o slug e tente novamente. É aconselhável que saia e entre novamente no sistema!"
                        this.alertRegister.variant = "warning"
                        break;
                    case '002':
                        this.alertRegister.text = "Outro funcionário já foi cadastrado nesse CPF!"
                        this.alertRegister.variant = "warning"
                        break;
                    case '003':
                        this.alertRegister.text = "Outro funcionário já foi cadastrado nesse RG!"
                        this.alertRegister.variant = "warning"
                        break;
                    case '004':
                        this.alertRegister.text = "Outro usuário já foi cadastrado nesse usuário!"
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
        
    },
    TestaCPF(strCPF) {
        strCPF = strCPF.replaceAll('.', '');
        strCPF = strCPF.replaceAll('-', '');
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    },
    async loadAddress() {
        this.loader.text = "Buscando CEP..."
        this.loader.visible = true
        this.alertRegister.status = false
        var cleanCep = this.form.cep
        cleanCep = cleanCep.replaceAll("-","")
        if(cleanCep.length<8 && cleanCep!="") {
            this.alertRegister.variant = "danger"
            this.alertRegister.text = "Digite um CEP válido!"
            this.alertRegister.status = true
            return
        }
        try {
            await this.$api.getAddress(cleanCep).then(res=> {
                console.log(res.data)
                if(!res.data.erro) {
                    var cepInfo = res.data
                    this.form.city = cepInfo.localidade
                    this.form.state = cepInfo.uf
                    this.form.address = cepInfo.logradouro
                    this.form.neighborhood = cepInfo.bairro
                }else {
                    this.alertRegister.variant = "danger"
                    this.alertRegister.text = "Digite um CEP válido!"
                    this.alertRegister.status = true
                    return
                }
            })
        } catch (error) {
            console.log(error)
            this.alertRegister.variant = "warning"
            this.alertRegister.text = "Erro ao obter CEP"
            this.alertRegister.status = true
        }
        this.loader.visible = false
    }
},
created() {
    this.loadGymPositions()
}
}
</script>

<style lang="scss" scoped>
#formAddWorker {
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
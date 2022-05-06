<template>
    <div>
        <FullLoader :text="loader.text" v-if="loader.visible"/>
        <b-form @submit.prevent="registerGym" class="fRegister">
            <b-alert :variant="alertRegister.variant" :show="alertRegister.status">{{alertRegister.text}}</b-alert>
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="gymName">Nome da academia</label>
                        <input type="text" class="form-control" id="gymName" required v-model="form.name">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="gymCNPJ">CNPJ</label>
                        <input type="text" class="form-control" v-mask="'##.###.###/0001-##'" id="gymCNPJ" required v-model="form.cnpj">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="gymCEP">CEP</label>
                        <input type="text" class="form-control" v-mask="'#####-###'" id="gymCEP" required v-model="form.cep" @change.prevent="loadAddress">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="gymCity">Cidade</label>
                        <input type="text" class="form-control" id="gymCity" required v-model="form.city">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="gymState">Estado</label>
                        <b-form-select id="gymState" v-model="form.state" required :options="statesFromBrazil()"></b-form-select>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="gymNeighborhood">Bairro</label>
                        <input type="text" class="form-control" id="gymNeighborhood" required v-model="form.neighborhood">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="gymAddress">Endereço</label>
                        <input type="text" class="form-control" id="gymAddress" required v-model="form.address">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="gymNumber">Número</label>
                        <input type="text" class="form-control" id="gymNumber" required v-model="form.number">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="gymEmail">Email</label>
                        <input type="text" class="form-control" id="gymEmail" required v-model="form.email">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="gymPhone">Telefone</label>
                        <input type="text" class="form-control" id="gymPhone" v-mask="'(##) #####-####'" required v-model="form.phone">
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group">
                        <label for="gymSlug">Slug</label>
                        <input type="text" class="form-control" id="gymSlug" required v-model="form.slug">
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
                        <label for="gymUsername">Usuário</label>
                        <input type="text" class="form-control" id="gymUsername" required v-model="form.username">
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
                        <label for="gymPassword">Senha</label>
                        <input type="password" class="form-control" id="gymPassword" required v-model="form.password">
                    </div>
                    <div class="infoDetail">
                        <p class="mb-0"><i class="fas fa-info-circle mr-2"></i>No mínimo 8 caracteres.</p>
                    </div>
                </div>
                <div class="col-12">
                    <div class="d-flex justify-content-end align-items-center mt-5">
                        <button :disabled="bRegister.disabled" type="button" class="bPattern withIcon mr-sm-4" @click.prevent="goTo('/')"><i class="fas fa-reply mr-2"></i>Voltar</button>
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
name: 'FormRegister',
components: {
    FullLoader
},
data() {
    return {
        bRegister: {
            disabled: false,
            text: "Cadastrar"
        },
        loader: {
            text: "",
            visible: false
        },
        form: {
            name: "",
            cnpj: "",
            cep: "",
            city: "",
            state: "",
            neighborhood: "",
            address: "",
            number: "",
            email: "",
            phone: "",
            slug: "",
            username: "",
            password: ""
        },
        alertRegister: {
            status: false,
            text: "",
            variant: ""
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
    async registerGym() {
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
            return
        }

        this.form.slug = this.cleanStr(this.form.slug)
        this.form.username = this.cleanStr(this.form.username)
        this.form.cep = this.form.cep.replaceAll("-","")
        this.form.cnpj = this.form.cnpj.replaceAll("-","")
        this.form.cnpj = this.form.cnpj.replaceAll(".","")
        this.form.cnpj = this.form.cnpj.replaceAll("/","")
        this.form.cnpj = this.form.cnpj.replaceAll("/","")
        this.form.phone = this.form.phone.replaceAll("-", '')
        this.form.phone = this.form.phone.replaceAll(/[() ]/gi, '')

        try {
            await this.$api.registerGym(this.form).then(res=> {
                if(res.data.msg=="success") {

                }else if(res.data.code==1){
                    this.alertRegister.text = "Alguma academia em nosso sistema já possui o slug que você colocou, troque-o e tente novamente"
                    this.alertRegister.variant = "warning"
                    this.alertRegister.status = true
                }else {
                    this.alertRegister.text = "Algum erro aconteceu, tente novamente mais tarde!"
                    this.alertRegister.variant = "danger"
                    this.alertRegister.status = true
                }
            })
        } catch (error) {
            console.log(error)
            this.alertRegister.text = "Algum erro aconteceu, tente novamente mais tarde!"
            this.alertRegister.variant = "danger"
            this.alertRegister.status = true
        }

        this.loader.visible = false
        this.bRegister.text = "Cadastrar"
        this.bRegister.disabled = false
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
}
}
</script>

<style lang="scss" scoped>
.fRegister {
    padding: 50px 0;
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
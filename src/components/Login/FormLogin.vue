<template>
    <div class="row justify-content-center">
        <div class="col col-sm-10 col-md-8 col-lg-6">
            <b-alert :variant="alertLogin.variant" :show="alertLogin.status">{{alertLogin.text}}</b-alert>
            <b-form @submit.prevent="makeLogin" class="fLogin">
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <label for="userLogin">Usuário</label>
                            <input type="text" class="form-control" id="userLogin" v-model="form.username" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label for="passwordLogin">Senha</label>
                            <input type="password" class="form-control" id="passwordLogin" v-model="form.password" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-flex justify-content-center align-items-center containerButtons">
                            <button  type="button" @click.prevent="goTo('/register')" :disabled="bLogin.disabled" class="bPattern mr-4 mr-sm-5">Registrar</button>
                            <button type="submit" :disabled="bLogin.disabled" class="bPattern">{{bLogin.text}}</button>
                        </div>
                    </div>
                </div>
            </b-form>
        </div>
    </div>
</template>

<script>
export default {
name: 'FormLogin',
data() {
    return {
        bLogin: {
            text: 'Entrar',
            disabled: false
        },
        form: {
            username: '',
            password: '',
            slug: ''
        },
        alertLogin: {
            status: false,
            msg: '',
            variant: ''
        }
    }
},
methods: {
    verifyUsername() {
        this.form.username = this.form.username.trim()
        if(!this.form.username.includes("@")) {
            this.alertLogin.text = "Usuário ou senha incorretos!"
            this.alertLogin.variant = "danger"
            this.alertLogin.status = true
            this.form.username = ""
            this.form.password = ""
            return false
        }
        var gymName = this.form.username.split("@")[1]
        if(!gymName) {
            this.alertLogin.text = "Usuário ou senha incorretos!"
            this.alertLogin.variant = "danger"
            this.alertLogin.status = true
            this.form.username = ""
            this.form.password = ""
            return false
        }
        this.form.slug = gymName
        return true
    },
    makeLogin() {
        this.alertLogin.status = false
        this.bLogin.disabled = true
        this.bLogin.text = "Entrando"
        
        if(!this.verifyUsername()) {
            this.bLogin.disabled = false
            this.bLogin.text = "Entrar"
            return
        }else {
            let dataSend = {
                username: this.form.username,
                password: this.form.password,
                slug: this.form.slug
            }
            dataSend.username = dataSend.username.split("@")[0]
            this.$api.login(dataSend).then(res=> {
                if(res.data.me) {
                    this.$store.commit('SET_ME',res.data.me)
                    window.localStorage.token = res.data.access_token
                    this.$router.push(`/${this.form.slug}/dashboard`)
                }else {
                    this.alertLogin.msg = "Usuário ou senha incorretos!"
                    this.alertLogin.variant = "danger"
                    this.alertLogin.status = true
                }
            }).catch(err=> {
                this.alertLogin.msg = "Usuário ou senha incorretos!"
                this.alertLogin.variant = "danger"
                this.alertLogin.status = true
            })
        }

        
        this.bLogin.disabled = false
        this.bLogin.text = "Entrar"
    }
}
}
</script>

<style lang="scss" scoped>
    .fLogin {
        .containerButtons {
            margin-top: 30px;
        }
    }
</style>
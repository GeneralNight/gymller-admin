<template>
    <div class="d-flex containerRegisterHeader justify-content-between align-items-end align-items-lg-center flex-column flex-lg-row">
        <div class="d-flex flex-column flex-sm-row align-items-lg-center containerContent">
            <img src="@/assets/img/Logo.png" alt="Logo" class="logo">
            <div class="containerHeaderTexts">
                <p class="headerText mb-0">Registrar academia</p>
                <p class="headerSubText mb-0">Preencha os dados para solicitar cadastro em nossa plataforma.</p>
            </div>
        </div>
        <button class="bPattern withIcon" @click.prevent="goTo('/')"><i class="fas fa-reply mr-2"></i>Voltar</button>
    </div>
</template>

<script>
export default {
name: 'RegisterHeader'
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
.containerRegisterHeader {
    .logo {
        max-width: 100px;
    }

    .containerContent {
        @include d(xs) {
            width: 100%;
        }
    }

    .containerHeaderTexts {
        margin-left: 25px;
        @include d(xs) {
            margin-left: 0;
        }
    }

    .headerText {
        color: #fff;
        font-size: 2rem;
        font-weight: 700;

        @include d(xs) {
            font-size: 1.5rem;
            margin-top: 15px;
        }
    }

    .headerSubText {
        font-size: 1.15rem;
        color: #fff;
        @include d(xs) {
            font-size: 1rem;
            margin-top: 5px;
        }
    }

    button {
        margin-top: 25px;
    }
}
</style>
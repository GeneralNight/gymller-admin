<template>
    <div>
        <Menu :slug="slug"/>
        <section id="containerStudentsConnect">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="d-flex justify-content-between align-items-center containrPageHeader">
                            <p class="pageName mb-0"><i class="fas fa-link mr-2"></i>Connectar Alunos</p>
                            <div>
                                <button class="bPattern withIcon" @click.prevent="goTo(`/${slug}/alunos/`)"><i class="fas fa-reply mr-2"></i>Voltar</button>
                            </div>
                        </div>
                        <StudentsConnectList :slug="slug"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import StudentsConnectList from '@/components/Gym/Students/StudentsConnectList.vue'
export default {
name: 'StudentsConnect',
props: ["slug"],
components: {
    StudentsConnectList
},
data() {
    return {

    }
},
methods: {

}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
#containerStudentsConnect {
    padding: 50px 0;
    @include d(xs) {
        padding: 30px 0;
    }

    .containrPageHeader {
        margin-bottom: 30px;
        .pageName{
            font-size: 2rem;
            color: #fff;
            font-weight: 700;
            i {
               transform: scale(.8);
            }
        }
    }    
}
</style>
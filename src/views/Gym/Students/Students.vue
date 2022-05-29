<template>
    <div>
        <Menu :slug="slug"/>
        <section id="containerStudents">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="d-flex justify-content-between align-items-center containrPageHeader">
                            <p class="pageName mb-0"><i class="fas fa-users mr-2"></i> Alunos</p>
                            <div>
                                <button class="bPattern withIcon" @click.prevent="goTo(`/${slug}/alunos/connect`)"><i class="fas fa-link mr-2"></i>Conectar</button>
                            </div>
                        </div>
                        <StudentsList :slug="slug"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import StudentsList from '@/components/Gym/Students/StudentsList.vue'
export default {
name: 'Students',
props:["slug"],
components: {
    StudentsList
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
#containerStudents {
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
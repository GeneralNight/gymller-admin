<template>
    <div>
        <div class="defaultList" v-if="loaded">
            <div v-if="!someError">
                <div class="containerAllItems" v-if="students.length>0">
                    <div class="item d-flex justify-content-between align-items-center" v-for="(student,index) in students" :key="index">
                        <p class="itemName mb-0">{{student.name}}</p>
                        <div class="itemActions d-flex align-items-end">
                            <div @click.prevent="goTo(`/${slug}/alunos/${student.id}/fichas-treino`)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-list"></i></div>
                            <div @click.prevent="removeStudent(student)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-trash-alt"></i></div>
                        </div>
                    </div>
                    <ModalRemoveStudent :someDelete.sync="someDelete" :student="studentRemove" :slug="slug"/>
                </div>
                <div class="noStudents" v-else>
                    <b-alert variant="warning" show><i class="fas fa-info-circle mr-2"></i>Nenhum aluno encontrado.</b-alert>
                </div>
            </div>
            <div class="noStudents" v-else>
                <b-alert variant="danger" show><i class="fas fa-info-circle mr-2"></i>{{someErrorMsg}}</b-alert>
            </div>
        </div>
        <LoaderInList v-else class="mt-5" :text="'Carregando alunos...'"/>
    </div>
</template>

<script>
import LoaderInList from '@/components/LoaderInList.vue'
import ModalRemoveStudent from '@/components/Gym/Students/ModalRemoveStudent.vue'
export default {
name: 'StudentsList',
props:['slug'],
components: {
    LoaderInList,
    ModalRemoveStudent
},
data() {
    return {
        loaded: false,
        someError: false,
        someErrorMsg: "",
        studentRemove: null,
        someDelete: false,
        students: [
           
        ]
    }
},
methods: {
    removeStudent(student) {
        this.studentRemove = student
        this.openModal("modalRemoveStudents")
    },
    async loadStudents() {
        this.loaded = false
        this.someError = false
        try {
            await this.$api.getGymStudents(this.slug).then(res=> {
                if(res.data.msg=="success") {
                    this.students = res.data.data                    
                }else {
                    this.someErrorMsg = "Verifique o slug da url e tente novamente. Caso não resolva, saia e entre no sistema novamente."
                    this.someError = true
                }
            })
        } catch (error) {
            console.log(error)
            this.someErrorMsg = "Algum erro aconteceu ao carregar os exercícios. Tente novamente mais tarde!"
            this.someError = true
        }
        this.loaded = true
    }
},
created() {
    this.loadStudents()
},
watch: {
    someDelete() {
        this.loadStudents()
    }
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
.defaultList {
    .openTime {
        color: #00ca8d;
    }
    .closeTime {
        color: #ca0000;
    }
    .containerAllItems {
        .item {
            color: #434343;
            background: #f6f6f6;
            padding: 15px 20px;
            border-radius: 5px;

            & + .item {
                margin-top: 30px;
            }

            .itemName {
                font-weight: 700;
                font-size: 1.25rem;

                @include d(xs) {
                    font-size: 1rem;
                }
            }

            .itemActions {
                .action {
                    background: #434343;
                    color: #fff;
                    height: 40px;
                    width: 40px;
                    font-size: 1.15rem;
                    border-radius: 5px;
                    box-shadow: 0 0 3px rgba(0,0,0,.5);
                    transition: .2s;
                    cursor: pointer;
                    @include d(xs) {
                        font-size: 1rem;
                        width: 35px;
                        height: 35px;
                    }
                    &:hover {
                        background: #00ca8d;
                    }
                    & + .action {
                        margin-left: 20px;
                        @include d(xs) {
                            margin-left: 15px;
                        }
                    }
                }
            }
        }
    }
}
</style>
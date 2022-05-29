<template>
    <div>
        <div class="workersList" v-if="loaded">
            <div v-if="!someError">
                <div class="containerAllWorkers" v-if="workers.length>0">
                    <div class="worker d-flex justify-content-between align-items-center" v-for="(worker,index) in workers" :key="index">
                        <p class="workerName mb-0">{{worker.name}}</p>
                        <div class="itemActions d-flex align-items-end">
                            <div @click.prevent="goTo(`/${slug}/funcionarios/editar/${worker.id}`)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-edit"></i></div>
                            <div @click.prevent="removeWorker(worker)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-trash-alt"></i></div>
                        </div>
                    </div>
                    <ModalRemoveWorkers :someDelete.sync="someDelete" :worker="workerRemove" :slug="slug"/>
                </div>
                <div class="noWorker" v-else>
                    <b-alert variant="warning" show><i class="fas fa-info-circle mr-2"></i>Nenhum funcionário cadastrado.</b-alert>
                </div>
            </div>
            <div class="noWorker" v-else>
                    <b-alert variant="danger" show><i class="fas fa-info-circle mr-2"></i>{{someErrorMsg}}</b-alert>
                </div>
        </div>
        <LoaderInList v-else class="mt-5" :text="'Carregando funcionários...'"/>
    </div>
</template>

<script>
import LoaderInList from '@/components/LoaderInList.vue'
import ModalRemoveWorkers from '@/components/Gym/Workers/ModalRemoveWorkers.vue'
export default {
name: 'WorkersList',
props:["slug"],
components: {
    LoaderInList,
    ModalRemoveWorkers
},
data() {
    return {
        loaded: false,
        someError: false,
        someErrorMsg: "",
        workerRemove: null,
        someDelete: false,
        workers: [
           
        ]
    }
},
methods: {
    removeWorker(worker) {
        this.workerRemove = worker
        this.openModal("modalRemoveWorker")
    },
    async loadWorkers() {
        this.loaded = false
        try {
            await this.$api.getWorkers(this.slug).then(res=> {
                if(res.data.msg=="success") {
                    res.data.data = res.data.data.filter(c=>c.name!='admin-master')
                    this.workers = res.data.data
                }else {
                    this.someErrorMsg = "Verifique o slug da url e tente novamente. Caso não resolva, saia e entre no sistema novamente."
                    this.someError = true
                }
            })
        } catch (error) {
            console.log(error)
            this.someErrorMsg = "Algum erro aconteceu ao carregar os funcionários. Tente novamente!"
            this.someError = true
        }
        this.loaded = true
    }
},
watch: {
    someDelete() {
        this.loadWorkers()
    }
},
created() {
    this.loadWorkers()
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
.workersList {
    .containerAllWorkers {
        .worker {
            color: #434343;
            background: #f6f6f6;
            padding: 15px 20px;
            border-radius: 5px;

            & + .worker {
                margin-top: 30px;
            }

            .workerName {
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
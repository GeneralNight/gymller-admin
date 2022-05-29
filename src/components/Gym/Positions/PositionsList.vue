<template>
    <div>
        <div class="defaultList" v-if="loaded">
            <div v-if="!someError">
                <div class="containerAllItems" v-if="positions.length>0">
                    <div class="item d-flex justify-content-between align-items-center" v-for="(position,index) in positions" :key="index">
                        <p class="itemName mb-0">{{position.name}}</p>
                        <div class="itemActions d-flex align-items-end">
                            <div @click.prevent="goTo(`/${slug}/niveis-de-acesso/editar/${position.id}`)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-edit"></i></div>
                            <div @click.prevent="removePosition(position)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-trash-alt"></i></div>
                        </div>
                    </div>
                    <ModalRemovePositions :someDelete.sync="someDelete" :position="positionRemove" :slug="slug"/>
                </div>
                <div class="noPosition" v-else>
                    <b-alert variant="warning" show><i class="fas fa-info-circle mr-2"></i>Nenhum nível de acesso cadastrado.</b-alert>
                </div>
            </div>
            <div class="noPosition" v-else>
                <b-alert variant="danger" show><i class="fas fa-info-circle mr-2"></i>{{someErrorMsg}}</b-alert>
            </div>
        </div>
        <LoaderInList v-else class="mt-5" :text="'Carregando níveis de acesso...'"/>
    </div>
</template>

<script>
import LoaderInList from '@/components/LoaderInList.vue'
import ModalRemovePositions from '@/components/Gym/Positions/ModalRemovePositions.vue'
export default {
name: 'PositionsList',
props:["slug"],
components: {
    LoaderInList,
    ModalRemovePositions
},
data() {
    return {
        loaded: false,
        someError: false,
        someErrorMsg: "",
        positionRemove: null,
        someDelete: false,
        positions: [
           
        ]
    }
},
methods: {
    removePosition(position) {
        this.positionRemove = position
        this.openModal("modalRemovePositions")
    },
    async loadPositions() {
        this.loaded = false
        try {
            await this.$api.getGymPositions(this.slug).then(res=> {
                if(res.data.msg=="success") {
                    res.data.data = res.data.data.filter(c=>c.name!='admin-master')
                    this.positions = res.data.data
                }else {
                    this.someErrorMsg = "Verifique o slug da url e tente novamente. Caso não resolva, saia e entre no sistema novamente."
                    this.someError = true
                }
            })
        } catch (error) {
            console.log(error)
            this.someErrorMsg = "Algum erro aconteceu ao carregar os níveis de acesso. Tente novamente mais tarde!"
            this.someError = true
        }
        this.loaded = true
    }
},
created() {
    this.loadPositions()
},
watch: {
    someDelete() {
        this.loadPositions()
    }
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
.defaultList {
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
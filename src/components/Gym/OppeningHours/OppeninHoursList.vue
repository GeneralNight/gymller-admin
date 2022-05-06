<template>
    <div class="defaultList" v-if="loaded">
        <div v-if="!someError">
            <div class="containerAllItems" v-if="oppeningHours.length>0">
                <div class="item d-flex justify-content-between align-items-center" v-for="(oppeningHour,index) in oppeningHours" :key="index">
                    <p class="itemName mb-0">{{setWeekDay(oppeningHour.week_day)}} | <span class="openTime">{{oppeningHour.openning_hour}}</span> | <span class="closeTime">{{oppeningHour.closing_hour}}</span></p>
                    <div class="itemActions d-flex align-items-end">
                        <div @click.prevent="goTo(`/${slug}/horario-de-funcionamento/editar/${oppeningHour.week_day}`)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-edit"></i></div>
                        <div @click.prevent="removeOppeningHour(oppeningHour)" class="action d-flex justify-content-center align-items-center"><i class="fas fa-trash-alt"></i></div>
                    </div>
                </div>
                <ModalRemoveOppeningHours :someDelete.sync="someDelete" :oppeningHour="oppeningHourRemove" :slug="slug"/>
            </div>
            <div class="noOppeningHour" v-else>
                <b-alert variant="warning" show><i class="fas fa-info-circle mr-2"></i>Nenhum horário de funcionamento cadastrado.</b-alert>
            </div>
        </div>
        <div class="noOppeningHour" v-else>
            <b-alert variant="danger" show><i class="fas fa-info-circle mr-2"></i>{{someErrorMsg}}</b-alert>
        </div>
    </div>
    <LoaderInList v-else class="mt-5" :text="'Carregando horários de funcionamento...'"/>
</template>

<script>
import LoaderInList from '@/components/LoaderInList.vue'
import ModalRemoveOppeningHours from '@/components/Gym/OppeningHours/ModalRemoveOppeningHours.vue'
export default {
name: 'OppeninHoursList',
props:["slug",'avaibleDays'],
components: {
    LoaderInList,
    ModalRemoveOppeningHours
},
data() {
    return {
        loaded: false,
        someError: false,
        someErrorMsg: "",
        oppeningHourRemove: null,
        someDelete: false,
        oppeningHours: [
           
        ]
    }
},
methods: {
    verifyAvaibleDays() {
        var avaibleDaysLeft = []
        if(this.oppeningHours.length<7) {
            for(var i=0;i<7;i++) {
                if(this.oppeningHours.filter(c=>c.week_day==i).length==0) {
                    avaibleDaysLeft.push(i)
                }
            }
            this.$emit("update:avaibleDays",avaibleDaysLeft)
        }
    },
    removeOppeningHour(position) {
        this.oppeningHourRemove = position
        this.openModal("modalRemoveOppeningHours")
    },
    async loadPositions() {
        this.loaded = false
        try {
            await this.$api.getOppeningHours(this.slug).then(res=> {
                if(res.data.msg=="success") {
                    this.oppeningHours = res.data.data
                    this.verifyAvaibleDays()
                }else {
                    this.someErrorMsg = "Verifique o slug da url e tente novamente. Caso não resolva, saia e entre no sistema novamente."
                    this.someError = true
                }
            })
        } catch (error) {
            console.log(error)
            this.someErrorMsg = "Algum erro aconteceu ao carregar os horários de funcionamento. Tente novamente mais tarde!"
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
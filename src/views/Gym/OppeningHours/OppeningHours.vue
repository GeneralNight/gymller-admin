<template>
  <div>
      <Menu :slug="slug"/>
      <section id="containerOppeningHours">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="d-flex justify-content-between align-items-center containrPageHeader">
                            <p class="pageName mb-0"><i class="fas fa-clock mr-2"></i> Horário de funcionamento</p>
                            <button v-if="avaibleDays.length>0" class="bPattern withIcon" @click.prevent="goTo(`/${slug}/horario-de-funcionamento/novo`)"><i class="fas fa-plus mr-2"></i>Novo</button>
                        </div>
                        <OppeninHoursList :avaibleDays.sync="avaibleDays" :slug="slug"/>
                    </div>
                </div>
            </div>
        </section>
  </div>
</template>

<script>
import OppeninHoursList from '@/components/Gym/OppeningHours/OppeninHoursList.vue'
export default {
name: 'OppeningHours',
props:["slug"],
components: {
    OppeninHoursList
},
data() {
    return {
        avaibleDays: []
    }
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
#containerOppeningHours {
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
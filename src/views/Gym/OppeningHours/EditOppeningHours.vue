<template>
  <div>
        <Menu :slug="slug"/>
        <section id="containerUpdatePositions">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="d-flex justify-content-between align-items-center containrPageHeader">
                            <p class="pageName mb-0"><i class="fas fa-clock mr-2"></i> Editar horário de funcionamento</p>
                            <button class="bPattern withIcon" @click.prevent="openModal('modalPreventErrorOppeningHours')"><i class="fas fa-reply mr-2"></i>Voltar</button>
                        </div>
                        <FormEditOppeningHours :weekDay.sync="weekDay" :slug="slug"/>
                        <ModalPreventErrorOppeningHours :slug="slug" :path="`/${slug}/horario-de-funcionamento/`" :origin="'add'"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import ModalPreventErrorOppeningHours from '@/components/Gym/OppeningHours/ModalPreventErrorOppeningHours.vue'
import FormEditOppeningHours from '@/components/Gym/OppeningHours/FormEditOppeningHours.vue'
export default {
name: 'EditPositions',
props:["slug","weekDay"],
components: {
    ModalPreventErrorOppeningHours,
    FormEditOppeningHours
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
#containerUpdatePositions {
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
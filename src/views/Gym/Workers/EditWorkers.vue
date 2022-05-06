<template>
    <div>
        <Menu :slug="slug"/>
        <section id="containerUpdateWorkers">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="d-flex justify-content-between align-items-center containrPageHeader">
                            <p class="pageName mb-0"><i class="fas fa-user mr-2"></i> Editar funcionário</p>
                            <button class="bPattern withIcon" @click.prevent="openModal('modalPreventErrorWorkers')"><i class="fas fa-reply mr-2"></i>Voltar</button>
                        </div>
                        <FormEditWorkers :workerId.sync="workerId" :slug="slug"/>
                        <ModalPreventErrorWorkers :slug="slug" :path="`/${slug}/funcionarios/`" :origin="'add'"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import ModalPreventErrorWorkers from '@/components/Gym/Workers/ModalPreventErrorWorkers.vue'
import FormEditWorkers from '@/components/Gym/Workers/FormEditWorkers.vue'
export default {
name: 'AddWorkers',
props:["slug","workerId"],
components: {
    ModalPreventErrorWorkers,
    FormEditWorkers
},
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
#containerUpdateWorkers {
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
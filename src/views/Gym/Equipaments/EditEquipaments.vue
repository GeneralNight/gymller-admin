<template>
    <div>
        <Menu :slug="slug"/>
        <section id="containerUpdateEquipaments">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="d-flex justify-content-between align-items-center containrPageHeader">
                            <p class="pageName mb-0"><i class="fas fa-dumbbell mr-2"></i> Editar Equipamento</p>
                            <button class="bPattern withIcon" @click.prevent="openModal('modalPreventErrorEquipaments')"><i class="fas fa-reply mr-2"></i>Voltar</button>
                        </div>
                        <FormEditEquipaments :equipamentId="equipamentId" :slug="slug"/>
                        <ModalPreventErrorEquipaments :slug="slug" :path="`/${slug}/aparelhos/`" :origin="'edit'"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import ModalPreventErrorEquipaments from  '@/components/Gym/Equipaments/ModalPreventErrorEquipaments.vue'
import FormEditEquipaments from  '@/components/Gym/Equipaments/FormEditEquipaments.vue'
export default {
name: 'EditEquipaments',
props: ['slug','equipamentId'],
components: {
    ModalPreventErrorEquipaments,
    FormEditEquipaments
},
data() {
    return {

    }
},
methods: {

},
computed: {
    ...mapState([''])
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
#containerUpdateEquipaments {
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
<template>
    <div>
        <Menu :slug="slug"/>
        <section id="containerAddEquipaments">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="d-flex justify-content-between align-items-center containrPageHeader">
                            <p class="pageName mb-0"><i class="fas fa-dumbbell mr-2"></i>Novo aparelho</p>
                            <button class="bPattern withIcon" @click.prevent="openModal('modalPreventErrorEquipaments')"><i class="fas fa-reply mr-2"></i>Voltar</button>
                        </div>
                        <FormAddEquipaments :slug="slug"/>
                        <ModalPreventErrorEquipaments :slug="slug" :path="`/${slug}/aparelhos/`" :origin="'add'"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import FormAddEquipaments from '@/components/Gym/Equipaments/FormAddEquipaments.vue'
import ModalPreventErrorEquipaments from '@/components/Gym/Equipaments/ModalPreventErrorEquipaments.vue'
export default {
name: 'AddExerciseEquipament',
props: ['slug'],
components: {
    FormAddEquipaments,
    ModalPreventErrorEquipaments
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
#containerAddEquipaments {
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
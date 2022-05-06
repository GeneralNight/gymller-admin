<template>
    <div>
        <Menu :slug="slug"/>
        <section id="containerAddPositions">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="d-flex justify-content-between align-items-center containrPageHeader">
                            <p class="pageName mb-0"><i class="fas fa-sitemap mr-2"></i>Novo nível de acesso</p>
                            <button class="bPattern withIcon" @click.prevent="openModal('modalPreventErrorPositions')"><i class="fas fa-reply mr-2"></i>Voltar</button>
                        </div>
                        <FormAddPositions :slug="slug"/>
                        <ModalPreventErrorPositions :slug="slug" :path="`/${slug}/niveis-de-acesso/`" :origin="'add'"/>
                    </div>
                </div>
            </div>
        </section>
    </div>    
</template>

<script>
import ModalPreventErrorPositions from '@/components/Gym/Positions/ModalPreventErrorPositions.vue'
import FormAddPositions from '@/components/Gym/Positions/FormAddPositions.vue'
export default {
name: 'AddPositions',
props:["slug"],
components: {
    ModalPreventErrorPositions,
    FormAddPositions
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
#containerAddPositions {
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
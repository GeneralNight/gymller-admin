<template>
    <div>
        <Menu :slug="slug"/>
        <section id="containerPositions">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="d-flex justify-content-between align-items-center containrPageHeader">
                            <p class="pageName mb-0"><i class="fas fa-sitemap mr-2"></i> Níveis de acesso</p>
                            <button class="bPattern withIcon" @click.prevent="goTo(`/${slug}/niveis-de-acesso/novo`)"><i class="fas fa-plus mr-2"></i>Novo</button>
                        </div>
                        <PositionsList :slug="slug"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import PositionsList from '@/components/Gym/Positions/PositionsList.vue'
export default {
name: 'Positions',
props:["slug"],
components: {
    PositionsList
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
#containerPositions {
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
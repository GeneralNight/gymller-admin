<template>
    <div>
        <Menu :slug="slug"/>
        <section id="containerWorkers">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="d-flex justify-content-between align-items-center containrPageHeader">
                            <p class="pageName mb-0"><i class="fas fa-user mr-2"></i> Funcionários</p>
                            <button class="bPattern withIcon" @click.prevent="goTo(`/${slug}/funcionarios/novo`)"><i class="fas fa-user-plus mr-2"></i>Novo</button>
                        </div>
                        <WorkersList :slug="slug"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import WorkersList from '@/components/Gym/Workers/WorkersList.vue'
export default {
name: "Workers",
props:["slug"],
components: {
    WorkersList
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
#containerWorkers {
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
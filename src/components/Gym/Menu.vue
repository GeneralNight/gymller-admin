<template>
    <header id="containerHeader">
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="containerSysName d-flex align-items-center">
                            <img src="@/assets/img/Logo.png" alt="Logo" class="logo">
                            <p class="sysName mb-0">Gymller</p>
                        </div>
                        <button class="bPattern withIcon d-flex align-items-center" v-b-toggle.sidebarMenu><i class="fas fa-bars mr-sm-2 mr-md-3"></i><span class="d-none d-sm-block">Menu</span></button>
                    </div>
                    <SideBarMenu :slug="slug"/>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import SideBarMenu from '@/components/Gym/SideBarMenu.vue'
export default {
name: 'Menu',
props:["slug"],
components: {
    SideBarMenu
}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';
#containerHeader {
    background: #434343;
    box-shadow: 0 2px 5px rgba(0,0,0,.5);
    padding: 20px 50px;
    border-radius: 0 0 5px 5px;

    @include d(sm) {
        padding: 20px 15px;
    }

    @include d(xs) {
        padding: 20px 0px;
    }

    .logo {
        max-width: 100px;
        @include d(xs) {
            max-width: 80px;
        }
    }

    .sysName {
        color: #fff;
        font-size: 2rem;
        margin-left: 25px;
        font-weight: 700;

        @include d(xs) {
            font-size: 1.5rem;
            margin-left: 15px;
        }
    }
}
</style>
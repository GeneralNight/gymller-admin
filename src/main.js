import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMask from 'v-mask'
import {methods} from '@/js/Helpers.js'
import {api} from './services.js'
Vue.prototype.$api = api
Vue.mixin({
  methods
})
import Menu from '@/components/Gym/Menu.vue'
Vue.component('Menu',Menu)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMask);

Vue.config.productionTip = false




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

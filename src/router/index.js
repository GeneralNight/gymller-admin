import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Login/Home.vue'
import Register from '@/views/Login/Register.vue'
import Dashboard from '@/views/Gym/Dashboard.vue'
import Workers from '@/views/Gym/Workers/Workers.vue'
import AddWorkers from '@/views/Gym/Workers/AddWorkers.vue'
import EditWorkers from '@/views/Gym/Workers/EditWorkers.vue'
import Positions from '@/views/Gym/Positions/Positions.vue'
import AddPositions from '@/views/Gym/Positions/AddPositions.vue'
import EditPositions from '@/views/Gym/Positions/EditPositions.vue'
import OppeningHours from '@/views/Gym/OppeningHours/OppeningHours.vue'
import AddOppeningHours from '@/views/Gym/OppeningHours/AddOppeningHours.vue'
import EditOppeningHours from '@/views/Gym/OppeningHours/EditOppeningHours.vue'
import Equipaments from '@/views/Gym/Equipaments/Equipaments.vue'
import AddEquipaments from '@/views/Gym/Equipaments/AddEquipaments.vue'
import EditEquipaments from '@/views/Gym/Equipaments/EditEquipaments.vue'
import Exercises from '@/views/Gym/Exercises/Exercises.vue'
import AddExercises from '@/views/Gym/Exercises/AddExercises.vue'

Vue.use(VueRouter)

const routes = [
  // {path:'/:slug',redirect:'/:slug/dashboard'},
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/:slug/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    props: true
  },
  {
    path: '/:slug/funcionarios',
    name: 'Workers',
    component: Workers,
    props: true
  },
  {
    path: '/:slug/funcionarios/novo',
    name: 'AddWorkers',
    component: AddWorkers,
    props: true
  },
  {
    path: '/:slug/funcionarios/editar/:workerId',
    name: 'EditWorkers',
    component: EditWorkers,
    props: true
  },
  {
    path: '/:slug/niveis-de-acesso',
    name: 'Positions',
    component: Positions,
    props: true
  },
  {
    path: '/:slug/niveis-de-acesso/novo',
    name: 'AddPositions',
    component: AddPositions,
    props: true
  },
  {
    path: '/:slug/niveis-de-acesso/editar/:positionId/',
    name: 'EditPositions',
    component: EditPositions,
    props: true
  },
  {
    path: '/:slug/horario-de-funcionamento/',
    name: 'OppeningHours',
    component: OppeningHours,
    props: true
  },
  {
    path: '/:slug/horario-de-funcionamento/novo',
    name: 'AddOppeningHours',
    component: AddOppeningHours,
    props: true
  },
  {
    path: '/:slug/horario-de-funcionamento/editar/:weekDay/',
    name: 'EditOppeningHours',
    component: EditOppeningHours,
    props: true
  },
  {
    path: '/:slug/aparelhos',
    name: 'Equipaments',
    component: Equipaments,
    props: true
  },
  {
    path: '/:slug/aparelhos/novo',
    name: 'AddEquipaments',
    component: AddEquipaments,
    props: true
  },
  {
    path: '/:slug/aparelhos/editar/:equipamentId',
    name: 'EditEquipaments',
    component: EditEquipaments,
    props: true
  },
  {
    path: '/:slug/exercicios/',
    name: 'Exercises',
    component: Exercises,
    props: true
  },
  {
    path: '/:slug/exercicios/novo',
    name: 'AddExercises',
    component: AddExercises,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

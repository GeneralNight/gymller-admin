import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    me: null,
    exerciseName: ''
  },
  mutations: {
    SET_EXERCISE_NAME(state,payload) {
      state.exerciseName = payload
    },
    SET_ME(state,payload) {
      state.me = payload
    }
  },
  actions: {
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

import user from './user/index'
import applications from './applications/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    applications
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    einheiten: [
      "g", "kg", "l", "ml", "Stück", "Bündel", "Löffel"
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

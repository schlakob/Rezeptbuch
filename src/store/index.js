import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    einheiten: [
      "g", "kg", "l", "ml", "Stück", "Bündel", "Löffel"
    ],
    urlImgSize: "_1280x720",
    urlImgBase: "https://firebasestorage.googleapis.com/v0/b/rezeptbuch-18dac.appspot.com/o/rezeptBilder%2F"
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    einheiten: [
      "g", "kg", "l", "ml", "Stück", "Bündel", "Löffel"
    ],
    urlImgSize: "_1280x720",
    ImgDefault: "https://firebasestorage.googleapis.com/v0/b/rezeptbuch-18dac.appspot.com/o/rezeptBilder%2F1_1280x720.jpg?alt=media&token=5220c7f6-ad58-4f17-9a24-1f1cefb1806a"
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import "./assets/materialKit.scss";
import { firestorePlugin } from 'vuefire';
import {auth} from './firebase/auth' 

Vue.use(VueMaterial)
Vue.use(firestorePlugin)

Vue.config.productionTip = false

let app;

auth.onAuthStateChanged(user => {
    if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
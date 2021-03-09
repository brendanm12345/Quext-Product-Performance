import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import { VueCsvImportPlugin } from "../node_modules/vue-csv-import/src";

Vue.use(VueCsvImportPlugin);

Vue.config.productionTip = false

new Vue({
  router,
  Vuetify,
  render: h => h(App)
}).$mount('#app')

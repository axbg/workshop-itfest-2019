import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Toasted from 'vue-toasted';

const Options = {
  duration: 1500,
  singleton: true
};

Vue.config.productionTip = false

Vue.use(VueMaterial);
Vue.use(Toasted, Options);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

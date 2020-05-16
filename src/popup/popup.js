import Vue from 'vue'
import App from './App'
import store from '../store'
import router from './router'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'vue-swatches/dist/vue-swatches.css'

Vue.use(Buefy, {
  defaultIconPack: 'fas'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  Buefy,
  render: h => h(App)
})

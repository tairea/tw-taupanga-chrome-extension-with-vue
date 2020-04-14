import Vue from 'vue'
import App from './App'
import store from '../store'
import router from './router'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  Buefy,
  render: h => h(App)
})

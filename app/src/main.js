import Vue from 'vue'
import Electron from 'vue-electron'
import store from './vuex/store'
import App from './App'
import 'expose?$!expose?jQuery!jquery'
require('../static/semantic.min.css')
require('../static/style.css')
// require('../static/themes/basic/assets/fonts')
require('../static/semantic.min.js')
require('jquery.marquee')

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)
Vue.use(Electron)
Vue.config.debug = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  ...App
})

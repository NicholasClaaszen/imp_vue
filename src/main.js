import Vue from 'vue'
import Vuex from 'vuex'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { store } from './_store'
import { router } from './_helpers'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'es6-promise/auto'

require('./assets/css/common.css')

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const vm = new Vue({
  router,
  store,
  render: h => h(App)
})

vm.$mount('#app')

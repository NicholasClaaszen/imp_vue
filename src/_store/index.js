import Vue from 'vue'
import Vuex from 'vuex'

import { authentication } from './authentication.module'
import { alert } from './alert.module'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    authentication,
    alert
  }
})

import { authService } from '../_services'
import { router } from '../_helpers'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? {
    status: {
      loggedIn: true,
      manager: user.manager,
      corporation: user.corporation,
      id: user.id
    },
    user
  }
  : { status: {}, user: null }
export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    bundle ({ dispatch, commit }, { token }) {
      commit('loginRequest', { token })

      authService.loginToken(token)
        .then(
          user => {
            commit('loginSuccess', user)
            router.push('/')
          },
          error => {
            commit('loginFailure', error)
            dispatch('alert/error', error, { root: true })
          }
        )
    },
    login ({ dispatch, commit }, { email, password }) {
      commit('loginRequest', { email })

      authService.login(email, password)
        .then(
          user => {
            if (user.twofactor === 1) {
              commit('loginTwoFactor', user)
              router.push('/sso')
            } else {
              commit('loginSuccess', user)
              router.push('/')
            }
          },
          error => {
            commit('loginFailure', error)
            dispatch('alert/error', error, { root: true })
          }
        )
    },
    logout ({ commit }) {
      authService.logout()
      commit('logout')
    }
  },
  mutations: {
    loginRequest (state, user) {
      state.status = { loggingIn: true }
      state.user = user
    },
    loginSuccess (state, user) {
      state.status = { loggedIn: true }
      state.user = user
    },
    loginFailure (state) {
      state.status = {}
      state.user = null
    },
    loginTwoFactor (state) {
      state.status = {}
      state.user = null
    },
    logout (state) {
      state.status = {}
      state.user = null
    }
  }
}

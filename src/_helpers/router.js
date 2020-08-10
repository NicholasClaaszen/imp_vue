import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/components/Home'
import LoginPage from '@/components/Login'
import SSO from '@/components/SSO'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/sso', component: SSO },
    { path: '/logout', component: LoginPage },
    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/sso']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  if (authRequired && !loggedIn) {
    return next('/login')
  }
  next()
})

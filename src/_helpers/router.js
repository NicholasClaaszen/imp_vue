import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../components/Home'
import LoginPage from '../components/Login'
import SSO from '../components/SSO'
import Category_view from '../components/Category_view'
import Category_edit from '../components/Category_edit'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/sso', component: SSO },
    { path: '/logout', component: LoginPage },
    { path: '/categories', component: Category_view },
    { path: '/categories/:id', component: Category_edit },
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

import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../components/Home'
import LoginPage from '../components/Login'
import SSO from '../components/SSO'
import Category_view from '../components/Category_view'
import Category_edit from '../components/Category_edit'
import Organisation_view from '../components/Organisation_view'
import Organisation_edit from '../components/Organisation_edit'
import Contacts_view from '../components/Contacts_view'
import Contacts_edit from '../components/Contacts_edit'
import Storage_Location_view from '../components/Storage_Location_view'
import Storage_Location_edit from '../components/Storage_Location_edit'
import Storage_Container_view from '../components/Storage_Container_view'
import Storage_Container_edit from '../components/Storage_Container_edit'

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
    { path: '/organisations', component: Organisation_view },
    { path: '/organisations/:id', component: Organisation_edit },
    { path: '/contacts', component: Contacts_view },
    { path: '/contacts/:id', component: Contacts_edit },
    { path: '/storage/locations', component: Storage_Location_view },
    { path: '/storage/locations/:id', component: Storage_Location_edit },
    { path: '/storage/containers', component: Storage_Container_view },
    { path: '/storage/containers/:id', component: Storage_Container_edit },
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

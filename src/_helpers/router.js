import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../components/Home'
import LoginPage from '../components/Login'
import CategoryView from '../components/CategoryView'
import CategoryEdit from '../components/CategoryEdit'
import OrganisationView from '../components/OrganisationView'
import OrganisationEdit from '../components/OrganisationEdit'
import ContactsView from '../components/ContactsView'
import ContactsEdit from '../components/ContactsEdit'
import StorageLocationView from '../components/StorageLocationView'
import StorageLocationEdit from '../components/StorageLocationEdit'
import StorageContainerView from '../components/StorageContainerView'
import StorageContainerEdit from '../components/StorageContainerEdit'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/logout', component: LoginPage },
    { path: '/categories', component: CategoryView },
    { path: '/categories/:id', component: CategoryEdit },
    { path: '/organisations', component: OrganisationView },
    { path: '/organisations/:id', component: OrganisationEdit },
    { path: '/contacts', component: ContactsView },
    { path: '/contacts/:id', component: ContactsEdit },
    { path: '/storage/locations', component: StorageLocationView },
    { path: '/storage/locations/:id', component: StorageLocationEdit },
    { path: '/storage/containers', component: StorageContainerView },
    { path: '/storage/containers/:id', component: StorageContainerEdit },
    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/sso']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = window.localStorage.getItem('user')
  if (authRequired && !loggedIn) {
    return next('/login')
  }
  next()
})

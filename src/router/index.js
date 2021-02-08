import Vue from 'vue'
import VueRouter from 'vue-router'
//import App from '../App'
import CustomerPage from '../components/CustomerPage'
import BaseMap from '../components/BaseMap'

Vue.use(VueRouter)

const routes = [
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login
//   },
  {
    path: '/',
    name: 'BaseMap',
    component: BaseMap
  },
  {
    path: '/customers',
    name: 'CustomerPage',
    component: CustomerPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import Index from './pages/Index'
import Login from './pages/Login'
import Profile from './pages/Profile'
import FourOhFour from './pages/FourOhFour'

import store from '../../store'

export default [
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      if (store.state.user.displayName !== null) {
        next('profile')
      } else {
        next('login')
      }
    }
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/logout',
    beforeEnter: (to, from, next) => {
      if (store.state.user) {
        firebase.auth().signOut()
        store.commit('USER_FALSE')
        next('login')
      } else {
        next('/')
      }
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  { path: '*', component: FourOhFour }
]

import Vue from 'vue'
import VueRouter from 'vue-router'
// import routes from './routes'
import firebase from 'firebase/app'

import Login from './pages/Login'
import Profile from './pages/Profile'
import Teacher from './pages/Teacher'
import FourOhFour from './pages/FourOhFour'

import store from '../../store'

Vue.use(VueRouter)

const router = new VueRouter({
  base: '/popup/popup.html',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: async (to, from, next) => {
            if (store.state.user) {
              console.log("logging " + store.state.user.displayName + " out")
              await firebase.auth().signOut()
              next('login')
            } else {
              next('')
            }
          }
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: Teacher,
      meta: { requiresAuth: true }
    },
    { path: '*', component: FourOhFour }
  ]
})

const teacherEmails = [
  'i.tairea@taiwananga.co.nz',
  'h.childs@taiwananga.co.nz',
  'c.morgan@taiwananga.co.nz',
  't.waihi@taiwananga.co.nz',
  'c.kauri@taiwananga.co.nz',
  'n.reid@taiwananga.co.nz',
  'a.walker@taiwananga.co.nz',
  'teana.waihi@taiwananga.co.nz',
  't.westrupp@taiwananga.co.nz',
];

/**
 * Check if a route requires authentication.
 * This is a global before hook for all routes,
 * checks if there are `meta: { requiresAuth: true }`
 * in all matched routes and sub routes.
 * If yes, redirect to `/login` and add original path to the query.
 */
router.beforeEach((to, from, next) => {
  // console.log("from",from)
  // console.log("to",to)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      const user = firebase.auth().currentUser;
      console.log("checking if " + user.displayName + " is a teacher")
      if (to.path === '/' && teacherEmails.some((x) => x === user.email)) {
        console.log(user.displayName + " is a teacher")
        // Go to teacher
        console.log("taking " + user.displayName + " to teacher page")
        next({
          path: '/teacher'
        });
      } else {
        // proceed to the route
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    //check if IS logged in
    if (firebase.auth().currentUser) {
      // Go the login
      const user = firebase.auth().currentUser;
      console.log("taking " + user.displayName + " to profile")
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // console.log("to. guest. next route")
      // proceed to the route
      next()
    }
  } else {
    // console.log("to. not auth or guest. next route")
    // proceed to the route
    next()
  }
})

export default router
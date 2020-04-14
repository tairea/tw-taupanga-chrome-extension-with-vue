
import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseApp, firebaseDb } from '../background';

import * as getters from './getters'
import mutations from './mutations'
// import * as actions from './actions'

import { firestoreAction  } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      uid: null,
      displayName: null,
      email: null,
      photoURL: null,
    },
    loggedIn: false,
    students: [],
  },
  getters,
  mutations,
  actions: {
    bindStudents: firestoreAction(({ bindFirestoreRef}, userEmail) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('students', firebaseDb.collection('students').where("email", "array-contains", userEmail ))
    }),
  },
})

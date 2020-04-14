
import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import mutations from './mutations'
// import * as actions from './actions'

import { firestoreAction  } from 'vuexfire'
// import { db } from '../config/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    foo: 'Ian',
    welcome: 'Kia ora, tena koe',
    students: [],
    user: null
  },
  getters,
  mutations,
  // actions: {
  //   bindStudents: firestoreAction(({ bindFirestoreRef }) => {
  //     // return the promise returned by `bindFirestoreRef`
  //     return bindFirestoreRef('students', db.collection('students'))
  //   }),
  // },
})

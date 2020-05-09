
import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseApp, firebaseDb, firebaseStorage } from '../background';

import * as getters from './getters'
import * as types from './mutation-types'
// import * as actions from './actions'

import { vuexfireMutations, firestoreAction  } from 'vuexfire'

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
    studentOrStaff: 'student',
    students: [],
    student: {},
    staffs: [],
    staff: {},
    todos: [],
    nsn: '123',
    profilePicUrl: ''
  },
  getters,
  mutations: {
    setAsStaff(state) {
      console.log("set as staff")
      state.studentOrStaff = 'staff'
    },
    storeUser (state, user) {
      state.user = user
    },
    storeNsn (state, nsn) {
      console.log("update student nsn mutation triggered. nsn is = " + nsn)
      state.nsn = nsn 
    },
    storeProfilePic (state, picUrl) {
      state.profilePicUrl = picUrl
    },
    mapStudentData (state) {
      console.log("mapping student")
      state.student = state.students[0]
      console.log(state.student)
    },
    mapStaffData (state) {
      console.log("mapping staff")
      state.staff = state.staffs[0]
      console.log(state.staff)
    },
    ...vuexfireMutations,
  },
  actions: {
    bindStudent: firestoreAction(({ bindFirestoreRef}, userEmail) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('students', firebaseDb.collection('students').where("email", "array-contains", userEmail ))
    }),
    bindStaff: firestoreAction(({ bindFirestoreRef}, userEmail) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('staffs', firebaseDb.collection('staff').where("email", "==", userEmail ))
    }),
    bindTodos: firestoreAction(({ bindFirestoreRef}, number ) => {
      console.log("vuexfire bindTodos triggered. with = " + number)
      return bindFirestoreRef('todos', firebaseDb.collection('students/' + number + '/todos2020'))
    }),
    getProfilePic ({ commit }, name) {
      firebaseStorage.ref('taiohi/' + name + '.png').getDownloadURL().then(function(url) {
        console.log("got pic: " + url)
        commit('storeProfilePic', url)
      }).catch((err) => {
        console.log("error: " + err.message)
      })
    }
  },
})

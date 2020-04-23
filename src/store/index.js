
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
    students: [],
    student: {},
    todos: [],
    nsn: '123',
    profilePicUrl: ''
  },
  getters,
  mutations: {
    UPDATE_USER (state, user) {
      state.user = user
    },
    USER_TRUE (state) {
      state.loggedIn = true
    },
    USER_FALSE (state) {
      state.loggedIn = false
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
    ...vuexfireMutations,
  },
  actions: {
    bindStudent: firestoreAction(({ bindFirestoreRef}, userEmail) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('students', firebaseDb.collection('students').where("email", "array-contains", userEmail ))
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

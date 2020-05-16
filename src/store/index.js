import Vue from 'vue'
import Vuex from 'vuex'
import {
  firebaseApp,
  firebaseDb,
  firebaseStorage
} from '../background';

import * as getters from './getters'
import * as types from './mutation-types'
// import * as actions from './actions'

import {
  vuexfireMutations,
  firestoreAction
} from 'vuexfire'

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
    modules: [],
    classes: [],
    nsn: '123',
    profilePicUrl: '',
    modulePicUrl: null,
    modulePicProgress: 0,
  },
  getters,
  mutations: {
    setAsStaff(state) {
      console.log("set as staff")
      state.studentOrStaff = 'staff'
    },
    storeUser(state, user) {
      state.user = user
    },
    storeNsn(state, nsn) {
      console.log("update student nsn mutation triggered. nsn is = " + nsn)
      state.nsn = nsn
    },
    storeProfilePic(state, picUrl) {
      state.profilePicUrl = picUrl
    },
    storeModulePicProgress(state, percentage) {
      state.modulePicProgress = percentage
    },
    mapStudentData(state) {
      console.log("mapping student")
      state.student = state.students[0]
      console.log(state.student)
    },
    mapStaffData(state) {
      console.log("mapping staff")
      state.staff = state.staffs[0]
      console.log(state.staff)
    },
    modulePicUrl(state, url) {
      console.log("mapping staff")
      state.modulePicUrl = url
    },
    ...vuexfireMutations,
  },
  actions: {
    bindStudent: firestoreAction(({
      bindFirestoreRef
    }, userEmail) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('students', firebaseDb.collection('students').where("email", "array-contains", userEmail))
    }),
    bindStaff: firestoreAction(({
      bindFirestoreRef
    }, userEmail) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('staffs', firebaseDb.collection('staff').where("email", "==", userEmail))
    }),
    bindTodos: firestoreAction(({ bindFirestoreRef }, nsn) => {
      console.log("vuexfire bindTodos triggered. with = " + nsn)
      return bindFirestoreRef('todos', firebaseDb.collection('students/' + nsn + '/todos2020'))
    }),
    bindModulesByStaff: firestoreAction(({ bindFirestoreRef }, teacherLastName) => {
      console.log("vuexfire bindModules triggered. with = " + teacherLastName)
      return bindFirestoreRef('modules', firebaseDb.collection('taupanga-modules/').where("teacher", "==", teacherLastName));
    }),
    // TODO: assign student to class then, get this students classes then bind those.
    bindClassesByStaff: firestoreAction(({ bindFirestoreRef }, teacherLastName) => {
      console.log("vuexfire bindClasses triggered. with = " + teacherLastName)
      return bindFirestoreRef('classes', firebaseDb.collection('taupanga-classes/').where("teacher", "==", teacherLastName));
    }),
    // bindClassesByStudent: firestoreAction(({ bindFirestoreRef }, student) => {
    //   console.log("vuexfire bindModules triggered. with = " + teacherLastName)
    //   return bindFirestoreRef('classes', firebaseDb.collection('taupanga-classes/').where("className", "==", className).where("yearName", "==", yearName));
    // }),
    getProfilePic({ commit }, name) {
      firebaseStorage.ref('taiohi/' + name + '.png').getDownloadURL().then(function (url) {
        console.log("got pic: " + url)
        commit('storeProfilePic', url)
      }).catch((err) => {
        console.log("error: " + err.message)
      })
    },
    saveModulePic({ commit }, newModule) {
      // ceate a storage ref
      var storageRef = firebaseStorage.ref("module-pics/" + newModule.class + "_" + newModule.year + "_" + newModule.file.name );
      // upload a file
      var task = storageRef.put(newModule.file);
      // update progress bar
      task.on(
        "state_changed",

        function progress(snapshot) {
          var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          commit('storeModulePicProgress', percentage)
        },

        function error(err) {
          console.log(err);
        },

        function complete() {
          task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            commit('modulePicUrl', downloadURL)
          });
        }
      );
    },
    saveModuletoFirestore({},moduleObj) {
      console.log("saving MODULE to firestore:", moduleObj)
      firebaseDb.collection("taupanga-modules/").doc(moduleObj.className+" - "+moduleObj.yearName+" - "+moduleObj.moduleName).set(moduleObj)
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    },
    saveClasstoFirestore({},classObj) {
      console.log("saving CLASS to firestore:", classObj)
      firebaseDb.collection("taupanga-classes/").doc(classObj.class_name+" - "+classObj.year_name).set(classObj)
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    },
    removeClassFromFirestore({},classObj) {
      console.log("deleting CLASS to firestore:", classObj)
      firebaseDb.collection("taupanga-classes/").doc(classObj.class_name+" - "+classObj.year_name).delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error deleting document: ", error);
      });
    },
    saveMilestonetoFirestore({},moduleObj) {
      console.log("in store: saving to firestore: ", moduleObj)
      firebaseDb.collection("taupanga-modules/").doc(moduleObj.className+" - "+moduleObj.yearName+" - "+moduleObj.moduleName).update(moduleObj)
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    }
  },
})



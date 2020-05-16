import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

import router from './popup/router'

import store from './store'

// Initialize Firebase
var config = {
    apiKey: process.env.VUE_APP_APIKEY,
    databaseURL: process.env.VUE_APP_DATABASEURL,
    storageBucket: process.env.VUE_APP_STORAGEBUCKET,
    projectId: "tutoa-db",
};

export const firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const firebaseDb = firebase.firestore()
export const firebaseStorage = firebase.storage()

/**
 * initApp handles setting up the Firebase context and registering
 * callbacks for the auth status.
 *
 * The core initialization is in firebase.App - this is the glue class
 * which stores configuration. We provide an app name here to allow
 * distinguishing multiple app instances.
 *
 * This method also registers a listener with firebase.auth().onAuthStateChanged.
 * This listener is called when the user is signed in or out, and that
 * is where we update the UI.
 *
 * When signed in, we also authenticate to the Firebase Realtime Database.
 */
function initApp() {

    // Listen for auth state changes.
    firebase.auth().onAuthStateChanged(function (user) {
        console.log('User state changed: ', user);
    });
}

window.onload = function () {
    initApp();
};
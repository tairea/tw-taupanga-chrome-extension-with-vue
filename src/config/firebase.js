import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
    .initializeApp({
        apiKey: "AIzaSyCuN2vNnRUqBafh3I8n7YRx_kxTNRQNHcQ",
    authDomain: "tw-galaxy.firebaseapp.com",
    databaseURL: "https://tw-galaxy.firebaseio.com",
    projectId: "tw-galaxy",
    storageBucket: "tw-galaxy.appspot.com",
    messagingSenderId: "662633443276",
    appId: "1:662633443276:web:63b942c9ae5b4ba737b769",
    measurementId: "G-S79M8DY995"
    })
    .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
// const {
//     TimeStamp,
//     GeoPoint
// } = firebase.firestore

// export {
//     TimeStamp,
//     GeoPoint
// }
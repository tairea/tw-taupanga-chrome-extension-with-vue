<template>
    <div class="login-container">
        <img src="http://tutoa.co.nz/images/taupanga.png">
        <b-button type="is-info" @click="startSignIn" size="large" id="quickstart-button">Sign in with Google</b-button>    
    </div>
</template>

<script>
import firebase from 'firebase/app'
import { firebaseApp, firebaseDb } from '../../../background';

import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy, {
    defaultIconPack: 'fas',
})

import router from '../../router'
import store from '../../../store'

import { mapState } from 'vuex';

export default {
    data: function() {
        return {}
    },
    mounted() {
        this.initApp();
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        initApp() {
            // Listen for auth state changes.
            // [START authstatelistener]
            firebaseApp.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // save user to store
                    store.commit('storeUser', user)
                    // check user is in store
                    console.log(store.getters.user.displayName + " signed in")
                    // route to home aka profile page
                    router.push('/')
                } else { }
                document.getElementById('quickstart-button').disabled = false;
            });
        },
        startAuth(interactive) {
            // Request an OAuth token from the Chrome Identity API.
            chrome.identity.getAuthToken({ interactive: !!interactive }, function(token) {
                if (chrome.runtime.lastError && !interactive) {
                    console.log('It was not possible to get a token programmatically.');
                } else if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                } else if (token) {
                    // Authorize Firebase with the OAuth Access Token.
                    console.log("got an OAuth token. signing into Google with token.")
                    var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
                    firebaseApp.auth().signInWithCredential(credential).catch(function(error) {
                        // The OAuth token might have been invalidated. Lets' remove it from cache.
                        if (error.code === 'auth/invalid-credential') {
                            chrome.identity.removeCachedAuthToken({ token: token }, function() {
                                this.startAuth(interactive);
                            });
                        }
                    });
                } else {
                    console.error('The OAuth Token was null');
                }
            });
        },
        startSignIn() {
            console.log("starting sign in...")
            document.getElementById('quickstart-button').disabled = true;
            if (firebaseApp.auth().currentUser) {
                firebaseApp.auth().signOut();
            } else {
                this.startAuth(true);
            }
        }
    },
    watch: {
        // user(val) {
        //     if (val) {
        //         if (this.$router.currentRoute.query.redirect) {
        //             this.$router.replace(this.$router.currentRoute.query.redirect)
        //         } else {
        //             this.$router.replace('/')
        //         }
        //     }
        // }
    }
}
</script>

<style lang="scss">
.login-container {
    background: #341f97;
    background: -webkit-linear-gradient(to right, #4A00E0, #341f97);
    background: linear-gradient(to right, #4A00E0, #341f97);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 300px;

    img {
        width: 40%;
        margin-bottom: 30px;
    }

    p {
         margin-top: 30px;
        color: white;
    }
}
</style>
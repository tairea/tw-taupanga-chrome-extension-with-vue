<template>
    <section>
        <b-field class="flex">
            <b-checkbox-button v-for="(student, index) in allStudents" :key="index" v-model="nsnArray"
                native-value="student.nsn" class="taiohi-image-button" :style="{backgroundImage: student.profilePic}">

            </b-checkbox-button>
        </b-field>
    </section>
</template>

<script>
    import store from '../store'
    import {
        mapState,
        mapActions
    } from 'vuex'

    export default {
        name: 'TaiohiPicker',
        props: [''],
        data() {
            return {
                nsnArray: []
            }
        },
        mounted() {
            store.dispatch('bindAllStudents').then(() => {
                store.dispatch('getProfilePicForMany')
                // .then(() => {
                //     console.log("taiohi picker:", this.allStudents)
                // })
            })
        },
        watch: {

        },
        computed: {
            ...mapState(['allStudents']),
        },
        methods: {

        }
    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .flex {
        display: flex;
        flex-wrap: wrap;
    }

    .taiohi-image-button {
        width: 25%;
        height: 100px;
        margin: 10px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-size: contain;
    }
</style>
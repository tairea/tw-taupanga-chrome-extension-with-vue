<template>
    <div>
        <router-link to="logout">
            <div class="header">
                <p class="is-size-7">Signed in as:<br />{{user.email}}</p>
                <img :src="user.photoURL" class="profile-pic" />
            </div>
        </router-link>

        <hr />

        <!-- TODO: Get Tutoa Database data for signed in user. -->
        <ul v-if="students.length > 0">
            <li>got the following students...</li>
            <li v-for="(student, index) in students" :key="index">{{ student.given_name }}</li>
        </ul>

    </div>
</template>

<script>

    import router from '../../router'
    import store from '../../../store'

    import { mapState, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapState(['user', 'students'])
        },
        methods: {
        },
        mounted() {
            this.$store.dispatch('bindStudents', this.user.email)
        }
       
    }
</script>

<style lang="scss">
    .header {
        padding: 10px 0px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .profile-pic {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
</style>
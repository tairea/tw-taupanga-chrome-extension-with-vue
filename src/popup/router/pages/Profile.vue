<template>
    <div>
        <router-link to="logout">
            <div class="header">
                <h1 id="name">{{student.given_name}}</h1>
                <!-- <p class="is-size-7">Signed in as:<br />{{user.email}}</p> -->
                <img v-if="profilePicUrl" :src="profilePicUrl" class="profile-pic" />
            </div>
        </router-link>

        <!-- <p>{{ nsn }}</p> -->

        <Todos :todos="todos"/>

    </div>
</template>

<script>
    import router from '../../router'
    import store from '../../../store'
    import { mapState, mapActions } from 'vuex'

    import Todos from "../../../components/Todos.vue";

    export default {
        name: "Profile",
        components: {
            Todos
        },
        computed: {
            ...mapState(['user', 'student', 'nsn', 'todos', 'profilePicUrl']),
        },
        watch: {
            student: function (student) {
                if (student.nsn) {
                    // update nsn
                    store.commit('storeNsn', student.nsn)
                    // bind todos
                    store.dispatch('bindTodos', student.nsn)
                    // get profilePic
                    store.dispatch('getProfilePic', student.given_name.toLowerCase())
                }
            }
        },
        methods: {},
        mounted() {
            store.dispatch('bindStudent', this.user.email).then(() => {
                store.commit('mapStudentData')
            })
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
        background: black;

        #name {
            color: white;
            font-weight: 800;
        }

        .profile-pic {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: white;
        }
    }
</style>
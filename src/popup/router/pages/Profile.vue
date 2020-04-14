<template>
    <div>
        <router-link to="logout">
            <div class="header">
                <p class="is-size-7">Signed in as:<br/>{{user.email}}</p>
                <img :src="user.photoURL" class="profile-pic" />
            </div>
        </router-link>

        <hr />

        <!-- TODO: Get Tutoa Database data for signed in user. -->
    
    
    </div>
</template>

<script>
import router from '../../router'
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['user'])
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
<template>
    <div class="container">
        <p>Hello</p>
        <h1>{{foo}}</h1>
        <h2>{{welcome}}</h2>
        <ul>
            <li v-for="student in students" :key="student.index">{{student.given_name}}</li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {

        }
    },
    computed: mapState(['students', 'foo', 'welcome']),
    // methods: {
    //     ...mapActions([
    //         'bindStudents', // map `this.bindStudents()` to `this.$store.dispatch('increment')`
    //     ]),
    // },
    mounted() {
        this.$store.dispatch('bindStudents')
    }
}
</script>

<style lang="scss" scoped>
p {
    font-size: 20px;
}

.container {
    width: 600px;
    height: 600px;
}
</style>

<template>
  <div>
    <!-- CLASS BANNER -->
    <ClassBanner :classGroup="classGroup" @back="$emit('back')" />

    <!-- TAIOHI PICKER -->
    <TaiohiPicker @selected="taiohiSelected(nsn)" />

    <!-- CANCEL / SAVE BUTTONS -->
    <div class="flex" style="justify-content: center; align-items: center; margin-top: 10px;">
      <b-button type="is-dark" size="is-medium" outlined @click="$emit('close')">
        Cancel
      </b-button>
      <b-button type="is-warning" size="is-medium" @click="emitNewClassDetails()">
        Save Class
      </b-button>
      <div style="margin-bottom:50px;"></div>
    </div>


  </div>
</template>

<script>
  import store from '../store'
	import {
		mapState,
		mapActions
    } from 'vuex'

  import ClassBanner from "./ClassBanner.vue";
  import TaiohiPicker from "./TaiohiPicker.vue";

  export default {
    name: "ViewClass",
    props: ['classGroup'],
    components: {
      ClassBanner,
      TaiohiPicker
    },
    data() {
      return {

      }
    },
    mounted() {
      // TODO: bind only once at the beginning. not everytime mounted. (maybe local storage)
			
      //{name: student.given_name.toLowerCase(), nsn: student.nsn }
    },
   computed: {
			...mapState(['allStudents']),
		},
    methods: {
      ...mapActions(['']),
    }
  }
</script>

<style>
  .tab-content {
    padding: 0px !important;
  }
</style>

<style scoped>

</style>
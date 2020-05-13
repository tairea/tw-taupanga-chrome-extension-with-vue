<template>
  <div>
    <!-- MODULE BANNER -->
    <ModuleBanner :module="module" @back="$emit('back')"/>

    <!-- MILESTONES -->
    <Milestone :milestones="module.moduleMilestones"/>

    <!-- ADD MILESTONE BUTTON -->
    <div class="addButton" @click="$emit('addMilestone', module)">
        <b-icon icon="plus" size="is-large">
        </b-icon>
    </div>


  </div>
</template>

<script>
  import ModuleBanner from "./ModuleBanner.vue";
  import Milestone from "./Milestone.vue";

  export default {
    name: "ViewMilestones",
    props: ['module'],
    components: {
      ModuleBanner,
      Milestone
    },
    data() {
      return {

      }
    },
    mounted() {
      console.log("module",this.module)
    },
    computed: {

    },
    methods: {
      percentComplete() {
        return 75
      },
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
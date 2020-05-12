<template>
  <div>
    <!-- MODULE BANNER -->
    <div class="module-banner has-background-info">
      <div class="module-back-button" @click="$emit('back')">
        <b-icon icon="chevron-left"></b-icon>
      </div>

      <div class="module-title-col">
        <p class="is-size-6 has-text-weight-semibold">
          {{ module.moduleName }}
        </p>
        <p class="subtitle is-size-6 has-text-white">
          {{ module.moduleMilestones.length }} Milestones
        </p>
      </div>

      <div class="module-pic-col">
        <img :src="module.modulePic" class="module-pic">
      </div>
    </div>

    <!-- MILESTONES -->
    <!-- <Milestone/> -->

    <!-- ADD MILESTONE BUTTON -->
    <div class="addButton" @click="$emit('addMilestone', module)">
        <b-icon icon="plus" size="is-large">
        </b-icon>
    </div>


  </div>
</template>

<script>
  import AddMilestone from "./AddMilestone.vue";

  export default {
    name: "ViewMilestones",
    props: ['module'],
    components: {
      AddMilestone
    },
    data() {
      return {

      }
    },
    mounted() {
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

  .flex {
    display: flex;
  }

  .module-banner {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 10px;
  }

  .title {
    margin: 0px;
  }

  .module-back-button {
    width: 10%;
    cursor: pointer;
  }

  .module-title-col {
    width: 60%;
  }

  .module-pic-col {
    /* position: absolute;
    right: 0; */
    width: 30%;
  }

  .module-pic {
    width: 100%;
    height: auto;
    border-radius: 10px;
    background: white;
    object-fit: cover;
  }
</style>
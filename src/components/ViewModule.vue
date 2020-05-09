<template>
  <div>
    <!-- MODULE BANNER -->
    <div class="module-banner has-background-info">
      <div class="module-back-button" @click="$emit('back')">
        <b-icon icon="chevron-left"></b-icon>
      </div>

      <div class="module-title-col">
        <p class="is-size-6 has-text-weight-semibold">
          {{ module.title }}
        </p>
        <p class="subtitle is-size-6 has-text-white">
          {{ module.milestones.length }} Milestones
        </p>
      </div>

      <div class="module-pic-col">
        <img src="https://picsum.photos/100/100" class="module-pic">
      </div>
    </div>

    <!-- MILESTONES -->
    <div v-for="(milestone, index) in module.milestones" :key="index" class="card" style="margin: 20px;">
      <div class="card-content">
        <div class="flex">
          <div class="milestone-number">
            <h1>{{index + 1}}</h1>
          </div>
          <div class="milestone-title-col">
            <p class="title is-size-4">
              {{ milestone.milestoneName }}
            </p>
            <p class="subtitle is-size-6" style="margin-top: 5px;">
              {{ milestone.milestoneInstructions }}
            </p>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item has-text-grey-light">
          Class is <span class="has-text-success has-text-weight-bold" style="padding: 0 10px;"> {{percentComplete()}}%
          </span> Completed
        </p>
      </footer>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Module",
    props: ['module'],
    components: {

    },
    data() {
      return {

      }
    },
    mounted() {
      console.log("viewing this module: ", this.module)
    },
    computed: {

    },
    methods: {
      percentComplete() {
        console.log("loading percentage")
        return 75
      }
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

  .milestone-number {
    width: 40px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .milestone-title-col {
    padding-left: 24px;
  }

  .title {
    margin: 0px;
  }

  .module-back-button {
    width: 10%;
    cursor: pointer;
  }

  .module-title-col {
    width: 90%;
  }

  .module-pic-col {
    position: absolute;
    right: 0;
  }

  .module-pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: white;
  }
</style>
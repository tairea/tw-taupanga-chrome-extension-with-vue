<template>
  <div>
    <!-- MILESTONES -->
    <div v-for="(milestone, index) in module.moduleMilestones" :key="index" class="card" style="margin: 20px;" @click="editMilestone(milestone, index)">
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
    name: "Milestones",
    props: ['module'],
    components: {

    },
    data() {
      return {

      }
    },
    mounted() {},
    computed: {

    },
    methods: {
      editMilestone (milestone, index) {
        this.$emit('editMilestone', {milestone: milestone, index:index})
      },
      percentComplete() {
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

  .milestone-number {
    min-width: 40px;
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
</style>
<template>
  <div>
    <div v-for="(module, index) in modules" :key="index" class="card" style="margin: 20px;">
      <div class="card-content flex">
        <div class="module-title-col">
          <div class="flex">
            <p class="title is-size-4" style="margin-bottom: 5px;">
              {{ module.moduleName }} 
            </p>
            <b-icon type="is-dark" icon="pencil-alt"  @click.native="$emit('editModule', module)" class="editIcon"></b-icon>
          </div>

          <p class="subtitle is-size-6" style="margin-top: 5px;">
            {{ module.moduleMilestones.length }} Milestones
          </p>

          <b-button type="is-primary" size="is-small" outlined @click="$emit('viewModule', module)">
            View Milestones
          </b-button>
        </div>

        <div class="module-pic-col">
          <img :src="module.modulePic" class="module-pic">
        </div>

      </div>

      <footer class="card-footer">
        <p class="card-footer-item has-text-grey-light">
          Due in <span class="has-text-success has-text-weight-bold" style="padding: 0 10px;"> {{calculateDays(module.moduleDate)}}
          </span> Days
        </p>
        <p class="card-footer-item has-text-grey-light">
          Class is <span class="has-text-success has-text-weight-bold" style="padding: 0 10px;"> {{percentComplete()}}%
          </span> Completed
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
  import store from '../store'
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: "Module",
    props: ['modules'],
    components: {

    },
    data() {
      return {

      }
    },
    mounted() {},
    computed: {
      ...mapState(['user', 'staff', 'profilePicUrl']),
    },
    methods: {
      ...mapActions(['saveModuletoFirestore']),
      percentComplete() {
        return 75
      },
      calculateDays(dueDate) {
        if (dueDate == null || dueDate == undefined || dueDate == "") {
          return;
        }
        // convert seconds to date
        var epoch = new Date(0);
        epoch.setSeconds(parseInt(dueDate.seconds));
        var date = epoch.toISOString();
        // calc diff between today and future due date
        var dateNow = new Date();
        var dateFuture = new Date(date);
        console.log("future date as Date: ", dateFuture)
        var timeDiff = Math.abs(dateNow.getTime() - dateFuture.getTime());
        var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (dayDifference == 1) {
          return dayDifference = "Today"
        }
        return dayDifference;
      },
    }
  }
</script>

<style scoped>
  .flex {
    display: flex;
  }

  .module-title-col {
    width: 70%;
  }

  .module-pic-col {
    width: 30%;
    height: auto;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.3);
  }

  .module-pic {
    border-radius: 10px;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    object-fit: cover;
    transform: scale(1.2);
  }

  .editIcon {
    font-size: 0.7em;
    margin-left: 10px;
    margin-top: -5px;
    cursor: pointer;
    color: rgba(0,0,0,0.3) !important;
  }
</style>
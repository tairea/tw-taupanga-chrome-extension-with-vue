<template>
  <div>
    <div v-for="(module, index) in modules" :key="index" class="card" style="margin: 20px;">
      <div class="card-content">
        <div class="flex">
          <!-- <div class="module-title-col"> -->
          <p class="title is-size-4">
            {{ module.title }}
          </p>
          <!-- </div> -->
        </div>
        <p class="subtitle is-size-6" style="margin-top: 5px;">
          {{ module.milestones.length }} Milestones
        </p>
        <div class="flex" style="justify-content: space-between;">
          <b-button type="is-info" size="is-small" outlined @click="$emit('editModule', module)">
            Edit Module
          </b-button>
          <b-button type="is-primary" size="is-small" outlined @click="$emit('viewModule', module)">
            View Milestones
          </b-button>
        </div>
        <div class="module-pic-col">
          <img src="https://picsum.photos/100/100" class="module-pic">
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
  import store from '../../../store'
  import { mapState, mapActions } from 'vuex'

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
      }
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
    position: absolute;
    top: 0;
    right: 0;
    margin: 15px;
  }



  .module-pic {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: white;
  }
</style>
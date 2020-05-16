<template>
  <div>
    <!-- CLASS -->
    <p class="text">Create and edit new classes here<br>that will appear in the top menu bar</p>
    <div v-for="(classGroup, index) in classes" :key="index" class="card" style="margin: 20px;">
      <!-- <div class="card" style="margin: 20px;"> -->
      <div class="card-content">
        <div class="flex">
          <div class="class-title-col">
            <div class="flex">
              <p class="title is-size-4" style="margin-bottom: 5px;">
                <!-- Year Name -->
                {{classGroup.year_name}}
              </p>
              <b-icon type="is-dark" icon="pencil-alt" @click.native="$emit('editClass', classGroup)" class="editIcon">
              </b-icon>
            </div>
            <p class="subtitle is-size-6" style="margin-top: 5px;">
              <!-- Class Name -->
              {{classGroup.class_name}}
            </p>
          </div>
          <div class="class-number-col">
            <div class="class-number" :style="{backgroundColor: classGroup.color}">
              <!-- <div class="class-number"> -->
              <!-- Number of taiohi in this class -->
              <p class="has-text-white title is-4">32</p>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: "Class",
    props: ['classes'],
    components: {

    },
    data() {
      return {

      }
    },
    mounted() {
      console.log("CLASSES:", this.classes)
    },
    computed: {

    },
    methods: {

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

  .text {
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.6);
    padding-top: 20px;
    text-align: center;
  }

  .class-title-col {
    padding-left: 24px;
    width: 70%
  }

  .class-number-col {
    width: 30%;
  }

  .class-number {
    width: 60px;
    height: 60px;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .editIcon {
    font-size: 0.7em;
    margin-left: 10px;
    margin-top: -5px;
    cursor: pointer;
    color: rgba(0,0,0,0.3) !important;
  }
</style>
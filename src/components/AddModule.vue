<template>
  <div>
    <div class="card" style="margin: 20px;">
      <div class="card-content">
        <div class="flex">
          <div class="module-title-col">
            <b-field label="Module Name">
              <b-input value="Enter a name"></b-input>
            </b-field>
            <b-field label="Due Date">
              <b-datepicker placeholder="Click to select..." icon="calendar-alt" trap-focus>
              </b-datepicker>
            </b-field>
          </div>
          <div class="new-module-pic-col">
            <b-icon class="new-module-pic" icon="camera"></b-icon>
          </div>
        </div>

      </div>
    </div>
    <div class="flex" style="justify-content: center; align-items: center; margin-top: 10px; margin-bottom: 50px;">
      <b-button type="is-dark" size="is-medium" outlined @click="$emit('close')" class="button-margin-10">
        Cancel
      </b-button>
      <b-button type="is-info" size="is-medium" outlined @click="$emit('saveModule', getNewModuleDetails)">
        Save New Module
      </b-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Module",
    props: ['modules'],
    components: {

    },
    data() {
      return {

      }
    },
    mounted() {
      console.log("modules", this.modules)
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

<style scoped>
  .flex {
    display: flex;
  }

  .module-title-col {
    width: 70%;
  }

  .new-module-pic-col {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    
  }
  
  .new-module-pic {
    border-radius: 50%;
    border: solid 1px rgba(0,0,0,0.3);
    width: 60px;
    height: 60px;
  }

  .module-pic {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: white;
  }

  .button-margin-10 {
    margin: 10px;
  }
</style>
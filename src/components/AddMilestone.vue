<template>
  <div>
    <div class="card" style="margin: 20px;">
      <div class="card-content">

        <div class="milestone-title-col">

          <!-- Milestone Name -->
          <b-field label="Milestone Name">
            <b-input v-model="milestoneName" placeholder="Name Milestone" icon="route"></b-input>
          </b-field>

          <!-- Milestone Instructions -->
          <b-field label="Milestone Instructions">
            <b-input v-model="milestoneInstructions" type="textarea" placeholder="Give Instructions" icon="file-alt"></b-input>
          </b-field>

          <!-- Milestone Links -->
          <div>
            <b-field label="Milestone Links" class="link-container">
              <div v-for="(link, index) in milestoneLinks" :key="index" class="link-wrap">
                <b-input placeholder="Name of link" icon="font" class="link-fields"></b-input>
                <b-input placeholder="Link URL" icon="link" class="link-fields"></b-input>
              </div>
            </b-field>
            <b-button type="is-dark" outlined size="is-small" icon-left="plus" @click="milestoneLinks++">Add another
              Link</b-button>
          </div>

        </div>

      </div>
      <div class="flex" style="justify-content: center; align-items: center; margin-top: 10px; margin-bottom: 50px;">
        <b-button type="is-dark" size="is-medium" outlined @click="$emit('close')" class="button-margin-10">
          Cancel
        </b-button>
        <b-button type="is-info" size="is-medium" outlined @click="emitNewModuleDetails()">
          Save New Module
        </b-button>
      </div>
    </div>
  </div>
</template>


<!-- 
  milestoneName
  milestoneInstructions
  milestoneLinks [
    {
      name: String,
      link: URL
    }
  ]
  
  milestoneHasActivityAndSubmission: Bool

  milestoneActivityInstructions: 
  milestoneActivitySubmission: Boolean
  milestoneIsSubmitted: Boolean


 -->

<script>
  import VueCircle from 'vue2-circle-progress/src/index.vue'
  import store from '../store'
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: "AddModule",
    props: ['className', 'yearName'],
    components: {
      VueCircle
    },
    data() {
      return {
        file: null,
        milestoneName: null,
        milestoneLinks: 1,



      }
    },
    mounted() {

    },
    watch: {
      modulePicUrl: function (url) {
        if (url) {
          this.modulePic = url
        }
      },
      modulePicProgress: function (progress) {
        console.log("upload progress: ", progress)
        this.$refs.moduleProgressEl.value = progress
      }
    },
    computed: {
      ...mapState(['modulePicUrl', 'modulePicProgress']),
    },
    methods: {
      ...mapActions(['saveModulePic']),
      percentComplete() {
        console.log("loading percentage")
        return 75
      },
      uploadModuleImg() {
        this.saveModulePic({
          file: this.file,
          class: this.className,
          year: this.yearName
        })
      },
      emitNewModuleDetails() {
        const moduleObj = {
          moduleName: this.moduleName,
          moduleDate: this.moduleDate,
          modulePic: this.modulePic
        }
        this.$emit('saveModule', moduleObj)
      }
    }
  }
</script>

<style>
 .textarea {
    padding-left: 2.25rem !important
  }
</style>

<style scoped>
 
  .flex {
    display: flex;
  }

  .file {
    height: 100%;
  }

  .milestone-title-col {
    width: 100%;
  }

  .button-margin-10 {
    margin: 10px;
  }

  .link-container {
    display: flex;
    flex-direction: column;
  }

  .link-wrap {
    display: flex; 
    justify-content: space-between;
    width: 100%;
  }
  .link-fields {
    width: 48%;
  }
</style>
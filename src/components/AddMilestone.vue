<template>
  <div>
    <!-- Module Banner -->
    <ModuleBanner :module="module" @back="$emit('backToModule', module)" />
    <!-- Milestone Banner -->
    <!-- TODO: turn this into component <MilstoneBanner> -->
    <div v-for="(milestone, index) in module.moduleMilestones" :key="index" class="flex milestone-banner">
      <div class="milestone-banner-number">
        <h1>{{index + 1}}</h1>
      </div>
      <div class="milestone-banner-title-col">
        <p class="title is-6">
          {{ milestone.milestoneName }}
        </p>
      </div>
    </div>
    <div class="flex milestone-banner">
        <div class="milestone-banner-number">
          <h1>{{module.moduleMilestones.length + 1}}</h1>
        </div>
        <div class="milestone-banner-title-col">
          <p class="title is-6">
            {{ milestoneName }}
          </p>
        </div>
      </div>

    <div class="card" style="margin: 20px;">
      <div class="card-content">

        <div class="milestone-title-col">

          <!-- Milestone Name -->
          <b-field label="Milestone Name">
            <b-input v-model="milestoneName" placeholder="Name Milestone" icon="route"></b-input>
          </b-field>

          <!-- Milestone Instructions -->
          <b-field label="Milestone Instructions">
            <b-input v-model="milestoneInstructions" type="textarea" placeholder="Give Instructions" icon="file-alt">
            </b-input>
          </b-field>

          <!-- Milestone Links -->
          <div>
            <b-field label="Milestone Links" class="link-container">
              <div v-for="(link, index) in links" :key="index" class="link-wrap">
                <b-input v-model="milestoneLinks[index].name" placeholder="Name of link" icon="font"
                  class="link-fields"></b-input>
                <b-input v-model="milestoneLinks[index].url" placeholder="Link URL" icon="link" class="link-fields">
                </b-input>
              </div>
            </b-field>
            <b-button type="is-dark" outlined size="is-small" icon-left="plus" @click="addLink()">Add another Link
            </b-button>
            <b-button v-if="links > 1" type="is-dark" outlined size="is-small" icon-left="times" @click="removeLink()">
              Remove last Link</b-button>
          </div>

          <hr style="width: 100%;">

          <!-- Enable Activity -->
          <div class="field flex-center">
            <b-checkbox v-model="activityEnabled" size="is-small" type="is-dark">Add Activity & Submission
            </b-checkbox>
          </div>

          <div v-if="activityEnabled">
            <!-- Activity Instructions -->
            <b-field label="Activity Name">
              <b-input v-model="activityName" placeholder="Name Activity" icon="pencil-ruler"></b-input>
            </b-field>

            <!-- Milestone Instructions -->
            <b-field label="Activity Instructions">
              <b-input v-model="activityInstructions" type="textarea" placeholder="Give Instructions" icon="file-alt">
              </b-input>
            </b-field>

            <div class="field flex">
              <b-checkbox v-model="submissionRequired" size="is-small">Submission required</b-checkbox>
            </div>
          </div>

          <hr style="width: 100%; margin-bottom: 0;">

        </div>

      </div>
      <div class="flex" style="justify-content: center; align-items: center; margin-top: 10px; margin-bottom: 50px;">
        <b-button type="is-dark" size="is-medium" outlined @click="$emit('close')" class="button-margin-10">
          Cancel
        </b-button>
        <b-button type="is-info" size="is-medium" outlined @click="emitNewMilestoneDetails()">
          Save New Milestone
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ModuleBanner from "./ModuleBanner.vue";
  import store from '../store'
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: "AddModule",
    props: ['module'],
    components: {
      ModuleBanner
    },
    data() {
      return {
        file: null,
        milestoneName: null,
        milestoneInstructions: null,
        links: 1,
        milestoneLinks: [{
          name: null,
          url: null,
        }],
        activityEnabled: false,
        activityName: null,
        activityInstructions: null,
        submissionRequired: false,
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
      uploadModuleImg() {
        this.saveModulePic({
          file: this.file,
          class: this.className,
          year: this.yearName
        })
      },
      emitNewMilestoneDetails() {
        const milestoneObj = {
          milestoneName: this.milestoneName,
          milestoneInstructions: this.milestoneInstructions,
          milestoneLinks: this.milestoneLinks,
        }
        if (this.activityEnabled) {
          milestoneObj.activityName = this.activityName
          milestoneObj.activityInstructions = this.activityInstructions
          milestoneObj.submissionRequired = this.submissionRequired
        }
        this.$emit('saveMilestone', {milestone: milestoneObj, module:this.module})
        // this.checkMilestoneLinks()
      },
      // checkMilestoneLinks() {
      //   this.milestoneLinks.forEach(link => {
      //     console.log(link.name)
      //     console.log(link.url)
      //   });
      // },
      addLink() {
        this.links++
        this.milestoneLinks.push({
          name: null,
          url: null
        })
      },
      removeLink() {
        this.links--
        this.milestoneLinks.pop()
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

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
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
    width: 100%;
    padding-bottom: 10px;
  }

  .link-fields {
    width: 100%;
  }

  .milestone-banner {
    width: 100%;
    height: 50px;
    margin: 0;
    padding: 5px 25px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .milestone-banner-number {
    width: 40px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .milestone-banner-title-col {
    padding-left: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<template>
  <div>
    <div class="card" style="margin: 20px;">
      <div class="card-content">
        <div class="flex">
          <div class="module-title-col">
            <b-field label="Edit Module Name">
              <b-input v-model="moduleName" icon="rocket" value="moduleName"></b-input>
            </b-field>
            <b-field label="Edit Due Date">
              <b-datepicker v-model="moduleDate" icon="calendar-alt" trap-focus value="moduleDate">
              </b-datepicker>
            </b-field>
          </div>
          <div class="new-module-pic-col">
            <div class="new-module-pic-col-wrap">
              <b-field class="file">
                <b-upload v-model="file" @input="uploadModuleImg()">
                  <img ref="modulePicEl" v-if="modulePic" :src="modulePic" alt="" class="new-module-pic">
                  <b-icon v-else class="new-module-pic" icon="camera"></b-icon>
                </b-upload>
              </b-field>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="module-title-col"></div>
          <div class="new-module-pic-col"><progress ref="moduleProgressEl" value="0" max="100" id="uploader"
              class="new-module-pic-progress">0%</progress></div>
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
</template>

<script>
  import store from '../store'
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: "EditModule",
    props: ['module','className', 'yearName'],
    components: {

    },
    data() {
      return {
        file: null,
        moduleName: this.module.moduleName,
        moduleDate: this.calcDate(),
        modulePic: this.module.modulePic,
        circleProgress: 0,
        fill: {
          gradient: ["red", "green", "blue"]
        },
      }
    },
    mounted() {
      console.log("from within module EDIT: ", this.module)
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
      calcDate() {
        // convert seconds to date
        var epoch = new Date(0);
        epoch.setSeconds(parseInt(this.module.moduleDate.seconds));
        var date = epoch.toISOString();
        return new Date(date)
      },
      percentComplete() {
        return 75
      },
      uploadModuleImg() {
        this.saveModulePic({file: this.file, class:this.className, year:this.yearName})
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

<style scoped>
  .flex {
    display: flex;
  }

  .file {
    height: 100%;
  }

  .module-title-col {
    width: 60%;
  }

  .new-module-pic-col {
    width: 40%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    padding-left: 1.5rem;
  }

  .new-module-pic-col-wrap {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: solid 1px rgba(0, 0, 0, 0.3);
  }

  .new-module-pic {
    border-radius: 10px;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    cursor: pointer;
    object-fit: cover;
  }

  .new-module-pic-progress {
    width: 100%;
    height: 10%;
  }

  .button-margin-10 {
    margin: 10px;
  }
</style>
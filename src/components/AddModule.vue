<template>
  <div>
    <div class="card" style="margin: 20px;">
      <div class="card-content">
        <div class="flex">
          <div class="module-title-col">
            <b-field label="Module Name">
              <b-input v-model="moduleName" placeholder="Name Module" icon="rocket"></b-input>
            </b-field>
            <b-field label="Due Date">
              <b-datepicker v-model="moduleDate" placeholder="Set due date" icon="calendar-alt" trap-focus>
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
        moduleName: null,
        moduleDate: null,
        modulePic: null,
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
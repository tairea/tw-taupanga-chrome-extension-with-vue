<template>
  <div>
    <div class="card" style="margin: 20px;">
      <div class="card-content">
        <div class="flex">
          <div class="module-title-col">
            <b-field label="Module Name">
              <b-input v-model="moduleName" placeholder="Name Module" icon="book"></b-input>
            </b-field>
            <b-field label="Due Date">
              <b-datepicker v-model="moduleDate" placeholder="Set due date" icon="calendar-alt" trap-focus>
              </b-datepicker>
            </b-field>
          </div>
          <div class="new-module-pic-col">
            <!-- <vue-circle :progress="circleProgress" :size="70" :reverse="false" :fill="fill"
              empty-fill="rgba(0, 0, 0, .1)" :animation-start-value="0.0" :start-angle="0" insert-mode="append"
              :thickness="5" :show-percent="false"> -->
              <b-field class="file">
                <b-upload v-model="file" @input="uploadModuleImg()">
                  <img ref="modulePicEl" v-if="modulePic" :src="modulePic" alt="" class="new-module-pic">
                  <b-icon v-else class="new-module-pic" icon="camera"></b-icon>
                </b-upload>
              </b-field>
            <!-- </vue-circle> -->
          </div>
        </div>
        <progress ref="moduleProgressEl" value="0" max="100" id="uploader" class="is-circle">0%</progress>
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
    props: ['modules'],
    components: {
      VueCircle
    },
    data() {
      return {
        file: null,
        moduleName: null,
        moduleDate: null,
        modulePic: null,
        circleProgress: 0,
        fill: {
          gradient: ["red", "green", "blue"]
        },
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
        this.saveModulePic(this.file)
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
    border: solid 1px rgba(0, 0, 0, 0.3);
    width: 60px;
    height: 60px;
    cursor: pointer;
    object-fit: cover;
  }

  .button-margin-10 {
    margin: 10px;
  }
</style>
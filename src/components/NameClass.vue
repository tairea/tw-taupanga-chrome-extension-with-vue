<template>
  <div>
    <div class="card" style="margin: 20px;">
      <div class="card-content">
        <div class="flex">
          <div class="class-title-col">
            <b-field label="Class name you see" class="labelSize">
              <b-input v-model="teachersClassName" placeholder="Name" icon="users"></b-input>
            </b-field>
            <b-field label="Class name taiohi see" class="labelSize">
              <b-input v-model="studentsClassName" placeholder="Name" icon="bookmark"></b-input>
            </b-field>
          </div>
          <div class="class-color-col">
            <div class="color-icon-wrap" :style="{backgroundColor: color}">
            <v-swatches v-model="color" :swatches="swatches" shapes="circles">
                <b-icon class="class-icon" slot="trigger" type="is-white" icon="palette"></b-icon>
              </v-swatches>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="flex" style="justify-content: center; align-items: center; margin-top: 10px; margin-bottom: 50px;">
      <b-button type="is-dark" size="is-medium" outlined @click="$emit('close')" class="button-margin-10">
        Cancel
      </b-button>
      <b-button type="is-warning" size="is-medium" outlined @click="emitNewClassDetails()">
        Save Class
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
  import VSwatches from 'vue-swatches'

  export default {
    name: "NameClass",
    props: ['classes', 'teacher'],
    components: {
      VSwatches
    },
    data() {
      return {
        teachersClassName: null,
        studentsClassName: null,
        color: '#ffdd57',
        swatches: ['hsl(14, 100%, 53%)', 'hsl(48, 100%, 67%)', 'hsl(141, 53%, 53%)', 'hsl(171, 100%, 41%)', 'hsl(204, 71%, 53%)', 'hsl(217, 71%, 53%)', 'hsl(271, 100%, 71%)', 'hsl(348, 86%, 61%)']
      }
    },
    mounted() {

    },
    watch: {

    },
    computed: {
      // ...mapState(['modulePicUrl', 'modulePicProgress']),
    },
    methods: {
      // ...mapActions(['saveModulePic']),
      emitNewClassDetails() {
        const classObj = {
          year_name: this.teachersClassName,
          class_name: this.studentsClassName,
          teacher: this.teacher.family_name,
          color: this.color
        }
        this.$emit('saveClass', classObj)
      }
    }
  }
</script>

<style>
.labelSize > .label {
    font-size: 0.9rem !important;
  }
</style>

<style scoped>
  .flex {
    display: flex;
  }

  .file {
    height: 100%;
  }

  .class-title-col {
    width: 70%;
  }

  .class-color-col {
    width: 30%;
    height: 100%;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
    padding-top:20px;
    padding-left: 1.5rem;
  }

  .color-icon-wrap {
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: solid 1px rgba(0, 0, 0, 0.1);
  }

  .button-margin-10 {
    margin: 10px;
  }

  
</style>
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
    <div class="flex" style="justify-content: center; align-items: center; margin-top: 10px;">
      <b-button type="is-dark" size="is-medium" outlined @click="$emit('close')" class="button-margin-10">
        Cancel
      </b-button>
      <b-button type="is-warning" size="is-medium" @click="emitNewClassDetails()">
        Save Class
      </b-button>
    </div>
    <div v-if="isEditing" class="flex" style="justify-content: center; align-items: center;">
      <b-button type="is-danger" size="is-small" outlined @click="deleteClassModal()"
        @delete="$emit('delete', selectedClass)">
        Delete Class
      </b-button>
    </div>
    <div style="margin-bottom:50px;"></div>
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
    name: "EditClass",
    props: ['classes', 'teacher', 'isEditing', 'selectedClass'],
    components: {
      VSwatches,
    },
    data() {
      return {
        teachersClassName: this.selectedClass ? this.selectedClass.year_name : null,
        studentsClassName: this.selectedClass ? this.selectedClass.class_name : null,
        color: this.selectedClass ? this.selectedClass.color : '#ffdd57',
        swatches: ['hsl(14, 100%, 53%)', 'hsl(48, 100%, 67%)', 'hsl(141, 53%, 53%)', 'hsl(171, 100%, 41%)',
          'hsl(204, 71%, 53%)', 'hsl(217, 71%, 53%)', 'hsl(271, 100%, 71%)', 'hsl(348, 86%, 61%)'
        ]
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
      },
      deleteClassModal() {
        this.$buefy.dialog.confirm({
          title: 'Deleting class',
          message: 'Are you sure you want to <b>delete</b> this Class?<br>You could lose all Modules & Milestones<br>This action cannot be undone.',
          confirmText: 'Delete Class',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () =>  {
            this.$emit('delete', this.selectedClass)
            this.$buefy.toast.open('Account deleted!')
          }
        })
      }
    }
  }
</script>

<style>
  .labelSize>.label {
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
    padding-top: 20px;
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
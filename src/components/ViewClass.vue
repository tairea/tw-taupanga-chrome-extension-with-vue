<template>
  <div>
    <!-- CLASS BANNER -->
    <ClassBanner :classGroup="classGroup" :number="taiohiNumber" @back="$emit('close')" />

    <!-- TAIOHI PICKER -->
    <section>
      <div class="divider">
        <p class="text">Teina</p>
      </div>
      <b-field class="flex">
        <b-checkbox-button v-for="(student, index) in pluck('Teina')" :key="index" :id="student.nsn" v-model="nsnArray"
          :native-value="student.nsn" class="taiohi-image-button"
          :class="{ 'highlighted' : inNsnArray(student.nsn),  'unhighlighted' : !inNsnArray(student.nsn) }"
          :style="{ backgroundImage: 'url(' + student.profilePicUrl + ')' }">
          <p v-if="!student.profilePicUrl" class="name">{{student.given_name ? student.given_name : student.nsn }}</p>
        </b-checkbox-button>
      </b-field>

      <div class="divider">
        <p class="text">Pōtiki</p>
      </div>
      <b-field class="flex">
        <b-checkbox-button v-for="(student, index) in pluck('Pōtiki')" :key="index" :id="student.nsn" v-model="nsnArray"
          :native-value="student.nsn" class="taiohi-image-button"
          :class="{ 'highlighted' : inNsnArray(student.nsn),  'unhighlighted' : !inNsnArray(student.nsn) }"
          :style="{ backgroundImage: 'url(' + student.profilePicUrl + ')' }">
          <p v-if="!student.profilePicUrl" class="name">{{student.given_name ? student.given_name : student.nsn }}</p>
        </b-checkbox-button>
      </b-field>

      <div class="divider">
        <p class="text">Year 11</p>
      </div>
      <b-field class="flex">
        <b-checkbox-button v-for="(student, index) in pluck('Year 11')" :key="index" :id="student.nsn"
          v-model="nsnArray" :native-value="student.nsn" class="taiohi-image-button"
          :class="{ 'highlighted' : inNsnArray(student.nsn),  'unhighlighted' : !inNsnArray(student.nsn) }"
          :style="{ backgroundImage: 'url(' + student.profilePicUrl + ')' }">
          <p v-if="!student.profilePicUrl" class="name">{{student.given_name ? student.given_name : student.nsn }}</p>
        </b-checkbox-button>
      </b-field>
    </section>

    <div class="divider">
      <p class="text">Year 12</p>
    </div>
    <b-field class="flex">
      <b-checkbox-button v-for="(student, index) in pluck('Year 12')" :key="index" :id="student.nsn" v-model="nsnArray"
        :native-value="student.nsn" class="taiohi-image-button"
        :class="{ 'highlighted' : inNsnArray(student.nsn),  'unhighlighted' : !inNsnArray(student.nsn) }"
        :style="{ backgroundImage: 'url(' + student.profilePicUrl + ')' }">
        <p v-if="!student.profilePicUrl" class="name">{{student.given_name ? student.given_name : student.nsn }}</p>
      </b-checkbox-button>
    </b-field>
    </section>

    <div class="divider">
      <p class="text">Year 13</p>
    </div>
    <b-field class="flex">
      <b-checkbox-button v-for="(student, index) in pluck('Year 13')" :key="index" :id="student.nsn" v-model="nsnArray"
        :native-value="student.nsn" class="taiohi-image-button"
        :class="{ 'highlighted' : inNsnArray(student.nsn),  'unhighlighted' : !inNsnArray(student.nsn) }"
        :style="{ backgroundImage: 'url(' + student.profilePicUrl + ')' }">
        <p v-if="!student.profilePicUrl" class="name">{{student.given_name ? student.given_name : student.nsn }}</p>
      </b-checkbox-button>
    </b-field>
    </section>

    <!-- CANCEL / SAVE BUTTONS -->
    <div class="flex" style="justify-content: center; align-items: center; margin-top: 10px; margin-bottom:50px;">
      <b-button type="is-dark" size="is-medium" outlined @click="$emit('close')" style="margin-right: 10px">
        Cancel
      </b-button>
      <b-button type="is-warning" size="is-medium" @click="emitNewClassDetails()">
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

  import ClassBanner from "./ClassBanner.vue"


  export default {
    name: "ViewClass",
    props: ['classGroup'],
    components: {
      ClassBanner,

    },
    data() {
      return {
        taiohiNumber: 0,
        nsnArray: this.classGroup.studentsInClass ? this.classGroup.studentsInClass : [] ,
      }
    },
    mounted() {
      store.dispatch('bindAllStudents').then(() => {
        this.allStudents.forEach(student => {
          if (!student.given_name || student.profilePicUrl) {
            return
          }
          store.dispatch('getStudentProfilePic', {
            name: student.given_name,
            nsn: student.nsn
          })
        });
      })
    },
    watch: {
      nsnArray: function (nsnArray) {
        console.log(nsnArray)
        this.taiohiNumber = nsnArray.length
      }
    },
    computed: {
      ...mapState(['allStudents']),
      // sortedStudents() {
      //   var order = ["Teina", "Pōtiki", "Year 11", "Year 12", "Year 13"];
      //   return this.allStudents.sort(function (a, b) {
      //     return order.indexOf(a.className) - order.indexOf(b.className);
      //   })
      // }
    },
    methods: {
      inNsnArray(nsn) {
        if (this.nsnArray.includes(nsn)) {
          return true
        } else {
          return false
        }
      },
      pluck(thisClass) {
        return this.allStudents.filter(student => {
          return student.className === thisClass
        })
      },
      emitNewClassDetails() {
        this.classGroup.studentsInClass = this.nsnArray
        console.log("class students saved", this.classGroup)
        this.$emit('saveClassStudents', this.classGroup)
      }
    }
  }
</script>

<style>
  .tab-content {
    padding: 0px !important;
  }

  .taiohi-image-button>label.b-checkbox {
    width: 100%;
    height: 100%;
    background: transparent;
  }

  .button.is-primary:hover,
  .button.is-primary.is-hovered {
    background-color: transparent;
  }
</style>

<style scoped lang="scss">
  $primary: #7957d5 !default;

  * {
    box-sizing: border-box;
  }

  .flex {
    display: flex;
    flex-wrap: wrap;
  }

  .divider {
    width: 100%;
    font-size: 0.7rem;

    .text {
      text-align: center;
      text-transform: uppercase;
      font-weight: 800;
      margin-top: 10px;
    }
  }



  .taiohi-image-button {
    width: 22%;
    height: 100px;
    margin: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .highlighted {
    filter: grayscale(0%) opacity(100%);
    background-color: $primary;
  }

  .unhighlighted {
    filter: grayscale(100%) opacity(50%);
  }

  .name {
    font-size: 0.7rem;
    font-weight: 800;
    filter: grayscale(0%) opacity(100%);
  }
</style>
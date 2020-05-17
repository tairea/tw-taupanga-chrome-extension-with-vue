<template>
  <div>
    <!-- CLASS BANNER -->
    <div class="class-banner" :style="{backgroundColor: classGroup.color}">
      <div class="class-back-button" @click="$emit('back')">
        <b-icon icon="chevron-left"></b-icon>
      </div>

      <div class="class-title-col">
        <p class="title is-5 has-text-white">
          {{ classGroup.year_name }}
        </p>
        <p class="subtitle is-6 has-text-white">
          {{ classGroup.class_name }}
        </p>
      </div>

      <div class="class-number-col">
          <div class="class-number">
            <p class="has-text-white title is-4">{{ number }}</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "ClassBanner",
    props: ['classGroup', 'number'],
    components: {

    },
    data() {
      return {
        numberOfStudents: 0,
      }
    },
    mounted() {
      console.log("Class Banner - Glass Group:", this.classGroup)
    },
    computed: {

    },
    methods: {

    },
  }
</script>

<style scoped>
  .class-banner {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 10px;
  }

  .class-back-button {
    width: 10%;
    cursor: pointer;
  }

  .class-title-col {
    width: 60%;
  }

  .class-number-col {
    /* position: absolute;
    right: 0; */
    width: 30%;
  }

  .class-number {
		width: 60px;
		height: 60px;
		border: 1px solid rgba(255, 255, 255, 1);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
<template>
  <div>
    <!-- MODULE BANNER -->
    <div class="module-banner has-background-info">
      <div class="module-back-button" @click="$emit('back')">
        <b-icon icon="chevron-left"></b-icon>
      </div>

      <div class="module-title-col">
        <p class="title is-5 has-text-white">
          {{ module.moduleName }}
        </p>
        <p class="subtitle is-6 has-text-white">
          {{ module.moduleMilestones.length }} Milestones
        </p>
      </div>

      <div class="module-pic-col">
        <img :src="module.modulePic" class="module-pic">
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "ModuleBanner",
    props: ['module'],
    components: {

    },
    data() {
      return {

      }
    },
    mounted() {},
    computed: {

    },
    methods: {

    },
  }
</script>

<style scoped>
  .module-banner {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 10px;
  }

  .module-back-button {
    width: 10%;
    cursor: pointer;
  }

  .module-title-col {
    width: 60%;
  }

  .module-pic-col {
    /* position: absolute;
    right: 0; */
    width: 30%;
  }

  .module-pic {
    width: 100%;
    height: auto;
    border-radius: 10px;
    background: white;
    object-fit: cover;
  }
</style>
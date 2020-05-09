<template>
    <section>
        <!-- 
        innovation:
            subject:
            teacher:
            todo:    
                task: 
                due:
        -->
        <b-tabs v-model="activeTab">
            <template v-for="(todo, index) in todos">
                <b-tab-item :key="index" :label="todo.subject">
                    
                        <!-- Task Panel -->
                        <nav v-for="(task, index) in todo.todo" :key="index" class="panel">
                                <p class="panel-heading">
                                  Task {{index + 1}}
                                </p>
                                <!-- Tabs -->
                                <!-- <p class="panel-tabs">
                                  <a class="is-active">All</a>
                                  <a>Public</a>
                                  <a>Private</a>
                                  <a>Sources</a>
                                  <a>Forks</a>
                                </p> -->
                                <!-- Link -->
                                <!-- <a class="panel-block is-active">
                                  <span class="panel-icon">
                                    <i class="fas fa-book" aria-hidden="true"></i>
                                  </span>
                                  bulma
                                </a> -->
                                <label class="panel-block">
                                  <input type="checkbox">
                                  {{task.task}}
                                </label>
                                <div class="panel-block">
                                  <button class="button is-link is-outlined is-fullwidth">
                                    Submit work
                                  </button>
                                </div>
                              </nav>

                </b-tab-item>
            </template>
        </b-tabs>
    </section>
</template>

<script>
    export default {
        name: "Todos",
        props: ['todos'],
        components: {

        },
        data() {
            return {
                activeTab: 0,
            }
        },
        computed: {
            
        }
    }
</script>
<template>
    <div>
        <router-link to="logout">
            <div class="header">
                <h1 id="name">{{staff.given_name}}</h1>
                <img v-if="profilePicUrl" :src="profilePicUrl" class="profile-pic" />
            </div>
        </router-link>

        <section>
            <!-- CLASSES NAV -->
            <b-tabs v-model="activeTab">
                <template v-for="(classGroup, index) in staff.classes">
                    <b-tab-item :key="index" :label="classGroup.year_name">

                        <!-- MODULE COMPONENTS -->
                        <transition name="dip" mode="out-in">

                            <Module v-if="showModulesFlag" :modules="getModulesForThisClass(classGroup.year_name)" @viewModule="viewModule($event)"
                                @editModule="editModule($event)" />
                        <!-- </transition> -->

                        <!-- <transition name="backward" mode="out-in"> -->
                            <ViewModule v-else-if="viewModuleFlag" :module="selectedModule" @back="showModules()" />

                            
                            <AddModule v-else-if="addModuleFlag" @close="showModules()" @saveModule="saveModule($event,classGroup.year_name,classGroup.class_name)" />
                        </transition>


                        <!-- TODO: <Milestone> -->

                        <!-- Add Button -->
                        <div v-if="addModuleButton" class="addButton" @click="addModule()">
                            <b-icon icon="plus" size="is-large" type="is-grey-light">
                            </b-icon>
                        </div>
                        <div v-else-if="addMilestoneButton" class="addButton" @click="addMilestone()">
                            <b-icon icon="plus" size="is-large" type="is-grey-light">
                            </b-icon>
                        </div>

                    </b-tab-item>
                </template>
            </b-tabs>
        </section>

    </div>
</template>

<script>
    import router from '../../router'
    import store from '../../../store'
    import {
        mapState,
        mapActions
    } from 'vuex'

    import Module from "../../../components/Module.vue";
    import ViewModule from "../../../components/ViewModule.vue";
    import AddModule from "../../../components/AddModule.vue";

    export default {
        name: "Teacher",
        components: {
            Module,
            ViewModule,
            AddModule,
        },
        data() {
            return {
                activeTab: 0,
                showModulesFlag: true,
                viewModuleFlag: false,
                addModuleFlag: false,
                selectedModule: null,
                selectedModuleId: null,
                addModuleButton: true,
                addMilestoneButton: false,
            //     modules: [{
            //             id: 123,
            //             title: 'Website',
            //             subject: 'Innovation',
            //             milestones: [{
            //                     milestoneName: 'milestone 1',
            //                     milestoneInstructions: 'Please read this document',
            //                     milestoneCompleted: false,
            //                     milestoneSubmission: '',
            //                     milestoneLinks: [{
            //                             linkName: 'Instructions doc',
            //                             linkUrl: 'http://tairea.io'
            //                         },
            //                         {
            //                             linkName: 'Link to video',
            //                             linkUrl: 'http://tairea.io'
            //                         },
            //                     ]
            //                 },
            //                 {
            //                     milestoneName: 'milestone 2',
            //                     milestoneInstructions: 'Complete these activities',
            //                     milestoneCompleted: false,
            //                     milestoneSubmission: '',
            //                     milestoneLinks: [{
            //                             linkName: 'Activities doc',
            //                             linkUrl: 'http://tairea.io'
            //                         },
            //                         {
            //                             linkName: 'Link to video',
            //                             linkUrl: 'http://tairea.io'
            //                         },
            //                     ]
            //                 },
            //                 {
            //                     milestoneName: 'milestone 3',
            //                     milestoneInstructions: 'Please read this document',
            //                     milestoneCompleted: false,
            //                     milestoneSubmission: '',
            //                     milestoneLinks: [{
            //                             linkName: 'Instructions doc',
            //                             linkUrl: 'http://tairea.io'
            //                         },
            //                         {
            //                             linkName: 'Link to video',
            //                             linkUrl: 'http://tairea.io'
            //                         },
            //                     ]
            //                 }
            //             ]
            //         },
            //         {
            //             id: 456,
            //             title: 'VR Project',
            //             subject: 'Innovation',
            //             milestones: [{
            //                     milestoneName: 'milestone 1',
            //                     milestoneInstructions: 'Please read this document',
            //                     milestoneCompleted: false,
            //                     milestoneSubmission: '',
            //                     milestoneLinks: [{
            //                             linkName: 'Instructions doc',
            //                             linkUrl: 'http://tairea.io'
            //                         },
            //                         {
            //                             linkName: 'Link to video',
            //                             linkUrl: 'http://tairea.io'
            //                         },
            //                     ]
            //                 },
            //                 {
            //                     milestoneName: 'milestone 2',
            //                     milestoneInstructions: 'Complete these activities',
            //                     milestoneCompleted: false,
            //                     milestoneSubmission: '',
            //                     milestoneLinks: [{
            //                             linkName: 'Activities doc',
            //                             linkUrl: 'http://tairea.io'
            //                         },
            //                         {
            //                             linkName: 'Link to video',
            //                             linkUrl: 'http://tairea.io'
            //                         },
            //                     ]
            //                 },
            //                 {
            //                     milestoneName: 'milestone 3',
            //                     milestoneInstructions: 'Please read this document',
            //                     milestoneCompleted: false,
            //                     milestoneSubmission: '',
            //                     milestoneLinks: [{
            //                             linkName: 'Instructions doc',
            //                             linkUrl: 'http://tairea.io'
            //                         },
            //                         {
            //                             linkName: 'Link to video',
            //                             linkUrl: 'http://tairea.io'
            //                         },
            //                     ]
            //                 }
            //             ]
            //         }
            //     ]
            }
        },
        watch: {
            staff: function (staff) {
                console.log("staff watcher triggered")
                if (staff.email) {
                    // update nsn
                    // store.commit('storeNsn', student.nsn)
                    // bind todos
                    // store.dispatch('bindTodos', student.nsn)
                    // get profilePic
                    console.log("getting profile pic for ", staff.given_name.toLowerCase())
                    store.dispatch('getProfilePic', staff.given_name.toLowerCase())
                }
            }
        },
        computed: {
            ...mapState(['user', 'staff', 'profilePicUrl', 'modules']),
        },
        methods: {
            ...mapActions(['saveModuletoFirestore']),
            showModules() {
                this.viewModuleFlag = false;
                this.addModuleFlag = false;
                this.addMilestoneButton = false;
                this.showModulesFlag = true;
                this.addModuleButton = true;
            },
            viewModule(module) {
                console.log("view module is: ", module)
                this.showModulesFlag = false;
                this.selectedModule = module
                this.addModuleButton = false
                this.viewModuleFlag = true;
                this.addMilestoneButton = true
            },
            addModule() {
                this.showModulesFlag = false;
                this.viewModuleFlag = false;
                this.addModuleButton = false;
                this.addMilestoneButton = false;
                this.addModuleFlag = true;
            },
            saveModule(moduleObj,year_name,class_name) {
                this.showModules()
                moduleObj.className = class_name
                moduleObj.yearName = year_name
                moduleObj.teacher = this.staff.family_name
                this.saveModuletoFirestore(moduleObj)
            },
            getModulesForThisClass(year_name)  {
                var result = this.modules.filter(obj => {
                    return obj.yearName === year_name
                })
                return result
            }

        },
        mounted() {
            // TODO: bind only once at the beginning. not everytime mounted. (maybe local storage)
            store.dispatch('bindStaff', this.user.email).then(() => {
                store.commit('mapStaffData')
                // TODO: bindModulesByStaff 
                store.dispatch('bindModulesByStaff', this.staff.family_name)
                .then(() => {
                    // store.commit('mapModulesByStaff')
                    console.log("logging modules for this staff: ", this.modules)
                })
            })

            
        }

    }
</script>

<style lang="scss">
    .header {
        padding: 10px 0px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: black;

        #name {
            color: white;
            font-weight: 800;
        }

        .profile-pic {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: white;
        }
    }

    .addButton {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 50px 0px;
        cursor: pointer;
    }

    /* Slide VUE animation */
    .forward-enter,
    .forward-leave-to {
        opacity: 0;
        transform: translateX(-50px);
        /* position: relative; */
    }

    .forward-enter-to,
    .forward-leave {
        opacity: 1;
        transform: translateX(0px);
        /* position: absolute; */
    }

    .forward-enter-active,
    .forward-leave-active {
        transition: all 300ms ease-out;
    }

    .backward-enter,
    .backward-leave-to {
        opacity: 0;
        transform: translateX(50px);
        /* position: relative; */
    }

    .backward-enter-to,
    .backward-leave {
        opacity: 1;
        transform: translateX(0px);
        /* position: absolute; */
    }

    .backward-enter-active,
    .backward-leave-active {
        transition: all 300ms ease-out;
    }

    .dip-enter,
    .dip-leave-to {
        opacity: 0;
        transform: translateY(25px);
        /* position: relative; */
    }

    .dip-enter-to,
    .dip-leave {
        opacity: 1;
        transform: translateY(0px);
        /* position: absolute; */
    }

    .dip-enter-active,
    .dip-leave-active {
        transition: all 200ms ease-out;
    }

</style>
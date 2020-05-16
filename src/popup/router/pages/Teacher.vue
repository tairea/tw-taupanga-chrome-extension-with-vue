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
			<b-tabs v-model="activeTab" @input="tabClicked($event)">
				<template v-for="(classGroup, index) in classes">
					<b-tab-item :key="index" :label="classGroup.year_name" ref="tab">

						<!-- MODULE COMPONENTS -->
						<transition name="dip" mode="out-in">

							<!-- ======= MODULES ======= -->
							<Module 
								v-if="showModulesFlag" 
								:modules="getModulesForThisClass(classGroup.year_name)"
								@viewMilestones="viewMilestones($event)" 
								@editModule="editModule($event)" 
							/>
							<AddModule 
								v-else-if="addModuleFlag" 
								:className="classGroup.class_name"
								:yearName="classGroup.year_name" 
								@close="showModules()"
								@saveModule="saveModule($event,classGroup.year_name,classGroup.class_name)" 
							/>
							<EditModule 
								v-else-if="editModuleFlag" 
								:module="selectedModule"
								:className="classGroup.class_name" 
								:yearName="classGroup.year_name"
								@close="showModules()"
								@saveModule="saveModule($event,classGroup.year_name,classGroup.class_name)" 
							/>

							<!-- ======= MILESTONES ======= -->
							<ViewMilestones 
								v-else-if="viewMilestonesFlag" 
								:module="selectedModule"
								@back="showModules()" 
								@addMilestone="addMilestone($event)" 
								@editMilestone="editMilestone($event)"
							/>
							<AddMilestone 
								v-else-if="addMilestoneFlag" 
								:module="selectedModule" 
								@back="showModules()"
								@backToModule="viewMilestones($event)" 
								@saveMilestone="saveMilestone($event)" 
							/>
							<EditMilestone 
								v-else-if="editMilestoneFlag" 
								:module="selectedModule" 
								:selectedMilestone="selectedMilestone" 
								:selectedMilestoneIndex="selectedMilestoneIndex"
								:isEditing="isEditingMilestone" 
								@back="showModules()"
								@backToModule="viewMilestones($event)" 
								@updateMilestone="updateMilestone($event)" 
								@delete="removeSelectedMilestone($event)" 
							/>

						</transition>

						<!-- Add Button -->
						<div v-if="addModuleButton" class="addButton" @click="addModule()">
							<b-icon icon="plus" size="is-large">
							</b-icon>
						</div>

					</b-tab-item>

				</template>
				<!-- Create / Edit a class -->
				<b-tab-item label="Add Class" icon="edit">

					<transition name="dip" mode="out-in">

						<!-- ======= CLASSES ======= -->
						<Class 
							v-if="showClassesFlag" 
							:classes="classes" 
							@editClass="editClass($event)"
							@viewClass="viewClass($event)"
						/>

						<EditClass 
							v-else-if="saveClassFlag" 
							:isEditing="isEditingClass" 
							:selectedClass="selectedClass"
							:teacher="staff" 
							@close="closeClassEdit()" 
							@saveClass="saveClass($event)"
							@delete="removeSelectedClass($event)" 
						/>

						<ViewClass 
							v-if="viewClassFlag" 
							:classGroup="selectedClass"
							@close="closeClassView()"
							@saveClass="saveClass($event)"
						/>

						<!-- <AddStudentsToClass v-else-if="addStudentsFlag" /> -->

					</transition>

					<div v-if="classButtonFlag" class="addButton" @click="addClass()">
						<b-icon icon="plus" size="is-large">
						</b-icon>
					</div>
				</b-tab-item>
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

	import Class from "../../../components/Class.vue";
	import EditClass from "../../../components/EditClass.vue";
	import ViewClass from "../../../components/ViewClass.vue";
	// import AddStudentsToClass from "../../../components/AddStudentsToClass.vue";

	import Module from "../../../components/Module.vue";
	import AddModule from "../../../components/AddModule.vue";
	import EditModule from "../../../components/EditModule.vue";

	import ViewMilestones from "../../../components/ViewMilestones.vue";
	import AddMilestone from "../../../components/AddMilestone.vue";
	import EditMilestone from "../../../components/EditMilestone.vue";


	export default {
		name: "Teacher",
		components: {
			Class,
			EditClass,
			ViewClass,
			// AddStudentsToClass,
			Module,
			AddModule,
			EditModule,
			ViewMilestones,
			AddMilestone,
			EditMilestone,
		},
		data() {
			return {
				activeTab: 0,
				// MODULES
				showModulesFlag: true,
				// viewModuleFlag: false,
				addModuleFlag: false,
				editModuleFlag: false,
				// MILESTONES
				viewMilestonesFlag: false,
				addMilestoneFlag: false,
				editMilestoneFlag: false,
				// CLASSES
				showClassesFlag: false,
				saveClassFlag: false,
				addStudentsFlag: false,
				viewClassFlag: false,
				// BUTTONS
				addModuleButton: true,
				classButtonFlag: false,
				// SELECTEDS
				selectedModule: null,
				selectedClass: null,
				selectedMilestone: null,
				selectedMilestoneIndex: null,
				// IS EDITING FLAGS
				isEditingClass: false,
				isEditingMilestone: false,
				
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
						console.log("logging MODULES for this staff: ", this.modules)
					})
				store.dispatch('bindClassesByStaff', this.staff.family_name)
					.then(() => {
						// store.commit('mapModulesByStaff')
						if (classes.length == 0) {
							//if no classes then show add class ui
							this.showClasses()
						}
					})
			})
		},
		watch: {
			staff: function (staff) {
				console.log("staff watcher triggered")
				if (staff.email) {
					console.log("getting profile pic for ", staff.given_name.toLowerCase())
					store.dispatch('getProfilePic', staff.given_name.toLowerCase())
				}
			},
			classes: function (classes) {
				console.log("classes changed")
				this.activeTab = classes.length + 1
			}
		},
		computed: {
			...mapState(['user', 'staff', 'profilePicUrl', 'modules', 'classes']),
		},
		methods: {
			...mapActions(['saveModuletoFirestore', 'saveMilestonetoFirestore', 'saveClasstoFirestore',
				'removeClassFromFirestore', 'removeMilestoneFromFirestore'
			]),
			tabClicked(i) {
				if (this.classes.length == i) {
					this.showClasses()
				} else {
					this.showModulesFlag = true;
					this.addModuleButton = true;
				}
			},
			hideAllViewsAndButtons() {
				this.showModulesFlag = false
				// this.viewModuleFlag = false
				this.addModuleFlag = false
				this.editModuleFlag = false
				this.viewMilestonesFlag = false
				// this.addMilestoneFlag = false
				// this.addModuleButton = false
				this.showClassesFlag = false
				this.classButtonFlag = false
				this.saveClassFlag = false
			},
			//======= MODULES =======
			showModules() {
				this.hideAllViewsAndButtons()
				this.showModulesFlag = true;
				this.addModuleButton = true;
			},
			// viewModule(module) {
			//     console.log("view module is: ", module)
			//     this.hideAllViewsAndButtons()
			//     // set selected module
			//     this.selectedModule = module
			//     // show view and matching button
			//     this.viewModuleFlag = true;
			//     this.addMilestoneButton = true
			// },
			addModule() {
				this.hideAllViewsAndButtons()
				// show view
				this.addModuleFlag = true;
				this.addModuleButton = false;
			},
			editModule(module) {
				this.hideAllViewsAndButtons()
				// set seleted module
				this.selectedModule = module;
				// show view
				this.editModuleFlag = true;
				this.addModuleButton = false;
			},
			saveModule(moduleObj, year_name, class_name) {
				this.showModules()
				moduleObj.className = class_name
				moduleObj.yearName = year_name
				moduleObj.teacher = this.staff.family_name
				moduleObj.moduleMilestones = []
				this.saveModuletoFirestore(moduleObj)
			},
			getModulesForThisClass(year_name) {
				var result = this.modules.filter(obj => {
					return obj.yearName === year_name
				})
				return result
			},
			//======= MILESTONES =======
			viewMilestones(module) {
				this.hideAllViewsAndButtons()
				// set seleted module
				this.selectedModule = module;
				// show view
				this.viewMilestonesFlag = true;
				this.addModuleButton = false;
			},
			addMilestone(module) {
				this.hideAllViewsAndButtons()
				// set seleted module
				this.selectedModule = module;
				this.addMilestoneFlag = true;
				this.addModuleButton = false;
			},
			editMilestone(args) {
				const milestoneObj = args.milestone;
				const index = args.index
				this.hideAllViewsAndButtons()
				// set seleted module
				this.selectedMilestone = milestoneObj;
				this.selectedMilestoneIndex = index;
				// show views
				this.isEditingMilestone = true
				this.editMilestoneFlag = true;
				this.addModuleButton = false;
			},
			async saveMilestone(args) {
				const milestoneObj = args.milestone
				const moduleObj = args.module
				// add via push
				moduleObj.moduleMilestones.push(milestoneObj)
				await this.saveMilestonetoFirestore(moduleObj)
				this.viewMilestones(moduleObj)
			},
			async updateMilestone(args) {
				const milestoneObj = args.milestone
				const moduleObj = args.module
				const milestoneIndex = args.index
				console.log("updating...")
				console.log("module",moduleObj)
				console.log("milestoneIndex",milestoneIndex)
				console.log("milestoneObj",milestoneObj)
				// update/replace via assignment
				moduleObj.moduleMilestones[milestoneIndex] = milestoneObj
				await this.saveMilestonetoFirestore(moduleObj)
				this.viewMilestones(moduleObj)
			},
			async removeSelectedMilestone(args) {
				const moduleObj = args.module
				const index = args.index
				moduleObj.moduleMilestones.splice(index, 1)
				await this.saveMilestonetoFirestore(moduleObj)
				this.isEditingMilestone = false
				this.editMilestoneFlag = false;
				this.viewMilestones(moduleObj)
			},
			//======= CLASSES =======
			showClasses() {
				this.hideAllViewsAndButtons()
				this.showClassesFlag = true
				this.classButtonFlag = true
			},
			addClass() {
				// show view
				this.showClassesFlag = false
				this.classButtonFlag = false
				this.saveClassFlag = true
			},
			saveClass(classObj) {
				this.showClasses()
				console.log("saving Class to FS:", classObj)
				this.saveClasstoFirestore(classObj)
			},
			editClass(classGroup) {
				this.hideAllViewsAndButtons()
				// set seleted module
				console.log("Editing CLASS:", classGroup)
				this.isEditingClass = true
				this.selectedClass = classGroup;
				// show view
				this.saveClassFlag = true;
			},
			removeSelectedClass(classObj) {
				this.showClasses()
				this.removeClassFromFirestore(classObj)
			},
			closeClassEdit() {
				this.isEditingClass = false
				this.selectedClass = null;
				this.showClasses()
			},
			viewClass(classObj) {
				this.hideAllViewsAndButtons()
				this.selectedClass = classObj
				this.viewClassFlag = true
			},
			saveClass (args) {
				// TODO: bind the students nsn's into this class
				/*
				const classObj = args.classGroup
				const nsnArray = args.nsnArray
				classObj.students = nsnArray
				*/
			},
			closeClassView() {
				this.viewClassFlag = false
				this.selectedClass = null;
				this.showClasses()
			},
		},
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
		color: rgba(0, 0, 0, 0.3);
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
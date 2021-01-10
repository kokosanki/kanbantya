<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <img style="width: 50px" src="@/assets/cat-64.png" alt="logo">
        <h1 class="secondary--text">Kanbanya</h1>
      </div>
      <v-spacer></v-spacer>
      <v-btn
      @click="openCreateTaskModal"
      color="secondary"
      class="primary--text font-weight-black">Create a task</v-btn>
    </v-app-bar>

    <v-main>
      <Home />
      <create-task-modal
      @close="closeCreateTaskModal"
      :active="isCreateTaskModalOpen"/>
    </v-main>
  </v-app>
</template>

<script>
import Home from '@/views/Home'
import createTaskModal from '@/components/createTaskModal'

export default {
  name: 'App',
  components: { Home, createTaskModal },
  data: () => ({
    isCreateTaskModalOpen: false
  }),
  methods: {
    createTask () {
      console.log('create')
    },
    openCreateTaskModal () {
      this.isCreateTaskModalOpen = true
    },
    closeCreateTaskModal () {
      this.isCreateTaskModalOpen = false
    }
  }
}
</script>

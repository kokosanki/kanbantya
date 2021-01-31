<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <img
          style="width: 50px"
          src="@/assets/cat-64.png"
          alt="logo"
        >
        <h1 class="secondary--text">
          Kanbanya
        </h1>
      </div>
      <v-spacer />
      <v-btn
        color="secondary"
        class="primary--text font-weight-black"
        @click="openCreateTaskModal"
      >
        Create a task
      </v-btn>
    </v-app-bar>

    <v-main>
      <Home
        :tasks-list.sync="tasksList"
        :validation-rules="validationRules"
        @update="getItems"
      />
      <create-task-modal
        v-if="isCreateTaskModalOpen"
        :active="isCreateTaskModalOpen"
        :validation-rules="validationRules"
        @close="closeCreateTaskModal"
        @createNewTask="addItem"
      />
    </v-main>
  </v-app>
</template>

<script>
import Home from '@/views/Home'
import createTaskModal from '@/components/createTaskModal'
import axios from 'axios'

export default {
  name: 'App',
  components: { Home, createTaskModal },
  data: () => ({
    isCreateTaskModalOpen: false,
    tasksList: {
      todos: [],
      inProgress: [],
      blocked: [],
      done: []
    },
    tasks: [],
    validationRules: {
      titleRules: [
        (v) => (v && !!v.trim()) || 'Title is required',
        (v) => (v && v.length <= 100) || 'Title must be less than 100 characters'
      ],
      descriptionRules: [
        (v) => !v || v.length <= 5000 || 'Description must be less than 5000 characters'
      ]
    }
  }),
  mounted() {
    this.getItems()
  },
  methods: {
    openCreateTaskModal() {
      this.isCreateTaskModalOpen = true
    },
    closeCreateTaskModal() {
      this.isCreateTaskModalOpen = false
    },
    async addItem(title, description) {
      try {
        const response = await axios.post('api/tasks/', {
          title: title,
          description: description,
          status: 'todos'
        })
        this.tasksList.todos.push(response.data)
      } catch (err) {
        console.error(err)
      }
    },
    async getItems() {
      try {
        const response = await axios.get('api/tasks/')
        this.tasks = response.data
        this.sortTasks()
      } catch (err) {
        console.error(err)
      }
    },
    clearTaskList() {
      this.tasksList = {
        todos: [],
        inProgress: [],
        blocked: [],
        done: []
      }
    },
    sortTasks() {
      this.clearTaskList()
      this.tasks.map((todo) => {
        const status = todo.status
        if (status === 'todos') {
          this.tasksList.todos.push(todo)
        } else if (status === 'inProgress') {
          this.tasksList.inProgress.push(todo)
        } else if (status === 'blocked') {
          this.tasksList.blocked.push(todo)
        } else if (status === 'done') {
          this.tasksList.done.push(todo)
        }
      })
    }
  }
}
</script>

<template>
  <div class="ma-10 row d-flex justify-space-between">
    <div class="col-3">
      <h3>Todos</h3>
      <draggable class="list-group" ref="todos" :list="allTasks.todos" group="tasks" @change="updateItemStatus($event, 'todo')">
        <div
          class="list-group-item"
          v-for="(element) in allTasks.todos"
          :key="element._id"
          @click="openEditTaskModal(element)"
        >
          {{ element.title }} {{element.description}}
           <v-icon @click="removeItem(element._id)">mdi-close</v-icon>
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>In progress</h3>
      <draggable class="list-group" :list="allTasks.inProgress" group="tasks" @change="updateItemStatus($event, 'inProgress')">
        <div
          class="list-group-item"
          v-for="(element) in allTasks.inProgress"
          :key="element.title"
        >
          {{ element.title }} {{element.description}}
           <v-icon @click="removeItem(element._id)">mdi-close</v-icon>
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Blocked</h3>
      <draggable class="list-group" :list="allTasks.blocked" group="tasks" @change="updateItemStatus($event, 'blocked')">
        <div
          class="list-group-item"
          v-for="(element) in allTasks.blocked"
          :key="element.title"
        >
          {{ element.title }} {{element.description}}
           <v-icon @click="removeItem(element._id)">mdi-close</v-icon>
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Done</h3>
      <draggable class="list-group" :list="allTasks.done" group="tasks" @change="updateItemStatus($event, 'done')">
        <div
          class="list-group-item"
          v-for="(element) in allTasks.done"
          :key="element.title"
        >
          {{ element.title }} {{element.description}}
           <v-icon @click="removeItem(element._id)">mdi-close</v-icon>
        </div>
      </draggable>
    </div>
  <edit-task-modal
  :active="isEditTaskModalActive"
  @close="closeEditTaskModal"
  @editTask="editTask"
  :title.sync="selected.title"
  :description.sync="selected.description" />
  </div>
</template>
<script>
import editTaskModal from '@/components/editTaskModal'
import draggable from 'vuedraggable'
import axios from 'axios'

export default {
  display: 'Two Lists',
  order: 1,
  props: {
    tasksList: {
      type: Object,
      required: true
    }
  },
  components: {
    draggable,
    editTaskModal
  },
  data () {
    return {
      isEditTaskModalActive: false,
      selected: {
        id: null,
        title: null,
        description: null
      }
    }
  },
  computed: {
    allTasks () {
      return this.tasksList
    }
  },
  methods: {
    async updateItemStatus (evt, status) {
      if (evt && evt.added) {
        const id = evt.added.element._id
        try {
          await axios.put(`api/tasks/${id}`, {
            status: status
          })
        } catch (err) {
          console.error(err)
        }
      }
    },
    async removeItem (id) {
      try {
        await axios.delete(`api/tasks/${id}`)
        this.$emit('update', id)
      } catch (err) {
        console.err(err)
      }
    },
    openEditTaskModal (task) {
      this.isEditTaskModalActive = true
      this.selected = {
        id: task._id,
        title: task.title,
        description: task.description
      }
    },
    closeEditTaskModal () {
      this.isEditTaskModalActive = false
      this.selected = {
        id: null,
        title: null,
        description: null
      }
    },
    async editTask (title, description) {
      const id = this.selected.id
      try {
        await axios.put(`api/tasks/${id}`, {
          title: title,
          description: description
        })
      } catch (err) {
        console.error(err)
      }
      this.$emit('update')
    }
  }
}
</script>
<style>
.list-group-item {
  cursor: pointer;
  border-radius: 5%;
  padding: 5px;
  margin-bottom: 5px;
  background-color: pink;
}
.list-group-item:active {
  cursor: grabbing;
}
</style>

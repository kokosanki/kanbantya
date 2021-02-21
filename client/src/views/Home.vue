<template>
  <div class="kanban d-flex justify-space-between">
    <kanban-column
      v-for="(tasks, key, index) in allTasks"
      :key="index"
      :name="key"
      :tasks="tasks"
      @openEditTaskModal="openEditTaskModal"
      @updateItemStatus="updateItemStatus"
    />

    <edit-task-modal
      v-if="isEditTaskModalActive"
      :active="isEditTaskModalActive"
      :title.sync="selected.title"
      :description.sync="selected.description"
      :validation-rules="validationRules"
      @close="closeEditTaskModal"
      @editTask="editTask"
      @removeItem="removeItem"
    />
  </div>
</template>
<script>
import editTaskModal from '@/components/editTaskModal'
import kanbanColumn from '@/components/kanbanColumn'
import axios from 'axios'

export default {
  display: 'Two Lists',
  order: 1,
  components: {
    editTaskModal,
    kanbanColumn
  },
  props: {
    tasksList: {
      type: Object,
      required: true
    },
    validationRules: {
      type: Object,
      required: true
    }
  },
  data() {
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
    allTasks() {
      return this.tasksList
    }
  },
  methods: {
    async updateItemStatus(evt, status) {
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
    async removeItem() {
      const id = this.selected.id
      try {
        await axios.delete(`api/tasks/${id}`)
        this.$emit('update', id)
      } catch (err) {
        console.err(err)
      }
    },
    openEditTaskModal(task) {
      this.isEditTaskModalActive = true
      this.selected = {
        id: task._id,
        title: task.title,
        description: task.description
      }
    },
    closeEditTaskModal() {
      this.isEditTaskModalActive = false
      this.selected = {
        id: null,
        title: null,
        description: null
      }
    },
    async editTask(title, description) {
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
<style lang="scss">
.kanban {
  flex-direction: column;
  .list-group-item:active {
    cursor: grabbing;
  }
}
</style>

<template>
  <div class="ma-10 row d-flex justify-space-between">
    <div class="col-3">
      <h3>Todos</h3>
      <draggable class="list-group" ref="todos" :list="allTasks.todos" group="tasks" @change="updateItemStatus($event, 'todo')">
        <div
          class="list-group-item"
          v-for="(element, index) in allTasks.todos"
          :key="element._id"
        >
          {{ element.title }} {{ index }} {{element.description}}
           <v-icon @click="removeItem(element._id)">mdi-close</v-icon>
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>In progress</h3>
      <draggable class="list-group" :list="allTasks.inProgress" group="tasks" @change="updateItemStatus($event, 'inProgress')">
        <div
          class="list-group-item"
          v-for="(element, index) in allTasks.inProgress"
          :key="element.title"
        >
          {{ element.title }} {{ index }} {{element.description}}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Blocked</h3>
      <draggable class="list-group" :list="allTasks.blocked" group="tasks" @change="updateItemStatus($event, 'blocked')">
        <div
          class="list-group-item"
          v-for="(element, index) in allTasks.blocked"
          :key="element.title"
        >
          {{ element.title }} {{ index }} {{element.description}}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Done</h3>
      <draggable class="list-group" :list="allTasks.done" group="tasks" @change="updateItemStatus($event, 'done')">
        <div
          class="list-group-item"
          v-for="(element, index) in allTasks.done"
          :key="element.title"
        >
          {{ element.title }} {{ index }} {{element.description}}
        </div>
      </draggable>
    </div>

  </div>
</template>
<script>
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
    draggable
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

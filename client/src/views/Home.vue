<template>
  <div class="ma-10 row d-flex justify-space-between">
    <div class="col-3">
      <h3>Todos</h3>
      <draggable class="list-group" :list="todos" group="tasks" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in todos"
          :key="element._id"
        >
          {{ element.title }} {{ index }} {{element.description}}
           <v-icon @click="removeItem(element._id)">mdi-close</v-icon>
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>In progress</h3>
      <draggable @end="add" class="list-group" :list="inProgress" group="tasks" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in inProgress"
          :key="element.title"
        >
          {{ element.title }} {{ index }} {{element.description}}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Blocked</h3>
      <draggable class="list-group" :list="blocked" group="tasks" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in blocked"
          :key="element.title"
        >
          {{ element.title }} {{ index }} {{element.description}}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Done</h3>
      <draggable class="list-group" :list="done" group="tasks" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in done"
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
    todos: {
      type: Array,
      required: true
    }
  },
  components: {
    draggable
  },
  data () {
    return {
      inProgress: [
      ],
      blocked: [
      ],
      done: [
      ]
    }
  },
  methods: {
    log: function (evt) {
      window.console.log(evt)
      if (evt.added) {
        console.log('sth is added')
      } else {
        console.log('sth is removed')
      }
    },
    add: function (/** Event */evt) {
    // same properties as onEnd
      console.log(evt.to)
      console.log('lalala')
    },
    async removeItem (id) {
      console.log(id)
      await axios.delete(`api/tasks/${id}`)
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

<template>
  <div class="ma-10 row d-flex justify-space-between">
    <div class="col-3">
      <h3>Todos</h3>
      <draggable class="list-group" :list="todos" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in todos"
          :key="element.title"
        >
          {{ element.title }} {{ index }} {{element.description}}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>In progress</h3>
      <draggable class="list-group" :list="inProgress" group="people" @change="log">
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
      <draggable class="list-group" :list="blocked" group="people" @change="log">
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
      <draggable class="list-group" :list="done" group="people" @change="log">
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

export default {
  display: 'Two Lists',
  order: 1,
  components: {
    draggable
  },
  data () {
    return {
      todos: [
        { title: 'John', description: 'sth' },
        { title: 'Jean', description: 'sth' },
        { title: 'Gerard', description: 'sth' },
        { title: 'Joao', description: 'sth' }
      ],
      inProgress: [
      ],
      blocked: [
      ],
      done: [
      ]
    }
  },
  methods: {
    add: function () {
      this.list.push({ title: 'Juan' })
    },
    replace: function () {
      this.list = [{ title: 'Edgard' }]
    },
    clone: function (el) {
      return {
        title: el.title + ' cloned'
      }
    },
    log: function (evt) {
      window.console.log(evt)
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

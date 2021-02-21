<template>
  <div class="list-group">
    <h3 class="mb-3">{{ displayedName }}</h3>
    <draggable
      ref="todos"
      :list="tasks"
      group="tasks"
      @change="updateItemStatus($event, 'todo')"
    >
      <div
        v-for="(element) in tasks"
        :key="element._id"
        class="list-group-item"
        @click="openEditTaskModal(element)"
      >
        <h3>
          {{ element.title }}
        </h3>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: {
    tasks: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: false
    }
  },
  computed: {
    displayedName() {
      switch (this.name) {
        case 'todos':
          return 'Todo'
        case 'inProgress':
          return 'In Progress'
        case 'blocked':
          return 'Blocked'
        default:
          return 'Done'
      }
    }
  },
  methods: {
    openEditTaskModal(element) {
      this.$emit('openEditTaskModal', element)
    },
    updateItemStatus(event) {
      this.$emit('updateItemStatus', event, this.name)
    }
  }
}
</script>

<style>
.list-group {
  width: 100%;
  background-color: #ceb8ff;
  padding: 15px;
  min-height: calc(25vh - 14px);
}

.list-group:nth-child(odd) {
  background-color: #fc659f;
}
.list-group-item {
  width: 100%;
  cursor: pointer;
  border-radius: 5px !important;
  margin-top: 10px;
  padding: 10px;
  background-color: #ffe6f2;
}
.list-group-item:active {
  cursor: grabbing;
}

@media only screen and (min-width: 900px) {
  .kanban {
    flex-direction: row !important;
  }
  .list-group {
    height: calc(100vh - 56px);
    background-color: unset !important;
    border-right: 2px solid #311b92;
  }
  .list-group:last-of-type {
    border-right: none;
  }
}
</style>

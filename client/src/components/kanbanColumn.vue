<template>
  <div class="list-group">
    <h3>{{ displayedName }}</h3>
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
        {{ element.title }}
        <br>
        {{ element.description }}
        <v-icon
          class="delete-icon"
          @click="removeItem(element._id)"
        >
          mdi-close
        </v-icon>
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
        case 'todo':
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
    },
    removeItem(id) {
      this.$emit('removeItem', id)
    }
  }
}
</script>

<style>
.list-group {
  width: 25%;
  border: 2px solid magenta;
}
.list-group-item {
  width: 100%;
  cursor: pointer;
  border-radius: 5%;
  padding: 5px;
  margin-bottom: 5px;
  background-color: pink;
}
.list-group-item:active {
  cursor: grabbing;
}
.delete-icon:hover {
  background-color: magenta;
}
</style>

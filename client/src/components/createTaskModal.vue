<template>
  <v-row justify="center">
    <v-dialog
      v-model="active"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Create a new task</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Task title"
                  required
                  v-model="newTaskTitle"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Task description"
                  required
                  v-model="newTaskDescription"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="closeModal"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="createTask"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    newTaskTitle: null,
    newTaskDescription: null
  }),
  methods: {
    closeModal () {
      this.$emit('close')
    },
    createTask () {
      this.$emit('createNewTask', this.newTaskTitle, this.newTaskDescription)
      this.closeModal()
    }
  }
}
</script>

<style>

</style>

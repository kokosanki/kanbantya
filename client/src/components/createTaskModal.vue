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
              <v-form
                ref="form"
                style="width: 100%"
              >
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="newTaskTitle"
                    label="Task title"
                    required
                    :rules="validationRules.titleRules"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="newTaskDescription"
                    label="Task description"
                    :rules="validationRules.descriptionRules"
                  />
                </v-col>
              </v-form>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
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
    },
    validationRules: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    newTaskTitle: null,
    newTaskDescription: null
  }),
  methods: {
    closeModal() {
      this.$emit('close')
    },
    createTask() {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        this.$emit('createNewTask', this.newTaskTitle, this.newTaskDescription)
        this.closeModal()
      }
    }
  }
}
</script>

<style></style>

<template>
  <v-row justify="center">
    <v-dialog
      v-model="active"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Edit the task</span>
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
                    :rules="validationRules.titleRules"
                    required
                    label="Task title"
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
            @click="editTask"
          >
            Edit
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
    title: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    validationRules: {
      type: Object,
      required: true
    }
  },
  computed: {
    newTaskTitle: {
      get() {
        return this.title
      },
      set(newVal) {
        this.$emit('update:title', newVal)
      }
    },
    newTaskDescription: {
      get() {
        return this.description
      },
      set(newVal) {
        this.$emit('update:description', newVal)
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    editTask() {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        this.$emit('editTask', this.newTaskTitle, this.newTaskDescription)
        this.closeModal()
      }
    }
  }
}
</script>

<template>
  <v-row justify="center">
    <v-dialog
      v-model="active"
      persistent
      max-width="600px"
    >
      <v-card>
        <div
          style="width: 100%"
          class="px-9 py-6 d-flex justify-space-between"
        >
          <v-card-title class="pa-0">
            <span class="headline">{{ modalMessage }}</span>
          </v-card-title>
          <v-btn
            text
            icon
            color="primary"
            class="modal-icon ma-2"
            @click="isDeleteModeOn ? deleteModeOff() : deleteModeOn()"
          >
            <v-icon>
              {{ modalIcon }}
            </v-icon>
          </v-btn>
        </div>
        <v-card-text>
          <v-container>
            <div v-if="isDeleteModeOn">
              <h2 class="subtitle-1">
                Are you sure that you want to delete this task?
              </h2>
            </div>
            <v-row v-else>
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
            @click="isDeleteModeOn ? removeItem() : editTask()"
          >
            {{ buttonText }}
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
  data() {
    return {
      isDeleteModeOn: false
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
    },
    modalMessage() {
      return this.isDeleteModeOn ? 'Delete the task' : 'Edit the task'
    },
    modalIcon() {
      return this.isDeleteModeOn ? 'mdi-keyboard-backspace' : 'mdi-delete'
    },
    buttonText() {
      return this.isDeleteModeOn ? 'Delete' : 'Edit'
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
    },
    removeItem() {
      this.$emit('removeItem')
      this.closeModal()
    },
    deleteModeOn() {
      this.isDeleteModeOn = true
    },
    deleteModeOff() {
      this.isDeleteModeOn = false
    }
  }
}
</script>

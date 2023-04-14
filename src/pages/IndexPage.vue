<template>
  <q-page class="col items-start justify-start">
    <q-btn
      square
      color="secondary"
      class="full-width"
      @click="showAddTaskDialog = true"
      >Add Task</q-btn
    >
    <q-separator></q-separator>
    <q-card flat>
      <task-list class="full-width"></task-list>
    </q-card>
    <q-dialog v-model="showAddTaskDialog">
      <add-task-dialog></add-task-dialog>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TaskList from 'src/components/TaskList.vue';
import AddTaskDialog from 'src/components/tasks/dialogs/AddTaskDialog.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { TaskList, AddTaskDialog },
  setup() {
    const showAddTaskDialog = ref(false);
    return { showAddTaskDialog };
  },
});
</script>

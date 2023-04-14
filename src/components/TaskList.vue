<template>
  <q-list bordered separator>
    <TaskListItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
    ></TaskListItem>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { todos } from 'src/logic/main';
import TaskListItem from './TaskListItem.vue';

export default defineComponent({
  name: 'TodoList',
  components: { TaskListItem },
  setup() {
    return { todos };
  },
});
</script>

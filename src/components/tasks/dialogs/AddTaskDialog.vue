<template>
  <q-card class="my-card" flat bordered>
    <q-card-section>
      <q-card-section class="q-pt-xs">
        <div class="text-h6">Add Title</div>
        <q-input label="Title" v-model="title"></q-input>
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-space></q-space>
      <q-btn flat color="primary" @click="add"> Add </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { addTask } from 'src/logic/main';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AddTaskDialog',
  components: {},
  setup() {
    const title = ref('');

    function add() {
      addTask(title.value);
    }

    return { title, add };
  },
});
</script>

<template>
  <q-item>
    <q-item-section class="text-body1">{{ todo.title }}</q-item-section>
    <q-item-section class="text-body"
      >⌛ {{ elapsedTimeFormatted }}
    </q-item-section>
    <q-separator vertical></q-separator>
    <q-item-section side>
      <div class="row">
        <q-btn
          flat
          @click="toggleStart"
          :icon="started ? 'stop' : 'play_arrow'"
        />
        <q-btn flat @click="onRestart" icon="restart_alt" />
        <q-btn flat @click="onArchive" icon="archive" />
        <q-btn flat @click="onDelete" icon="delete" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, watch } from 'vue';
import { Todo } from './models';
import { deleteTask, endTimer, resetTimer, startTimer } from 'src/logic/main';
import moment from 'moment';
import { computed } from 'vue';

export default defineComponent({
  name: 'TodoList',
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
  setup(props) {
    const started = ref(isStarted());

    const elapsedTime = ref(getStartEndDiffernce());
    const elapsedTimeFormatted = computed(() => {
      return moment.utc(elapsedTime.value).format('HH:mm:ss');
    });
    let timerUpdateInterval: ReturnType<typeof setInterval> | undefined;

    function isStarted() {
      return (
        props.todo.startTime != undefined && props.todo.endTime == undefined
      );
    }

    function refreshTimer() {
      elapsedTime.value = getStartEndDiffernce();
    }

    function getStartEndDiffernce(): number {
      return props.todo.startTime != undefined
        ? new Date().getTime() - props.todo.startTime
        : 0;
    }

    watch(started, (newVal) => {
      if (newVal == true) {
        timerUpdateInterval = setInterval(refreshTimer, 50);
      }
      if (newVal == false) {
        clearInterval(timerUpdateInterval);
        refreshTimer();
      }
    });

    function toggleStart() {
      if (started.value) {
        endTimer(props.todo);
        started.value = isStarted();
      } else {
        startTimer(props.todo);
        started.value = isStarted();
      }
    }

    function onRestart() {
      resetTimer(props.todo);
      started.value = isStarted();
      refreshTimer();
    }

    function onDelete() {
      deleteTask(props.todo);
    }

    function onArchive() {
      //
    }

    return {
      started,
      toggleStart,
      onRestart,
      elapsedTime,
      moment,
      elapsedTimeFormatted,
      onDelete,
      onArchive,
    };
  },
});
</script>

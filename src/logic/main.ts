import { Todo } from 'src/components/models';
import { ref } from 'vue';

export const todos = ref<Todo[]>([
  { id: 0, title: 'sampleTitle', startTime: undefined, endTime: undefined },
]);

export function startTimer(todo: Todo) {
  if (todo.endTime != undefined && todo.startTime != undefined) {
    todos.value = todos.value.map((td) => {
      if (td.id == todo.id) {
        todo.endTime = undefined;
      }
      return td;
    });
  } else {
    todos.value = todos.value.map((td) => {
      if (td.id == todo.id) {
        todo.startTime = new Date().getTime();
      }
      return td;
    });
  }
}
export function endTimer(todo: Todo) {
  todos.value = todos.value.map((td) => {
    if (td.id == todo.id) {
      todo.endTime = new Date().getTime();
    }
    return td;
  });
}

export function resetTimer(todo: Todo) {
  todos.value = todos.value.map((td) => {
    if (td.id == todo.id) {
      todo.endTime = undefined;
      todo.startTime = undefined;
    }
    return td;
  });
}

export function addTask(title: string) {
  const id = Date.now();
  todos.value.push({
    id: id,
    title: title,
    startTime: undefined,
    endTime: undefined,
  });
}

export function deleteTask(todo: Todo) {
  const index = todos.value.indexOf(todo, 0);
  if (index > -1) {
    todos.value.splice(index, 1);
  }
}

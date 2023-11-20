import { createStore } from "vuex";

interface Task {
  id: string;
  name: string;
}

interface TodoList {
  id: string;
  name: string;
  tasks: Task[];
}

interface State {
  todoLists: TodoList[];
}

export default createStore<State>({
  state: {
    todoLists: [],
  },
  mutations: {
    addTodoList(state, listName) {
      const newList = {
        id: `list-${state.todoLists.length}`,
        name: listName,
        tasks: [],
      };
      state.todoLists.push(newList);
    },

    deleteTodoList(state, listId) {
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        const index = state.todoLists.indexOf(list);
        state.todoLists.splice(index, 1);
      }
    },

    addTask(state, { listId, taskName }) {
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        const newTask = {
          id: `task-${list.tasks.length}`,
          name: taskName,
        };
        list.tasks.push(newTask);
      }
    },
    deleteTask(state, { listId, taskId }) {
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        const task = list.tasks.find((task) => task.id === taskId);
        if (task) {
          const index = list.tasks.indexOf(task);
          list.tasks.splice(index, 1);
        }
      }
    },
    editTask(state, { listId, taskId, taskName }) {
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        const task = list.tasks.find((task) => task.id === taskId);
        if (task) {
          task.name = taskName;
        }
      }
    },
    editList(state, { listId, listName }) {
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        list.name = listName;
      }
    },
  },
});

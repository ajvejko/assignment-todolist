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
  searchInput: string;
}

export default createStore<State>({
  state: {
    todoLists: [],
    searchInput: "",
  },
  mutations: {
    addTodoList(state, listName: string) {
      const newList = {
        id: `list-${Date.now()}`,
        name: listName,
        tasks: [],
      };
      state.todoLists.push(newList);
    },

    deleteTodoList(state, listId: string) {
      const list = state.todoLists.find((list) => list.id === listId);
      if (list) {
        const index = state.todoLists.indexOf(list);
        state.todoLists.splice(index, 1);
      }
    },

    addTask(state, payload: { listId: string; taskName: string }) {
      const list = state.todoLists.find((list) => list.id === payload.listId);
      if (list) {
        const newTask = {
          id: `task-${Date.now()}`,
          name: payload.taskName,
        };
        list.tasks.push(newTask);
      }
    },
    deleteTask(state, payload: { listId: string; taskId: string }) {
      const list = state.todoLists.find((list) => list.id === payload.listId);
      if (list) {
        const task = list.tasks.find((task) => task.id === payload.taskId);
        if (task) {
          const index = list.tasks.indexOf(task);
          list.tasks.splice(index, 1);
        }
      }
    },
    editTask(
      state,
      payload: { listId: string; taskId: string; taskName: string },
    ) {
      const list = state.todoLists.find((list) => list.id === payload.listId);
      if (list) {
        const task = list.tasks.find((task) => task.id === payload.taskId);
        if (task) {
          task.name = payload.taskName;
        }
      }
    },
    editList(state, payload: { listId: string; listName: string }) {
      const list = state.todoLists.find((list) => list.id === payload.listId);
      if (list) {
        list.name = payload.listName;
      }
    },
  },
});

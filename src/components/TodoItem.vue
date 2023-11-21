<script setup lang="ts">
import { ref } from "vue";
import IconDotMenu from "./icons/IconDotMenu.vue";
import IconPencilSquare from "./icons/IconPencilSquare.vue";
import IconTrash from "./icons/IconTrash.vue";
import TodoEditModal from "./TodoEditModal.vue";
import store from "../store";

const props = defineProps({
  listId: String,
  taskName: String,
  taskId: String,
});

const checked = ref<boolean>(false);
const showTodoEditModal = ref<boolean>(false);
const showDropdownItem = ref<boolean>(false);

const deleteTask = () => {
  store.commit("deleteTask", { listId: props.listId, taskId: props.taskId });
  localStorage.setItem("todoLists", JSON.stringify(store.state.todoLists));
};

const closeModal = () => {
  showDropdownItem.value = false;
  showTodoEditModal.value = false;
};
</script>

<template>
  <TodoEditModal
    v-if="showTodoEditModal"
    :taskName="props.taskName"
    :taskId="props.taskId"
    :listId="props.listId"
    @closeModal="closeModal()"
  />
  <div
    v-if="!showTodoEditModal"
    class="task-row group relative flex justify-between hover:bg-gray-100"
  >
    <div class="relative mr-2 flex min-w-0 items-center py-1 text-sm">
      <input
        type="checkbox"
        class="task-checkbox m-1 h-[1.375rem] w-[1.375rem] shrink-0 appearance-none rounded border border-silver bg-white shadow-inner hover:border-blue-400"
        v-model="checked"
      />

      <label
        class="ml-1 truncate text-[0.8125rem] font-light md:text-base"
        :class="{ 'text-gray-500 line-through': checked }"
      >
        {{ props.taskName }}
      </label>
    </div>
    <!-- On hover options, visible on 1024px media query -->
    <div
      class="z-10 hidden flex-grow items-center justify-between lg:group-hover:flex"
    >
      <button @click="showTodoEditModal = true" type="button" title="Edit">
        <IconPencilSquare
          class="mr-2 h-5 w-5 stroke-gray-500/90 hover:stroke-blue-500/90"
        />
      </button>

      <button @click="deleteTask()" type="button" title="Delete">
        <IconTrash class="mr-2 h-5 w-5 stroke-red-500/80 stroke-2" />
      </button>
    </div>

    <button
      @click="showDropdownItem = !showDropdownItem"
      type="button"
      class="lg:hidden"
    >
      <IconDotMenu class="h-5 w-5 stroke-gray-500" />
    </button>

    <!-- Dropdown options -->
    <Transition name="dropdown">
      <div
        v-if="showDropdownItem"
        class="absolute right-4 top-3 z-10 divide-y divide-gray-200 rounded border bg-white shadow-xl"
      >
        <button
          @click="showTodoEditModal = true"
          class="flex items-center px-4 py-2"
        >
          <IconPencilSquare class="mr-2 h-5 w-5 stroke-gray-500 stroke-2" />
          <span class="text-[0.8125rem] font-light">Edit task...</span>
        </button>
        <button @click="deleteTask()" class="flex items-center px-4 py-2">
          <IconTrash class="mr-2 h-5 w-5 stroke-red-500 stroke-2" />
          <span class="text-[0.8125rem] font-light text-red-500"
            >Delete task...</span
          >
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active {
  transition: all 0.05s ease;
}
.dropdown-leave-active {
  transition: all 0s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  transform: translateY(-5px) translateX(5px);
  opacity: 0;
}
.dropdown-enter-to,
.dropdown-leave-from {
  transform: translateY(0) translateX(0);
  opacity: 1;
}

.task-checkbox:checked {
  background-image: url("./icons/IconCheckmark.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
}

.task-row:hover .task-checkbox {
  background-image: url("./icons/IconCheckmark.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
}
</style>

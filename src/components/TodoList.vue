<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import IconDotMenu from "./icons/IconDotMenu.vue";
import IconMoney from "./icons/IconMoney.vue";
import IconClock from "./icons/IconClock.vue";
import IconPencilSquare from "./icons/IconPencilSquare.vue";
import IconTrash from "./icons/IconTrash.vue";
import IconAdd from "./icons/IconAdd.vue";
import TodoItem from "./TodoItem.vue";
import TodoAddModal from "./TodoAddModal.vue";
import ListEditModal from "./ListEditModal.vue";

const emits = defineEmits(["toggleDropdownList", "deleteTodoList"]);
const props = defineProps({
  showDropdownList: Boolean,
  name: String,
  id: String,
});

const store = useStore();
const openDropdownItem = ref<number | null>(null);
const showTodoAddModal = ref<boolean>(false);
const showListEditModal = ref<boolean>(false);

const toggleDropdownList = () => {
  emits("toggleDropdownList");
};

const deleteTodoList = () => {
  emits("deleteTodoList");
};

const toggleDropdownItem = (id: number) => {
  openDropdownItem.value = openDropdownItem.value === id ? null : id;
};

const closeModal = () => {
  showTodoAddModal.value = false;
};

const closeEditModal = () => {
  showListEditModal.value = false;
};

const addTask = (taskName) => {
  store.commit("addTask", { listId: props.id, taskName });
  localStorage.setItem("todoLists", JSON.stringify(store.state.todoLists));
};

const deleteTask = (taskId) => {
  store.commit("deleteTask", { listId: props.id, taskId });
  localStorage.setItem("todoLists", JSON.stringify(store.state.todoLists));
};

const editList = (listName) => {
  store.commit("editList", { listId: props.id, listName });
  localStorage.setItem("todoLists", JSON.stringify(store.state.todoLists));
};
</script>

<template>
  <div class="relative divide-y">
    <ListEditModal
      v-if="showListEditModal"
      :listName="name"
      @editList="editList"
      @closeModal="closeEditModal()"
    />
    <div v-if="!showListEditModal" class="mb-2 flex justify-between">
      <div class="font-medium text-[#1179d2] lg:text-lg" href="#">
        {{ name }}
      </div>
      <div class="flex items-center justify-center">
        <a
          href="#"
          class="flex text-[0.6rem] font-light text-[#9d9d9d] lg:text-xs"
        >
          <span class="mx-1 flex items-center justify-center">
            <IconMoney class="mx-0.5 h-[0.9rem] w-[0.9rem]" />
            <span>$20</span>
          </span>
          <span class="ml-1 mr-3 flex items-center justify-center">
            <IconClock class="mx-0.5 h-[0.9rem] w-[0.9rem]" />
            <span>0.01 h</span>
          </span>
        </a>

        <button type="button" @click="toggleDropdownList">
          <IconDotMenu class="h-5 w-5 stroke-gray-500" />
        </button>

        <!-- Dropdown options -->
        <Transition name="dropdown">
          <div
            v-if="showDropdownList"
            class="absolute right-6 top-3 z-20 divide-y divide-gray-200 rounded border bg-white shadow-xl"
          >
            <button
              @click="(showListEditModal = true), toggleDropdownList()"
              class="flex items-center px-4 py-2"
            >
              <IconPencilSquare class="mr-2 h-5 w-5 stroke-gray-500 stroke-2" />
              <span class="text-[0.8125rem] font-light"
                >Edit To-Do list...</span
              >
            </button>
            <button
              @click="deleteTodoList()"
              class="flex items-center px-4 py-2"
            >
              <IconTrash class="mr-2 h-5 w-5 stroke-red-500 stroke-2" />
              <span class="text-[0.8125rem] font-light text-red-500"
                >Delete To-Do list...</span
              >
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <div class="divide-y">
      <TodoItem
        v-for="task in store.state.todoLists.find(
          (list) => list.id === props.id,
        ).tasks"
        :key="task.id"
        :id="task.id"
        :name="task.name"
        :listId="props.id"
        :showDropdownItem="openDropdownItem === task.id"
        @toggleDropdownItem="toggleDropdownItem(task.id)"
        @deleteTask="deleteTask(task.id)"
      />
    </div>
    <div>
      <Transition name="fade">
        <TodoAddModal
          v-if="showTodoAddModal"
          @closeModal="closeModal()"
          @addTask="addTask"
        />
      </Transition>
      <button
        type="button"
        v-if="!showTodoAddModal"
        @click="showTodoAddModal = true"
        class="mt-2 flex items-center justify-center rounded border border-silver px-2 py-0.5 text-[0.6875rem] font-extralight lg:text-xs"
      >
        <IconAdd
          class="mr-2 h-[0.8rem] w-[0.8rem] stroke-gray-500 stroke-[6]"
        />
        Add task
      </button>
    </div>
  </div>
</template>

<style scoped>
.dropdown-enter-active {
  transition: all 0.05s ease;
}
.dropdown-leave-active {
  transition: all 0.1s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  transform: translateY(-10px) translateX(5px);
  opacity: 0;
}
.dropdown-enter-to,
.dropdown-leave-from {
  transform: translateY(0) translateX(0);
  opacity: 1;
}

.fade-enter-active {
  transition: opacity 0.2s ease;
}

.fade-leave-active {
  transition: opacity 0s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

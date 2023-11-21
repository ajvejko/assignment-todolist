<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { State } from "../store";
import IconDotMenu from "./icons/IconDotMenu.vue";
import IconMoney from "./icons/IconMoney.vue";
import IconClock from "./icons/IconClock.vue";
import IconPencilSquare from "./icons/IconPencilSquare.vue";
import IconTrash from "./icons/IconTrash.vue";
import IconAdd from "./icons/IconAdd.vue";
import TodoItem from "./TodoItem.vue";
import TodoAddModal from "./TodoAddModal.vue";
import ListEditModal from "./ListEditModal.vue";

const emits = defineEmits(["deleteTodoList"]);
const props = defineProps({
  searchedTask: String,
  name: String,
  listId: String,
});

const store = useStore<State>();
const showDropdownList = ref<boolean>(false);
const showTodoAddModal = ref<boolean>(false);
const showListEditModal = ref<boolean>(false);
const filteredTasks = computed(() => {
  const list = store.state.todoLists.find((list) => list.id === props.listId);
  if (!list) {
    return [];
  }

  if (!props.searchedTask) {
    return list.tasks;
  }

  return list.tasks.filter((task) => {
    return props.searchedTask && task.name.toLowerCase().includes(props.searchedTask.toLowerCase());
  });
});

const deleteTodoList = () => {
  store.commit("deleteTodoList", props.listId);
  localStorage.setItem("todoLists", JSON.stringify(store.state.todoLists));
};

const closeModal = () => {
  showTodoAddModal.value = false;
};

const closeEditModal = () => {
  showDropdownList.value = false;
  showListEditModal.value = false;
};
</script>

<template>
  <div class="relative divide-y">
    <ListEditModal
      v-if="showListEditModal"
      :listName="props.name"
      :listId="props.listId"
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

        <button type="button" @click="showDropdownList = !showDropdownList">
          <IconDotMenu class="h-5 w-5 stroke-gray-500" />
        </button>

        <!-- Dropdown options -->
        <Transition name="dropdown">
          <div
            v-if="showDropdownList"
            class="absolute right-4 top-2 z-20 divide-y divide-gray-200 rounded border bg-white shadow-xl"
          >
            <button
              @click="showListEditModal = true"
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
        v-for="task in filteredTasks"
        :key="task.id"
        :taskId="task.id"
        :taskName="task.name"
        :listId="props.listId"
    
      />
    </div>
    <div>
      <Transition name="fade">
        <TodoAddModal
          v-if="showTodoAddModal"
          :listId="props.listId"
          @closeModal="closeModal()"

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

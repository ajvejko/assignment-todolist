<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import IconAdd from "./components/icons/IconAdd.vue";
import TodoList from "./components/TodoList.vue";
import ListAddModal from "./components/ListAddModal.vue";

const props = defineProps({
  showDropdownList: Boolean,
});

const store = useStore();
const showListAddModal = ref<boolean>(false);
const openDropdownList = ref<number | null>(null);

const increment = () => {
  store.commit("increment");
};

const closeModal = () => {
  showListAddModal.value = false;
};

const addList = (listName: string) => {
  store.commit("addTodoList", listName);
  localStorage.setItem("todoLists", JSON.stringify(store.state.todoLists));
};

const toggleDropdownList = (id: number) => {
  openDropdownList.value = openDropdownList.value === id ? null : id;
};

const deleteTodoList = (taskId) => {
  store.commit("deleteTodoList", taskId);
  localStorage.setItem("todoLists", JSON.stringify(store.state.todoLists));
};

onMounted(() => {
  store.state.todoLists = JSON.parse(localStorage.getItem("todoLists")) || [];
});
</script>

<template>
  <section class="min-h-screen bg-[#F5F5F5] md:px-3 md:pt-4">
    <div
      class="mx-auto min-h-screen max-w-3xl rounded-md bg-white px-4 py-3 shadow-lg md:h-fit lg:max-w-5xl xl:max-w-7xl"
    >
      <div class="flex items-center">
        <div class="mr-2 text-xl text-red-700 lg:text-2xl">Tasks</div>
        <button
          type="button"
          @click="showListAddModal = true"
          class="flex items-center justify-center rounded border border-[#449d44] bg-[#5cb85c] px-1.5 py-0.5 text-[0.6875rem] font-semibold text-white lg:text-xs"
          :class="{
            'border-green-800 shadow-[inset_0_0px_20px_rgba(0,0,0,0.4)]':
              showListAddModal,
          }"
        >
          <IconAdd
            class="mr-1 h-[0.875rem] w-[0.875rem] stroke-white stroke-[6]"
          />
          Add To-Do list
        </button>
      </div>
      <Transition name="fade">
        <ListAddModal
          v-if="showListAddModal"
          @closeModal="closeModal()"
          @addList="addList"
        />
      </Transition>
      <div class="mt-3 flex flex-col gap-14">
        <TodoList
          v-for="list in store.state.todoLists"
          :key="list.id"
          :id="list.id"
          :name="list.name"
          :showDropdownList="openDropdownList === list.id"
          @toggleDropdownList="toggleDropdownList(list.id)"
          @deleteTodoList="deleteTodoList(list.id)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 0.2s;
}

.fade-leave-active {
  transition: opacity 0s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

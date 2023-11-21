<script setup lang="ts">
import { onMounted, ref } from "vue";
import store from "../store";

const emits = defineEmits(["closeModal"]);
const props = defineProps({
  listName: String,
  listId: String,
});

const close = () => {
  emits("closeModal");
};

const inputRef = ref<HTMLInputElement | null>(null);
const listName = ref<string | undefined>(props.listName);

const editList = () => {
  store.commit("editList", { listId: props.listId, listName});
  localStorage.setItem("todoLists", JSON.stringify(store.state.todoLists));
  close();
};

onMounted(() => {
  inputRef.value?.focus();
});
</script>

<template>
  <div
    class="mt-3 max-w-xl rounded border border-blue-300/60 bg-blue-200/60 p-1.5 shadow-md lg:max-w-2xl"
  >
    <input
      type="text"
      ref="inputRef"
      v-model="listName"
      placeholder="Enter list name..."
      class="w-full rounded border border-gray-300 px-2 py-1 outline-none placeholder:font-light focus:border-blue-400 focus:shadow-[0px_0px_4px_rgb(37,99,235)] focus:shadow-sky-300"
    />
    <div class="flex items-center">
      <button
        @click="editList()"
        class="mr-1 mt-2 rounded border border-[#449d44] bg-[#5cb85c] px-6 py-1 text-[0.6875rem] font-semibold text-white lg:text-xs"
      >
        Edit
      </button>
      <button
        @click="close()"
        class="mt-2 flex items-center justify-center rounded border border-silver bg-white px-2 py-1 text-xs font-light lg:text-xs"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

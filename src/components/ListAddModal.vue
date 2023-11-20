<script setup lang="ts">
import { onMounted, ref } from "vue";
const emits = defineEmits(["closeModal", "addList"]);

const inputRef = ref<HTMLInputElement | null>(null);
const listName = ref<string>("");

const close = () => {
  emits("closeModal");
};

const save = () => {
  emits("addList", listName.value);
  listName.value = "";
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
    <div class="text-sm font-light lg:text-base">Name of To-Do list</div>
    <input
      type="text"
      ref="inputRef"
      v-model="listName"
      placeholder="Enter the name of the To-Do list"
      class="mt-1.5 w-full rounded border border-gray-300 px-2 py-1 outline-none placeholder:font-light focus:border-blue-400 focus:shadow-[0px_0px_4px_rgb(37,99,235)] focus:shadow-sky-300"
    />
    <div class="flex items-center">
      <button
        @click="save()"
        class="mr-1 mt-2 rounded border border-[#449d44] bg-[#5cb85c] px-6 py-1 text-[0.6875rem] font-semibold text-white lg:text-xs"
      >
        Save
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

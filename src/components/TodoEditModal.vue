<script setup lang="ts">
import { onMounted, ref } from "vue";

const emits = defineEmits(["closeModal", "editTask"]);
const props = defineProps({
  taskName: String,
});

const inputRef = ref<HTMLInputElement | null>(null);
const taskName = ref<string>(props.taskName);

const close = () => {
  emits("closeModal");
};

const editTask = () => {
  emits("editTask", taskName.value);
  taskName.value = "";
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
      v-model="taskName"
      placeholder="Enter task name..."
      class="w-full rounded border border-gray-300 px-2 py-1 outline-none placeholder:font-light focus:border-blue-400 focus:shadow-[0px_0px_4px_rgb(37,99,235)] focus:shadow-sky-300"
    />
    <div class="flex items-center">
      <button
        @click="editTask()"
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

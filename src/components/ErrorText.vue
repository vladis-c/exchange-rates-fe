<script lang="ts" setup>
import {defineProps, ref, watch} from 'vue';

type ErrorTextProps = {
  text: string;
};

const isShown = ref<boolean>(false);
const props = defineProps<ErrorTextProps>();

watch(
  () => props.text,
  newValue => {
    if (newValue !== '') {
      isShown.value = true;
      const timer = setTimeout(() => {
        isShown.value = false;
      }, 10000);
      return () => clearTimeout(timer);
    } else {
      isShown.value = false;
    }
  },
);
</script>
<template>
  <div
    v-if="isShown"
    id="toast-error"
    class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-white bg-red-800 divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 left-5"
    role="alert">
    <p class="text-sm font-normal">{{ text }}</p>
  </div>
</template>

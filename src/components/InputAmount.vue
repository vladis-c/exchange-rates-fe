<script lang="ts" setup>
type InputAmountProps = {
  label: string;
  disabled: boolean;
  error: string | null;
  modelValue: string | null;
};

defineProps<InputAmountProps>();

const emit = defineEmits(['update:modelValue']);

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>
<template>
  <div class="flex flex-col">
    <label for="amount" class="text-sm text-gray-600 mb-1">{{ label }}</label>
    <input
      :disabled="disabled"
      id="amount"
      type="number"
      class="p-4 border h-16 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-900 bg-orange-50"
      placeholder="Amount"
      @change="onChange"
      :value="modelValue" />
    <p v-if="error !== null">{{ error }}</p>
  </div>
</template>

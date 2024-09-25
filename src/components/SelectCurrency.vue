<script lang="ts" setup>
import type {Currency} from '@/types';
import {defineProps, defineEmits} from 'vue';

type SelectCurrencyProps = {
  currencies: Currency['code'][];
  label: string;
  disabled: boolean;
  modelValue: string;
};

defineProps<SelectCurrencyProps>();

const emit = defineEmits(['update:modelValue']);

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="flex flex-col" v-if="modelValue !== undefined">
    <label :for="label" class="text-sm text-gray-600 mb-1">{{ label }}</label>
    <select
      :disabled="disabled"
      :id="label"
      :value="modelValue"
      @change="onChange"
      class="p-4 h-16 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400">
      <option value="">-----</option>
      <option
        v-for="(currency, index) in currencies"
        :key="index"
        :value="currency">
        {{ currency }}
      </option>
    </select>
  </div>
</template>

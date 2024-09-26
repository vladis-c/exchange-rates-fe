<script lang="ts" setup>
import type {Currency} from '@/types';
import {defineProps, defineEmits} from 'vue';
import LoadingSpinner from './LoadingSpinner.vue';

type SelectCurrencyProps = {
  currencies: Currency['code'][];
  label: string;
  disabled: boolean;
  loading: boolean;
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
  <div
    class="flex flex-col justify-center items-center"
    v-if="modelValue !== undefined">
    <label :for="label" class="w-full text-left text-sm text-gray-600 mb-1">{{
      label
    }}</label>
    <LoadingSpinner :loading="loading" />
    <select
      v-if="!loading"
      :disabled="disabled"
      :id="label"
      :value="modelValue"
      @change="onChange"
      class="w-full p-4 h-16 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-900 bg-orange-50">
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

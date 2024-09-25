<script lang="ts" setup>
import {defineProps} from 'vue';
import type {ConversionRate, Currency} from '@/types';

type SelectProps = {
  conversion: ConversionRate | null;
  selectedFrom: Currency['code'];
  selectedTo: Currency['code'];
};

defineProps<SelectProps>();
</script>

<template>
  <div
    v-if="conversion !== null"
    class="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between">
    <div class="flex flex-col">
      <p class="text-xl">
        {{ `${conversion.base_amount.toFixed(2)} ${selectedFrom} =` }}
      </p>
      <p class="text-4xl font-bold mb-4">
        {{ `${conversion.quote_amount.toFixed(2)} ${selectedTo}` }}
      </p>
    </div>
    <div class="flex flex-col">
      <p class="text-lg text-gray-500">
        {{ `1 ${selectedFrom} = ${conversion.quote} ${selectedTo}` }}
      </p>
      <p class="text-lg text-gray-500">
        {{ `1 ${selectedTo} = ${conversion.opposite_quote} ${selectedFrom}` }}
      </p>
    </div>
  </div>
</template>

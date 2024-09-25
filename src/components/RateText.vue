<script lang="ts" setup>
import {defineProps} from 'vue';
import type {ConversionRate} from '@/types';

type SelectProps = {
  conversion: ConversionRate;
};

defineProps<SelectProps>();
</script>

<template>
  <div
    class="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between">
    <div class="flex flex-col">
      <p class="text-xl">
        {{
          `${conversion.base_amount.toFixed(2)} ${conversion.base_currency} =`
        }}
      </p>
      <p class="text-4xl font-bold mb-4">
        {{
          `${conversion.quote_amount.toFixed(2)} ${conversion.quote_currency}`
        }}
      </p>
    </div>
    <div class="flex flex-col">
      <p class="text-lg text-gray-500">
        {{
          `1 ${conversion.base_currency} = ${conversion.quote.toFixed(6)} ${conversion.quote_currency}`
        }}
      </p>
      <p class="text-lg text-gray-500">
        {{
          `1 ${conversion.quote_currency} = ${conversion.opposite_quote.toFixed(6)} ${conversion.base_currency}`
        }}
      </p>
    </div>
  </div>
</template>

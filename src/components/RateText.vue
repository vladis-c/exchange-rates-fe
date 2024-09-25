<script lang="ts" setup>
import {defineProps} from 'vue';
import type {ConversionRate} from '@/types';
import {getCurrencyText} from '@/utils';

type RateTextProps = {
  conversion: ConversionRate;
};

defineProps<RateTextProps>();
</script>

<template>
  <div
    class="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between">
    <div class="flex flex-col">
      <p class="text-xl">
        {{
          `${getCurrencyText(conversion.base_currency, conversion.base_amount)}=`
        }}
      </p>
      <p class="text-4xl font-bold mb-4">
        {{
          getCurrencyText(conversion.quote_currency, conversion.quote_amount)
        }}
      </p>
    </div>
    <div class="flex flex-col">
      <p class="text-lg text-gray-500">
        {{
          `${getCurrencyText(conversion.base_currency, 1, 6)} = ${getCurrencyText(conversion.quote_currency, conversion.quote, 6)}`
        }}
      </p>
      <p class="text-lg text-gray-500">
        {{
          `${getCurrencyText(conversion.quote_currency, 1, 6)} = ${getCurrencyText(conversion.base_currency, conversion.opposite_quote, 6)}`
        }}
      </p>
    </div>
  </div>
</template>

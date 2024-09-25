<script lang="ts" setup>
import {defineProps, ref, watch} from 'vue';
import type {Currency, Rate} from '@/types';
import {getExchangeRate} from '@/api/rates';

type SelectProps = {
  currency: Currency['code'];
  currencies: Currency['code'][];
  triggerFetch: boolean;
};
const rates = ref<Rate[]>([]);

const popularCurrencies = [
  'USD',
  'JPY',
  'RUB',
  'AED',
  'GBP',
  'CHF',
  'AUD',
  'CAD',
  'CNY',
  'SEK',
];

const props = defineProps<SelectProps>();

const fetchExchangeRates = async () => {
  const filteredCurrencies = popularCurrencies.filter(c => {
    return props.currencies.includes(c);
  });
  const promises = filteredCurrencies.map(async c => {
    try {
      return await getExchangeRate(props.currency, c);
    } catch (error) {
      return null;
    }
  });
  rates.value = (await Promise.all(promises)).filter(el => el !== null);
};

watch(
  () => props.triggerFetch,
  async newValue => {
    if (newValue) {
      await fetchExchangeRates();
    }
  },
);
</script>

<template>
  <div
    class="w-full max-w-1280 mx-auto p-6 bg-white shadow-md rounded-lg"
    v-if="rates.length > 0">
    <h2 class="text-lg font-semibold text-gray-800 text-center mb-4">
      Exchange Rates
    </h2>
    <ul class="flex flex-col space-y-3">
      <li
        v-for="(rate, index) in rates"
        :key="index"
        class="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm">
        <div class="flex flex-col">
          <p class="font-medium">
            {{ rate.base_currency }} / {{ rate.quote_currency }}
          </p>
          <span class="text-sm text-gray-500">{{
            new Date(rate.date).toLocaleDateString('fi')
          }}</span>
        </div>
        <p class="font-bold">{{ rate.quote }}</p>
      </li>
    </ul>
  </div>
</template>

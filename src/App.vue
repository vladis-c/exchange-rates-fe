<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {type ConversionRate, type Currency} from './types';
import {getAllCurrencies} from './api/currencies';
import {getSingleCoversion} from './api/coversions';
import Select from './components/SelectCurrency.vue';
import RateText from './components/RateText.vue';
import ExchangeRatesList from './components/ExchangeRatesList.vue';

type CurrencyCode = Currency['code'];

const currencies = ref<CurrencyCode[]>([]);
const selectedFrom = ref<CurrencyCode>('');
const selectedTo = ref<CurrencyCode>('');
const amount = ref<string | null>(null);
const conversion = ref<ConversionRate | null>(null);
const error = ref<string | null>(null);
const triggerFetch = ref<boolean>(false);

const route = useRoute();
const router = useRouter();

const updateQueryParams = () => {
  const params: {
    amount?: string;
    base_currency?: CurrencyCode;
    quote_currency?: CurrencyCode;
  } = {};
  if (amount.value) {
    params.amount = amount.value;
  }
  if (selectedFrom.value) {
    params.base_currency = selectedFrom.value;
  }
  if (selectedTo.value) {
    params.quote_currency = selectedTo.value;
  }
  const url = new URL(window.location.href);
  Object.keys(params).forEach(k => {
    const key = k as keyof typeof params;
    if (params[key]) {
      url.searchParams.set(k, params[key]);
    } else {
      url.searchParams.delete(k);
    }
  });
  window.history.pushState({}, '', url.toString());
};

const setAmount = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  amount.value = target.value;
};

watch([amount, selectedFrom, selectedTo], () => {
  if (router) {
    updateQueryParams();
  }
});

const convert = async () => {
  if (selectedFrom.value && selectedTo.value && amount.value !== null) {
    if (+amount.value === 0) {
      error.value = 'Invalid input: Please enter a valid number.';
      return;
    } else {
      error.value = null;
    }
    const data = await getSingleCoversion(
      selectedFrom.value,
      selectedTo.value,
      +amount.value,
    );
    conversion.value = data;
  }
};

onMounted(async () => {
  const data = await getAllCurrencies();
  if (!data) {
    return;
  }
  currencies.value = data.map(el => el.code);
  if (route.query.amount) {
    amount.value = route.query.amount.toString();
  }
  if (route.query.base_currency) {
    selectedFrom.value = route.query.base_currency.toString();
  }
  if (route.query.quote_currency) {
    selectedTo.value = route.query.quote_currency.toString();
    triggerFetch.value = true;
    await convert();
  }
});
</script>

<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-50 p-24 gap-8">
    <!-- Converter -->
    <div class="w-full max-w-1280 p-8 bg-white shadow-md rounded-lg">
      <h1 class="text-xl font-semibold text-gray-800 text-center mb-4">
        Currency Converter
      </h1>
      <div class="flex flex-col space-y-4">
        <!-- Input: Amount -->
        <div class="flex flex-col">
          <label for="amount" class="text-sm text-gray-600 mb-1">Amount</label>
          <input
            id="amount"
            type="number"
            class="p-4 border h-16 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Amount"
            @change="setAmount"
            v-model="amount" />
          <p v-if="error !== null">{{ error }}</p>
        </div>
        <!-- Select: currency to convert From -->
        <Select label="From" :currencies="currencies" v-model="selectedFrom" />
        <!-- Select: currency to convert To -->
        <Select label="To" :currencies="currencies" v-model="selectedTo" />
        <!-- Button: Convert -->
        <button
          class="p-4 h-16 bg-orange-900 text-white rounded-md hover:bg-orange-700 transition duration-200"
          @click="
            () => {
              triggerFetch = !triggerFetch;
              convert();
            }
          ">
          Convert
        </button>
        <!-- Display: Conversion rate -->
        <div v-if="conversion !== null">
          <RateText :conversion="conversion" />
        </div>
      </div>
    </div>

    <!-- Section: Exchange Rates List -->
    <ExchangeRatesList
      :selected-from="selectedFrom"
      :selected-to="selectedTo"
      :currencies="currencies"
      :triggerFetch="triggerFetch" />
  </div>
</template>

<style></style>

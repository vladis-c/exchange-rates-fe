<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {type ConversionRate, type Currency} from './types';
import {getAllCurrencies} from './api/currencies';
import {getSingleCoversion} from './api/coversions';
import Select from './components/SelectCurrency.vue';
import RateText from './components/RateText.vue';
import ExchangeRatesList from './components/ExchangeRatesList.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import ErrorText from './components/ErrorText.vue';
import InputAmount from './components/InputAmount.vue';

const errorText1 = 'Invalid input: Please enter a valid number.';
const errorText2 = 'Error when getting the conversion rate';
const errorText3 = 'Error when fetching the list of currencies';

type CurrencyCode = Currency['code'];

const currencies = ref<CurrencyCode[]>([]);
const selectedFrom = ref<CurrencyCode>('');
const selectedTo = ref<CurrencyCode>('');
const amount = ref<string | null>(null);
const conversion = ref<ConversionRate | null>(null);
const inputError = ref<string | null>(null);
const triggerFetch = ref<boolean>(false);
const loadingConversion = ref<boolean>(false);
const loadingCurrencies = ref<boolean>(false);
const errorConversion = ref<string>('');
const errorCurrencies = ref<string>('');

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

watch([amount, selectedFrom, selectedTo], () => {
  if (router) {
    updateQueryParams();
  }
});

watch([amount], () => {
  if (inputError.value !== null) {
    inputError.value = null;
  }
});

const convert = async () => {
  if (amount.value === null) {
    inputError.value = errorText1;
    return;
  }
  triggerFetch.value = !triggerFetch.value;
  loadingConversion.value = true;
  errorConversion.value = '';
  if (selectedFrom.value && selectedTo.value && amount.value !== null) {
    if (+amount.value === 0) {
      inputError.value = errorText1;
      loadingConversion.value = false;
      return;
    } else {
      inputError.value = null;
    }
    const data = await getSingleCoversion(
      selectedFrom.value,
      selectedTo.value,
      +amount.value,
    );
    if (data === null) {
      errorConversion.value = errorText2;
    }
    conversion.value = data;
  }
  loadingConversion.value = false;
};

onMounted(async () => {
  loadingCurrencies.value = true;
  const data = await getAllCurrencies();
  if (!data) {
    loadingCurrencies.value = false;
    errorCurrencies.value = errorText3;
    return;
  }
  currencies.value = data.map(el => el.code);
  loadingCurrencies.value = false;

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
  <ErrorText :text="errorCurrencies || errorConversion" />
  <div class="min-h-screen flex flex-col items-center bg-gray-50 p-24 gap-8">
    <!-- Converter -->
    <div class="w-full max-w-1280 p-8 bg-white shadow-md rounded-lg">
      <h1 class="text-xl font-semibold text-gray-800 text-center mb-4">
        Currency Converter
      </h1>
      <div class="flex flex-col space-y-4">
        <!-- Input: Amount -->
        <InputAmount
          :disabled="
            loadingConversion || loadingCurrencies || currencies.length === 0
          "
          v-model="amount"
          :error="inputError"
          :label="'Amount'" />
        <!-- Select: currency to convert From -->
        <Select
          label="From"
          :currencies="currencies"
          v-model="selectedFrom"
          :disabled="loadingConversion || currencies.length === 0"
          :loading="loadingCurrencies" />
        <!-- Select: currency to convert To -->
        <Select
          label="To"
          :currencies="currencies"
          v-model="selectedTo"
          :disabled="loadingConversion || currencies.length === 0"
          :loading="loadingCurrencies" />
        <!-- Button: Convert -->
        <button
          :disabled="
            amount === null ||
            loadingConversion ||
            loadingCurrencies ||
            !selectedFrom ||
            !selectedTo ||
            currencies.length === 0
          "
          class="flex flex-row justify-center items-center p-4 h-16 bg-orange-900 text-white rounded-md disabled:bg-gray-200 hover:bg-orange-700 transition duration-200"
          @click="
            () => {
              convert();
            }
          ">
          <p v-if="!loadingConversion">Convert</p>
          <LoadingSpinner :loading="loadingConversion" />
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

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {type ConversionRate, type Currency} from './types';
import {getAllCurrencies} from './api/currencies';
import {getSingleCoversion} from './api/coversions';
import Select from './components/SelectComponent.vue';

type CurrencyCode = Currency['code'];

const currencies = ref<CurrencyCode[]>([]);
const selectedFrom = ref<CurrencyCode>('');
const selectedTo = ref<CurrencyCode>('');
const amount = ref<string | null>(null);
const conversion = ref<ConversionRate | null>(null);
const error = ref<string | null>(null);

const setAmount = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  amount.value = target.value;
};

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
  selectedFrom.value = 'EUR'; // setting "from" value to 'EUR' as default and not changable due to SWOP account restrictions
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
        <Select
          label="From"
          :currencies="currencies"
          v-model="selectedFrom"
          :disabled="true" />
        <!-- Select: currency to convert To -->
        <Select
          label="To"
          :currencies="currencies"
          v-model="selectedTo"
          :disabled="false" />
        <!-- Button: Convert -->
        <button
          class="p-4 h-16 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-200"
          @click="convert">
          Convert
        </button>
        <!-- Display: Conversion rate -->
        <div v-if="conversion !== null" class="flex flex-col">
          <p>
            {{ `${conversion.base_amount.toFixed(2)} ${selectedFrom} =` }}
          </p>
          <p>{{ `${conversion.quote_amount.toFixed(2)} ${selectedTo}` }}</p>
          <p>
            {{ `1 ${selectedFrom} = ${conversion.quote} ${selectedTo}` }}
          </p>
          <p>
            {{
              `1 ${selectedTo} = ${conversion.opposite_quote} ${selectedFrom}`
            }}
          </p>
        </div>
      </div>
    </div>

    <!-- Section: Exchange Rates List -->
    <!-- <div class="w-full max-w-1280 p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-lg font-semibold text-gray-800 text-center mb-4">
        Exchange Rates
      </h2>
      <div class="flex flex-col space-y-2">
        <div class="flex justify-between p-2 bg-gray-100 rounded-md">
          <span class="text-gray-700">Currency Name (Code)</span>
          <span class="text-gray-700">Rate</span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style></style>

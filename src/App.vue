<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import type {Currency} from './types';

const name = ref('Vlad');
const currencies = ref<Currency['code'][]>([]);
const selectedCurrency = ref('');

const convertCurrency = () => {
  if (selectedCurrency.value.trim() !== '') {
    const alreadyExists =
      currencies.value.indexOf(selectedCurrency.value) !== -1;
    if (!alreadyExists) {
      currencies.value.push(selectedCurrency.value);
    }
    selectedCurrency.value = '';
  }
};

const deleteCurrency = (i: number) => {
  const exists = currencies.value[i] !== undefined;
  if (exists) {
    currencies.value.splice(i, 1);
  }
};

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8000/currencies');
    const data: Currency[] = await res.json();
    currencies.value = data.map(el => el.code);
  } catch (error) {
    console.log('Fetching error', error);
  }
});
</script>

<template>
  <h1>Exchange rates {{ name }}</h1>
  <form @submit.prevent="convertCurrency">
    <label for="convertCurrency">Convert currency</label>
    <input
      type="text"
      name="convertCurrency"
      id="convertCurrency"
      v-model="selectedCurrency" />
    <button type="submit">Select</button>
  </form>
  <h3>Currencies:</h3>
  <ul>
    <li v-for="(currency, index) in currencies" :key="currency">
      <span>
        {{ currency }}
        <button @click="() => deleteCurrency(index)">X</button>
      </span>
    </li>
  </ul>
</template>

<style></style>

import axios from 'axios';
import type {ConversionRate} from '@/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getExchangeRate = async (
  base_currency: string,
  quote_currency: string,
) => {
  try {
    const {data} = await axios.get<ConversionRate>(
      `${BASE_URL}/rates/${base_currency}/${quote_currency}`,
    );
    return data;
  } catch (error) {
    console.error('Error when getting exchangeRates', error);
    return null;
  }
};

import axios from 'axios';
import type {ConversionRate} from '@/types';

export const getExchangeRate = async (
  base_currency: string,
  quote_currency: string,
) => {
  try {
    const {data} = await axios.get<ConversionRate>(
      `http://localhost:8000/rates/${base_currency}/${quote_currency}`,
    );
    return data;
  } catch (error) {
    console.error('Error when getting exchangeRates', error);
    return null;
  }
};

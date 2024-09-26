import axios from 'axios';
import type {ConversionRate} from '@/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getSingleCoversion = async (
  base_currency: string,
  quote_currency: string,
  amount: number,
) => {
  try {
    const {data} = await axios.get<ConversionRate>(
      `${BASE_URL}/conversions/${base_currency}/${quote_currency}?amount=${amount}`,
    );
    return data;
  } catch (error) {
    console.error('Error when getting single conversion', error);
    return null;
  }
};

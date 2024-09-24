import axios from 'axios';
import type {ConversionRate} from '@/types';

export const getSingleCoversion = async (
  base_currency: string,
  quote_currency: string,
  amount: number,
) => {
  try {
    const {data} = await axios.get<ConversionRate>(
      `http://localhost:8000/conversions/${base_currency}/${quote_currency}?amount=${amount}`,
    );
    return data;
  } catch (error) {
    console.error('Error when getting single conversion', error);
    return null;
  }
};

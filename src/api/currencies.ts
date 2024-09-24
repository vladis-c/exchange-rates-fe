import axios from 'axios';
import type {Currency} from '@/types';

export const getAllCurrencies = async () => {
  try {
    const {data} = await axios.get<Currency[]>(
      'http://localhost:8000/currencies',
    );
    return data;
  } catch (error) {
    console.error('Error when getting all currencies', error);
    return null;
  }
};

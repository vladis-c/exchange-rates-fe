import axios from 'axios';
import type {Currency} from '@/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllCurrencies = async () => {
  try {
    const {data} = await axios.get<Currency[]>(`${BASE_URL}/currencies`);
    return data;
  } catch (error) {
    console.error('Error when getting all currencies', error);
    return null;
  }
};

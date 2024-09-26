import {describe, it, expect, vi} from 'vitest';
import axios from 'axios';
import {getAllCurrencies} from '../src/api/currencies';
import type {Currency} from '../src/types';

const BASE_URL = process.env.VITE_BASE_URL;
const EUR = 'EUR';
const USD = 'USD';

vi.mock('axios');
const mockedAxios = axios.get as jest.Mock;

describe('getAllCurrencies', () => {
  it('Should return list of currencies on success', async () => {
    console.log('BASE_URL', BASE_URL);
    const mockCurrencies: Currency[] = [
      {
        code: EUR,
        numeric_code: '978',
        decimal_digits: 2,
        name: 'Euro',
        active: true,
      },
      {
        code: USD,
        numeric_code: '840',
        decimal_digits: 2,
        name: 'United States dollar',
        active: true,
      },
    ];

    mockedAxios.mockResolvedValueOnce({data: mockCurrencies});
    const result = await getAllCurrencies();

    expect(result).toEqual(mockCurrencies);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/currencies`);
  });

  it('Should return null on API error', async () => {
    mockedAxios.mockRejectedValueOnce(new Error('API Error'));
    const result = await getAllCurrencies();

    expect(result).toBeNull();
    expect(axios.get).toHaveBeenCalled();
  });
});

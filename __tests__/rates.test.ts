import {describe, it, expect, vi} from 'vitest';
import axios from 'axios';
import {getExchangeRate} from '../src/api/rates';
import type {Rate} from '../src/types';

const BASE_URL = process.env.VITE_BASE_URL;
const EUR = 'EUR';
const USD = 'USD';

vi.mock('axios');
const mockedAxios = axios.get as jest.Mock;

describe('getExchangeRate', () => {
  it('Should return exchange rate on success', async () => {
    const mockExchangeRate: Rate = {
      base_currency: EUR,
      quote_currency: USD,
      quote: 1.1,
      date: '2024-09-25',
    };

    mockedAxios.mockResolvedValueOnce({data: mockExchangeRate});
    const result = await getExchangeRate(EUR, USD);

    expect(result).toEqual(mockExchangeRate);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/rates/${EUR}/${USD}`);
  });

  it('Should return null on API error', async () => {
    mockedAxios.mockRejectedValueOnce(new Error('API Error'));
    const result = await getExchangeRate(EUR, USD);

    expect(result).toBeNull();
    expect(axios.get).toHaveBeenCalled();
  });
});

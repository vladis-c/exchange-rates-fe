import {describe, it, expect, vi} from 'vitest';
import axios from 'axios';
import {getSingleCoversion} from '../src/api/coversions';
import type {ConversionRate} from '../src/types';

const BASE_URL = process.env.VITE_BASE_URL;
const EUR = 'EUR';
const USD = 'USD';
const amount = 100;

vi.mock('axios');
const mockedAxios = axios.get as jest.Mock;

describe('getSingleCoversion', () => {
  it('Should return conversion rate on success', async () => {
    const mockConversionRate: ConversionRate = {
      base_currency: EUR,
      quote_currency: USD,
      quote: 1.1,
      date: '2024-09-25',
      opposite_quote: 0.9,
      base_amount: amount,
      quote_amount: 110,
    };

    mockedAxios.mockResolvedValueOnce({data: mockConversionRate});
    const result = await getSingleCoversion(EUR, USD, amount);

    expect(result).toEqual(mockConversionRate);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/conversions/${EUR}/${USD}?amount=${amount}`,
    );
  });

  it('Should return null on API error', async () => {
    mockedAxios.mockRejectedValueOnce(new Error('API Error'));
    const result = await getSingleCoversion(EUR, USD, amount);

    expect(result).toBeNull();
    expect(axios.get).toHaveBeenCalled();
  });
});

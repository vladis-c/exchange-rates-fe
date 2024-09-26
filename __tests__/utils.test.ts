import {describe, it, expect} from 'vitest';
import {getCurrencyText} from '../src/utils';

describe('getCurrencyText', () => {
  it('Should get currency text', async () => {
    const text = '15 $';
    const result = getCurrencyText('USD', 15, 2);
    expect(text).toEqual(result);
  });
});

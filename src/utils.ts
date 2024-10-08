export const getCurrencyText = (
  currency: string,
  amount: number,
  digits: number = 4,
) => {
  return new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency,
    maximumSignificantDigits: digits,
  })
    .format(amount)
    .replace(/[\u202F\u00A0]/, ' ');
};

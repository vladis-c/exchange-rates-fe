export const getCurrencyText = (
  currency: string,
  amount: number,
  digits: number = 2,
) => {
  return new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency,
    maximumSignificantDigits: digits,
  }).format(amount);
};

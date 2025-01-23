/**
 * Currency amount number formatter based on locality
 *
 * @param amount - amount value
 * @param language - language (locality), optional (default: 'de')
 * @param oposite - opposite, optional, force posite to negative and vice versa
 * @returns formatted amount in EUR
 */
export const formatAmount = (amount: number, language?: string, opposite = false): string => {
  const numberPrefix = opposite ? -1 : 1;

  const localeAmount = new Intl.NumberFormat(language || 'de', {
    style: 'currency',
    currency: 'EUR'
  }).format(Math.abs(Number(amount)) * numberPrefix);

  return localeAmount;
};

// HELPS TO AVOID RECEIVING NaN WHEN TRYING TO CONVERT ANY AMOUNT TO JS NUMBERS (64-bit floating-point numbers)
export const convertAmountToJSNumber = ({
  amount,
  isGermanSelected
}: {
  amount: string;
  isGermanSelected: boolean;
}) => {
  if (!amount) return { formattedNumber: '' };

  const cleanedAmount = amount.replace('€', '');

  if (isGermanSelected)
    return { formattedNumber: parseFloat(cleanedAmount.replace(/\./g, '').replace(',', '.')).toString() };

  return { formattedNumber: parseFloat(cleanedAmount.replace(/,/g, '')).toString() };
};

import { convertAmountToJSNumber, formatAmountByLanguage } from '@/utils/amount';
import { cn } from '@/utils/cn';
import { type ChangeEvent, type Dispatch, type SetStateAction, useEffect, useRef } from 'react';

interface AmountInputProps {
  language: string;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  decimals: number;
  grouping: boolean;
  currency?: boolean;
  className?: string;
  maxLength?: number;
  disabled?: boolean;
}

export function AmountInput({
  language,
  className,
  amount,
  setAmount,
  decimals,
  grouping,
  currency,
  maxLength,
  disabled
}: AmountInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // HERE THE LANGUAGE CONDITION NEEDS TO BE THE OPOSITE BECAUSE WHEN YOU SWITCH LANGUAGES YOU'RE CONVERTING FROM ONE LANGUAGE TO ANOTHER
  const { formattedNumber } = convertAmountToJSNumber({ amount, isGermanSelected: language !== 'de' });
  const isAmountInputed = !!Number(formattedNumber);

  // IF THE LANGUAGE IS CHANGED, THE INPUT AUTOMATICALLY FORMATS THE AMOUNT BASED ON THE LANGUAGE
  useEffect(() => {
    setAmount(
      formatAmountByLanguage({
        amount: formattedNumber || `0.${'0'.repeat(decimals)}`,
        locale: language,
        decimals,
        grouping,
        currency
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    let numericValue = parseInt(value, 10);

    if (isNaN(numericValue)) {
      numericValue = 0;
    }

    numericValue = numericValue / Math.pow(10, decimals);

    const formattedValue = formatAmountByLanguage({
      amount: numericValue.toFixed(decimals),
      locale: language,
      decimals,
      grouping,
      currency
    });

    setAmount(formattedValue);
  };

  function handleCursorPosition() {
    if (!inputRef.current) return;

    const length = inputRef.current.value.length;

    let caretPos = length; // Move the caret to the end by default

    if (currency && language === 'de') caretPos = Math.max(0, length - 2); // Deals with the "0,00 €" format

    return inputRef.current.setSelectionRange(caretPos, caretPos);
  }

  return (
    <input
      maxLength={maxLength}
      ref={inputRef}
      disabled={disabled}
      type="text"
      value={amount}
      onClick={handleCursorPosition}
      onFocus={handleCursorPosition}
      onKeyDown={() => requestAnimationFrame(handleCursorPosition)}
      onChange={handleChange}
      className={cn(
        'w-full rounded-md border bg-gray-200 p-2 placeholder-gray-400 focus:outline-none',
        isAmountInputed ? 'text-blue-80' : 'text-gray-400',
        className
      )}
    />
  );
}

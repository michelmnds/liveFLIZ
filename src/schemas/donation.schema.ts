import { check, minLength, object, optional, pipe, string } from 'valibot';

export const donationSchema = object({
  username: pipe(string(), minLength(1, 'Errors.emptyFieldError')),
  message: optional(string()),
  amount: pipe(
    string(),
    check((val: string) => val !== '0,00 €' && val !== '€0.00')
  )
});

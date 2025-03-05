import { check, object, optional, pipe, string, transform } from 'valibot';
import { ibanSchema } from './iban.schema';

export const editProfileSchema = object({
  username: optional(string()),
  fullName: optional(string()),
  iban: optional(ibanSchema.entries.iban),
  logoUrl: optional(string())
});

export const editMinDonationAmountSchema = object({
  minDonationAmount: optional(
    pipe(
      string(),
      check((val: string) => val !== '0,00 €' && val !== '€0.00'),
      transform(value => {
        // 1) Remove everything but digits, comma, dot, minus
        let sanitized = value.replace(/[^\d.,-]/g, '');

        const lastDot = sanitized.lastIndexOf('.');
        const lastComma = sanitized.lastIndexOf(',');

        if (lastDot !== -1 && lastComma !== -1) {
          // both '.' and ',' are present
          if (lastComma > lastDot) {
            // comma is rightmost => German style => '.' thousands, ',' decimal
            sanitized = sanitized.replace(/\./g, '');
            sanitized = sanitized.replace(',', '.');
          } else {
            // dot is rightmost => English style => ',' thousands, '.' decimal
            sanitized = sanitized.replace(/,/g, '');
            // keep the dot
          }
        } else if (lastDot === -1 && lastComma !== -1) {
          // only commas => assume decimal
          sanitized = sanitized.replace(',', '.');
        } else if (lastDot !== -1 && lastComma === -1) {
          // only dots => assume decimal
          // nothing special to do
        }

        // now parse float
        return parseFloat(sanitized);
      })
    )
  )
});

import { object, optional, string } from 'valibot';
import { ibanSchema } from './iban.schema';

export const editProfileSchema = object({
  username: optional(string()),
  fullName: optional(string()),
  iban: optional(ibanSchema.entries.iban),
  logoUrl: optional(string())
});

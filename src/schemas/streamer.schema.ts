import { InferOutput, object, optional, string } from 'valibot';
import { ibanSchema } from './iban.schema';

export const streamerSchema = object({
  id: string(),
  email: string(),
  password: string(),
  fullName: string(),
  username: string(),
  iban: ibanSchema.entries.iban,
  flizKey: string(),
  logoUrl: string(),
  language: optional(string()),
  widgets: object({
    qrc_id: string(),
    alert_id: string()
  }),
  minDonationAmount: string(),
  transactions: optional(object({}))
});

export type StreamerType = InferOutput<typeof streamerSchema>;

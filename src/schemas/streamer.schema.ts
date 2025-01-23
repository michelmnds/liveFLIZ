import { array, InferOutput, object, optional, string } from 'valibot';
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
  widgets: array(
    object({
      qrc_id: optional(string()),
      alert_id: optional(string())
    })
  )
});

export type StreamerType = InferOutput<typeof streamerSchema>;

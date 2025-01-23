import { email, InferOutput, minLength, object, pipe, string, transform } from 'valibot';
import { streamerSchema } from './streamer.schema';

export const emailSchema = object({
  email: pipe(
    string(),
    minLength(1, 'Errors.emptyFieldError'),
    email('Errors.emailError'),
    transform(value => value.toLowerCase())
  )
});

const passwordSchema = object({
  password: string()
});

export const loginSchema = object({
  email: emailSchema.entries.email,
  password: passwordSchema.entries.password
});

export const fullNameSchema = object({
  firstName: pipe(string(), minLength(1, 'Errors.emptyFieldError')),
  lastName: pipe(string(), minLength(1, 'Errors.emptyFieldError'))
});

export const registerSchema = object({
  email: emailSchema.entries.email,
  password: passwordSchema.entries.password,
  fullName: streamerSchema.entries.fullName,
  language: streamerSchema.entries.language,
  username: streamerSchema.entries.username,
  iban: streamerSchema.entries.iban
});

export const resetPasswordSchema = object({
  password: loginSchema.entries.password,
  emailCode: string()
});

export type Register = InferOutput<typeof registerSchema>;
export type ResetPassword = InferOutput<typeof resetPasswordSchema>;

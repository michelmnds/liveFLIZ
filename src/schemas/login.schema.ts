import {object, string, pipe, email} from 'valibot';

export const loginSchema = object({
  email: pipe(string('Email field should be a string'), email('Email field should be a valid email')),
  password: string('Password field should be a string'),
});

export const loginTokenSchema = object({
  token: string('Token field should be a string'),
});

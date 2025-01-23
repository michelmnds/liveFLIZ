import { addressSchema, personSchema } from '@/schemas/person.schema';
import { InferOutput } from 'valibot';

export type Person = InferOutput<typeof personSchema>;
export type Address = InferOutput<typeof addressSchema>;

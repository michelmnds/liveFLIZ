export * from './bank.types';
export * from './helper.types';
export * from './person.types';
export * from './response.types';
export * from './styles.types';
export * from './transaction.types';

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

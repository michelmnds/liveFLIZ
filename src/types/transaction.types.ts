import { transactionSchema } from '@/schemas/transaction.schema';
import { Response } from 'routex-client';
import { InferOutput } from 'valibot';

export type Transaction = InferOutput<typeof transactionSchema>;

export type TransactionTicket = {
  ticket: string;
  paymentDetails: {
    creditorName: string;
    logoUrl: string;
    amount: string;
    originalAmount: string;
    reference: string;
    externalId: string;
    source: string;
  };
};

export type YaxiResponseData = {
  ticket: string;
  response: Response;
};

export type CreditorResponseData = {
  creditor: { email?: string; creditorName?: string; logoUrl?: string };
  isP2P: boolean;
};

type SortTransactionsBy = keyof Pick<Transaction, 'createdAt' | 'updatedAt'>;
type SortDirection = 'asc' | 'desc';

export type TransactionsListParams = {
  page?: number;
  limit?: number;
  sort?: `${SortTransactionsBy}:${SortDirection}`;
};

export type TransactionsSearchParams = {
  filters: (
    | 'text'
    | 'source'
    | 'or'
    | 'status'
    | 'receiverType'
    | 'dateFrom'
    | 'dateTo'
    | 'senderName'
    | 'receiverName'
    | 'amountFrom'
    | 'amountTo'
  )[];
  values: string[];
};

export type ShippingOptionType = {
  name: string;
  totalCost: number;
  id: number;
};

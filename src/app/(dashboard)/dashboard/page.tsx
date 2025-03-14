'use client';

import { getTransactions } from '@/services/api/apiClient';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import Spinner from 'react-activity/dist/Spinner';
import 'react-activity/dist/Spinner.css';

export default function DashboardPage() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      try {
        return await getTransactions();
      } catch (error) {
        console.error(error);
      }
    },
    select: data => data?.items,
    placeholderData: keepPreviousData
  });

  const totalTransactionsAmount = useMemo(() => {
    return transactions?.reduce((acc, transaction) => acc + transaction.originalAmount, 0); // TO-DO: ADD 30 DAYS FILTER
  }, [transactions]);

  const totalMessagesReceived = useMemo(() => {
    return transactions?.filter(transaction => transaction.message !== '').length; // TO-DO: ADD 30 DAYS FILTER
  }, [transactions]);

  const receivedMessages = useMemo(() => {
    const transactionsWithMessags = transactions?.filter(transaction => transaction.message !== '');

    return transactionsWithMessags
      ?.map(transaction => {
        return { message: transaction.message, senderName: transaction.senderId.fullName };
      })
      .slice(0, 10);
  }, [transactions]);

  return (
    <div className="flex w-full flex-col items-start justify-center gap-12 py-10">
      <h1 className="text-3xl font-bold text-secondaryColor">Dashboard</h1>
      <div className="grid w-[90%] grid-cols-2 gap-4">
        <section className="flex w-full flex-col items-start justify-center gap-8 rounded-lg border bg-gray-100 p-8">
          <div className="space-y-2">
            <h1 className="text-xl text-secondaryColor">TOTAL TRANSACTIONS</h1>
            <h2 className="text-gray80">last 30 days</h2>
            {isLoading ? (
              <div className="py-2">
                <Spinner size={16} color="#001f3f" />
              </div>
            ) : (
              <h1 className="pt-2 text-2xl font-bold text-secondaryColor">€{totalTransactionsAmount}</h1>
            )}
          </div>
        </section>
        <section className="flex w-full flex-col items-start justify-center gap-8 rounded-lg border bg-gray-100 p-8">
          <div className="space-y-2">
            <h1 className="text-xl text-secondaryColor">MESSAGES RECEIVED</h1>
            <h2 className="text-gray80">last 30 days</h2>
            {isLoading ? (
              <div className="py-2">
                <Spinner size={16} color="#001f3f" />
              </div>
            ) : (
              <h1 className="pt-2 text-2xl font-bold text-secondaryColor">{totalMessagesReceived}</h1>
            )}
          </div>
        </section>
        <section className="flex w-full flex-col items-start justify-center gap-8 rounded-lg border bg-gray-100 p-8">
          <div className="w-full space-y-2">
            <h1 className="text-xl text-secondaryColor">LATEST MESSAGES</h1>
            <h2 className="text-gray80">last 10 messages</h2>
            <div className="flex h-full max-h-[300px] w-full flex-col items-start justify-start gap-2 overflow-y-auto pt-2">
              {isLoading ? (
                <div className="flex w-full items-center justify-center">
                  <Spinner size={16} color="#001f3f" />
                </div>
              ) : receivedMessages?.length ? (
                receivedMessages.map((transaction, index) => (
                  <div key={index} className="w-full rounded-lg border border-secondaryColor bg-black bg-opacity-5 p-2">
                    <span className="text-xs text-secondaryColor">{transaction.senderName} said:</span>
                    <h1 className="text-md w-full pt-2 font-bold italic text-secondaryColor">{`"${transaction.message}"`}</h1>
                  </div>
                ))
              ) : (
                <h1 className="pt-2 text-2xl font-bold text-secondaryColor">No message was received yet.</h1>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

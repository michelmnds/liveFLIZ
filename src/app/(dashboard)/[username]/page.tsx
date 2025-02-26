'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/AlertDialog';
import { Button } from '@/components/Button';
import { CustomInput } from '@/components/CustomInput';
import { AmountInput } from '@/components/inputs/AmountInput';
import { MessageInput } from '@/components/inputs/MessageInput';
import { donationSchema } from '@/schemas/donation.schema';
import { getStreamerByUsername } from '@/services/api/apiClient';
import { convertAmountToJSNumber } from '@/utils/amount';
import { CHECKOUT_URL } from '@/utils/CONSTS';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Controller, useForm } from 'react-hook-form';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function Preview() {
  const t = useTranslations();
  const router = useRouter();
  const [qrcValue, setQrcValue] = useState('');
  const { username } = useParams() as { username?: string };

  const { handleSubmit, control, setValue, formState } = useForm({
    mode: 'onChange',
    resolver: valibotResolver(donationSchema),
    defaultValues: {
      username: '',
      message: '',
      amount: '0.00'
    }
  });

  const { data: streamer } = useQuery({
    queryKey: ['streamer-by-username', username],
    queryFn: () => {
      try {
        return getStreamerByUsername(username || '');
      } catch (error) {
        console.error(error);
      }
    }
  });

  const handleContinue = (data?: { message: string; amount: string; username: string }) => {
    const { formattedNumber } = convertAmountToJSNumber({ amount: data?.amount ?? '', isGermanSelected: false });
    const urlParams = `f=${streamer?.flizKey},e=${data?.message ?? ''},a=${formattedNumber},o=${formattedNumber},u=${data?.username},s=app_qrc`;
    const url = `${CHECKOUT_URL}?token=${Buffer.from(urlParams).toString('base64')}`;

    if (isMobile) return router.push(url);

    return setQrcValue(url);
  };

  const handleCancel = () => {
    setQrcValue('');
    setValue('message', '');
    setValue('amount', '€0.00');
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start gap-10">
      <header className="absolute left-10 top-10">
        <Link href="/dashboard">
          <IoMdArrowRoundBack color="var(--secondaryColor)" size={30} />
        </Link>
      </header>
      <div className="flex w-full flex-col items-center justify-center gap-10 py-10">
        <form
          onSubmit={handleSubmit(handleContinue)}
          className="flex w-[350px] flex-col items-center justify-center gap-6 rounded-lg border bg-white p-6 shadow">
          {streamer?.logoUrl && (
            <Image
              src={streamer.logoUrl || ''}
              alt="streamer's logo"
              width={80}
              height={80}
              className="rounded-full shadow-lg"
            />
          )}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold text-gray-800">{streamer?.username || ''}</h1>
            <p className="text-md font-semibold text-gray-500">Send a message</p>
          </div>
          <div className="flex w-full flex-col gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">Username</span>
              <Controller
                name="username"
                render={({ field }) => (
                  <CustomInput type="text" {...field} setValue={field.onChange} value={field.value} />
                )}
                control={control}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">Message</span>
              <Controller
                name="message"
                render={({ field }) => (
                  <MessageInput
                    placeholder="Write here..."
                    {...field}
                    setMessage={field.onChange}
                    message={field.value}
                  />
                )}
                control={control}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">Amount</span>
              <div className="relative">
                <Controller
                  name="amount"
                  render={({ field }) => (
                    <AmountInput
                      grouping
                      decimals={2}
                      language="en"
                      currency
                      {...field}
                      setAmount={field.onChange}
                      amount={field.value}
                    />
                  )}
                  control={control}
                />
                <p className="text-xs text-gray-500">Minimum amount is ?</p>
              </div>
            </label>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild disabled={!formState.isValid}>
              <Button type="submit">{t('Labels.common.button.continue')}</Button>
            </AlertDialogTrigger>
            {!isMobile && (
              <AlertDialogContent className="flex flex-col items-center justify-center gap-6 bg-white">
                <AlertDialogTitle>Scan the QR Code with our app or your phone camera.</AlertDialogTitle>
                <div className="h-[200px] w-[200px]">
                  <QRCodeSVG size={200} level={'L'} value={qrcValue} />
                </div>
                <AlertDialogCancel className="border-none underline" onClick={handleCancel}>
                  Cancel
                </AlertDialogCancel>
              </AlertDialogContent>
            )}
          </AlertDialog>
          <p className="mt-2 text-center text-xs leading-4 text-gray-400">
            By clicking continue, you declare that you have read and agree to the{' '}
            <a href="#" className="text-secondaryColor underline">
              Terms of Use
            </a>{' '}
            and{' '}
            <a href="#" className="text-secondaryColor underline">
              Privacy Policy.
            </a>
            .
          </p>
        </form>
        <Image src="/fliz-logo.png" alt="FLIZ Logo" width={100} height={100} />
      </div>
    </div>
  );
}

'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/AlertDialog';
import { Button } from '@/components/Button';
import { AmountInput } from '@/components/inputs/AmountInput';
import { Typography } from '@/components/Typography';
import { UrlField } from '@/components/UrlField';
import { editMinDonationAmountSchema } from '@/schemas/editProfile.schema';
import { StreamerType } from '@/schemas/streamer.schema';
import { editStreamer, restartWidget, testAlert } from '@/services/api/apiClient';
import { formatAmount } from '@/utils/amount';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Tooltip } from '@radix-ui/themes';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaCirclePlay } from 'react-icons/fa6';
import { IoLink } from 'react-icons/io5';
import { LuPencilOff } from 'react-icons/lu';
import { MdOutlineReplay } from 'react-icons/md';
import { toast } from 'sonner';

export default function WidgetsPage() {
  const t = useTranslations();
  const { data: session, update } = useSession();
  const streamer = session?.user;
  const language = useLocale();
  const defaultValue = language === 'de' ? '0,00 €' : '€0.00';

  const { control, handleSubmit, watch, reset } = useForm({
    mode: 'onSubmit',
    resolver: valibotResolver(editMinDonationAmountSchema),
    defaultValues: {
      minDonationAmount: formatAmount(parseFloat(streamer?.minDonationAmount || '0'), language) || defaultValue // TO-DO: FORMAT THE AMOUNT COMING FROM THE SESSION
    }
  });

  const { mutate } = useMutation({
    mutationFn: async (data: Partial<StreamerType>) => {
      return await editStreamer({ minDonationAmount: data.minDonationAmount });
    },
    onSuccess: async (_data, variables) => {
      await update({ user: { minDonationAmount: variables.minDonationAmount } });

      toast.success(t('Labels.dashboard.profile.toast.baseInfo.success'));
    },
    onError: error => {
      console.error(error.message);
      toast.error(t('Errors.serverError'));
    }
  });

  const handleMinimumAmountDisable = async () => {
    try {
      mutate({ minDonationAmount: '0' });
      reset({ minDonationAmount: defaultValue });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAlertTest = async () => {
    try {
      await testAlert(streamer?.widgets?.alert_id || '');
    } catch (error) {
      console.error(error);
    }
  };

  const handleIconPress = async (event: React.MouseEvent) => {
    const iconClicked = event.currentTarget.id;

    switch (iconClicked) {
      case 'qrc-restart':
        await restartWidget(streamer?.widgets?.qrc_id || '');
        break;
      case 'alert-play':
        await handleAlertTest();
        break;
      case 'alert-restart':
        await restartWidget(streamer?.widgets?.alert_id || '');
        break;
    }
  };

  return (
    <div className="flex w-full flex-col items-start justify-center gap-12 py-10">
      <h1 className="text-3xl font-bold text-secondaryColor">Widgets</h1>
      <div className="flex flex-row items-start justify-center gap-5">
        <div className="flex flex-col items-start justify-center gap-1">
          <h1 className="text-xl font-medium text-gray-500">Alert</h1>
          <div className="flex w-full flex-col items-center justify-center gap-8 rounded-lg border bg-gray-100 p-8">
            <div className="flex w-full flex-col items-center justify-center gap-2 text-center font-sans text-3xl text-white [text-shadow:_0px_0px_4px_rgba(0,0,0,0.7)]">
              <Image src="/FLIZLogo.png" width={68} height={68} alt="Fliz Logo" />
              <span className="m-0 p-0 text-[#80ed99]">{`${streamer?.username} donated 5,00 €`}</span>
              <span className="text-2xl">This is a template donation.</span>
            </div>
            <div className="flex w-full flex-row items-center justify-between">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button type="button" aria-label="Implement widget" className="cursor-pointer text-secondaryColor">
                    <Tooltip side="bottom" content="Implement">
                      <IoLink id="alert-link" size={18} />
                    </Tooltip>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="gap-4 bg-white">
                  <AlertDialogTitle>Implement widget</AlertDialogTitle>
                  <AlertDialogDescription className="text-lg text-secondaryColor">
                    Use the URL below in your streaming software (OBS, Twitch Studio, etc.) as a Browser Source.
                  </AlertDialogDescription>
                  <UrlField url={`http://localhost:8080/streamer/widget/alert/${streamer?.widgets?.alert_id}`} />
                  <div className="flex w-full flex-col items-start justify-center gap-1 px-2 text-secondaryColor">
                    <h1 className="text-lg text-secondaryColor">Recommended Size</h1>
                    <div className="flex w-full flex-row items-center justify-start gap-10">
                      <div>
                        <h1 className="font-bold">WIDTH</h1>
                        <h1>800px</h1>
                      </div>
                      <div>
                        <h1 className="font-bold">HEIGHT</h1>
                        <h1>400px</h1>
                      </div>
                    </div>
                  </div>
                  <AlertDialogCancel className="w-20 border-secondaryColor">Close</AlertDialogCancel>
                </AlertDialogContent>
              </AlertDialog>
              <Tooltip side="bottom" content="Test">
                <FaCirclePlay
                  id="alert-play"
                  size={18}
                  className="cursor-pointer text-secondaryColor"
                  onClick={event => handleIconPress(event)}
                />
              </Tooltip>
              <Tooltip side="bottom" content="Reload">
                <MdOutlineReplay
                  id="alert-restart"
                  size={18}
                  className="cursor-pointer text-secondaryColor"
                  onClick={() => restartWidget(streamer?.widgets?.alert_id || '')}
                />
              </Tooltip>
              <Tooltip content="Coming soon" side="bottom">
                <LuPencilOff size={18} className="text-grey80" />
              </Tooltip>
            </div>
            <hr className="w-full border border-solid border-blue80" />
            <form
              onSubmit={handleSubmit(data => mutate(data))}
              className="flex w-full flex-col items-start justify-center gap-2">
              <Typography type="span" className="text-gray-500">
                Minimum Donation Amount
              </Typography>
              <Controller
                control={control}
                name="minDonationAmount"
                render={({ field }) => (
                  <AmountInput
                    setAmount={field.onChange}
                    amount={field.value}
                    grouping
                    className="mb-2"
                    decimals={2}
                    language={language}
                    currency
                    {...field}
                  />
                )}
              />
              <div className="flex w-full gap-2">
                <Button
                  disabled={watch('minDonationAmount') == defaultValue || watch('minDonationAmount') == '€0'}
                  type="submit">
                  {t('Labels.common.button.save')}
                </Button>
                {streamer?.minDonationAmount?.toString() !== '0' && (
                  <Button
                    variant="outline"
                    type="button"
                    className="bg-transparent"
                    onClick={handleMinimumAmountDisable}>
                    {t('Labels.common.button.disable')}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-1">
          <h1 className="text-xl font-medium text-gray-500">QRCODE</h1>
          <div className="flex w-full flex-col items-center justify-center gap-8 rounded-lg border bg-gray-100 p-8">
            {streamer?.widgets?.qrc_id && (
              <iframe
                src={`http://localhost:8080/streamer/widget/qrc/${streamer.widgets.qrc_id}`}
                style={{
                  width: '320px',
                  height: '320px',
                  background: 'transparent',
                  border: 'none'
                }}
              />
            )}
            <div className="flex w-full flex-row items-center justify-between">
              <Tooltip content="Implement" side="bottom">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button type="button" aria-label="Implement widget" className="cursor-pointer text-secondaryColor">
                      <Tooltip side="bottom" content="Implement">
                        <IoLink id="alert-link" size={18} />
                      </Tooltip>
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="gap-4 bg-white">
                    <AlertDialogTitle>Implement widget</AlertDialogTitle>
                    <AlertDialogDescription className="text-lg text-secondaryColor">
                      Use the URL below in your streaming software (OBS, Twitch Studio, etc.) as a Browser Source.
                    </AlertDialogDescription>
                    <UrlField url={`http://localhost:8080/streamer/widget/qrc/${streamer?.widgets?.qrc_id}`} />
                    <div className="flex w-full flex-col items-start justify-center gap-1 px-2 text-secondaryColor">
                      <h1 className="text-lg text-secondaryColor">Recommended Size</h1>
                      <div className="flex w-full flex-row items-center justify-start gap-10">
                        <div>
                          <h1 className="font-bold">WIDTH</h1>
                          <h1>800px</h1>
                        </div>
                        <div>
                          <h1 className="font-bold">HEIGHT</h1>
                          <h1>400px</h1>
                        </div>
                      </div>
                    </div>
                    <AlertDialogCancel className="w-20 border-secondaryColor lg:py-2">Close</AlertDialogCancel>
                  </AlertDialogContent>
                </AlertDialog>
              </Tooltip>
              <Tooltip content="Reload" side="bottom">
                <MdOutlineReplay
                  id="qrc-restart"
                  size={18}
                  className="cursor-pointer text-secondaryColor"
                  onClick={event => handleIconPress(event)}
                />
              </Tooltip>
              <Tooltip content="Coming soon" side="bottom">
                <LuPencilOff size={18} className="text-grey80" />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

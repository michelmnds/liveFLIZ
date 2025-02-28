'use client';

import { Button } from '@/components/Button';
import { CustomInput } from '@/components/CustomInput';
import { Typography } from '@/components/Typography';
import { ProfilePictuteProvider } from '@/providers/ProfilePictureProvider';
import { editProfileSchema } from '@/schemas/editProfile.schema';
import { editStreamer } from '@/services/api/apiClient';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { NavBar } from '../_partials/NavBar';
import { ProfilePicture } from './_partials';

export default function ProfilePage() {
  const t = useTranslations();
  const { data: session } = useSession();
  const streamer = session?.user;

  const { mutate } = useMutation({
    mutationFn: editStreamer,
    onSuccess: () => {
      toast.success(t('Labels.dashboard.profile.toast.baseInfo.success'));
    },
    onError: error => {
      console.error(error.message);
      toast.error(t('Errors.serverError'));
    }
  });
  const { control, handleSubmit } = useForm({
    mode: 'onSubmit',
    resolver: valibotResolver(editProfileSchema),
    defaultValues: {
      iban: streamer?.iban || '',
      fullName: streamer?.fullName || '',
      username: streamer?.username || '',
      email: streamer?.email || ''
    }
  });

  return (
    <div className="flex min-h-screen w-full items-start justify-start gap-10">
      <NavBar />
      <div className="flex w-full flex-col items-start justify-center gap-12 py-10">
        <h1 className="text-3xl font-bold text-secondaryColor">Profile</h1>
        <ProfilePictuteProvider>
          <ProfilePicture />
        </ProfilePictuteProvider>
        <div className="flex w-full flex-col items-start justify-center gap-3">
          <Typography type="h4">Edit your personal information</Typography>
          <form className="grid w-[80%] grid-cols-2 gap-3" onSubmit={handleSubmit(data => mutate(data))}>
            <div>
              <Typography type="span" className="text-sm">
                {t('Labels.common.input.username')}
              </Typography>
              <Controller
                name="username"
                control={control}
                render={({ field }) => <CustomInput setValue={field.onChange} value={field.value} />}
              />
            </div>
            <div>
              <Typography type="span" className="text-sm">
                {t('Labels.common.input.fullName')}
              </Typography>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => <CustomInput setValue={field.onChange} value={field.value} />}
              />
            </div>
            <div>
              <Typography type="span" className="text-sm">
                {t('Labels.common.input.email')}
              </Typography>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <CustomInput disabled setValue={field.onChange} value={field.value} />}
              />
            </div>
            <div>
              <Typography type="span" className="text-sm">
                {t('Labels.common.input.iban')}
              </Typography>
              <Controller
                name="iban"
                control={control}
                render={({ field }) => <CustomInput setValue={field.onChange} value={field.value} />}
              />
            </div>

            <Button type="submit" className="max-w-24">
              {t('Labels.dashboard.profile.button.save')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Button } from '@/components/Button';
import { CustomInput } from '@/components/CustomInput';
import { loginSchema } from '@/schemas/auth.schema';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();
  const { handleSubmit, control } = useForm({
    mode: 'onSubmit',
    resolver: valibotResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const { mutate } = useMutation({
    mutationFn: async ({ email, password }: { email: string | null; password: string }) =>
      await signIn('credentials', {
        email,
        password,
        redirect: false
      }),
    onSuccess: data => {
      if (data?.error) return alert(data.error);

      router.push('/dashboard');
    },
    onError: error => console.error(error)
  });

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit(data => mutate(data))}
        className="z-10 flex w-[300px] flex-col items-center justify-around gap-2xl rounded-md bg-gray-50 px-xl py-2xl shadow-xl">
        <Image src="/fliz-logo.png" width={150} height={150} alt="Fliz Logo" />
        <div className="flex w-full flex-col items-start justify-center gap-1">
          <Controller
            render={({ field: { onChange, value } }) => (
              <CustomInput
                type="text"
                autoCapitalize="none"
                autoComplete="email"
                setValue={onChange}
                value={value}
                placeholder={t('Labels.common.input.email')}
              />
            )}
            name="email"
            control={control}
          />
          <Controller
            render={({ field: { onChange, value } }) => (
              <CustomInput
                type="password"
                autoCapitalize="none"
                setValue={onChange}
                secureTextEntry
                value={value}
                placeholder={t('Labels.common.input.password')}
              />
            )}
            name="password"
            control={control}
          />
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-2">
          <Button type="submit">{t('Labels.common.button.login')}</Button>
          <div className="ml-1 text-start text-xs text-grey80">
            <span>Don&apos;t have an account? </span>
            <span className="cursor-pointer underline" onClick={() => router.push('/login')}>
              Create one.
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

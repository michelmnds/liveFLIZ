import { deletePresignedUrl, generatePresignedUrl, updateLogoUrl } from '@/services/api/apiClient';

import { useMutation } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export function useProfilePictureLoader() {
  const t = useTranslations();
  const { update } = useSession();

  const handleProfileLogoChange = async (file: File | null) => {
    try {
      if (!file) return;

      const presignedUrl = await generatePresignedUrl(file.name, file.type);

      await axios.put(presignedUrl, file);

      const logoUrl = presignedUrl.split('?')[0];
      return await updateLogoUrl(logoUrl);
    } catch (error) {
      switch (true) {
        case isAxiosError(error):
          throw new Error(error.response?.data?.message);
        case error instanceof Error:
          throw new Error(error.message);
        default:
          throw error;
      }
    }
  };

  const { mutateAsync: uploadPicture, isPending: isPendingUpload } = useMutation({
    mutationFn: handleProfileLogoChange,
    onSuccess: async (data, variables) => {
      const session = await update({ user: { logoUrl: data } });
      if (!session) {
        throw new Error('Failed to update session');
      }
      if (variables) {
        // Show success toast only on picture upload
        toast.success(t('Labels.profile.toast.logo.success'));
      }
    },
    onError: error => {
      console.error(error.message);
      toast.error(t('Errors.serverError'));
    }
  });

  const { mutateAsync: deletePicture, isPending: isPendingDelete } = useMutation({
    mutationFn: deletePresignedUrl,
    onSuccess: () => uploadPicture(null),
    onError: error => {
      console.error(error.message);
      toast.error(t('Errors.serverError'));
    }
  });

  return {
    uploadPicture,
    deletePicture,
    isLoading: isPendingUpload || isPendingDelete
  } as const;
}

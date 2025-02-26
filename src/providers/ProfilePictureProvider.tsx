'use client';

import { PROFILE_PICTURE_MAX_FILE_SIZE, PROFILE_PICTURE_MIN_DIMENSION } from '@/utils/CONSTS';
import { createSafeContext } from '@/utils/createSafeContext';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

type ProfilePictuteFileDataType = {
  imgSrc: string;
  setImgSrc: (src: string) => void;
  fileName: string;
  setFileName: (name: string) => void;
  loadFile: (file: File, openEditor: () => void) => void;
};

const [ProfilePictuteSafeProvider, useProfilePictureData] = createSafeContext<ProfilePictuteFileDataType>('');

function ProfilePictuteProvider({ children }: React.PropsWithChildren) {
  const t = useTranslations('Labels.dashboard.profile.profilePicture');
  const [imgSrc, setImgSrc] = useState('');
  const [fileName, setFileName] = useState('');

  const loadFile = useCallback(
    (file: File, openEditor: () => void) => {
      if (file.size > PROFILE_PICTURE_MAX_FILE_SIZE) {
        toast.error(
          t('fileSizeExceeds', {
            maxFileSize: PROFILE_PICTURE_MAX_FILE_SIZE / (1024 * 1024)
          })
        );
        return;
      }

      setFileName(file.name);

      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const imageElement = new Image();
        const imageSrc = reader?.result?.toString() ?? '';
        imageElement.src = imageSrc;

        imageElement.addEventListener('load', (event: Event) => {
          const { naturalWidth, naturalHeight } = event.currentTarget as EventTarget & HTMLImageElement;

          if (naturalWidth < PROFILE_PICTURE_MIN_DIMENSION || naturalHeight < PROFILE_PICTURE_MIN_DIMENSION) {
            toast.error(
              t('tooSmallResolution', {
                minDimension: PROFILE_PICTURE_MIN_DIMENSION
              })
            );
            setImgSrc('');
            return;
          }
        });

        setImgSrc(imageSrc);
        openEditor();
      });
      reader.readAsDataURL(file);
    },
    [t, setImgSrc, setFileName]
  );

  return (
    <ProfilePictuteSafeProvider value={{ imgSrc, setImgSrc, fileName, setFileName, loadFile }}>
      {children}
    </ProfilePictuteSafeProvider>
  );
}

export { ProfilePictuteProvider, useProfilePictureData };

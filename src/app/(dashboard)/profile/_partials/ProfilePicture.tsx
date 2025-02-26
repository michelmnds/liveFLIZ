'use client';

import { CustomInput } from '@/components/CustomInput';
import { Dialog } from '@/components/Dialog';
import { Label } from '@/components/Label';
import { useProfilePictureData } from '@/providers/ProfilePictureProvider';
import { getStreamer } from '@/services/api/apiClient';
import { ICON_SM, ICON_XS } from '@/utils/CONSTS';
import { cn } from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import NextImage from 'next/image';
import { useRef, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { ProfilePictureEditor } from './ProfilePictureEditor';

export function ProfilePicture() {
  const t = useTranslations();
  const [openEditor, setOpenEditor] = useState(false);
  const { loadFile } = useProfilePictureData();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [inputKey, setInputKey] = useState(0);
  const locale = useLocale();

  const { data: streamer } = useQuery({
    queryKey: ['streamer'],
    queryFn: () => {
      try {
        return getStreamer();
      } catch (error) {
        console.error(error);
      }
    }
  });

  function handleSelectFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    loadFile(file, () => setOpenEditor(true));
    setInputKey(key => key + 1); // Update input key to allow reloads of the same image name
  }

  return (
    <Dialog open={openEditor} onOpenChange={setOpenEditor}>
      <div className="relative flex max-w-fit items-start gap-3">
        <div
          className={cn(
            'text-mint-20 relative flex h-[136px] w-[136px] items-center justify-center rounded-xl',
            streamer?.logoUrl ? 'border-2 border-primaryColor bg-white' : 'bg-primaryColor'
          )}>
          {streamer?.logoUrl ? (
            <NextImage
              src={streamer?.logoUrl}
              priority
              alt="Profile picture"
              width={136}
              height={136}
              className="z-10 rounded-xl"
            />
          ) : (
            <FaUser size={60} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
        {!streamer?.logoUrl && (
          <div
            className={cn(
              'flex h-[104px] items-start justify-start gap-2 rounded-lg border-0 bg-red-400 px-4 py-3',
              locale === 'de' ? 'max-w-[350px]' : 'max-w-[300px]'
            )}>
            <IoIosInformationCircleOutline size={ICON_SM} className="text-mint-20 shrink-0" />
            <p className="text-mint-20 text-xs">{t('Labels.dashboard.profile.subtitle.pictureUploadClarification')}</p>
          </div>
        )}
        <div className="absolute bottom-0 left-[120px] z-10 flex items-stretch rounded-full bg-secondaryColor">
          <Label htmlFor="profile-picture-upload" className="shrink-0 cursor-pointer !p-0 shadow-none">
            <FaPen size={ICON_XS} className="m-2 text-white" />
            <CustomInput
              setValue={() => {}}
              type="file"
              id="profile-picture-upload"
              key={inputKey}
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp,image/gif"
              containerClassName="hidden h-1 w-1"
              onChange={handleSelectFile}
            />
          </Label>
        </div>
      </div>
      <ProfilePictureEditor userLogo={streamer?.logoUrl} closeEditor={() => setOpenEditor(false)} />
    </Dialog>
  );
}

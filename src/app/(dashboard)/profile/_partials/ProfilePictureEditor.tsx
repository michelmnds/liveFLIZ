/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from '@/components/Button';
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/Dialog';
import { Loading } from '@/components/Loading';
import { useProfilePictureLoader } from '@/hooks/useProfilePictureLoader';
import { useProfilePictureData } from '@/providers/ProfilePictureProvider';
import { PROFILE_PICTURE_ASPECT_RATIO, PROFILE_PICTURE_MIN_DIMENSION } from '@/utils/CONSTS';
import { cn } from '@/utils/cn';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  type Crop,
  type PercentCrop,
  type PixelCrop
} from 'react-image-crop';
import { toast } from 'sonner';
import { setCanvasPreview } from './canvasPreview';

type ProfilePictureEditorProps = {
  closeEditor: () => void;
  userLogo?: string | null;
};

export function ProfilePictureEditor({ userLogo, closeEditor }: ProfilePictureEditorProps) {
  const t = useTranslations('Labels.dashboard.profile');
  const [crop, setCrop] = useState<Crop>();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { uploadPicture, deletePicture, isLoading } = useProfilePictureLoader();
  const { imgSrc, setImgSrc, fileName, setFileName } = useProfilePictureData();

  function handleImageLoad(event: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = event.currentTarget;
    const cropWidthInPercent = (PROFILE_PICTURE_MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop({ unit: '%', width: cropWidthInPercent }, PROFILE_PICTURE_ASPECT_RATIO, width, height);
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  }

  function handleChangeCrop(_crop: PixelCrop, percentageCrop: PercentCrop) {
    setCrop(percentageCrop);
  }

  async function handleCropImage() {
    if (!imageRef.current || !canvasRef.current || !crop) return;
    const { width, height } = imageRef.current;
    const pixelCrop = convertToPixelCrop(crop, width, height);
    setCanvasPreview(imageRef.current, canvasRef.current, pixelCrop);

    canvasRef.current.toBlob(async blob => {
      if (!blob) {
        toast.error(t('Labels.dashboard.profile.profilePicture.failedToProcess'));
        return;
      }
      // Delete previously uploaded profile picture if any
      if (userLogo) {
        const fileName = userLogo.slice(64, userLogo.length);
        await deletePicture(fileName);
      }
      // Create new file from blob
      const file = new File([blob], 'profile-pic.png', { type: 'image/png' });
      await uploadPicture(file);
      handleClose();
    }, 'image/png');
  }

  function handleClose() {
    setImgSrc('');
    setCrop(undefined);
    setFileName('');
    closeEditor();
  }

  return (
    <DialogContent noClose className="max-h-screen rounded-4xl bg-white p-10 sm:rounded-4xl" classNameClose="hidden">
      <DialogClose
        className={cn(
          'absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none'
        )}
        onClick={handleClose}>
        <IoMdClose className={cn('h-6 w-6')} />
      </DialogClose>
      <DialogTitle className="w-80 text-secondaryColor">{fileName}</DialogTitle>
      <DialogDescription className="sr-only">Profile Picture</DialogDescription>
      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            keepSelection
            aspect={PROFILE_PICTURE_ASPECT_RATIO}
            minWidth={PROFILE_PICTURE_MIN_DIMENSION}
            onChange={handleChangeCrop}>
            <img
              ref={imageRef}
              src={imgSrc}
              alt="Upload user profile picture"
              onLoad={handleImageLoad}
              style={{ maxHeight: '60vh' }}
            />
          </ReactCrop>
          <Button
            variant="solid"
            loading={isLoading}
            disabled={isLoading}
            onClick={handleCropImage}
            className="mt-6 min-w-32">
            {isLoading ? (
              <Loading size={24} className="text-secondaryColor" wrapperClassName="p-0" />
            ) : (
              t('button.save')
            )}
          </Button>
        </div>
      )}

      {crop && (
        <canvas
          ref={canvasRef}
          className="mt-4"
          style={{
            display: 'none',
            objectFit: 'contain',
            width: 150,
            height: 150
          }}
        />
      )}
    </DialogContent>
  );
}

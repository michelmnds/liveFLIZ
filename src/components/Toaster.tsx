'use client';

import {TbMoodSad, TbMoodSmile} from 'react-icons/tb';
import {useTheme} from 'next-themes';
import {Toaster as Sonner} from 'sonner';
import {ICON_MD} from '@/utils/CONSTS';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({...props}: ToasterProps) => {
  const {theme = 'system'} = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group font-[inherit]"
      closeButton
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:text-sm group-[.toaster]:border-0 group-[.toaster]:gap-3 group-[.toaster]:shadow-lg flex justify-start items-start',
          success:
            'group-[.toaster]:bg-success group-[.toaster]:text-blue-40 [&_[data-close-button]]:bg-success [&_[data-close-button]:hover]:bg-green-300',
          error:
            'group-[.toaster]:bg-[#FF6B6B] group-[.toaster]:text-mint-20 [&_[data-close-button]]:bg-[#FF6B6B] [&_[data-close-button]:hover]:bg-red-400',
          closeButton: 'left-[unset] right-0 translate-x-1/3 -translate-y-1/3 shadow-md border-blue-80 text-blue-80',
          icon: 'h-[24px] -mt-[1px]',
        },
      }}
      icons={{
        success: <TbMoodSmile size={ICON_MD} className="text-blue-40" />,
        error: <TbMoodSad size={ICON_MD} className="text-mint-20" />,
      }}
      {...props}
    />
  );
};

export {Toaster};

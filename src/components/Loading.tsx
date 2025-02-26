import React from 'react';
import {cn} from '@/utils/cn';
import {CgSpinner} from 'react-icons/cg';

export function Loading({
  size = 30,
  wrapperClassName,
  className,
}: {
  size?: number;
  wrapperClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex-center w-full p-5', wrapperClassName)}>
      <CgSpinner
        style={{
          animationDuration: '2s',
        }}
        className={cn('animate-spin text-tertiary transition-transform', className)}
        size={size}
      />
    </div>
  );
}

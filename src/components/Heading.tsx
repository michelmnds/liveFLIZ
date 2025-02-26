import {ComponentPropsWithoutRef, createElement, forwardRef} from 'react';
import {tv} from 'tailwind-variants';
import {cn} from '@/utils/cn';

export const headingVariants = tv({
  base: 'block font-semibold text-blue-80',
  variants: {
    level: {
      1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      4: 'scroll-m-20 text-xl font-semibold tracking-tight',
    },
  },
  defaultVariants: {
    level: 4,
  },
});

interface HeadingProps extends ComponentPropsWithoutRef<'h1'> {
  level: 1 | 2 | 3 | 4;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({level, className, ...props}, ref) => {
  const C = `h${level}`;
  return createElement(C, {
    ref: ref,
    className: cn(headingVariants({level: level}), className),
    ...props,
  });
});
Heading.displayName = 'Heading';

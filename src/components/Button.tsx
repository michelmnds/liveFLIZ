import { Colors, Spaces } from '@/types/styles.types';
import { cn } from '@/utils/cn';
import { Slot } from '@radix-ui/react-slot';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { tv } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'w-full py-3 text-sm font-semibold text-secondaryColor',
  variants: {
    intent: {
      solid: 'disabled:bg-grey',
      outline: 'border border-solid border-secondaryColor bg-white disabled:border-grey20 disabled:bg-grey',
      ghost: 'bg-grey20 disabled:bg-transparent'
    },
    size: {
      _2xs: 'px-xs py-2xs',
      xs: 'px-sm py-xs',
      sm: 'px-lg py-sm',
      md: 'px-2xl py-md',
      lg: 'px-4xl py-lg',
      xl: 'px-2xl py-xl',
      _2xl: 'px-5xl py-2xl',
      _3xl: 'px-[3.5rem] py-3xl',
      _4xl: 'px-[4rem] py-4xl',
      _5xl: 'px-[5rem] py-5xl'
    },
    roundness: {
      _2xs: 'rounded-2xs',
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      _2xl: 'rounded-2xl',
      _3xl: 'rounded-3xl',
      _4xl: 'rounded-4xl',
      _5xl: 'rounded-5xl'
    },
    color: {
      primaryColor: 'bg-primaryColor',
      secondaryColor: 'bg-secondaryColor',
      grey: 'bg-grey',
      grey10: 'bg-grey10',
      grey20: 'bg-grey20',
      grey40: 'bg-grey40',
      grey80: 'bg-grey40',
      blue80: 'bg-blue80',
      blue60: 'bg-blue60',
      green80: 'bg-green80',
      green60: 'bg-green60',
      green20: 'bg-green20'
    }
  },
  defaultVariants: {
    intent: 'solid',
    color: 'primaryColor',
    size: 'md',
    roundness: 'lg'
  }
});

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'solid' | 'outline' | 'ghost';
  color?: Colors;
  size?: Spaces;
  roundness?: Spaces;
  loading?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, type, loading, variant, color, size, roundness, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        type={type}
        {...props}
        data-loading={loading}
        className={cn(
          buttonVariants({
            intent: variant,
            color,
            size,
            roundness
          }),
          className
        )}
      />
    );
  }
);
Button.displayName = 'Button';

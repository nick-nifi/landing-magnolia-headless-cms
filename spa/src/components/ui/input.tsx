import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border-b hover:bg-input/30 focus:bg-input/60 transition-all ease duration-300 focus:border-b-primary placeholder:text-foreground',
  {
    variants: {
      size: {
        default: 'h-12 py-2 text-base lg:text-[20px]',
      },
      variant: {
        default: '',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

function Input({
  className,
  type,
  variant,
  size,
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(inputVariants({ className, size, variant }))}
      // className={cn(
      //   "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      //   "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      //   className
      // )}
      {...props}
    />
  );
}

export { Input };

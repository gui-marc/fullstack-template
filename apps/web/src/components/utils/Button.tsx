import { forwardRef } from 'react';

import { motion } from 'framer-motion';
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'text-sm font-medium rounded-md flex justify-center items-center leading-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition ease-in-out duration-150',
  variants: {
    intent: {
      primary: 'text-white bg-primary-600 hover:bg-primary-700',
      secondary:
        'text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700',
    },
    size: {
      md: 'h-10 px-4',
      sm: 'h-8 px-3',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
});

export interface ButtonProps
  extends React.ComponentProps<typeof motion.button>,
    VariantProps<typeof button> {}

const Button = forwardRef<React.ElementRef<typeof motion.button>, ButtonProps>(function _Button(
  { intent, size, className, ...props },
  ref,
) {
  return <motion.button className={button({ intent, size, className })} {...props} ref={ref} />;
});

export default Button;

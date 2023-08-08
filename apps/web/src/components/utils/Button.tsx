import { ReactNode, forwardRef } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { tv, VariantProps } from 'tailwind-variants';

import Spinner from './Spinner';

const button = tv({
  base: 'relative text-sm active:scale-[99%] font-medium rounded-md inline-flex justify-center items-center leading-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition ease-in-out duration-150 disabled:pointer-events-none',
  variants: {
    intent: {
      primary: 'text-white bg-primary-600 hover:bg-primary-700',
      secondary:
        'text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
      danger:
        'text-white bg-danger-600 hover:bg-danger-700 border border-danger-600 hover:border-danger-700',
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
    VariantProps<typeof button> {
  isLoading?: boolean;
  children: ReactNode;
}

const Button = forwardRef<React.ElementRef<typeof motion.button>, ButtonProps>(function _Button(
  { intent, size, className, isLoading, children, ...props },
  ref,
) {
  return (
    <motion.button
      className={button({ intent, size, className })}
      {...props}
      disabled={props.disabled || isLoading}
      ref={ref}
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm"
          >
            <Spinner />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </motion.button>
  );
});

export default Button;

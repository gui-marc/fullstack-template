import { ReactNode, forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { AnimatePresence, motion } from 'framer-motion';
import { tv, VariantProps } from 'tailwind-variants';

import Spinner from './Spinner';

export const button = tv({
  base: 'relative outline-none text-sm active:scale-[99%] font-medium rounded-lg inline-flex justify-center items-center leading-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition ease-in-out duration-150 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-primary-300 dark:focus-visible:ring-primary-800',
  variants: {
    intent: {
      primary:
        'border border-primary-500 dark:border-primary-500 text-white bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500',
      secondary:
        'text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
      danger:
        'border border-danger-500 dark:border-danger-500 text-white bg-danger-500 hover:bg-danger-600 dark:bg-danger-600 dark:hover:bg-danger-500',
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
  asChild?: boolean;
}

const Button = forwardRef<React.ElementRef<typeof motion.button>, ButtonProps>(function _Button(
  { intent, size, className, isLoading, children, ...props },
  ref,
) {
  const Component = props.asChild ? (Slot as typeof motion.button) : motion.button;
  return (
    <Component
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
    </Component>
  );
});

export default Button;

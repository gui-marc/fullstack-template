import { forwardRef } from 'react';

import { motion } from 'framer-motion';
import { tv, VariantProps } from 'tailwind-variants';

const input = tv({
  base: 'text-sm px-3 h-10 rounded-lg text-gray-800 dark:text-gray-200 w-full flex bg-transparent border placeholder:text-gray-500 font-sans focus-visible:ring-2 focus-visible:ring-primary-300 dark:focus-visible:ring-primary-800 disabled:pointer-events-none disabled:bg-gray-100 dark:disabled:bg-gray-800',
  variants: {
    valid: {
      true: 'border-gray-200 dark:border-gray-700',
      false: 'border-danger-200 dark:border-danger-700',
    },
  },
});

export interface InputProps
  extends React.ComponentProps<typeof motion.input>,
    VariantProps<typeof input> {
  label?: string;
  errorMessage?: string;
  description?: string;
}

const Input = forwardRef<React.ElementRef<typeof motion.input>, InputProps>(function _Input(
  { className, label, errorMessage, description, ...props },
  ref,
) {
  return (
    <label
      data-disabled={props.disabled}
      className="block group data-[disabled]:opacity-75 space-y-1.5"
    >
      {label && (
        <span
          aria-disabled={props.disabled}
          className="block text-xs text-gray-700 dark:text-gray-300"
        >
          {label}
        </span>
      )}
      <motion.input className={input({ className, valid: !errorMessage })} {...props} ref={ref} />
      {description && !errorMessage && <p className="text-xs text-gray-500">{description}</p>}
      {errorMessage && <p className="text-xs text-danger-500">{errorMessage}</p>}
    </label>
  );
});

export default Input;

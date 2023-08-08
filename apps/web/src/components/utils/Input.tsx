import { forwardRef } from 'react';

import { motion } from 'framer-motion';
import { tv, VariantProps } from 'tailwind-variants';

const input = tv({
  base: 'rounded-lg text-sm px-3 w-full h-10 flex bg-transparent border-2 placeholder:text-gray-500 font-sans dark:border-gray-700 focus-visible:ring-2 focus-visible:ring-primary-300 dark:focus-visible:ring-primary-800',
  variants: {
    sz: {
      md: '',
      sm: 'text-sm px-3 h-8',
    },
  },
  defaultVariants: {
    sz: 'md',
  },
});

export interface InputProps
  extends React.ComponentProps<typeof motion.input>,
    VariantProps<typeof input> {
  label?: string;
}

const Input = forwardRef<React.ElementRef<typeof motion.input>, InputProps>(function _Input(
  { className, label, sz, ...props },
  ref,
) {
  return (
    <label className="block">
      {label && <span className="block mb-1 text-xs">{label}</span>}
      <motion.input className={input({ className, sz })} {...props} ref={ref} />
    </label>
  );
});

export default Input;

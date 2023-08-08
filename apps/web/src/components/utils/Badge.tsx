import { forwardRef } from 'react';

import { motion } from 'framer-motion';
import { tv, VariantProps } from 'tailwind-variants';

const badge = tv({
  base: ' px-2 py-1 text-sm border rounded-md',
  variants: {
    intent: {
      primary:
        'bg-primary-100 border-primary-200 dark:border-primary-800 text-primary-800 dark:bg-primary-900/25 dark:text-primary-100',
      secondary:
        'bg-gray-100 border-gray-200 dark:border-gray-800 text-gray-800 dark:bg-gray-900 dark:text-gray-100',
      danger:
        'bg-danger-100 border-danger-200 dark:border-danger-900 text-danger-800 dark:bg-danger-900/25 dark:text-danger-100',
    },
  },
  defaultVariants: {
    intent: 'secondary',
  },
});

export interface BadgeProps
  extends React.ComponentProps<typeof motion.span>,
    VariantProps<typeof badge> {}

const Badge = forwardRef<React.ElementRef<typeof motion.span>, BadgeProps>(function _Badge(
  { className, intent, ...props },
  ref,
) {
  return <motion.span className={badge({ className, intent })} {...props} ref={ref} />;
});

export default Badge;

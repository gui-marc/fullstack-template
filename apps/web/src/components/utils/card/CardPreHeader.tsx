import { forwardRef } from 'react';

import { motion } from 'framer-motion';
import { tv, VariantProps } from 'tailwind-variants';

const cardPreHeader = tv({
  base: 'p-6 py-4 border-b border-b-gray-200 dark:border-b-gray-800 bg-gray-100 dark:bg-gray-950/25',
});

export interface CardPreHeaderProps
  extends React.ComponentProps<typeof motion.div>,
    VariantProps<typeof cardPreHeader> {}

const CardPreHeader = forwardRef<React.ElementRef<typeof motion.div>, CardPreHeaderProps>(
  function _CardPreHeader({ className, ...props }, ref) {
    return <motion.div className={cardPreHeader({ className })} {...props} ref={ref} />;
  },
);

export default CardPreHeader;

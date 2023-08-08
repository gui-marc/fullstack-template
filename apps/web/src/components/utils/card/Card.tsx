import { forwardRef } from 'react';

import { motion } from 'framer-motion';
import { tv, VariantProps } from 'tailwind-variants';

const card = tv({
  base: 'rounded-lg border dark:bg-gray-900 bg-white border-gray-200 dark:border-gray-800 shadow-sm',
});

export interface CardProps
  extends React.ComponentProps<typeof motion.div>,
    VariantProps<typeof card> {}

const Card = forwardRef<React.ElementRef<typeof motion.div>, CardProps>(function _Card(
  { className, ...props },
  ref,
) {
  return <motion.div className={card({ className })} {...props} ref={ref} />;
});

export default Card;

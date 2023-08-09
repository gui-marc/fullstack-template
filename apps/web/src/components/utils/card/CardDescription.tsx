import { forwardRef } from 'react';

import { motion } from 'framer-motion';
import { tv, VariantProps } from 'tailwind-variants';

const cardDescription = tv({
  base: 'text-sm text-gray-600 dark:text-gray-400',
});

export interface CardDescriptionProps
  extends React.ComponentProps<typeof motion.p>,
    VariantProps<typeof cardDescription> {}

const CardDescription = forwardRef<React.ElementRef<typeof motion.p>, CardDescriptionProps>(
  function _CardDescription({ className, ...props }, ref) {
    return <motion.p className={cardDescription({ className })} {...props} ref={ref} />;
  },
);

export default CardDescription;

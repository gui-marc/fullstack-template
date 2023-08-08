import { forwardRef } from 'react';

import { motion } from 'framer-motion';
import { tv, VariantProps } from 'tailwind-variants';

const cardPreHeader = tv({
  base: 'p-6 pb-0',
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

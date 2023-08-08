import { forwardRef } from 'react';

import { motion } from 'framer-motion';
import { tv, VariantProps } from 'tailwind-variants';

const cardHeader = tv({
  base: 'space-y-1.5 p-6',
});

export interface CardHeaderProps
  extends React.ComponentProps<typeof motion.header>,
    VariantProps<typeof cardHeader> {}

const CardHeader = forwardRef<React.ElementRef<typeof motion.header>, CardHeaderProps>(
  function _CardHeader({ className, ...props }, ref) {
    return <motion.header className={cardHeader({ className })} {...props} ref={ref} />;
  },
);

export default CardHeader;

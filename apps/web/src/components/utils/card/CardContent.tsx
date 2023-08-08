import { forwardRef } from 'react';

import { motion } from 'framer-motion';
import { tv, VariantProps } from 'tailwind-variants';

const cardContent = tv({
  base: 'p-6 pt-0',
});

export interface CardContentProps
  extends React.ComponentProps<typeof motion.div>,
    VariantProps<typeof cardContent> {}

const CardContent = forwardRef<React.ElementRef<typeof motion.div>, CardContentProps>(
  function _CardContent({ className, ...props }, ref) {
    return <motion.div className={cardContent({ className })} {...props} ref={ref} />;
  },
);

export default CardContent;

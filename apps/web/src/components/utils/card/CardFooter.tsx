import { forwardRef } from 'react';

import { motion } from 'framer-motion';
import { tv, VariantProps } from 'tailwind-variants';

const cardFooter = tv({
  base: 'p-6 pt-0',
});

export interface CardFooterProps
  extends React.ComponentProps<typeof motion.footer>,
    VariantProps<typeof cardFooter> {}

const CardFooter = forwardRef<React.ElementRef<typeof motion.footer>, CardFooterProps>(
  function _CardFooter({ className, ...props }, ref) {
    return <motion.footer className={cardFooter({ className })} {...props} ref={ref} />;
  },
);

export default CardFooter;

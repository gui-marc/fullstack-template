import { forwardRef } from 'react';

import { motion } from 'framer-motion';
import { tv, VariantProps } from 'tailwind-variants';

const cardTitle = tv({
  base: 'text-xl font-semibold text-gray-900 dark:text-white leading-none tracking-tight',
});

export interface CardTitleProps
  extends React.ComponentProps<typeof motion.h3>,
    VariantProps<typeof cardTitle> {}

const CardTitle = forwardRef<React.ElementRef<typeof motion.h3>, CardTitleProps>(
  function _CardTitle({ className, ...props }, ref) {
    return <motion.h3 className={cardTitle({ className })} {...props} ref={ref} />;
  },
);

export default CardTitle;

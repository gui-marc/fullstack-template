import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { tv, VariantProps } from 'tailwind-variants';

const link = tv({
  base: 'text-primary-500 font-medium hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline',
});

export interface LinkProps
  extends React.ComponentProps<typeof RouterLink>,
    VariantProps<typeof link> {}

const Link = forwardRef<React.ElementRef<typeof RouterLink>, LinkProps>(function _Link(
  { className, ...props },
  ref,
) {
  return <RouterLink className={link({ className })} {...props} ref={ref} />;
});

export default Link;

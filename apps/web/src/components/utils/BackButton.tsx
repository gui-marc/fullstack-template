import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import { tv, VariantProps } from 'tailwind-variants';

import Icon from './Icon';

const backButton = tv({
  base: 'flex w-fit items-center text-sm text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition duration-200 ease-in-out',
});

export interface BackButtonProps
  extends React.ComponentProps<typeof Link>,
    VariantProps<typeof backButton> {}

const BackButton = forwardRef<React.ElementRef<typeof Link>, BackButtonProps>(function _BackButton(
  { className, children, ...props },
  ref,
) {
  return (
    <Link className={backButton({ className })} {...props} ref={ref}>
      <Icon className="mr-1.5" name="arrow-left" /> {children}
    </Link>
  );
});

export default BackButton;

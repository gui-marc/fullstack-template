import { forwardRef } from 'react';

import { tv, VariantProps } from 'tailwind-variants';

const text = tv({
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
    },
    type: {
      title: 'font-bold text-white',
      heading: 'font-semibold text-white',
      body: 'font-normal text-gray-600 dark:text-gray-400',
      muted: 'font-normal text-gray-500',
    },
  },
  defaultVariants: {
    size: 'base',
    type: 'body',
  },
});

export interface TextProps extends React.ComponentProps<'p'>, VariantProps<typeof text> {
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span';
}

const Text = forwardRef<React.ElementRef<'p'>, TextProps>(function _Text(
  { className, as = 'p', size, type, ...props },
  ref,
) {
  const Component = as;
  return <Component className={text({ className, size, type })} {...props} ref={ref} />;
});

export default Text;

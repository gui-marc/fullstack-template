import { ComponentProps } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { VariantProps } from 'tailwind-variants';

import { button } from './Button';

export interface ButtonLinkProps
  extends VariantProps<typeof button>,
    LinkProps,
    ComponentProps<typeof Link> {
  to: string;
}

export default function ButtonLink({ className, intent, size, ...props }: ButtonLinkProps) {
  return <Link className={button({ className, intent, size })} {...props} />;
}

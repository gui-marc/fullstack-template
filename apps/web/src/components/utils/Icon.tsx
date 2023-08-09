import { lazy, Suspense } from 'react';

import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, size = 20, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense>
      <LucideIcon size={size} {...props} />
    </Suspense>
  );
};

export default Icon;

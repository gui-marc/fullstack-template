import { Suspense } from 'react';

import TailwindToaster from '../misc/TailwindToaster';

interface RootLayoutProps extends React.ComponentProps<'div'> {}

export default function RootLayout({ children, ...props }: RootLayoutProps) {
  return (
    <div className="h-full" {...props}>
      <Suspense>{children}</Suspense>
      <TailwindToaster />
    </div>
  );
}

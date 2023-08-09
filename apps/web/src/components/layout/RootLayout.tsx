import { Suspense } from 'react';

import TailwindToaster from '../misc/TailwindToaster';
import ProgressBar from '../utils/ProgressBar';

interface RootLayoutProps extends React.ComponentProps<'div'> {}

export default function RootLayout({ children, ...props }: RootLayoutProps) {
  return (
    <div className="h-full" {...props}>
      <ProgressBar />
      <Suspense>{children}</Suspense>
      <TailwindToaster />
    </div>
  );
}

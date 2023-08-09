import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/index.css';
import RootLayout from '@/components/layout/RootLayout';
import Router from '@/routes';

// Fonts
import '@fontsource/inter/latin-ext-400.css';
import '@fontsource/inter/latin-ext-500.css';
import '@fontsource/inter/latin-ext-600.css';
import '@fontsource/inter/latin-ext-700.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RootLayout>
        <Router />
      </RootLayout>
    </QueryClientProvider>
  </React.StrictMode>,
);

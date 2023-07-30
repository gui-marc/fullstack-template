import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

const HomePage = React.lazy(() => import('./pages/HomePage'));

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    Component: HomePage,
  },
]);

export default router;

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AuthWrapper from './components/misc/AuthWrapper';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));

const router = createBrowserRouter([
  {
    path: '/app',
    Component: AuthWrapper,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/register',
    Component: RegisterPage,
  },
]);

export default router;

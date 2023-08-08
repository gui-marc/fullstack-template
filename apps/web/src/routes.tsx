import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AuthWrapper from './components/misc/AuthWrapper';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const ConfirmPage = React.lazy(() => import('./pages/ConfirmPage'));
const PendingConfirmationPage = React.lazy(() => import('./pages/PendingConfirmationPage'));

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
  {
    path: '/confirm',
    Component: ConfirmPage,
  },
  {
    path: '/pending-confirmation',
    Component: PendingConfirmationPage,
  },
]);

export default router;

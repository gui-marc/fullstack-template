import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import AuthWrapper from './components/misc/AuthWrapper';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));
const ConfirmPage = React.lazy(() => import('./pages/auth/ConfirmPage'));
const PendingConfirmationPage = React.lazy(() => import('./pages/auth/PendingConfirmationPage'));

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <Navigate to="/app" replace={true} />,
  },
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

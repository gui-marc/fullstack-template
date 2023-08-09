import { Navigate, createBrowserRouter } from 'react-router-dom';

import AuthWrapper from './components/misc/AuthWrapper';
import lazyRoute from './utils/lazyRoute';

const HomePage = lazyRoute('/src/pages/HomePage');
const LoginPage = lazyRoute('/src/pages/auth/LoginPage');
const RegisterPage = lazyRoute('/src/pages/auth/RegisterPage');
const ConfirmPage = lazyRoute('/src/pages/auth/ConfirmPage');
const PendingConfirmationPage = lazyRoute('/src/pages/auth/PendingConfirmationPage');
const PasswordRecoverPage = lazyRoute('/src/pages/auth/PasswordRecoverPage');

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
  {
    path: '/password-recover',
    Component: PasswordRecoverPage,
  },
]);

export default router;

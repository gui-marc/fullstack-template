import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { SuspenseRouter } from '@/components/misc/SuspenseRouter';
import Spinner from '@/components/utils/Spinner';

import AuthWrapper from '../components/misc/AuthWrapper';
import lazyRoute from './lazyRoute';

const HomePage = lazyRoute('/src/pages/HomePage');
const LoginPage = lazyRoute('/src/pages/auth/LoginPage');
const RegisterPage = lazyRoute('/src/pages/auth/RegisterPage');
const ConfirmPage = lazyRoute('/src/pages/auth/ConfirmPage');
const PendingConfirmationPage = lazyRoute('/src/pages/auth/PendingConfirmationPage');
const PasswordRecoverPage = lazyRoute('/src/pages/auth/PasswordRecoverPage');

function Loader() {
  return (
    <main className="grid h-full place-items-center">
      <Spinner />
    </main>
  );
}

export default function Router() {
  return (
    <SuspenseRouter window={window}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/app" replace={true} />} />
          <Route path="/app" Component={AuthWrapper}>
            <Route index Component={HomePage} />
          </Route>
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/confirm" Component={ConfirmPage} />
          <Route path="/pending-confirmation" Component={PendingConfirmationPage} />
          <Route path="/password-recover" Component={PasswordRecoverPage} />
        </Routes>
      </Suspense>
    </SuspenseRouter>
  );
}

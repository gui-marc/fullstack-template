import { useEffect, useState } from 'react';
import { Location, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';

import * as AuthApi from '@/api/auth';
import { useAuthStore } from '@/store/auth';

export default function AuthWrapper() {
  const {
    actions: { setUser },
  } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();

  const [prevLocation, setPrevLocation] = useState<Location>();

  useEffect(() => {
    async function checkAuth() {
      try {
        if (location.pathname !== prevLocation?.pathname) {
          console.log('checkAuth');
          setPrevLocation(location);
          const user = await AuthApi.me();
          setUser(user);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            console.log('redirect');
            navigate('/login');
          } else if (error.response?.status === 403) {
            console.log('redirect');
            navigate('/pending-confirmation');
          }
        }
      }
    }
    checkAuth();
  }, [location]);

  return <Outlet />;
}

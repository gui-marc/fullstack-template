import { toast } from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';

import { logout } from '@/api/auth';
import { getRandomMessage } from '@/api/test';
import Badge from '@/components/utils/Badge';
import Button from '@/components/utils/Button';
import { useAuthStore } from '@/store/authStore';

export default function HomePage() {
  const {
    user,
    actions: { logout: storeLogout },
  } = useAuthStore();

  const navigate = useNavigate();

  const { data, isLoading, isFetching, refetch } = useQuery('random-message', getRandomMessage, {
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error('Request Failed, please check your api server');
      }
    },
  });

  const { mutate } = useMutation('logout', logout, {
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error('Request Failed, please check your api server');
      }
    },
    onSuccess: () => {
      toast.success('Logout success');
      storeLogout();
      navigate('/login');
    },
  });

  return (
    <main className="grid h-full place-items-center">
      <div className="text-center">
        <h1 className="mb-4 text-xl font-bold text-gray-950 dark:text-white">
          NestJS + ReactJS starter
        </h1>
        {data && (
          <Badge intent="primary" className="mt-1">
            {data}
          </Badge>
        )}
        <Button
          isLoading={isLoading || isFetching}
          onClick={() => refetch()}
          intent="secondary"
          size="sm"
          className="block mx-auto mt-4"
        >
          Randomize Text
        </Button>

        {user && (
          <p className="mt-16 text-gray-600 dark:text-gray-400">
            Hello <Badge>{user.email}</Badge>{' '}
            <Button intent="secondary" size="sm" onClick={() => mutate()}>
              Logout
            </Button>
          </p>
        )}
      </div>
    </main>
  );
}

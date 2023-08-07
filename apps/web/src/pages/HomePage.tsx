import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { getRandomMessage } from '@/api/test';
import Button from '@/components/utils/Button';
import { useAuthStore } from '@/store/auth';

export default function HomePage() {
  const { user } = useAuthStore();

  const { data, isLoading, isFetching, refetch } = useQuery('random-message', getRandomMessage, {
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error('Request Failed, please check your api server');
      }
    },
  });

  return (
    <main className="grid h-full place-items-center">
      <div className="text-center">
        {user && <p className="mb-3 text-gray-600 dark:text-gray-400">Hello {user.email}</p>}
        <h1 className="mb-4 text-xl font-bold text-gray-950 dark:text-white">
          NestJS + ReactJS starter
        </h1>
        {data && (
          <p className="px-2 py-1 mx-auto text-sm font-medium text-gray-600 bg-gray-100 border border-gray-200 rounded-md w-fit dark:text-gray-400 dark:bg-gray-900 dark:border-gray-800">
            {data}
          </p>
        )}
        <Button
          isLoading={isLoading || isFetching}
          onClick={() => refetch()}
          intent="secondary"
          size="sm"
          className="mx-auto mt-4"
        >
          Randomize Text
        </Button>
      </div>
    </main>
  );
}

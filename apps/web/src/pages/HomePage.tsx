import { useQuery } from 'react-query';

import { getRandomMessage } from '@/api/test';
import Button from '@/components/utils/Button';

export default function HomePage() {
  const { data, isLoading, isFetching, refetch } = useQuery('random-message', getRandomMessage);

  return (
    <main className="grid h-full place-items-center">
      <div className="text-center">
        <h1 className="mb-4 text-xl font-bold text-gray-950 dark:text-white">
          NestJS + ReactJS starter
        </h1>
        <p className="px-2 py-1 mx-auto text-sm font-medium text-gray-600 bg-gray-100 border border-gray-200 rounded-md w-fit dark:text-gray-400 dark:bg-gray-900 dark:border-gray-800">
          {data}
        </p>
        <Button
          disabled={isLoading || isFetching}
          onClick={() => refetch()}
          intent="secondary"
          className="mx-auto mt-4"
          size="sm"
        >
          Randomize Text
        </Button>
      </div>
    </main>
  );
}

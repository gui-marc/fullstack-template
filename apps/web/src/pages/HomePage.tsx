import Button from '@/components/utils/Button';

import { useTestStore } from '../store/testStore';

export default function HomePage() {
  const {
    test,
    actions: { randomize },
  } = useTestStore();

  return (
    <main className="grid place-items-center h-full">
      <div className="text-center">
        <h1 className="text-xl mb-4 font-bold text-gray-950 dark:text-white">
          NestJS + ReactJS starter
        </h1>
        <p className="px-2 w-fit mx-auto py-1 text-gray-600 dark:text-gray-400 text-sm font-medium bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md">
          {test}
        </p>
        <Button onClick={randomize} intent="secondary" className="mx-auto mt-4" size="sm">
          Randomize Text
        </Button>
      </div>
    </main>
  );
}

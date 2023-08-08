import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Link, useSearchParams } from 'react-router-dom';

import { AxiosError } from 'axios';

import { confirm } from '@/api/auth';
import Spinner from '@/components/utils/Spinner';

export default function ConfirmPage() {
  const { mutate, isLoading } = useMutation('confirm', confirm, {
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    },
    onSuccess() {
      toast.success('Account confirmed');
    },
  });

  const [query] = useSearchParams();

  useEffect(() => {
    console.log({ token: query.get('token') });
    mutate(query.get('token') ?? '');
  }, []);

  return (
    <main className="grid h-full place-items-center">
      <div className="text-center">
        {isLoading && <Spinner />}
        <h1 className="text-lg font-medium text-white">
          {isLoading ? 'Confirming your account...' : 'Account Confirmed'}
        </h1>
        <p>Thanks for joining us</p>
        <Link className="text-primary-500" to={'/app'}>
          Go to App
        </Link>
      </div>
    </main>
  );
}

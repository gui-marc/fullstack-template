import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Navigate, useSearchParams } from 'react-router-dom';

import { AxiosError } from 'axios';

import { confirm } from '@/api/auth';
import ButtonLink from '@/components/utils/ButtonLink';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/utils/card';

export default function ConfirmPage() {
  const { mutate } = useMutation('confirm', confirm, {
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error('Something went wrong');
      }
    },
    onSuccess() {
      toast.success('Account confirmed');
    },
  });

  const [query] = useSearchParams();

  const token = query.get('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    console.log({ token: token! });
    mutate(token! ?? '');
  }, []);

  return (
    <main className="grid h-full px-6 place-items-center">
      <Card className="max-w-[380px] w-full">
        <CardHeader>
          <CardTitle>Account activated</CardTitle>
          <CardDescription>Thanks for joining us</CardDescription>
        </CardHeader>

        <CardFooter>
          <ButtonLink className="w-full" to={'/app'}>
            Go to App
          </ButtonLink>
        </CardFooter>
      </Card>
    </main>
  );
}

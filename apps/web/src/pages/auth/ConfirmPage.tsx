import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { AxiosError } from 'axios';

import { confirm } from '@/api/auth';
import ButtonLink from '@/components/utils/ButtonLink';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/utils/card';

export default function ConfirmPage() {
  // const navigate = useNavigate();

  const { mutate } = useMutation('confirm', confirm, {
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

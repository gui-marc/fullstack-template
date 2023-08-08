import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { sendConfirmationEmail } from '@/api/auth';
import Button from '@/components/utils/Button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/utils/card';
import { useAuthStore } from '@/store/auth';

export default function PendingConfirmationPage() {
  const { user } = useAuthStore();

  const { mutate, isLoading } = useMutation('resendConfirmationEmail', sendConfirmationEmail, {
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
      console.error(error);
    },
    onSuccess: () => {
      toast.success('Email sent, please check your inbox');
    },
  });

  return (
    <main className="grid h-full p-4 px-6 place-items-center">
      <Card className="max-w-[380px] w-full">
        <CardHeader>
          <CardTitle>Confirm your account</CardTitle>
          <CardDescription>
            The instructions have been sent to the email <span>{user?.email}</span>
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button
            onClick={() => mutate()}
            isLoading={isLoading}
            intent="secondary"
            className="w-full"
          >
            Send the email again
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

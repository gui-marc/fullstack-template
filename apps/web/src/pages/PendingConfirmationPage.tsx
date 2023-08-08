import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';

import { AxiosError } from 'axios';

import { sendConfirmationEmail } from '@/api/auth';
import Button from '@/components/utils/Button';
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
    <main className="grid h-full p-4 place-items-center">
      <div className="space-y-4 text-center">
        <h1 className="text-lg font-medium text-gray-900 dark:text-white">
          Please confirm your account{' '}
        </h1>
        <p>
          The instructions have been sent to the email <span>{user?.email}</span>.
        </p>
        <Button
          onClick={() => mutate()}
          isLoading={isLoading}
          intent="secondary"
          className="mx-auto"
        >
          Send the email again
        </Button>
      </div>
    </main>
  );
}

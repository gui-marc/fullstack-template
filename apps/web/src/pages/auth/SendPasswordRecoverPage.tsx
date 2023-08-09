import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';

import { sendPasswordRecoverEmail } from '@/api/auth';
import BackButton from '@/components/utils/BackButton';
import Button from '@/components/utils/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPreHeader,
  CardTitle,
} from '@/components/utils/card';
import Input from '@/components/utils/Input';
import { SendPasswordRecoverDto, sendPaswordRecoverSchema } from '@/schemas/auth';

export default function PasswordRecoverPage() {
  const { mutate, isLoading } = useMutation('send-recover-password', sendPasswordRecoverEmail, {
    onSuccess() {
      toast.success('Email sent successfuly');
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error('Something went wrong');
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendPasswordRecoverDto>({
    resolver: zodResolver(sendPaswordRecoverSchema),
  });

  function submit(data: SendPasswordRecoverDto) {
    mutate(data);
  }

  return (
    <main className="grid h-full place-items-center">
      <Card className="max-w-[380px] w-full">
        <form onSubmit={handleSubmit(submit)}>
          <CardPreHeader>
            <BackButton to="/login">Back to Login</BackButton>
          </CardPreHeader>
          <CardHeader>
            <CardTitle>Recover your password</CardTitle>
            <CardDescription>Enter your email to get recover instructions</CardDescription>
          </CardHeader>

          <CardContent>
            <Input
              type="email"
              label="Your email"
              description="The instructions will be sent to this email"
              placeholder="example@email.com"
              errorMessage={errors.email?.message}
              {...register('email')}
            />
          </CardContent>

          <CardFooter>
            <Button isLoading={isLoading} className="w-full">
              Send recover instructions
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}

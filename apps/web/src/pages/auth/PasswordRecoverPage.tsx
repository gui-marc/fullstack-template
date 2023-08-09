import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';

import { recoverPassword } from '@/api/auth';
import Button from '@/components/utils/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/utils/card';
import Input from '@/components/utils/Input';
import { ChangePasswordSchema, changePasswordSchema } from '@/schemas/auth';

export default function PasswordRecoverPage() {
  const [query] = useSearchParams();

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation('recover-password', recoverPassword, {
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error('Something went wrong');
      }
    },
    onSuccess() {
      toast.success('Password reseted successfuly');
      navigate('/login');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const token = query.get('token');

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  function submit(data: ChangePasswordSchema) {
    mutate({ ...data, token: token! });
  }

  return (
    <main className="grid h-full place-items-center">
      <Card className="max-w-[380px] w-full">
        <form onSubmit={handleSubmit(submit)}>
          <CardHeader>
            <CardTitle>Recover your password</CardTitle>
            <CardDescription>Type your new password</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Input
              label="New Password"
              placeholder="Type your new password"
              description="Password must be at least 8 characters long"
              type="password"
              errorMessage={errors.password?.message}
              {...register('password')}
            />
            <Input
              label="Confirm New Password"
              placeholder="Type your new password"
              type="password"
              errorMessage={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </CardContent>

          <CardFooter>
            <Button isLoading={isLoading} className="w-full">
              Change my password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}

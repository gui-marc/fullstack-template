import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';

import * as AuthApi from '@/api/auth';
import Button from '@/components/utils/Button';
import ButtonLink from '@/components/utils/ButtonLink';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/utils/card';
import Input from '@/components/utils/Input';
import { RegisterDto, registerSchema } from '@/schemas/auth';
import { useAuthStore } from '@/store/auth';

export default function RegisterPage() {
  const { isLoading, mutate } = useMutation('register', AuthApi.register, {
    onSuccess: ({ accessToken, refreshToken, user }) => {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);
      navigate('/app');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        console.error(error);
      }
    },
  });

  const navigate = useNavigate();

  const {
    actions: { setAccessToken, setRefreshToken, setUser },
  } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterDto) {
    mutate(data);
  }

  return (
    <main className="grid h-full px-6 place-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Type your email and password to register</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Input
              label="Email"
              type="email"
              placeholder="Your email"
              errorMessage={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Your password"
              errorMessage={errors.password?.message}
              description="Password must be at least 8 characters long"
              {...register('password')}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              errorMessage={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <ButtonLink intent="secondary" to="/login">
              Login
            </ButtonLink>
            <Button isLoading={isLoading}>Register</Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}

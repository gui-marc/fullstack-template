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
import Link from '@/components/utils/Link';
import { LoginDto, loginSchema } from '@/schemas/auth';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const { isLoading, mutate } = useMutation('login', AuthApi.login, {
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
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginDto) {
    mutate(data);
  }

  return (
    <main className="grid h-full px-6 place-items-center">
      <form className="max-w-[380px] w-full" onSubmit={handleSubmit(onSubmit)}>
        <Card className="max-w-[380px] w-full">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your email and password to login</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Input
              label="Email"
              placeholder="email@email.com"
              type="email"
              errorMessage={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              placeholder="Type your password"
              type="password"
              errorMessage={errors.password?.message}
              {...register('password')}
            />
            <div className="flex items-center">
              <Link className="text-sm" to="/password-recover">
                Forgot my password
              </Link>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <ButtonLink intent="secondary" to="/register">
              Register
            </ButtonLink>
            <Button isLoading={isLoading} intent="primary">
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';

import * as AuthApi from '@/api/auth';
import Button from '@/components/utils/Button';
import Input from '@/components/utils/Input';
import { LoginDto, loginSchema } from '@/schemas/auth';
import { useAuthStore } from '@/store/auth';

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

  const { register, handleSubmit } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginDto) {
    mutate(data);
  }

  return (
    <main className="grid h-full place-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <Input placeholder="Your email" type="email" {...register('email')} />
        <Input placeholder="Your password" type="password" {...register('password')} />
        <Button isLoading={isLoading} intent="primary" className="w-full">
          Login
        </Button>
        <p className="text-center">
          Doesn&apos;t have an account?{' '}
          <Link className="text-primary-500" to="/register">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}

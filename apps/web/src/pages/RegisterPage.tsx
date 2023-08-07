import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';

import * as AuthApi from '@/api/auth';
import Button from '@/components/utils/Button';
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

  const { register, handleSubmit } = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterDto) {
    mutate(data);
  }

  return (
    <main className="grid h-full place-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <Input type="email" placeholder="Your email" {...register('email')} />
        <Input type="password" placeholder="Your password" {...register('password')} />
        <Input
          type="password"
          placeholder="Confirm your password"
          {...register('confirmPassword')}
        />
        <Button isLoading={isLoading} className="w-full">
          Register
        </Button>
        <p className="text-center">
          Already have an account?{' '}
          <Link className="text-primary-500" to="/login">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

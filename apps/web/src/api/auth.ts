import { ChangePasswordSchema, LoginDto, RegisterDto } from '@/schemas/auth';

import client from './client';

const BASE_URL = '/auth';

export async function login(dto: LoginDto) {
  const response = await client.post(`${BASE_URL}/login`, dto);
  return response.data;
}

export async function register(dto: RegisterDto) {
  const response = await client.post(`${BASE_URL}/register`, dto);
  return response.data;
}

export async function logout() {
  await client.get(`${BASE_URL}/logout`);
}

export async function refresh(refreshToken: string) {
  const response = await client.get(`${BASE_URL}/refresh`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return response.data;
}

export async function me() {
  const response = await client.get(`${BASE_URL}/me`);
  return response.data;
}

export async function confirm(confirmToken: string) {
  const response = await client.get(`${BASE_URL}/confirm-account`, {
    params: {
      token: confirmToken,
    },
  });
  return response.data;
}

export async function sendConfirmationEmail() {
  await client.get(`${BASE_URL}/send-confirm-email`);
}

export async function sendPasswordRecoverEmail({ email }: { email: string }) {
  await client.post(`${BASE_URL}/send-password-recover-email`, { email });
}

export async function recoverPassword({
  confirmPassword,
  password,
  token,
}: ChangePasswordSchema & { token: string }) {
  const response = await client.post(
    `${BASE_URL}/recover-password`,
    { confirmPassword, password },
    {
      params: { token },
    },
  );
  return response.data;
}

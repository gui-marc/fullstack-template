import { LoginDto, RegisterDto } from '@/schemas/auth';

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

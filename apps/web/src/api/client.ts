import axios from 'axios';

import { authStore, getAuthLocalState } from '@/store/auth';

import { refresh } from './auth';

const client = axios.create({
  baseURL: 'api',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuthLocalState();
    if (config.url !== '/auth/refresh' && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async (error) => {
    if (error.response.status === 401) {
      const {
        refreshToken,
        actions: { setAccessToken, setRefreshToken, setUser },
      } = authStore.getState();

      if (refreshToken) {
        const res = await refresh(refreshToken);
        setAccessToken(res.accessToken);
        setRefreshToken(res.refreshToken);
        setUser(res.user);
        return client.request(error.config);
      }

      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default client;

import { create } from 'zustand';

import { User } from '@/types';

const LOCALSTORAGE_KEY = 'auth';

function updateLocalStorage(state: Omit<AuthStore, 'actions'>) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
}

export function getAuthLocalState(): Omit<AuthStore, 'actions'> {
  const state = localStorage.getItem(LOCALSTORAGE_KEY);
  if (state) {
    return JSON.parse(state);
  }
  return {
    accessToken: null,
    refreshToken: null,
    user: null,
  };
}

type AuthStore = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  actions: {
    setAccessToken(accessToken: string): void;
    setRefreshToken(refreshToken: string): void;
    setUser(user: User): void;
    logout(): void;
  };
};

export const authStore = create<AuthStore>((set, get) => {
  const intialState = getAuthLocalState();

  return {
    accessToken: intialState.accessToken,
    refreshToken: intialState.refreshToken,
    user: intialState.user,
    actions: {
      setAccessToken(accessToken) {
        updateLocalStorage({ accessToken, refreshToken: get().refreshToken, user: get().user });
        set({ accessToken });
      },
      setRefreshToken(refreshToken) {
        updateLocalStorage({ accessToken: get().accessToken, refreshToken, user: get().user });
        set({ refreshToken });
      },
      setUser(user) {
        updateLocalStorage({
          accessToken: get().accessToken,
          refreshToken: get().refreshToken,
          user,
        });
        set({ user });
      },
      logout() {
        updateLocalStorage({ accessToken: null, refreshToken: null, user: null });
        set({ accessToken: null, refreshToken: null, user: null });
      },
    },
  };
});

export const useAuthStore = authStore;

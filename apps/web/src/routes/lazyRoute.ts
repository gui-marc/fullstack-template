import { lazy } from 'react';

import { progressStore } from '@/store/progressStore';

const lazyRoute = (path: string) =>
  lazy(
    () =>
      new Promise((resolve, reject) => {
        const {
          actions: { start, complete },
        } = progressStore.getState();

        start();

        import(/* @vite-ignore */ path)
          .then((module) => {
            setTimeout(() => {
              resolve(module);
              complete();
            }, 150);
          })
          .catch((err) => {
            complete();
            reject(err);
          });
      }),
  );

export default lazyRoute;

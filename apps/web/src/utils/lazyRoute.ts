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

        import(path)
          .then((module) => {
            console.log('finished loading route ', path);
            complete();
            resolve(module);
          })
          .catch((err) => {
            complete();
            reject(err);
          });
      }),
  );

export default lazyRoute;

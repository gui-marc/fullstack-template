import sleep from '@/utils/sleep';

import client from './client';

const BASE_URL = '';

export async function getRandomMessage() {
  await sleep(1000);
  const response = await client.get<string>(`${BASE_URL}/random-message`);
  return response.data;
}

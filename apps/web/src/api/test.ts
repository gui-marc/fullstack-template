import client from './client';

const BASE_URL = '';

export async function getRandomMessage() {
  const response = await client.get<string>(`${BASE_URL}/random-message`);
  return response.data;
}

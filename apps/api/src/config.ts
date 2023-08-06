import { z } from 'zod';

const configSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.number().default(3000),
  DATABASE_URL: z.string().url(),
});

export type Config = z.infer<typeof configSchema>;

export default configSchema;

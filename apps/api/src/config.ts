import { z } from 'zod';

const configSchema = z.object({
  // App
  APP_URL: z.string().url().default('http://localhost:5173'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().default('3000'),
  // Prisma
  DATABASE_URL: z.string().url(),
  // Redis
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().default('6379'),
  // SMTP
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_FROM: z.string(),
  SMTP_SECURE: z.enum(['true', 'false']).default('false'),
  SMTP_USER: z.string().default(''),
  SMTP_PASS: z.string().default(''),
  // JWT
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_PASSWORD_RECOVERY_TOKEN_SECRET: z.string(),
  JWT_ACCOUNT_CONFIRMATION_TOKEN_SECRET: z.string(),
});

export type Config = z.infer<typeof configSchema>;

export default configSchema;

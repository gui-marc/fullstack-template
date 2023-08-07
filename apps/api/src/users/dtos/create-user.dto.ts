import { z } from 'zod';

export const createUserDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;

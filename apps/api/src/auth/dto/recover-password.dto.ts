import { z } from 'zod';

export const sendPaswordRecoverSchema = z.object({
  email: z.string().email(),
});

export type SendPasswordRecoverDto = z.infer<typeof sendPaswordRecoverSchema>;

export const recoverPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export type RecoverPasswordDto = z.infer<typeof recoverPasswordSchema>;

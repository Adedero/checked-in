import * as z from 'zod';
import { MIN_PASSWORD_LENGTH } from '../utils/constants';

export const passwordSchema = z
  .string('Password is required')
  .min(
    MIN_PASSWORD_LENGTH,
    `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
  )
  .refine(
    (value) => /(?=.*[A-Z])/.test(value),
    'Password must contain at least one uppercase letter'
  )
  .refine(
    (value) => /(?=.*[a-z])/.test(value),
    'Password must contain at least one lowercase letter'
  )
  .refine(
    (value) => /(?=.*\d)/.test(value),
    'Password must contain at least one number'
  )
  .refine(
    (value) => /(?=.*[!@#$%^&*])/.test(value),
    'Password must contain at least one special character'
  );

export type PasswordSchema = z.infer<typeof passwordSchema>;

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string('Password confirmation is required')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

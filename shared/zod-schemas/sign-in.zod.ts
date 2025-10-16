import * as z from 'zod';
import { passwordSchema } from './password.zod';

export const signInSchema = z.object({
  email: z.email('Invalid email'),
  password: passwordSchema,
  rememberMe: z.boolean()
});

export type SignInSchema = z.infer<typeof signInSchema>;

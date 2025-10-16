import * as z from 'zod';
import { passwordSchema } from './password.zod';

export const registrationSchema = z.object({
  firstName: z
    .string('First name is required')
    .nonempty('First name is required')
    .min(2, 'First name is too short'),
  lastName: z
    .string('Last name is required')
    .nonempty('Last name is required')
    .min(2, 'Last name is too short'),
  email: z.email('Invalid email'),
  password: passwordSchema,
  hasAgreedToTerms: z.literal(
    true,
    'You must agree to the terms of use and the privacy policy'
  )
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;

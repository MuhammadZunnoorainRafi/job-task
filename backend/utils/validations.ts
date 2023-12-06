import { z } from 'zod';

export const signUpValidation = z.object({
  name: z.string().min(1, 'Enter your name'),
  email: z.string().min(1, 'Enter your email').email('Invalid email address'),
  password: z
    .string({
      required_error: 'Enter your password',
    })
    .min(6, 'Password must be above 5 characters'),
});

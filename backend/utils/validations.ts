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

export const signInValidation = z.object({
  email: z.string().min(1, 'Enter your email').email('Invalid email address'),
  password: z
    .string({
      required_error: 'Enter your password',
    })
    .min(6, 'Password must be above 5 characters'),
});

export const taskValidation = z.object({
  title: z.string().min(1, 'Enter title'),
  description: z.string().min(1, 'Enter title'),
});

export const taskUpdateValidation = z.object({
  id: z.string().min(1, 'Enter Id'),
  title: z.string().min(1, 'Enter title'),
  description: z.string().min(1, 'Enter title'),
});

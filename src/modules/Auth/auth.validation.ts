import { z } from 'zod';

const loginValidationSchema = z.object({
  email: z.string({ required_error: 'Email is11 required' }).email(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters long'),
});

export const authValidation = {
  loginValidationSchema,
};

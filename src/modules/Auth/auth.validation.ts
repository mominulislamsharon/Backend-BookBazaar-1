import { z } from 'zod';

const loginValidationSchema = z.object({
  email: z.string({ required_error: 'Email is11 required' }).email(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters long'),
});

const forgetPasswordValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
});

const resetPasswordValidationSchema = z.object({
  id: z.string({ required_error: 'Id sent is email check now' }),
  token: z.string({ required_error: 'Token is email check now' }),
  password: z.string({ required_error: 'Password is update' }),
});

export const authValidation = {
  loginValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};

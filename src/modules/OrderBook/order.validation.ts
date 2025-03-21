import { z } from 'zod';

const orderSchema = z.object({
  product: z.string().min(1, { message: 'Product ID is required' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

const orderUpdateValidationSchema = z.object({
  product: z.string().min(1, { message: 'Product ID is required' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

export const orderValidation = {
  orderSchema,
  orderUpdateValidationSchema,
};

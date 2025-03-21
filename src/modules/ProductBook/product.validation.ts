import { z } from "zod";



const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  price: z.number().min(1, 'Price is required'),
  category: z.enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious']),
  description: z.string(),
  quantity: z.number().min(1, 'Quantity is required'),
  inStock: z.boolean().optional(),
})

const updateProductSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  author: z.string().min(1, 'Author is required').optional(),
  price: z.number().min(1, 'Price is required').optional(),
  category: z.enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious']),
  description: z.string().optional(),
  quantity: z.number().min(1, 'Quantity is required').optional(),
  inStock: z.boolean().optional(),
})

export const productValidation = {
  productSchema,
  updateProductSchema,
};
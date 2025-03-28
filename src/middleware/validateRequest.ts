import { AnyZodObject } from 'zod';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../Utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.price) req.body.price = Number(req.body.price);
    if (req.body.quantity) req.body.quantity = Number(req.body.quantity);
    await schema.parseAsync(req.body);
    next();
  });
};

export default validateRequest;

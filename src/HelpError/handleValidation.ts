/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleValidationError = (err: any, res: Response) => {
  const issues = Object.values(err.errors).map((item: any) => {
    return {
      name: item.name,
      path: item.path,
      message: item.message,
    };
  });
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: 'Validation error',
    statusCode: StatusCodes.BAD_REQUEST,
    error: issues,
    stack: err.stack ? err.stack : null,
  });
};

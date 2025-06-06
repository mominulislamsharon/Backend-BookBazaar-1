/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleZodError = (err: any, res: Response) => {
  const issues = err.issues.map((item: any) => {
    return {
      path: item.path.join(' > '),
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

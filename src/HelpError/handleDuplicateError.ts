/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleDuplicateError = (err: any, res: Response) => {
  res.status(StatusCodes.CONFLICT).json({
    success: false,
    message: err.message,
    error: err,
    stack: err.stack ? err.stack : null,
  });
};

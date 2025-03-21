/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import { handleZodError } from '../HelpError/handleZodError';
import { handleCastError } from '../HelpError/handleCastError';
import { handleValidationError } from '../HelpError/handleValidation';
import { handleDuplicateError } from '../HelpError/handleDuplicateError';
import { handleError } from '../HelpError/handleError';

type ErrorMessage = {
  message: string;
  path: string | number;
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  const message = 'Something went wrong!';

  const errorSources: ErrorMessage[] = [
    {
      message: message,
      path: err?.path || '',
    },
  ];

  if (err.name && err.name === 'ZodError') {
    handleZodError(err, res);
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } else if (err?.code && err.code === 11000) {
    handleDuplicateError(err, res);
  } else if (err instanceof Error) {
    handleError(err, res);
  }
  // Log the error in the server's console
  res.status(statusCode).json({
    success: false,
    message,
    err,
    errorSources,
    stack: config.NODE_ENV === 'development' && err.stack ? err.stack : null,
  });
};

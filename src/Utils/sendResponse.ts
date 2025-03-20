import { Response } from 'express';

type TSuccessResponse<T> = {
  message: string;
  status: boolean;
  statusCode: number;
  data?: T;
};

const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  // Send response to client
  res.status(data.statusCode).json({
    message: data.message,
    status: true,
    data: data.data,
  });
};

export default sendResponse;

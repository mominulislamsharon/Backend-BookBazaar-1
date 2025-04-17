import { Request, Response } from 'express';
import { orderService } from './order.service';
import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

// create order
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await orderService.createOrderDB(req.body, user, req.ip!);

  sendResponse(res, {
    message: 'Order created successfully',
    status: true,
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

// verify payment
const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  console.log(order);

  sendResponse(res, {
    message: 'Order verified successfully',
    status: true,
    statusCode: StatusCodes.OK,
    data: order,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrders();
  sendResponse(res, {
    message: 'Orders retrieved successfully',
    status: true,
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await orderService.getSingleOrder(id);
  sendResponse(res, {
    message: 'Order retrieved successfully',
    status: true,
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await orderService.updateOrder(id, req.body);
  sendResponse(res, {
    message: 'Order updated successfully',
    status: true,
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await orderService.deleteOrder(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: 'Order deleted successfully',
    data: result,
  });
});

// create revenue

const calculateRevenue = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.calculateRevenueDB();

  sendResponse(res, {
    message: 'Revenue calculated successfully',
    status: true,
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const orderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  calculateRevenue,
  verifyPayment,
};

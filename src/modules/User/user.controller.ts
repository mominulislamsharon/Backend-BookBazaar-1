import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service';
import sendResponse from '../../Utils/sendResponse';
import catchAsync from '../../Utils/catchAsync';

const createAdmin = catchAsync(async (req, res) => {
  const adminData = req.body;
  const result = await userService.createAdminDB(adminData);
  sendResponse(res, {
    message: 'Admin created successfully',
    status: true,
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new Error('User ID not found in token');
  }

  const result = await userService.getUserProfile(userId);

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'User Profile retrieved successfully',
    data: result,
  });
});

const getSingleById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await userService.getSingleById(id);

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'User single successfully',
    data: result,
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result = await userService.updateProfilerUser(id, body);

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'Profile updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  await userService.deleteUser(id);

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'User deleted successfully',
    data: id,
  });
});

export const UserController = {
  createAdmin,
  getUserProfile,
  getSingleById,
  updateUserProfile,
  deleteUser,
};

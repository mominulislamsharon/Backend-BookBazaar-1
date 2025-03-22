import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../Utils/sendResponse';
import catchAsync from '../../Utils/catchAsync';
import { AuthService } from './auth.service';
import config from '../../config';

const register = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    status: true,
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);
  // const { refreshToken } = result;

  // res.cookie('refreshToken', refreshToken, {
  //   secure: config.NODE_ENV === 'production',
  //   httpOnly: true,
  //   sameSite: 'none',
  //   maxAge: 100 * 60 * 60 * 24 * 365,
  // });

  sendResponse(res, {
    status: true,
    message: 'Login successful',
    statusCode: StatusCodes.OK,
    data: { token: result.token },
  });
});

export const authController = {
  register,
  login,
  // refreshAccessToken,
};

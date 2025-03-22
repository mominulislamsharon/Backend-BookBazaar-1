import config from '../../config';
import { IUser } from '../User/user.interface';
import { User } from '../User/user.model';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';

const register = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  if (!user) {
    throw 'User not found';
  }

  const isPasswordValid = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordValid)
    throw new Error('Wrong Password!!! Tell me who are you');

  const jwtPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  // Generate Token

  const token = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  user.refreshToken = refreshToken;
  await user.save();

  const { password, ...remainData } = user.toObject();

  return { token, refreshToken, remainData };
};

const refreshToken = async (token: string) => {
  // Verify the refresh token
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);
  const { userId } = decoded;

  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Check if the refresh token matches

  if (user.refreshToken !== token) {
    throw new Error('Invalid refresh token');
  }

  // Generate new access token
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { accessToken, refreshToken };
};

export const AuthService = {
  register,
  login,
  refreshToken,
};

// // /* eslint-disable no-unused-vars */
// // /* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../Utils/catchAsync';
import { User } from '../modules/User/user.model';
import { TUserRole } from '../modules/User/user.interface';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('You are not authorized');
    }

    let decoded: JwtPayload;
    try {
      // Verify the token
      decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload & {
        userId: string;
        email: string;
        role: string;
      };
    } catch (error) {
      throw new Error('Unauthorized token');
    }

    const { userId, email, role } = decoded;

    // Check if the email exists in the token
    if (!email) {
      throw new Error('Email not found in token');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not foundddd');
    }

    // Check the role
    if (requiredRole.length && !requiredRole.includes(role)) {
      throw new Error('You are not authorized to perform this action');
    }

    req.user = { id: userId, email, role } as JwtPayload;
    next();
  });
};

export default auth;

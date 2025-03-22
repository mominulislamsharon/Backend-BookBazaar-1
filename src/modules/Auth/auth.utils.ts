import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

export const createToken = (
  jwtPayload: { userId: string | Types.ObjectId; role: string },
  secret: string,
  expiresIn: string,
) => {
  const payload = {
    userId: jwtPayload.userId.toString(),
    role: jwtPayload.role,
  };
  
  return jwt.sign(payload, secret, {
    expiresIn: '20d',
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as { userId: string; role: string };
};

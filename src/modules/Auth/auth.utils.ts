import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

export const createToken = (
  payload: object,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, config.jwt_secret as string, { expiresIn: '20d' });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload & {
    userId: string;
    email: string;
    role: string;
  };
};

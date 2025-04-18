import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const createToken = (
  payload: object,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};


export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as JwtPayload & {
      userId: string;
      email: string;
      role: string;
    };
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};


import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from '../User/user.validation';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';

const router = Router();

// middleware
router.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  authController.register,
);

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.login,
);
router.post('/refresh-token', authController.refreshAccessToken);

router.post('/forget-password', validateRequest(authValidation.forgetPasswordValidationSchema), authController.forgetPassword)

router.post('/reset-password', validateRequest(authValidation.resetPasswordValidationSchema), authController.resetPassword)

export const authRouters = router;

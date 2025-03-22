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
// router.post('/refresh-token', authController.refreshAccessToken);

export const authRouters = router;

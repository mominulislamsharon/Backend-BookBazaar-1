import express from 'express';
import { UserController } from './user.controller';
import { UserValidation,} from './user.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

//user routes

router.get('/', 
  // auth(USER_ROLE.user),
   UserController.getUserProfile);

router.get(
  '/:id',
  // auth(USER_ROLE.user),

  UserController.getSingleById,
);

router.patch(
  '/:id',
  //  auth(USER_ROLE.user),
  validateRequest(UserValidation.userUpdateValidationSchema),
  UserController.updateUserProfile,
);

router.delete(
  '/:id',
  //  auth(USER_ROLE.admin),
  UserController.deleteUser,
);

export const userRoutes = router;

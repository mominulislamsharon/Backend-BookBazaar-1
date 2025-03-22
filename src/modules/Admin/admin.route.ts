import express from 'express';
import { adminController } from './admin.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from '../User/user.validation';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middleware/auth';

const router = express.Router();

// Get all admins
router.get('/', auth(USER_ROLE.admin), adminController.getAllAdmins);

// Get a single admin by ID
router.get('/:id', auth(USER_ROLE.admin), adminController.getSingleAdmin);

// Update an admin by ID
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.userUpdateValidationSchema),
  adminController.updateAdmin,
);

// Delete an admin by ID
router.delete('/:id', auth(USER_ROLE.admin), adminController.deleteAdmin);

export const AdminRoutes = router;

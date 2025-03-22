import { Router } from 'express';
import { orderController } from './order.controller';
import validateRequest from '../../middleware/validateRequest';
import { orderValidation } from './order.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(orderValidation.orderSchema),
  orderController.createOrder,
);
router.get('/', auth(USER_ROLE.user), orderController.getAllOrders);

router.get('/:id', auth(USER_ROLE.user), orderController.getSingleOrder);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(orderValidation.orderUpdateValidationSchema),
  orderController.updateOrder,
);

router.delete('/:id', auth(USER_ROLE.admin), orderController.deleteOrder);

// order revenue routes
router.get('/revenue', auth(USER_ROLE.admin), orderController.calculateRevenue);

export const OrdersRoutes = router;

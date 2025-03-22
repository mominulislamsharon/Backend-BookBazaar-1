import { Router } from 'express';
import { userRoutes } from '../User/user.route';
import { ProductRoutes } from '../ProductBook/product.route';
import { OrdersRoutes } from '../OrderBook/order.route';
import { authRouters } from '../Auth/auth.route';

const router = Router();

const routeRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/admins',
    route: userRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrdersRoutes,
  },
  {
    path: '/auth',
    route: authRouters,
  },
];

routeRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

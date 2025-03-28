import express, { NextFunction, Request, Response } from 'express';
import { ProductController } from './product.controller';
import validateRequest from '../../middleware/validateRequest';
import { productValidation } from './product.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { upload } from '../../Utils/sendImages';

const router = express.Router();
// CREATE book
router.post(
  '/',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(productValidation.productSchema),
  ProductController.createProduct,
);

// get all books
router.get('/', ProductController.getAllbooks);

// get special book id
router.get('/:productId', ProductController.getSingleBook);

// updata book
router.put(
  '/:productId',
  auth(USER_ROLE.admin),
  validateRequest(productValidation.updateProductSchema),
  ProductController.updateBook,
);

// delete book
router.delete(
  '/:productId',
  auth(USER_ROLE.admin),
  ProductController.deleteBook,
);

export const ProductRoutes = router;

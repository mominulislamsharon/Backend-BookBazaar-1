import { ProductModel } from '../ProductBook/product.model';
import { IOrder } from './order.interface';
import OrderModel from './order.model';

// create an order
const createOrderDB = async (receivedOrder: IOrder) => {
  const productDetails = await ProductModel.findById(receivedOrder.product);

  if (!productDetails) throw new Error('Product not found');

  if (productDetails.quantity < receivedOrder.quantity)
    throw new Error('Insufficient stock');

  productDetails.quantity -= receivedOrder.quantity;
  productDetails.inStock = productDetails.quantity > 0;
  await productDetails.save();

  receivedOrder.totalPrice = productDetails.price * receivedOrder.quantity;

  receivedOrder.status = 'Pending';

  return await new OrderModel(receivedOrder).save();
};

const getAllOrders = async () => {
  const result = await OrderModel.find({}).populate('product');
  return result;
};

const getSingleOrder = async (id: string) => {
  const result = await OrderModel.findById(id).populate('product');
  return result;
};

const updateOrder = async (id: string, payload: Partial<IOrder>) => {
  const order = await OrderModel.findById(id).populate('product');
  if (!order) {
    throw new Error('Order not found');
  }

  const product = await ProductModel.findById(order.product);
  if (!product) {
    throw new Error('Product not found');
  }

  if (payload.quantity !== undefined) {
    const quantityDifference = payload.quantity - order.quantity;

    if (product.quantity < quantityDifference) {
      throw new Error('Insufficient stock');
    }

    product.quantity -= quantityDifference;
    product.inStock = product.quantity > 0;
    await product.save();

    payload.totalPrice = product.price * payload.quantity;
  }

  const result = await OrderModel.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('product');
  return result;
};

const deleteOrder = async (id: string) => {
  const result = await OrderModel.findByIdAndDelete(id);
  return result;
};

// calculateRevenue
const calculateRevenueDB = async () => {
  const dataRevenue = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  const result = dataRevenue.length > 0 ? dataRevenue[0].totalRevenue : 0;
  return { totalRevenue: result };
};

export const orderService = {
  createOrderDB,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  calculateRevenueDB,
};

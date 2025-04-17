import { ProductModel } from '../ProductBook/product.model';
import { IUser } from '../User/user.interface';
import { IOrder } from './order.interface';
import OrderModel from './order.model';
import { orderUtils } from './order.utils';

// create an order
const createOrderDB = async (
  receivedOrder: IOrder,
  user: IUser,
  client_ip: string,
) => {
  const productDetails = await ProductModel.findById(receivedOrder.product);

  if (!productDetails) throw new Error('Product not found');

  if (productDetails.quantity < receivedOrder.quantity)
    throw new Error('Insufficient stock');

  productDetails.quantity -= receivedOrder.quantity;
  productDetails.inStock = productDetails.quantity > 0;
  await productDetails.save();

  receivedOrder.totalPrice = productDetails.price * receivedOrder.quantity;

  receivedOrder.status = 'Pending';

  // payment process

  let order = new OrderModel(receivedOrder);
  await order.save();

  const shurjopayPayload = {
    amount: order.totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user?.name || 'Unknown',
    customer_email: user.email,
    customer_phone: 'N/a',
    customer_address: 'N/a',
    customer_city: 'N/a',
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsy(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsy(order_id);

  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  await OrderModel.findOneAndUpdate();

  return verifiedPayment;
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
  verifyPayment,
};

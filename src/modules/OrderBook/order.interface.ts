import { Document, Types } from 'mongoose';

export type Status = 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';

export interface IOrder extends Document {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: Status;
}

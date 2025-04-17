import { Document, Types } from 'mongoose';

export type Status = 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';

export interface IOrder extends Document {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: Status;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
}

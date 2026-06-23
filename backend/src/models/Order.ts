import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  id: string;
  date: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      images: string[];
      sku: string;
      category: string;
    };
    quantity: number;
  }>;
  billingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    phone: string;
    email: string;
  };
  userId?: string;
}

const OrderSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending' 
  },
  items: [
    {
      product: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        images: { type: [String], default: [] },
        sku: { type: String, required: true },
        category: { type: String, required: true }
      },
      quantity: { type: Number, required: true }
    }
  ],
  billingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

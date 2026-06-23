import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  images: string[];
  sku: string;
  category: string;
  stock: number;
  featured?: boolean;
  bestSeller?: boolean;
  trending?: boolean;
}

const ProductSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 0 },
  description: { type: String, required: true },
  images: { type: [String], default: [] },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  featured: { type: Boolean, default: false },
  bestSeller: { type: Boolean, default: false },
  trending: { type: Boolean, default: false }
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

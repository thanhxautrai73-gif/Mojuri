import type { NextApiResponse } from 'next';
import { connectDB } from '../../../utils/db';
import Product from '../../../models/Product';
import { runCors, withAdmin } from '../../../middleware/auth';
import type { AuthenticatedRequest } from '../../../middleware/auth';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  await runCors(req, res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  try {
    await connectDB();

    // Utility to find product by id (slug) or MongoDB ObjectId
    const findProduct = async () => {
      let product = await Product.findOne({ id });
      if (!product && typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findById(id);
      }
      return product;
    };

    const product = await findProduct();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.method === 'GET') {
      return res.status(200).json(product);
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      return withAdmin(req, res, async () => {
        const { name, price, originalPrice, description, images, sku, category, stock, featured, bestSeller, trending } = req.body;

        if (sku && sku !== product.sku) {
          const existingSku = await Product.findOne({ sku });
          if (existingSku) {
            return res.status(400).json({ message: 'A product with this SKU already exists' });
          }
          product.sku = sku;
        }

        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = Number(price);
        if (originalPrice !== undefined) product.originalPrice = originalPrice ? Number(originalPrice) : undefined;
        if (description !== undefined) product.description = description;
        if (images !== undefined) product.images = images;
        if (category !== undefined) product.category = category;
        if (stock !== undefined) product.stock = Number(stock);
        if (featured !== undefined) product.featured = !!featured;
        if (bestSeller !== undefined) product.bestSeller = !!bestSeller;
        if (trending !== undefined) product.trending = !!trending;

        await product.save();
        return res.status(200).json({ message: 'Product updated successfully', product });
      });
    }

    if (req.method === 'DELETE') {
      return withAdmin(req, res, async () => {
        await Product.deleteOne({ _id: product._id });
        return res.status(200).json({ message: 'Product deleted successfully' });
      });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });

  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

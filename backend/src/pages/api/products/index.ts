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

  try {
    await connectDB();

    if (req.method === 'GET') {
      const { category, q, minPrice, maxPrice, page = 1, limit = 12 } = req.query;

      const queryObj: any = {};

      if (category) {
        queryObj.category = category;
      }

      if (q) {
        queryObj.name = { $regex: q, $options: 'i' };
      }

      if (minPrice || maxPrice) {
        queryObj.price = {};
        if (minPrice) queryObj.price.$gte = Number(minPrice);
        if (maxPrice) queryObj.price.$lte = Number(maxPrice);
      }

      const pageNum = Number(page);
      const limitNum = Number(limit);
      const skip = (pageNum - 1) * limitNum;

      const products = await Product.find(queryObj)
        .skip(skip)
        .limit(limitNum);

      const total = await Product.countDocuments(queryObj);

      return res.status(200).json({
        products,
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum)
      });
    }

    if (req.method === 'POST') {
      return withAdmin(req, res, async () => {
        const { name, price, originalPrice, description, images, sku, category, stock, featured, bestSeller, trending } = req.body;

        if (!name || !price || !description || !sku || !category || stock === undefined) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if SKU exists
        const existingSku = await Product.findOne({ sku });
        if (existingSku) {
          return res.status(400).json({ message: 'A product with this SKU already exists' });
        }

        // Generate ID slug
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        let finalId = slug;
        let counter = 1;
        while (await Product.findOne({ id: finalId })) {
          finalId = `${slug}-${counter}`;
          counter++;
        }

        const newProduct = await Product.create({
          id: finalId,
          name,
          price: Number(price),
          originalPrice: originalPrice ? Number(originalPrice) : undefined,
          description,
          images: images || [],
          sku,
          category,
          stock: Number(stock),
          featured: !!featured,
          bestSeller: !!bestSeller,
          trending: !!trending
        });

        return res.status(201).json({ message: 'Product created successfully', product: newProduct });
      });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });

  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

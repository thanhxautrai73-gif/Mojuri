import type { NextApiResponse } from 'next';
import { connectDB } from '../../../utils/db';
import Category from '../../../models/Category';
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
      const categories = await Category.find({});
      return res.status(200).json(categories);
    }

    if (req.method === 'POST') {
      return withAdmin(req, res, async () => {
        const { name } = req.body;
        if (!name) {
          return res.status(400).json({ message: 'Category name is required' });
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
          return res.status(400).json({ message: 'Category already exists' });
        }

        const newCategory = await Category.create({ name });
        return res.status(201).json({ message: 'Category created successfully', category: newCategory });
      });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });

  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

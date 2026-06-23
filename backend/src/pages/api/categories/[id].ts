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

  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;

  return withAdmin(req, res, async () => {
    try {
      await connectDB();
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      await Category.deleteOne({ _id: id });
      return res.status(200).json({ message: 'Category deleted successfully' });

    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  });
}

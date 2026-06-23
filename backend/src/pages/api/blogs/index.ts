import type { NextApiResponse } from 'next';
import { connectDB } from '../../../utils/db';
import Blog from '../../../models/Blog';
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
      const { category, status } = req.query;
      const queryObj: any = {};

      if (category) {
        queryObj.category = category;
      }

      if (status) {
        queryObj.status = status;
      }

      const blogs = await Blog.find(queryObj).sort({ createdAt: -1 });
      return res.status(200).json(blogs);
    }

    if (req.method === 'POST') {
      return withAdmin(req, res, async () => {
        const { title, image, summary, content, category, status } = req.body;

        if (!title || !image || !summary || !content || !category) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        let finalId = slug;
        let counter = 1;
        while (await Blog.findOne({ id: finalId })) {
          finalId = `${slug}-${counter}`;
          counter++;
        }

        const todayStr = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        });

        const newBlog = await Blog.create({
          id: finalId,
          title,
          image,
          date: todayStr,
          commentsCount: 0,
          summary,
          content,
          category,
          status: status || 'Draft',
          comments: []
        });

        return res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
      });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });

  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

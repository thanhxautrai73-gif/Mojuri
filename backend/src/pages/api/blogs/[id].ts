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

  const { id } = req.query;

  try {
    await connectDB();

    const findBlog = async () => {
      let blog = await Blog.findOne({ id });
      if (!blog && typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)) {
        blog = await Blog.findById(id);
      }
      return blog;
    };

    const blog = await findBlog();
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (req.method === 'GET') {
      return res.status(200).json(blog);
    }

    if (req.method === 'PUT') {
      return withAdmin(req, res, async () => {
        const { title, image, summary, content, category, status, comment } = req.body;

        // If a new comment is posted (public route simulation, but inside PUT)
        if (comment) {
          const { author, content: commentContent } = comment;
          if (!author || !commentContent) {
            return res.status(400).json({ message: 'Comment author and content are required' });
          }
          const commentId = Math.random().toString(36).substring(2, 9);
          const dateStr = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
          });
          blog.comments.push({
            id: commentId,
            author,
            date: dateStr,
            content: commentContent
          });
          blog.commentsCount = blog.comments.length;
          await blog.save();
          return res.status(200).json({ message: 'Comment added successfully', blog });
        }

        if (title !== undefined) blog.title = title;
        if (image !== undefined) blog.image = image;
        if (summary !== undefined) blog.summary = summary;
        if (content !== undefined) blog.content = content;
        if (category !== undefined) blog.category = category;
        if (status !== undefined) blog.status = status;

        await blog.save();
        return res.status(200).json({ message: 'Blog post updated successfully', blog });
      });
    }

    if (req.method === 'DELETE') {
      return withAdmin(req, res, async () => {
        await Blog.deleteOne({ _id: blog._id });
        return res.status(200).json({ message: 'Blog post deleted successfully' });
      });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });

  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

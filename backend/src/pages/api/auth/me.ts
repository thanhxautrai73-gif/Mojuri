import type { NextApiResponse } from 'next';
import { connectDB } from '../../../utils/db';
import { runCors, withAuth } from '../../../middleware/auth';
import type { AuthenticatedRequest } from '../../../middleware/auth';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  await runCors(req, res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  return withAuth(req, res, async () => {
    try {
      await connectDB();
      return res.status(200).json({ user: req.user });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  });
}

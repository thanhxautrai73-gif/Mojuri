import type { NextApiResponse } from 'next';
import { connectDB } from '../../../utils/db';
import Contact from '../../../models/Contact';
import { runCors, withAdmin } from '../../../middleware/auth';
import type { AuthenticatedRequest } from '../../../middleware/auth';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  await runCors(req, res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;

  return withAdmin(req, res, async () => {
    try {
      await connectDB();
      const contact = await Contact.findById(id);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      const { status } = req.body;
      if (status === 'Read' || status === 'Unread') {
        contact.status = status;
      } else {
        return res.status(400).json({ message: 'Invalid status' });
      }

      await contact.save();
      return res.status(200).json({ message: 'Contact status updated successfully', contact });

    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  });
}

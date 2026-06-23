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

  try {
    await connectDB();

    if (req.method === 'GET') {
      return withAdmin(req, res, async () => {
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        return res.status(200).json(contacts);
      });
    }

    if (req.method === 'POST') {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const newContact = await Contact.create({
        name,
        email,
        subject,
        message,
        status: 'Unread'
      });

      return res.status(201).json({ message: 'Contact message sent successfully', contact: newContact });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });

  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

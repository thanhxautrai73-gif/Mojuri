import type { NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { connectDB } from '../../../utils/db';
import User from '../../../models/User';
import { runCors } from '../../../middleware/auth';
import type { AuthenticatedRequest } from '../../../middleware/auth';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  await runCors(req, res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectDB();
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role === 'admin' ? 'admin' : 'client'; // default to client

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: userRole
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

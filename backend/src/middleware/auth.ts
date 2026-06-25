import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import Cors from 'cors';

const JWT_SECRET = process.env.JWT_SECRET || 'mojuri_super_secret_key_12345';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    username: string;
    email: string;
    role: 'client' | 'admin';
  };
}

const cors = Cors({
  methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  origin: (origin, callback) => {
    // Allow localhost/127.0.0.1 on any port in development
    if (!origin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(null, CORS_ORIGIN);
    }
  },
  credentials: true,
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function runCors(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);
}

export function verifyToken(req: AuthenticatedRequest, res: NextApiResponse, next: () => void) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

export function checkAdmin(req: AuthenticatedRequest, res: NextApiResponse, next: () => void) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
  next();
}

export function withAuth(req: AuthenticatedRequest, res: NextApiResponse, next: () => void) {
  return verifyToken(req, res, next);
}

export function withAdmin(req: AuthenticatedRequest, res: NextApiResponse, next: () => void) {
  return verifyToken(req, res, () => {
    checkAdmin(req, res, next);
  });
}

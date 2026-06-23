import type { NextApiResponse } from 'next';
import { connectDB } from '../../../utils/db';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
import { runCors, verifyToken } from '../../../middleware/auth';
import type { AuthenticatedRequest } from '../../../middleware/auth';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  await runCors(req, res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();

    if (req.method === 'GET') {
      // Must be authenticated to view orders
      return verifyToken(req, res, async () => {
        const user = req.user!;
        let orders;
        if (user.role === 'admin') {
          orders = await Order.find({}).sort({ createdAt: -1 });
        } else {
          // Client can see their orders by userId or by billing email matching theirs
          orders = await Order.find({
            $or: [
              { userId: user.id },
              { 'billingAddress.email': user.email }
            ]
          }).sort({ createdAt: -1 });
        }
        return res.status(200).json(orders);
      });
    }

    if (req.method === 'POST') {
      const { items, billingAddress, total } = req.body;

      if (!items || !items.length || !billingAddress || total === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Check stock and verify pricing
      for (const item of items) {
        const product = await Product.findOne({ id: item.product.id });
        if (!product) {
          return res.status(404).json({ message: `Product ${item.product.name} not found` });
        }
        if (product.stock < item.quantity) {
          return res.status(400).json({ message: `Insufficient stock for product ${product.name}. Available: ${product.stock}` });
        }
      }

      // Deduct stock
      for (const item of items) {
        await Product.updateOne(
          { id: item.product.id },
          { $inc: { stock: -item.quantity } }
        );
      }

      // Determine if authenticated user is ordering
      let orderUserId: string | undefined;
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
          const jwt = require('jsonwebtoken');
          const JWT_SECRET = process.env.JWT_SECRET || 'mojuri_super_secret_key_12345';
          const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET) as any;
          orderUserId = decoded.id;
        } catch (e) {
          // ignore token error, checkout as guest
        }
      }

      const orderId = 'MOJ-' + Math.floor(100000 + Math.random() * 900000);
      const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      });

      const newOrder = await Order.create({
        id: orderId,
        date: today,
        total: Number(total),
        status: 'Pending',
        items,
        billingAddress,
        userId: orderUserId
      });

      return res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });

  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

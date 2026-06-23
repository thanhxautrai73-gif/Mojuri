import type { NextApiResponse } from 'next';
import { connectDB } from '../../../utils/db';
import Order from '../../../models/Order';
import { runCors, withAdmin, verifyToken } from '../../../middleware/auth';
import type { AuthenticatedRequest } from '../../../middleware/auth';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  await runCors(req, res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  try {
    await connectDB();

    const findOrder = async () => {
      let order = await Order.findOne({ id });
      if (!order && typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)) {
        order = await Order.findById(id);
      }
      return order;
    };

    const order = await findOrder();
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (req.method === 'GET') {
      return verifyToken(req, res, async () => {
        const user = req.user!;
        // Auth check: admin or owner of order
        if (user.role !== 'admin' && order.userId?.toString() !== user.id && order.billingAddress.email !== user.email) {
          return res.status(403).json({ message: 'Forbidden: Access denied' });
        }
        return res.status(200).json(order);
      });
    }

    if (req.method === 'PUT') {
      // Only admin can update status
      return withAdmin(req, res, async () => {
        const { status } = req.body;
        const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        
        if (!status || !validStatuses.includes(status)) {
          return res.status(400).json({ message: 'Invalid status' });
        }

        order.status = status;
        await order.save();
        return res.status(200).json({ message: 'Order status updated successfully', order });
      });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });

  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

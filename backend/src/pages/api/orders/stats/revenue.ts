import type { NextApiResponse } from 'next';
import { connectDB } from '../../../../utils/db';
import Order from '../../../../models/Order';
import { runCors, withAdmin } from '../../../../middleware/auth';
import type { AuthenticatedRequest } from '../../../../middleware/auth';

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  await runCors(req, res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  return withAdmin(req, res, async () => {
    try {
      await connectDB();

      // Retrieve all orders
      const orders = await Order.find({});

      let totalRevenue = 0;
      const statusCounts: { [key: string]: number } = {
        Pending: 0,
        Processing: 0,
        Shipped: 0,
        Delivered: 0,
        Cancelled: 0
      };

      // Simple month/day aggregation in Javascript (since date is stored as string 'June 23, 2026')
      const monthlyData: { [key: string]: number } = {};
      const dailyData: { [key: string]: number } = {};

      for (const order of orders) {
        if (order.status !== 'Cancelled') {
          totalRevenue += order.total;
        }

        if (statusCounts[order.status] !== undefined) {
          statusCounts[order.status]++;
        }

        // Grouping by Date string
        const dateStr = order.date; // e.g. "June 23, 2026"
        if (dateStr) {
          // Daily
          dailyData[dateStr] = (dailyData[dateStr] || 0) + (order.status !== 'Cancelled' ? order.total : 0);

          // Monthly parsing
          const parts = dateStr.split(' ');
          if (parts.length >= 3) {
            const monthYear = `${parts[0]} ${parts[2]}`; // e.g. "June 2026"
            monthlyData[monthYear] = (monthlyData[monthYear] || 0) + (order.status !== 'Cancelled' ? order.total : 0);
          }
        }
      }

      // Convert objects to sorted arrays
      const monthlyRevenue = Object.keys(monthlyData).map(key => ({
        name: key,
        revenue: monthlyData[key]
      }));

      const dailyRevenue = Object.keys(dailyData).map(key => ({
        name: key,
        revenue: dailyData[key]
      })).slice(-10); // return last 10 days for cleaner view

      return res.status(200).json({
        totalRevenue,
        ordersCount: orders.length,
        statusCounts,
        monthlyRevenue,
        dailyRevenue
      });

    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  });
}

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dns from 'node:dns';
import Product from '../models/Product';
import Blog from '../models/Blog';
import User from '../models/User';
import Category from '../models/Category';

// Set DNS servers locally to bypass Vietnamese ISP lookup issues for MongoDB Atlas.
// Do NOT run this on Vercel as it blocks or misroutes outbound traffic on custom DNS servers.
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  try {
    if (dns && typeof dns.setServers === 'function') {
      dns.setServers(["1.1.1.1", "8.8.8.8"]);
    }
  } catch (e) {
    console.warn('Failed to set local DNS servers:', e);
  }
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mojuri';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside backend/.env');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('Connected to MongoDB successfully');
      return mongooseInstance;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  // Auto seed models if empty
  await seedDatabase();

  return cached.conn;
}

// Auto-seeding database from imported models
async function seedDatabase() {
  try {

    // 1. Seed categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      const categories = ['Bracelets', 'Charms', 'Earrings', 'Necklaces', 'Rings'];
      await Category.insertMany(categories.map(name => ({ name })));
      console.log('Seeded categories');
    }

    // 2. Seed products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const mockProducts = [
        {
          id: 'medium-flat-hoops',
          name: 'Medium Flat Hoops',
          price: 100.00,
          rating: 4.8,
          reviewsCount: 12,
          description: 'These sleek medium flat hoops offer a bold yet classic silhouette. Crafted from high-polished sterling silver, they are lightweight and comfortable enough for everyday wear, adding a modern polish to any outfit.',
          images: ['images/1_1.jpg', 'images/1-2.jpg'],
          sku: 'VN00190',
          category: 'Earrings',
          stock: 15,
          featured: true,
          trending: true
        },
        {
          id: 'bold-pearl-hoops',
          name: 'Bold Pearl Hoop Earrings',
          price: 180.00,
          originalPrice: 200.00,
          rating: 5.0,
          reviewsCount: 8,
          description: 'A luxurious twist on classic hoops, these earrings feature luminous freshwater cultured pearls suspended along bold, structured gold-plated hoops. The perfect blend of timeless elegance and contemporary design.',
          images: ['images/2_1.jpg', 'images/2-2.jpg'],
          sku: 'D1116',
          category: 'Earrings',
          stock: 8,
          bestSeller: true,
          trending: true
        },
        {
          id: 'twin-hoops',
          name: 'Twin Hoops',
          price: 150.00,
          rating: 4.5,
          reviewsCount: 5,
          description: 'Double the elegance with our Twin Hoops. Featuring two interlocking bands of sterling silver—one high-polished and one textured—these earrings create a beautiful layered look with ease.',
          images: ['images/3.jpg', 'images/3-2.jpg'],
          sku: 'VN00189',
          category: 'Earrings',
          stock: 10,
          featured: true,
          trending: true
        },
        {
          id: 'yilver-turquoise-earrings',
          name: 'Yilver And Turquoise Earrings',
          price: 100.00,
          originalPrice: 150.00,
          rating: 4.2,
          reviewsCount: 3,
          description: 'Beautifully handcrafted earrings showcasing vibrant turquoise stones nestled in intricate sterling silver filigree designs. Adds a perfect splash of bohemian color and antique charm to your collection.',
          images: ['images/4.jpg', 'images/4-2.jpg'],
          sku: 'VN00191',
          category: 'Earrings',
          stock: 5,
          bestSeller: true,
          trending: true
        },
        {
          id: 'medium-flat-hoops-out',
          name: 'Medium Flat Hoops - Silver',
          price: 140.00,
          originalPrice: 150.00,
          rating: 4.0,
          reviewsCount: 1,
          description: 'A variant of our popular flat hoops, featuring a brushed matte sterling silver finish for a subtle, contemporary glow. Highly coveted and currently in limited supply.',
          images: ['images/13.jpg', 'images/13-2.jpg'],
          sku: 'VN00192',
          category: 'Earrings',
          stock: 0,
          trending: true
        },
        {
          id: 'classic-pearl-pendant',
          name: 'Classic Pearl Pendant',
          price: 220.00,
          rating: 4.9,
          reviewsCount: 15,
          description: 'A single, hand-selected freshwater cultured pearl hangs elegantly from a delicate 18k yellow gold chain. This classic necklace is a staple of sophistication and refined style.',
          images: ['images/1_1.jpg', 'images/2_1.jpg'],
          sku: 'N00874',
          category: 'Necklaces',
          stock: 12,
          featured: true
        },
        {
          id: 'gold-chain-bracelet',
          name: 'Gold Chain Link Bracelet',
          price: 95.00,
          originalPrice: 120.00,
          rating: 4.6,
          reviewsCount: 6,
          description: 'Crafted with bold, interlocking links, this 18k gold-plated brass bracelet makes a statement on its own or layered. Comes with a secure toggle clasp.',
          images: ['images/3.jpg', 'images/4.jpg'],
          sku: 'B00531',
          category: 'Bracelets',
          stock: 20,
          bestSeller: true
        },
        {
          id: 'turquoise-filigree-ring',
          name: 'Turquoise Filigree Ring',
          price: 110.00,
          rating: 4.7,
          reviewsCount: 9,
          description: 'An elegant statement ring centering a polished turquoise cabochon within a wide, detailed sterling silver filigree band. Crafted comfortably for everyday wear.',
          images: ['images/4.jpg', 'images/13.jpg'],
          sku: 'R00289',
          category: 'Rings',
          stock: 7,
          featured: true
        },
        {
          id: 'silver-charm-bracelet',
          name: 'Sterling Silver Charm Bracelet',
          price: 130.00,
          rating: 4.4,
          reviewsCount: 4,
          description: 'Start your charm journey with this classic snake chain bracelet in sterling silver, featuring a signature barrel clasp. Fully customizable with our collection of charms.',
          images: ['images/13.jpg', 'images/3.jpg'],
          sku: 'C00902',
          category: 'Charms',
          stock: 18,
          bestSeller: true
        }
      ];
      await Product.insertMany(mockProducts);
      console.log('Seeded products');
    }

    // 3. Seed blogs
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      const mockBlogs = [
        {
          id: 'bridal-fair-collections',
          title: 'Bridal Fair Collections 2023',
          image: 'images/1.jpg',
          date: 'May 30, 2022',
          commentsCount: 4,
          summary: 'Discover the highlight designs and enchanting trends of our exclusive Bridal Fair Collections 2023.',
          content: 'Bridal jewelry holds a sacred place in every wedding ceremony. It is the sparkle that complements the bride\'s glowing look and encapsulates the memories of a lifetime...',
          category: 'Bridal',
          status: 'Published',
          comments: [
            { id: '1', author: 'Emma Watson', date: 'June 2, 2022', content: 'Absolutely gorgeous designs! The convertible pieces are so innovative.' },
            { id: '2', author: 'Liam Neeson', date: 'June 3, 2022', content: 'Bought the pearl hoops for my daughter\'s wedding, she loved them!' }
          ]
        },
        {
          id: 'our-sterling-silver',
          title: 'Our Sterling Silver Standards',
          image: 'images/2.jpg',
          date: 'Aug 24, 2022',
          commentsCount: 2,
          summary: 'A deep dive into the craftsmanship, purity, and care of our signature sterling silver collection.',
          content: 'Sterling silver is beloved for its bright white luster, versatility, and durability. But what makes our silver stand out? In this article, we detail the strict standards we apply...',
          category: 'Guides',
          status: 'Published',
          comments: [
            { id: '1', author: 'David Beckham', date: 'Aug 26, 2022', content: 'The care guide is very helpful. I\'ve been cleaning my silver wrong for years!' }
          ]
        }
      ];
      await Blog.insertMany(mockBlogs);
      console.log('Seeded blogs');
    }

    // 4. Seed admin user
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        email: 'admin@mojuri.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Seeded admin user (admin / admin123)');
    }

    // 5. Seed general client user
    const clientCount = await User.countDocuments({ role: 'client' });
    if (clientCount === 0) {
      const hashedPassword = await bcrypt.hash('client123', 10);
      await User.create({
        username: 'client',
        email: 'client@mojuri.com',
        password: hashedPassword,
        role: 'client'
      });
      console.log('Seeded client user (client / client123)');
    }

  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

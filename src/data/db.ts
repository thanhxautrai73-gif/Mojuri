import type { Product, BlogPost } from '../types';

export const CATEGORIES = ['Bracelets', 'Charms', 'Earrings', 'Necklaces', 'Rings'];

export const PRODUCTS: Product[] = [
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

export const BLOGS: BlogPost[] = [
  {
    id: 'bridal-fair-collections',
    title: 'Bridal Fair Collections 2023',
    image: 'images/1.jpg',
    date: 'May 30, 2022',
    commentsCount: 4,
    summary: 'Discover the highlight designs and enchanting trends of our exclusive Bridal Fair Collections 2023.',
    content: `
      Bridal jewelry holds a sacred place in every wedding ceremony. It is the sparkle that complements the bride's glowing look and encapsulates the memories of a lifetime. In this post, we review the top trends from the Bridal Fair Collections 2023.

      This year, we see a dramatic shift towards mixing tradition with contemporary shapes. Brides are opting for convertible jewelry pieces, such as necklaces that transform into brooches, or hoop earrings with detachable pearl charms. 
      
      We discuss the resurgence of yellow gold in bridal settings, the integration of colored gemstones like sapphires and emeralds alongside traditional diamonds, and how to choose pieces that reflect your personal love story.
    `,
    category: 'Bridal',
    comments: [
      { id: '1', author: 'Emma Watson', date: 'June 2, 2022', content: 'Absolutely gorgeous designs! The convertible pieces are so innovative.' },
      { id: '2', author: 'Liam Neeson', date: 'June 3, 2022', content: 'Bought the pearl hoops for my daughter\'s wedding, she loved them!' },
      { id: '3', author: 'Sophia Loren', date: 'June 4, 2022', content: 'Are these designs available in all retail locations?' },
      { id: '4', author: 'John Doe', date: 'June 5, 2022', content: 'Very informative article, thank you for sharing!' }
    ]
  },
  {
    id: 'our-sterling-silver',
    title: 'Our Sterling Silver Standards',
    image: 'images/2.jpg',
    date: 'Aug 24, 2022',
    commentsCount: 2,
    summary: 'A deep dive into the craftsmanship, purity, and care of our signature sterling silver collection.',
    content: `
      Sterling silver is beloved for its bright white luster, versatility, and durability. But what makes our silver stand out? In this article, we detail the strict standards we apply to all our sterling silver products.

      Every piece in our silver collection is guaranteed to be 92.5% pure silver, alloyed with copper for optimal strength. We ensure all our silver is nickel-free, making it hypoallergenic and safe for sensitive skin.
      
      We also explain how we finish our silver with a premium rhodium plating to prevent tarnishing and maintain a sparkling finish. Learn about proper polishing techniques, cleaning tips, and the best ways to store your silver to ensure it retains its shine for generations.
    `,
    category: 'Guides',
    comments: [
      { id: '1', author: 'David Beckham', date: 'Aug 26, 2022', content: 'The care guide is very helpful. I\'ve been cleaning my silver wrong for years!' },
      { id: '2', author: 'Anna Wintour', date: 'Aug 27, 2022', content: 'Quality silver is hard to find, but Mojuri always delivers.' }
    ]
  },
  {
    id: 'kitchen-inspired-japanese',
    title: 'Minimalist Jewelry Inspired by Japanese Aesthetics',
    image: 'images/3_1.jpg',
    date: 'Dec 06, 2022',
    commentsCount: 1,
    summary: 'Exploring the elegant fusion of Japanese minimalist architecture and modern jewelry designs.',
    content: `
      Minimalism is not about the lack of something, but the perfect amount of everything. This season, our designers drew heavy inspiration from Japanese architecture and Zen philosophy, focusing on clean lines, organic geometry, and negative space.

      By stripping away excess ornamentation, we allow the intrinsic beauty of the materials—refined silver, gold, and pearls—to stand at the forefront. We discuss the concept of "Ma" (the sense of space) and "Wabi-Sabi" (appreciating imperfection) and how these principles translate into elegant, delicate daily-wear rings, cuffs, and neck chains.
    `,
    category: 'Design',
    comments: [
      { id: '1', author: 'Kengo Kuma', date: 'Dec 08, 2022', content: 'A beautiful translation of architecture into metal. Brilliant!' }
    ]
  }
];

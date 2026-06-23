export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  images: string[];
  sku: string;
  category: string;
  stock: number;
  featured?: boolean;
  bestSeller?: boolean;
  trending?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  image: string;
  date: string;
  commentsCount: number;
  content: string;
  category: string;
  summary: string;
  comments?: BlogComment[];
}

export interface BlogComment {
  id: string;
  author: string;
  date: string;
  content: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: CartItem[];
  billingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    phone: string;
    email: string;
  };
}


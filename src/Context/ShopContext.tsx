import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product, BlogPost, CartItem, Order } from '../types';
import { PRODUCTS, BLOGS, CATEGORIES } from '../data/db';

interface ShopContextType {
  currentPage: string;
  selectedId: string | null;
  cart: CartItem[];
  wishlist: Product[];
  compare: Product[];
  quickViewProduct: Product | null;
  searchQuery: string;
  user: { loggedIn: boolean; username?: string; email?: string; role?: 'client' | 'admin' } | null;
  token: string | null;
  orders: Order[];
  products: Product[];
  blogs: BlogPost[];
  categories: string[];
  appliedCoupon: string;
  discount: number;
  
  navigate: (page: string, id?: string | null) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  setSearchQuery: (query: string) => void;
  login: (emailOrUsername: string, password?: string) => Promise<boolean>;
  register: (username: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  placeOrder: (billingDetails: Order['billingAddress'], total: number) => Promise<string>;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  refreshProducts: () => Promise<void>;
  refreshBlogs: () => Promise<void>;
  refreshOrders: () => Promise<void>;
}

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/')) {
      const page = hash.slice(2).split('?')[0];
      return page || 'home';
    }
    return 'home';
  });

  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/')) {
      const parts = hash.slice(2).split('?');
      if (parts[1]) {
        const params = new URLSearchParams(parts[1]);
        return params.get('id');
      }
    }
    return null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mojuri_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mojuri_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [compare, setCompare] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mojuri_compare');
    return saved ? JSON.parse(saved) : [];
  });

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<{ loggedIn: boolean; username?: string; email?: string; role?: 'client' | 'admin' } | null>(() => {
    const saved = localStorage.getItem('mojuri_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('mojuri_token') || null;
  });

  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [blogs, setBlogs] = useState<BlogPost[]>(BLOGS);
  const [categories, setCategories] = useState<string[]>(CATEGORIES);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mojuri_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem('mojuri_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mojuri_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('mojuri_compare', JSON.stringify(compare));
  }, [compare]);

  useEffect(() => {
    localStorage.setItem('mojuri_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('mojuri_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mojuri_user');
    }
  }, [user]);

  const refreshProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products?limit=100`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
      }
    } catch (err) {
      console.warn('Failed to load products from server, using local database', err);
    }
  };

  const refreshBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/blogs`);
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.warn('Failed to load blogs from server, using local database', err);
    }
  };

  const refreshCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data.map((cat: any) => cat.name));
      }
    } catch (err) {
      console.warn('Failed to load categories from server, using local database', err);
    }
  };

  const refreshOrders = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.warn('Failed to load orders from server, using local database', err);
    }
  };

  useEffect(() => {
    refreshProducts();
    refreshBlogs();
    refreshCategories();
  }, []);

  useEffect(() => {
    if (token) {
      refreshOrders();
    }
  }, [token]);

  // Synchronize hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/')) {
        const parts = hash.slice(2).split('?');
        const page = parts[0] || 'home';
        setCurrentPage(page);
        if (parts[1]) {
          const params = new URLSearchParams(parts[1]);
          setSelectedId(params.get('id'));
        } else {
          setSelectedId(null);
        }
      } else {
        setCurrentPage('home');
        setSelectedId(null);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: string, id: string | null = null) => {
    let url = `#/${page}`;
    if (id) {
      url += `?id=${id}`;
    }
    window.location.hash = url;
    setCurrentPage(page);
    setSelectedId(id);
    window.scrollTo(0, 0);
  };

  const addToCart = (product: Product, quantity = 1) => {
    if (product.stock <= 0) {
      alert('This product is out of stock!');
      return;
    }
    
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    // Native toast feedback
    const toast = document.createElement('div');
    toast.className = 'cart-product-added';
    toast.innerHTML = `<div class="added-message">Product was added to cart successfully!</div>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
      }, 2000);
    }, 100);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.product.stock)) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      
      // Toast feedback
      const toast = document.createElement('div');
      toast.className = 'wishlist-notice wishlist-notice-show show';
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.right = '20px';
      toast.style.background = '#000';
      toast.style.color = '#fff';
      toast.style.padding = '10px 20px';
      toast.style.zIndex = '9999';
      toast.innerText = 'Added to the wishlist!';
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 2000);

      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const addToCompare = (product: Product) => {
    setCompare((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      if (prev.length >= 3) {
        alert('You can compare up to 3 products at a time.');
        return prev;
      }
      return [...prev, product];
    });
    // Open compare popup automatically
    setTimeout(() => {
      const popup = document.querySelector('.compare-popup');
      if (popup) popup.classList.add('active');
    }, 100);
  };

  const removeFromCompare = (productId: string) => {
    setCompare((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInCompare = (productId: string) => {
    return compare.some((item) => item.id === productId);
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const login = async (emailOrUsername: string, password?: string): Promise<boolean> => {
    const isEmail = emailOrUsername.includes('@');
    const email = isEmail ? emailOrUsername : `${emailOrUsername}@mojuri.com`;
    const pwd = password || 'client123'; // Default fallback

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pwd })
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        const loggedUser = { 
          loggedIn: true, 
          username: data.user.username, 
          email: data.user.email, 
          role: data.user.role as 'client' | 'admin' 
        };
        setUser(loggedUser);
        localStorage.setItem('mojuri_token', data.token);
        localStorage.setItem('mojuri_user', JSON.stringify(loggedUser));
        
        // Refresh orders for this user
        try {
          const ordersRes = await fetch(`${API_URL}/orders`, {
            headers: { 'Authorization': `Bearer ${data.token}` }
          });
          if (ordersRes.ok) {
            const ordersData = await ordersRes.json();
            setOrders(ordersData);
          }
        } catch (e) {
          console.warn('Could not fetch orders', e);
        }
        return true;
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'Login failed. Please check your credentials.');
        return false;
      }
    } catch (err) {
      console.warn('Backend server offline. Falling back to local authentication.', err);
      // Local fallback
      const mockRole = emailOrUsername === 'admin' ? 'admin' : 'client';
      const loggedUser = {
        loggedIn: true,
        username: emailOrUsername.split('@')[0],
        email: email,
        role: mockRole as 'client' | 'admin'
      };
      setUser(loggedUser);
      setToken('mock_token');
      localStorage.setItem('mojuri_token', 'mock_token');
      localStorage.setItem('mojuri_user', JSON.stringify(loggedUser));
      return true;
    }
  };

  const register = async (username: string, email: string, password?: string): Promise<boolean> => {
    const pwd = password || 'client123';
    const role = username === 'admin' ? 'admin' : 'client';

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password: pwd, role })
      });

      if (res.ok) {
        return true;
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'Registration failed.');
        return false;
      }
    } catch (err) {
      console.warn('Backend server offline.', err);
      alert('Cannot connect to backend server. Please make sure the backend is running.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setOrders([]);
    localStorage.removeItem('mojuri_token');
    localStorage.removeItem('mojuri_user');
    navigate('home');
  };

  const placeOrder = async (billingAddress: Order['billingAddress'], total: number): Promise<string> => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });

    const orderPayload = {
      items: cart.map(item => ({
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          images: item.product.images,
          sku: item.product.sku,
          category: item.product.category
        },
        quantity: item.quantity
      })),
      billingAddress,
      total
    };

    try {
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify(orderPayload)
      });

      if (res.ok) {
        const data = await res.json();
        clearCart();
        setAppliedCoupon('');
        setDiscount(0);
        if (token) {
          refreshOrders();
        }
        return data.order.id;
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to place order.');
      }
    } catch (err: any) {
      console.warn('Backend offline, saving order locally.', err);
      const orderId = 'MOJ-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder: Order = {
        id: orderId,
        date: today,
        total,
        status: 'Processing',
        items: [...cart],
        billingAddress
      };

      setOrders((prev) => [newOrder, ...prev]);
      clearCart();
      setAppliedCoupon('');
      setDiscount(0);
      return orderId;
    }
  };

  const applyCoupon = (code: string): boolean => {
    const formattedCode = code.toUpperCase().trim();
    if (formattedCode === 'MOJURI10') {
      setAppliedCoupon('MOJURI10');
      setDiscount(10);
      return true;
    } else if (formattedCode === 'GOLD20') {
      setAppliedCoupon('GOLD20');
      setDiscount(20);
      return true;
    } else if (formattedCode === 'SPECIAL30') {
      setAppliedCoupon('SPECIAL30');
      setDiscount(30);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon('');
    setDiscount(0);
  };

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        selectedId,
        cart,
        wishlist,
        compare,
        quickViewProduct,
        searchQuery,
        user,
        token,
        orders,
        products,
        blogs,
        categories,
        appliedCoupon,
        discount,
        navigate,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addToCompare,
        removeFromCompare,
        isInCompare,
        openQuickView,
        closeQuickView,
        setSearchQuery,
        login,
        register,
        logout,
        placeOrder,
        applyCoupon,
        removeCoupon,
        refreshProducts,
        refreshBlogs,
        refreshOrders,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

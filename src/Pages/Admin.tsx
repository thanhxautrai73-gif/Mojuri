import React, { useState, useEffect } from 'react';
import { useShop, API_URL } from '../Context/ShopContext';
import type { Product, BlogPost, Order } from '../types';

interface ContactMsg {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'Read' | 'Unread';
  createdAt: string;
}

const Admin: React.FC = () => {
  const { user, token, login, logout, products, blogs, categories, refreshProducts, refreshBlogs } = useShop();

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'orders' | 'contacts' | 'blogs'>('dashboard');

  // Stats state
  const [stats, setStats] = useState({
    totalRevenue: 0,
    ordersCount: 0,
    statusCounts: { Pending: 0, Processing: 0, Shipped: 0, Delivered: 0, Cancelled: 0 },
    monthlyRevenue: [] as Array<{ name: string; revenue: number }>,
    dailyRevenue: [] as Array<{ name: string; revenue: number }>
  });

  // DB collection states
  const [adminOrders, setAdminOrders] = useState<Order[]>([]);
  const [adminContacts, setAdminContacts] = useState<ContactMsg[]>([]);
  const [adminCategories, setAdminCategories] = useState<Array<{ _id?: string; name: string }>>(() => categories.map(name => ({ name })));

  // Modals & form fields states
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: 0,
    originalPrice: 0,
    sku: '',
    category: '',
    stock: 0,
    description: '',
    imageUrl: '',
    featured: false,
    bestSeller: false,
    trending: false
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    imageUrl: '',
    status: 'Published' as 'Published' | 'Draft'
  });

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Fetch admin data on tab activation
  useEffect(() => {
    if (user?.loggedIn && user?.role === 'admin') {
      fetchStats();
      fetchOrders();
      fetchCategories();
      fetchContacts();
    }
  }, [user, token, activeTab]);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/orders/stats/revenue`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.warn('API Stats offline, calculating from local mock orders');
      // Mock calculation fallback
      let rev = 0;
      const statusCounts = { Pending: 0, Processing: 0, Shipped: 0, Delivered: 0, Cancelled: 0 };
      adminOrders.forEach(o => {
        if (o.status !== 'Cancelled') rev += o.total;
        if (o.status === 'Processing') statusCounts.Processing++;
        else if (o.status === 'Pending') statusCounts.Pending++;
        else if (o.status === 'Shipped') statusCounts.Shipped++;
        else if (o.status === 'Delivered') statusCounts.Delivered++;
        else if (o.status === 'Cancelled') statusCounts.Cancelled++;
      });
      setStats({
        totalRevenue: rev,
        ordersCount: adminOrders.length,
        statusCounts,
        monthlyRevenue: [{ name: 'June 2026', revenue: rev }],
        dailyRevenue: [{ name: 'June 23, 2026', revenue: rev }]
      });
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAdminOrders(data);
      }
    } catch (e) {
      console.warn('API Orders offline');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      if (res.ok) {
        const data = await res.json();
        setAdminCategories(data.map((c: any) => ({ _id: c._id, name: c.name })));
      }
    } catch (e) {
      setAdminCategories(categories.map(name => ({ name })));
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAdminContacts(data);
      }
    } catch (e) {
      console.warn('API Contacts offline');
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(adminEmail || 'admin@mojuri.com', adminPassword || 'admin123');
    setLoading(false);
    if (!success) {
      alert('Login failed. Ensure backend server is running or credentials match admin account.');
    }
  };

  // Product actions
  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      price: 0,
      originalPrice: 0,
      sku: '',
      category: adminCategories[0]?.name || 'Earrings',
      stock: 10,
      description: '',
      imageUrl: 'images/1_1.jpg',
      featured: false,
      bestSeller: false,
      trending: false
    });
    setShowProductModal(true);
  };

  const openEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice || 0,
      sku: p.sku,
      category: p.category,
      stock: p.stock,
      description: p.description,
      imageUrl: p.images[0] || 'images/1_1.jpg',
      featured: !!p.featured,
      bestSeller: !!p.bestSeller,
      trending: !!p.trending
    });
    setShowProductModal(true);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...productForm,
      images: [productForm.imageUrl]
    };

    try {
      const url = editingProduct 
        ? `${API_URL}/products/${editingProduct.id}`
        : `${API_URL}/products`;
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
        setShowProductModal(false);
        refreshProducts();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'Error processing product');
      }
    } catch (err) {
      alert('Backend server offline. Action simulated locally.');
      setShowProductModal(false);
    }
  };

  const handleDeleteProduct = async (prodId: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${API_URL}/products/${prodId}`, {

        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert('Product deleted successfully');
        refreshProducts();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'Failed to delete product.');
      }
    } catch (e) {
      alert('Backend server offline. Cannot complete deletion.');
    }
  };

  // Category Actions
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: categoryName.trim() })
      });
      if (res.ok) {
        alert('Category added successfully');
        setCategoryName('');
        setShowCategoryModal(false);
        fetchCategories();
      } else {
        const data = await res.json();
        alert(data.message || 'Error creating category');
      }
    } catch (e) {
      alert('Backend server offline. Simulation completed.');
      setShowCategoryModal(false);
    }
  };

  const handleDeleteCategory = async (catId?: string, catName?: string) => {
    if (!catId) {
      alert('This default category is in mock data and cannot be deleted.');
      return;
    }
    if (!window.confirm(`Are you sure you want to delete category "${catName}"?`)) return;
    try {
      const res = await fetch(`${API_URL}/categories/${catId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert('Category deleted successfully');
        fetchCategories();
      } else {
        const data = await res.json();
        alert(data.message || 'Error deleting category');
      }
    } catch (e) {
      alert('Backend server offline. Cannot complete deletion.');
    }
  };

  // Order Actions
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        alert(`Order status updated to ${status}`);
        fetchOrders();
      }
    } catch (e) {
      alert('Backend offline. Status simulation updated.');
      setAdminOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    }
  };

  // Contact Actions
  const handleToggleContactRead = async (contactId: string, status: 'Read' | 'Unread') => {
    try {
      const res = await fetch(`${API_URL}/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchContacts();
      }
    } catch (e) {
      setAdminContacts(prev => prev.map(c => c._id === contactId ? { ...c, status } : c));
    }
  };

  // Blog Actions
  const openAddBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      summary: '',
      content: '',
      category: 'Tips',
      imageUrl: 'images/1.jpg',
      status: 'Published'
    });
    setShowBlogModal(true);
  };

  const openEditBlog = (b: BlogPost) => {
    setEditingBlog(b);
    setBlogForm({
      title: b.title,
      summary: b.summary,
      content: b.content,
      category: b.category,
      imageUrl: b.image,
      status: 'Published' // default
    });
    setShowBlogModal(true);
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: blogForm.title,
      image: blogForm.imageUrl,
      summary: blogForm.summary,
      content: blogForm.content,
      category: blogForm.category,
      status: blogForm.status
    };

    try {
      const url = editingBlog 
        ? `${API_URL}/blogs/${editingBlog.id}`
        : `${API_URL}/blogs`;
      const method = editingBlog ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert(editingBlog ? 'Blog updated successfully!' : 'Blog post created successfully!');
        setShowBlogModal(false);
        refreshBlogs();
      } else {
        const data = await res.json();
        alert(data.message || 'Error processing blog post');
      }
    } catch (err) {
      alert('Backend server offline. Action simulated.');
      setShowBlogModal(false);
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`${API_URL}/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert('Blog post deleted successfully');
        refreshBlogs();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'Failed to delete blog post.');
      }
    } catch (e) {
      alert('Backend offline. Deletion ignored.');
    }
  };

  // Authentication validation wrapper
  if (!user?.loggedIn || user?.role !== 'admin') {
    return (
      <div style={{ background: '#f8f9fa', padding: '60px 0', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ background: '#fff', padding: '40px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '450px', width: '100%', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>Admin Portal</h2>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '25px', textAlign: 'center' }}>Please login with administrator credentials</p>
          
          <form onSubmit={handleAdminLogin}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px' }}>Email / Username</label>
              <input 
                type="text" 
                placeholder="admin@mojuri.com"
                value={adminEmail} 
                onChange={(e) => setAdminEmail(e.target.value)} 
                style={{ width: '100%', height: '40px', padding: '0 10px', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }}
              />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px' }}>Password</label>
              <input 
                type="password" 
                placeholder="admin123"
                value={adminPassword} 
                onChange={(e) => setAdminPassword(e.target.value)} 
                style={{ width: '100%', height: '40px', padding: '0 10px', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', height: '45px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'LOGGING IN...' : 'LOG IN'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f4f6f9', minHeight: '85vh', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: '240px', background: '#1e2229', color: '#abb1bf', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #2d3139', textAlign: 'center' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Mojuri Admin</h3>
          <span style={{ fontSize: '11px', color: '#68707f' }}>Logged in as: {user.username}</span>
        </div>
        
        <ul style={{ listStyle: 'none', padding: '15px 0', margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'icon-speedometer' },
            { id: 'products', label: 'Products', icon: 'icon-bag' },
            { id: 'categories', label: 'Categories', icon: 'icon-tag' },
            { id: 'orders', label: 'Orders', icon: 'icon-basket' },
            { id: 'contacts', label: 'Contacts', icon: 'icon-envelope' },
            { id: 'blogs', label: 'Blogs', icon: 'icon-doc' }
          ].map((tab) => (
            <li key={tab.id}>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveTab(tab.id as any); }}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px 25px', 
                  color: activeTab === tab.id ? '#fff' : '#abb1bf', 
                  background: activeTab === tab.id ? '#2c313c' : 'transparent',
                  borderLeft: activeTab === tab.id ? '4px solid #cb8161' : '4px solid transparent',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: activeTab === tab.id ? 'bold' : 'normal'
                }}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid #2d3139' }}>
          <button 
            onClick={logout}
            style={{ width: '100%', height: '36px', background: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
          >
            LOGOUT
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        
        {/* TAB: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Dashboard Overview</h2>
            
            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ background: '#fff', padding: '20px', border: '1px solid #e1e6eb', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', color: '#888', fontWeight: '600' }}>Total Revenue</span>
                <h3 style={{ fontSize: '28px', color: '#27ae60', margin: '5px 0 0 0', fontWeight: 'bold' }}>${stats.totalRevenue.toFixed(2)}</h3>
              </div>
              <div style={{ background: '#fff', padding: '20px', border: '1px solid #e1e6eb', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', color: '#888', fontWeight: '600' }}>Total Orders</span>
                <h3 style={{ fontSize: '28px', color: '#000', margin: '5px 0 0 0', fontWeight: 'bold' }}>{stats.ordersCount}</h3>
              </div>
              <div style={{ background: '#fff', padding: '20px', border: '1px solid #e1e6eb', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', color: '#888', fontWeight: '600' }}>Products Live</span>
                <h3 style={{ fontSize: '28px', color: '#cb8161', margin: '5px 0 0 0', fontWeight: 'bold' }}>{products.length}</h3>
              </div>
              <div style={{ background: '#fff', padding: '20px', border: '1px solid #e1e6eb', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', color: '#888', fontWeight: '600' }}>Inbox Messages</span>
                <h3 style={{ fontSize: '28px', color: '#2980b9', margin: '5px 0 0 0', fontWeight: 'bold' }}>
                  {adminContacts.filter(c => c.status === 'Unread').length} New
                </h3>
              </div>
            </div>

            {/* Revenue aggregated logs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ background: '#fff', padding: '20px', border: '1px solid #e1e6eb', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>Sales by Month</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {stats.monthlyRevenue.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f9f9f9' }}>
                      <span style={{ color: '#555' }}>{item.name}</span>
                      <strong style={{ color: '#000' }}>${item.revenue.toFixed(2)}</strong>
                    </li>
                  ))}
                  {stats.monthlyRevenue.length === 0 && <li style={{ color: '#888', textAlign: 'center' }}>No sales records found</li>}
                </ul>
              </div>

              <div style={{ background: '#fff', padding: '20px', border: '1px solid #e1e6eb', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>Orders Breakdown</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {Object.entries(stats.statusCounts).map(([status, count]) => (
                    <div key={status} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
                      <span style={{ fontSize: '14px', color: '#666' }}>{status}</span>
                      <span style={{ background: status === 'Delivered' ? '#e2f9eb' : status === 'Cancelled' ? '#fdeced' : '#fff9e6', color: status === 'Delivered' ? '#27ae60' : status === 'Cancelled' ? '#c0392b' : '#f39c12', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                        {count} orders
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>Products</h2>
              <button 
                onClick={openAddProduct}
                style={{ background: '#cb8161', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}
              >
                + Add Product
              </button>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e1e6eb', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #e1e6eb' }}>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Product</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>SKU</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Category</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Price</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Stock</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f2f4f6' }}>
                      <td style={{ padding: '12px 15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={p.images[0]} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' }} />
                        <div>
                          <strong style={{ display: 'block', fontSize: '14px' }}>{p.name}</strong>
                          {p.featured && <span style={{ fontSize: '10px', background: '#e1f3d8', color: '#67c23a', padding: '1px 5px', borderRadius: '3px', marginRight: '5px' }}>Featured</span>}
                          {p.bestSeller && <span style={{ fontSize: '10px', background: '#fdf5e6', color: '#e6a23c', padding: '1px 5px', borderRadius: '3px' }}>Bestseller</span>}
                        </div>
                      </td>
                      <td style={{ padding: '12px 15px', fontSize: '14px', color: '#555' }}>{p.sku}</td>
                      <td style={{ padding: '12px 15px', fontSize: '14px', color: '#555' }}>{p.category}</td>
                      <td style={{ padding: '12px 15px', fontSize: '14px', fontWeight: 'bold' }}>
                        ${p.price.toFixed(2)}
                        {p.originalPrice && <span style={{ textDecoration: 'line-through', fontSize: '11px', color: '#999', marginLeft: '5px' }}>${p.originalPrice.toFixed(2)}</span>}
                      </td>
                      <td style={{ padding: '12px 15px', fontSize: '14px' }}>
                        <span style={{ color: p.stock > 0 ? '#27ae60' : '#c0392b', fontWeight: '600' }}>
                        {p.stock > 0 ? <span>{p.stock} in stock</span> : <span>Out of stock</span>}

                        </span>
                      </td>
                      <td style={{ padding: '12px 15px' }}>
                        <button 
                          onClick={() => openEditProduct(p)}
                          style={{ background: '#f0f0f0', border: '1px solid #ccc', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px', marginRight: '8px', fontSize: '12px' }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct((p as any)._id)}

                          style={{ background: '#fdf3f2', border: '1px solid #fbc4c4', color: '#c0392b', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px', fontSize: '12px' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: CATEGORIES */}
        {activeTab === 'categories' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>Categories</h2>
              <button 
                onClick={() => setShowCategoryModal(true)}
                style={{ background: '#cb8161', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}
              >
                + Add Category
              </button>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e1e6eb', borderRadius: '8px', overflow: 'hidden', maxWidth: '500px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #e1e6eb' }}>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Category Name</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminCategories.map((cat, idx) => (
                    <tr key={cat._id || idx} style={{ borderBottom: '1px solid #f2f4f6' }}>
                      <td style={{ padding: '12px 15px', fontSize: '14px', fontWeight: '500' }}>{cat.name}</td>
                      <td style={{ padding: '12px 15px', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleDeleteCategory(cat._id, cat.name)}
                          style={{ background: '#fdf3f2', border: '1px solid #fbc4c4', color: '#c0392b', padding: '4px 10px', cursor: 'pointer', borderRadius: '3px', fontSize: '12px' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: ORDERS */}
        {activeTab === 'orders' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Order Log</h2>

            <div style={{ background: '#fff', border: '1px solid #e1e6eb', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #e1e6eb' }}>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Order ID</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Date</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Customer</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Total</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Status</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminOrders.map((o) => {
                    const isExpanded = expandedOrderId === o.id;
                    return (
                      <React.Fragment key={o.id}>
                        <tr style={{ borderBottom: '1px solid #f2f4f6' }}>
                          <td style={{ padding: '12px 15px', fontSize: '14px', fontWeight: 'bold' }}>{o.id}</td>
                          <td style={{ padding: '12px 15px', fontSize: '14px', color: '#555' }}>{o.date}</td>
                          <td style={{ padding: '12px 15px', fontSize: '14px', color: '#555' }}>
                            {o.billingAddress.firstName} {o.billingAddress.lastName}
                          </td>
                          <td style={{ padding: '12px 15px', fontSize: '14px', fontWeight: 'bold' }}>${o.total.toFixed(2)}</td>
                          <td style={{ padding: '12px 15px' }}>
                            <select 
                              value={o.status}
                              onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                              style={{ height: '30px', padding: '0 5px', fontSize: '13px', border: '1px solid #ccc', borderRadius: '4px' }}
                            >
                              {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                                <option key={st} value={st}>{st}</option>
                              ))}
                            </select>
                          </td>
                          <td style={{ padding: '12px 15px' }}>
                            <button 
                              onClick={() => setExpandedOrderId(isExpanded ? null : o.id)}
                              style={{ background: '#f0f0f0', border: '1px solid #ccc', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px', fontSize: '12px' }}
                            >
                              {isExpanded ? 'Hide' : 'Details'}
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr style={{ background: '#fafbfc' }}>
                            <td colSpan={6} style={{ padding: '20px 30px', borderBottom: '1px solid #e1e6eb' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                <div>
                                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Items Log</h4>
                                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {o.items.map((item, idx) => (
                                      <li key={idx} style={{ fontSize: '13px', display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #eee' }}>
                                        <span>{item.product.name} (x{item.quantity})</span>
                                        <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Billing Details</h4>
                                  <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', margin: 0 }}>
                                    <strong>Name:</strong> {o.billingAddress.firstName} {o.billingAddress.lastName}<br />
                                    <strong>Address:</strong> {o.billingAddress.address}, {o.billingAddress.city}<br />
                                    <strong>Phone:</strong> {o.billingAddress.phone}<br />
                                    <strong>Email:</strong> {o.billingAddress.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                  {adminOrders.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
                        No orders recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: CONTACTS */}
        {activeTab === 'contacts' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Inbox Messages</h2>

            <div style={{ background: '#fff', border: '1px solid #e1e6eb', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #e1e6eb' }}>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Customer</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Subject</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Message</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Status</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminContacts.map((c) => (
                    <tr key={c._id} style={{ borderBottom: '1px solid #f2f4f6', background: c.status === 'Unread' ? '#fafcfe' : '#fff' }}>
                      <td style={{ padding: '12px 15px', fontSize: '14px' }}>
                        <strong style={{ display: 'block' }}>{c.name}</strong>
                        <span style={{ fontSize: '12px', color: '#777' }}>{c.email}</span>
                      </td>
                      <td style={{ padding: '12px 15px', fontSize: '14px', color: '#333', fontWeight: '600' }}>{c.subject}</td>
                      <td style={{ padding: '12px 15px', fontSize: '13px', color: '#555', maxWidth: '300px' }}>{c.message}</td>
                      <td style={{ padding: '12px 15px', fontSize: '13px' }}>
                        <span style={{ color: c.status === 'Read' ? '#999' : '#2980b9', fontWeight: 'bold' }}>
                          {c.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 15px' }}>
                        <button 
                          onClick={() => handleToggleContactRead(c._id, c.status === 'Read' ? 'Unread' : 'Read')}
                          style={{ background: '#f0f0f0', border: '1px solid #ccc', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px', fontSize: '12px' }}
                        >
                          Mark {c.status === 'Read' ? 'Unread' : 'Read'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {adminContacts.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
                        No customer messages found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: BLOGS */}
        {activeTab === 'blogs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>Blog Posts</h2>
              <button 
                onClick={openAddBlog}
                style={{ background: '#cb8161', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}
              >
                + Add Blog Post
              </button>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e1e6eb', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #e1e6eb' }}>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Title</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Category</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Date</th>
                    <th style={{ padding: '12px 15px', fontSize: '13px', color: '#888' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((b) => (
                    <tr key={b.id} style={{ borderBottom: '1px solid #f2f4f6' }}>
                      <td style={{ padding: '12px 15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={b.image} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        <strong>{b.title}</strong>
                      </td>
                      <td style={{ padding: '12px 15px', fontSize: '14px', color: '#555' }}>{b.category}</td>
                      <td style={{ padding: '12px 15px', fontSize: '14px', color: '#555' }}>{b.date}</td>
                      <td style={{ padding: '12px 15px' }}>
                        <button 
                          onClick={() => openEditBlog(b)}
                          style={{ background: '#f0f0f0', border: '1px solid #ccc', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px', marginRight: '8px', fontSize: '12px' }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteBlog(b.id)}
                          style={{ background: '#fdf3f2', border: '1px solid #fbc4c4', color: '#c0392b', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px', fontSize: '12px' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* MODAL: ADD/EDIT PRODUCT */}
      {showProductModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            
            <form onSubmit={handleProductSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Name *</label>
                  <input type="text" required value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} style={{ width: '100%', height: '36px', padding: '0 8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>SKU *</label>
                  <input type="text" required value={productForm.sku} onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })} style={{ width: '100%', height: '36px', padding: '0 8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Price ($) *</label>
                  <input type="number" step="0.01" required value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })} style={{ width: '100%', height: '36px', padding: '0 8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Original Price ($)</label>
                  <input type="number" step="0.01" value={productForm.originalPrice} onChange={(e) => setProductForm({ ...productForm, originalPrice: parseFloat(e.target.value) || 0 })} style={{ width: '100%', height: '36px', padding: '0 8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Category *</label>
                  <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} style={{ width: '100%', height: '36px', padding: '0 8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    {adminCategories.map(cat => (
                      <option key={cat._id || cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Stock Qty *</label>
                  <input type="number" required value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) || 0 })} style={{ width: '100%', height: '36px', padding: '0 8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Image URL *</label>
                <input type="text" required value={productForm.imageUrl} onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })} style={{ width: '100%', height: '36px', padding: '0 8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Description *</label>
                <textarea rows={4} required value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>

              {/* Toggles */}
              <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
                <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={productForm.featured} onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })} /> Featured
                </label>
                <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={productForm.bestSeller} onChange={(e) => setProductForm({ ...productForm, bestSeller: e.target.checked })} /> Bestseller
                </label>
                <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={productForm.trending} onChange={(e) => setProductForm({ ...productForm, trending: e.target.checked })} /> Trending
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowProductModal(false)} style={{ background: '#f5f5f5', border: '1px solid #ccc', padding: '8px 18px', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: '#000', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD CATEGORY */}
      {showCategoryModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', maxWidth: '400px', width: '100%' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Add Category</h3>
            
            <form onSubmit={handleAddCategory}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Name *</label>
                <input type="text" required value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="e.g. Rings" style={{ width: '100%', height: '36px', padding: '0 8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowCategoryModal(false)} style={{ background: '#f5f5f5', border: '1px solid #ccc', padding: '8px 18px', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: '#000', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD/EDIT BLOG POST */}
      {showBlogModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
            </h3>
            
            <form onSubmit={handleBlogSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Title *</label>
                <input type="text" required value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} style={{ width: '100%', height: '36px', padding: '0 8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Category *</label>
                  <select value={blogForm.category} onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })} style={{ width: '100%', height: '36px', padding: '0 8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    {['Tips', 'Collections', 'News', 'Design', 'Bridal', 'Guides'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Status *</label>
                  <select value={blogForm.status} onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value as any })} style={{ width: '100%', height: '36px', padding: '0 8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Cover Image URL *</label>
                <input type="text" required value={blogForm.imageUrl} onChange={(e) => setBlogForm({ ...blogForm, imageUrl: e.target.value })} style={{ width: '100%', height: '36px', padding: '0 8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Summary / Excerpt *</label>
                <input type="text" required value={blogForm.summary} onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })} style={{ width: '100%', height: '36px', padding: '0 8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>Blog Content *</label>
                <textarea rows={8} required value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowBlogModal(false)} style={{ background: '#f5f5f5', border: '1px solid #ccc', padding: '8px 18px', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: '#000', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Save Post</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;

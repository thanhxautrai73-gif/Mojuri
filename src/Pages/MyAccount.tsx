import React, { useState } from 'react';
import { useShop } from '../Context/ShopContext';

const MyAccount: React.FC = () => {
  const { user, login, register, logout, navigate, orders } = useShop();

  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders'>('dashboard');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUser || !loginPass) {
      alert('Please fill out all fields.');
      return;
    }
    const success = await login(loginUser, loginPass);
    if (success) {
      alert('Logged in successfully!');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !regPass) {
      alert('Please fill out all fields.');
      return;
    }
    const name = regEmail.split('@')[0];
    const success = await register(name, regEmail, regPass);
    if (success) {
      alert('Registered successfully! Please sign in using the Login form.');
      setRegEmail('');
      setRegPass('');
    }
  };

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Breadcrumb */}
          <div id="title-bar" className="title-bar" style={{ background: '#f5f5f5', padding: '25px 0' }}>
            <div className="section-container">
              <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="col-md-6 col-sm-6">
                  <h1 className="title-bar-title" style={{ fontSize: '24px', margin: 0 }}>My Account</h1>
                </div>
                <div className="col-md-6 col-sm-6 text-right">
                  <ul className="breadcrumb" style={{ listStyle: 'none', display: 'flex', gap: '8px', justifyContent: 'flex-end', margin: 0, padding: 0 }}>
                    <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a></li>
                    <li>/</li>
                    <li className="active">My Account</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container large">
                {user?.loggedIn ? (
                  activeTab === 'dashboard' ? (
                    /* Logged In Dashboard */
                    <div style={{ background: '#fff', padding: '40px', border: '1px solid #eee', maxWidth: '800px', margin: '0 auto' }}>
                      <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>Dashboard</h2>
                      <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', marginBottom: '25px' }}>
                        Hello <strong>{user.username}</strong> (not <strong>{user.username}</strong>? <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} style={{ color: '#d9534f', textDecoration: 'underline' }}>Log out</a>)
                      </p>
                      
                      <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', marginBottom: '30px' }}>
                        From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
                      </p>

                      <div className="dashboard-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        <div style={{ flex: '1 1 220px', border: '1px solid #eee', padding: '20px', textAlign: 'center', background: '#fcfcfc' }}>
                          <div style={{ fontSize: '28px', color: '#000', marginBottom: '10px' }}><i className="icon-large-paper-bag" /></div>
                          <h3 style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold' }}>Orders</h3>
                          <p style={{ color: '#888', fontSize: '13px', margin: '0 0 15px 0' }}>Track your purchase history.</p>
                          <button className="button" style={{ height: '35px', padding: '0 15px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px' }} onClick={() => setActiveTab('orders')}>View History</button>
                        </div>
                        <div style={{ flex: '1 1 220px', border: '1px solid #eee', padding: '20px', textAlign: 'center', background: '#fcfcfc' }}>
                          <div style={{ fontSize: '28px', color: '#000', marginBottom: '10px' }}><i className="icon-map" /></div>
                          <h3 style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold' }}>Addresses</h3>
                          <p style={{ color: '#888', fontSize: '13px', margin: '0 0 15px 0' }}>Manage shipping locations.</p>
                          <button className="button" style={{ height: '35px', padding: '0 15px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px' }} onClick={() => navigate('checkout')}>Edit Address</button>
                        </div>
                        <div style={{ flex: '1 1 220px', border: '1px solid #eee', padding: '20px', textAlign: 'center', background: '#fcfcfc' }}>
                          <div style={{ fontSize: '28px', color: '#000', marginBottom: '10px' }}><i className="icon-user" /></div>
                          <h3 style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold' }}>Account Details</h3>
                          <p style={{ color: '#888', fontSize: '13px', margin: '0 0 15px 0' }}>Manage password settings.</p>
                          <button className="button" style={{ height: '35px', padding: '0 15px', background: '#d9534f', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px' }} onClick={logout}>LOGOUT</button>
                        </div>
                        {user.role === 'admin' && (
                          <div style={{ flex: '1 1 220px', border: '1px solid #eee', padding: '20px', textAlign: 'center', background: '#fcfcfc', borderColor: '#cb8161' }}>
                            <div style={{ fontSize: '28px', color: '#cb8161', marginBottom: '10px' }}><i className="icon-speedometer" /></div>
                            <h3 style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold', color: '#cb8161' }}>Admin Panel</h3>
                            <p style={{ color: '#888', fontSize: '13px', margin: '0 0 15px 0' }}>Access system management tools.</p>
                            <button className="button" style={{ height: '35px', padding: '0 15px', background: '#cb8161', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }} onClick={() => navigate('admin')}>Go to Admin</button>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Order History View */
                    <div style={{ background: '#fff', padding: '40px', border: '1px solid #eee', maxWidth: '800px', margin: '0 auto' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Order History</h2>
                        <button 
                          style={{ background: '#000', color: '#fff', border: 'none', padding: '8px 18px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}
                          onClick={() => { setActiveTab('dashboard'); setExpandedOrderId(null); }}
                        >
                          Back to Dashboard
                        </button>
                      </div>

                      {orders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                          <p style={{ color: '#666', marginBottom: '20px' }}>You haven't placed any orders yet.</p>
                          <button 
                            className="button"
                            style={{ background: '#000', color: '#fff', padding: '10px 25px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                            onClick={() => navigate('shop')}
                          >
                            Go to Shop
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                          {orders.map((order) => {
                            const isExpanded = expandedOrderId === order.id;
                            return (
                              <div key={order.id} style={{ border: '1px solid #eee', padding: '20px', borderRadius: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                                  <div>
                                    <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order ID</span>
                                    <strong style={{ display: 'block', fontSize: '15px', color: '#000', marginTop: '2px' }}>{order.id}</strong>
                                  </div>
                                  <div>
                                    <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</span>
                                    <span style={{ display: 'block', fontSize: '14px', color: '#333', marginTop: '2px' }}>{order.date}</span>
                                  </div>
                                  <div>
                                    <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</span>
                                    <span style={{ display: 'block', fontSize: '13px', color: '#27ae60', fontWeight: 'bold', marginTop: '2px' }}>{order.status}</span>
                                  </div>
                                  <div>
                                    <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</span>
                                    <strong style={{ display: 'block', fontSize: '15px', color: '#000', marginTop: '2px' }}>${order.total.toFixed(2)}</strong>
                                  </div>
                                  <div>
                                    <button 
                                      style={{ background: '#f5f5f5', border: '1px solid #ddd', padding: '6px 15px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                                      onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                                    >
                                      {isExpanded ? 'Hide Details' : 'View Details'}
                                    </button>
                                  </div>
                                </div>

                                {isExpanded && (
                                  <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', color: '#888' }}>Items Ordered</h4>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                                      <thead>
                                        <tr style={{ borderBottom: '1px solid #eee', color: '#888', fontSize: '12px' }}>
                                          <th style={{ textAlign: 'left', padding: '8px 0', fontWeight: 'normal' }}>Product</th>
                                          <th style={{ textAlign: 'center', padding: '8px 0', fontWeight: 'normal' }}>Qty</th>
                                          <th style={{ textAlign: 'right', padding: '8px 0', fontWeight: 'normal' }}>Price</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {order.items.map((item) => (
                                          <tr key={item.product.id} style={{ borderBottom: '1px solid #f9f9f9', fontSize: '14px' }}>
                                            <td style={{ padding: '10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                              <img src={item.product.images[0]} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', border: '1px solid #eee' }} />
                                              <span style={{ fontWeight: '500' }}>{item.product.name}</span>
                                            </td>
                                            <td style={{ textAlign: 'center', padding: '10px 0' }}>{item.quantity}</td>
                                            <td style={{ textAlign: 'right', padding: '10px 0' }}>${item.product.price.toFixed(2)}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>

                                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', color: '#888' }}>Billing & Shipping Details</h4>
                                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', margin: 0 }}>
                                      <strong>{order.billingAddress.firstName} {order.billingAddress.lastName}</strong><br />
                                      {order.billingAddress.address}, {order.billingAddress.city}<br />
                                      Phone: {order.billingAddress.phone}<br />
                                      Email: {order.billingAddress.email}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )
                ) : (
                  /* Login/Register Guest Forms */
                  <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
                    {/* Login column */}
                    <div className="col-md-5 col-sm-12" style={{ background: '#fcfcfc', padding: '30px', border: '1px solid #eee', flex: '1 1 400px', maxWidth: '500px' }}>
                      <form onSubmit={handleLoginSubmit}>
                        <h2 style={{ fontSize: '22px', marginBottom: '20px', fontWeight: 'bold' }}>Login</h2>
                        <div className="content">
                          <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Username or email address *</label>
                            <input 
                              type="text" 
                              required 
                              value={loginUser}
                              onChange={(e) => setLoginUser(e.target.value)}
                              style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px', background: '#fff' }}
                            />
                          </div>
                          <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Password *</label>
                            <input 
                              type="password" 
                              required 
                              value={loginPass}
                              onChange={(e) => setLoginPass(e.target.value)}
                              style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px', background: '#fff' }}
                            />
                          </div>
                          <div className="rememberme-lost" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div>
                              <input type="checkbox" id="myaccount_rememberme" style={{ marginRight: '5px' }} />
                              <label htmlFor="myaccount_rememberme" style={{ fontSize: '14px', cursor: 'pointer' }}>Remember me</label>
                            </div>
                            <a href="#/forgot-password" onClick={(e) => { e.preventDefault(); navigate('forgot-password'); }} style={{ fontSize: '13px', color: '#666', textDecoration: 'underline' }}>Lost your password?</a>
                          </div>
                          <button 
                            type="submit" 
                            className="button"
                            style={{ width: '100%', height: '45px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            LOG IN
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Register column */}
                    <div className="col-md-5 col-sm-12" style={{ background: '#fcfcfc', padding: '30px', border: '1px solid #eee', flex: '1 1 400px', maxWidth: '500px' }}>
                      <form onSubmit={handleRegisterSubmit}>
                        <h2 style={{ fontSize: '22px', marginBottom: '20px', fontWeight: 'bold' }}>Register</h2>
                        <div className="content">
                          <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Email address *</label>
                            <input 
                              type="email" 
                              required 
                              value={regEmail}
                              onChange={(e) => setRegEmail(e.target.value)}
                              style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px', background: '#fff' }}
                            />
                          </div>
                          <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Password *</label>
                            <input 
                              type="password" 
                              required 
                              value={regPass}
                              onChange={(e) => setRegPass(e.target.value)}
                              style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px', background: '#fff' }}
                            />
                          </div>
                          <button 
                            type="submit" 
                            className="button"
                            style={{ width: '100%', height: '45px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            REGISTER
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyAccount;

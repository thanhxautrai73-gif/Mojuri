import React, { useState } from 'react';
import { useShop } from '../Context/ShopContext';

const Checkout: React.FC = () => {
  const {
    cart,
    navigate,
    discount,
    placeOrder,
    user
  } = useShop();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [notes, setNotes] = useState('');
  
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 400;
  const shippingCost = cartSubtotal >= freeShippingThreshold ? 0 : 10;
  const discountAmount = cartSubtotal * (discount / 100);
  const orderTotal = cartSubtotal - discountAmount + shippingCost;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !address || !city || !phone || !email) {
      alert('Please fill in all required billing fields.');
      return;
    }

    const billingAddress = {
      firstName,
      lastName,
      address,
      city,
      phone,
      email
    };

    try {
      const finalOrderId = await placeOrder(billingAddress, orderTotal);
      setOrderId(finalOrderId);
      setOrderCompleted(true);
      window.scrollTo(0, 0);
    } catch (err: any) {
      alert(err.message || 'Error placing order');
    }
  };

  if (orderCompleted) {
    return (
      <div id="site-main" className="site-main">
        <div id="main-content" className="main-content">
          <div className="section-padding">
            <div className="section-container large" style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: '72px', color: '#5cb85c', marginBottom: '20px' }}>
                <i className="icon-star" style={{ color: '#5cb85c' }} />
              </div>
              <h1 style={{ fontSize: '32px', marginBottom: '15px', fontWeight: 'bold' }}>Thank You for Your Order!</h1>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>
                Your order has been placed successfully. Order ID is <strong>{orderId}</strong>.
              </p>
              <p style={{ fontSize: '15px', color: '#888', marginBottom: '35px' }}>
                We have sent an order confirmation email with details to <strong>{email}</strong>.
              </p>
              <button 
                className="button"
                style={{ background: '#000', color: '#fff', border: 'none', padding: '15px 40px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
                onClick={() => navigate('shop')}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Breadcrumb */}
          <div id="title-bar" className="title-bar" style={{ background: '#f5f5f5', padding: '20px 0' }}>
            <div className="section-container">
              <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="col-md-6 col-sm-6">
                  <h1 className="title-bar-title" style={{ fontSize: '24px', margin: 0 }}>Checkout</h1>
                </div>
                <div className="col-md-6 col-sm-6 text-right">
                  <ul className="breadcrumb" style={{ listStyle: 'none', display: 'flex', gap: '8px', justifyContent: 'flex-end', margin: 0, padding: 0 }}>
                    <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a></li>
                    <li>/</li>
                    <li><a href="#/cart" onClick={(e) => { e.preventDefault(); navigate('cart'); }}>Cart</a></li>
                    <li>/</li>
                    <li className="active">Checkout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container large">
                {cart.length === 0 ? (
                  <div style={{ padding: '60px 0', textAlign: 'center' }}>
                    <h2>Your cart is empty!</h2>
                    <p style={{ color: '#888', marginBottom: '20px' }}>You cannot checkout with an empty cart.</p>
                    <button 
                      className="button"
                      style={{ background: '#000', color: '#fff', border: 'none', padding: '12px 30px', cursor: 'pointer' }}
                      onClick={() => navigate('shop')}
                    >
                      RETURN TO SHOP
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handlePlaceOrder}>
                    <div className="row">
                      {/* Left: Billing details */}
                      <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 m-b-30">
                        <div className="billing-details-wrapper" style={{ background: '#fff', paddingRight: '15px' }}>
                          <h2 style={{ fontSize: '22px', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px', margin: 0 }}>Billing Details</h2>
                          
                          <div className="row" style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                            <div className="col" style={{ flex: 1 }}>
                              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>First Name *</label>
                              <input 
                                type="text" 
                                required 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)}
                                style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px' }}
                              />
                            </div>
                            <div className="col" style={{ flex: 1 }}>
                              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Last Name *</label>
                              <input 
                                type="text" 
                                required 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)}
                                style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px' }}
                              />
                            </div>
                          </div>

                          <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Street Address *</label>
                            <input 
                              type="text" 
                              required 
                              placeholder="House number and street name"
                              value={address} 
                              onChange={(e) => setAddress(e.target.value)}
                              style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px' }}
                            />
                          </div>

                          <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Town / City *</label>
                            <input 
                              type="text" 
                              required 
                              value={city} 
                              onChange={(e) => setCity(e.target.value)}
                              style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px' }}
                            />
                          </div>

                          <div className="row" style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                            <div className="col" style={{ flex: 1 }}>
                              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Phone *</label>
                              <input 
                                type="tel" 
                                required 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)}
                                style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px' }}
                              />
                            </div>
                            <div className="col" style={{ flex: 1 }}>
                              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Email Address *</label>
                              <input 
                                type="email" 
                                required 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px' }}
                              />
                            </div>
                          </div>

                          <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Order Notes (Optional)</label>
                            <textarea 
                              rows={4}
                              placeholder="Notes about your order, e.g. special notes for delivery."
                              value={notes} 
                              onChange={(e) => setNotes(e.target.value)}
                              style={{ width: '100%', border: '1px solid #ddd', padding: '10px' }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right: Order summary & payments */}
                      <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
                        <div className="checkout-summary" style={{ background: '#f9f9f9', padding: '25px', border: '1px solid #eee' }}>
                          <h2 style={{ fontSize: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px', margin: 0 }}>Your Order</h2>
                          
                          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                            <thead>
                              <tr style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                                <th style={{ textAlign: 'left', padding: '10px 0' }}>Product</th>
                                <th style={{ textAlign: 'right', padding: '10px 0' }}>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cart.map((item) => (
                                <tr key={item.product.id} style={{ borderBottom: '1px solid #eee' }}>
                                  <td style={{ padding: '12px 0', color: '#666', fontSize: '14px' }}>
                                    {item.product.name} <strong>x {item.quantity}</strong>
                                  </td>
                                  <td style={{ textAlign: 'right', padding: '12px 0', fontSize: '14px' }}>
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                              <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '12px 0', fontSize: '15px' }}>Subtotal</td>
                                <td style={{ textAlign: 'right', padding: '12px 0', fontWeight: 'bold' }}>
                                  ${cartSubtotal.toFixed(2)}
                                </td>
                              </tr>
                              {discount > 0 && (
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                  <td style={{ padding: '12px 0', fontSize: '15px', color: '#27ae60' }}>Coupon Discount ({discount}%)</td>
                                  <td style={{ textAlign: 'right', padding: '12px 0', fontWeight: 'bold', color: '#27ae60' }}>
                                    -${discountAmount.toFixed(2)}
                                  </td>
                                </tr>
                              )}
                              <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '12px 0', fontSize: '15px' }}>Shipping</td>
                                <td style={{ textAlign: 'right', padding: '12px 0' }}>
                                  {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                                </td>
                              </tr>
                              <tr style={{ borderBottom: '2px solid #ccc' }}>
                                <td style={{ padding: '15px 0', fontSize: '16px', fontWeight: 'bold' }}>Total</td>
                                <td style={{ textAlign: 'right', padding: '15px 0', fontSize: '18px', fontWeight: 'bold', color: '#000' }}>
                                  ${orderTotal.toFixed(2)}
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          {/* Payment choices */}
                          <div className="checkout-payment" style={{ marginBottom: '25px' }}>
                            <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Payment Method</h3>
                            <div style={{ marginBottom: '10px' }}>
                              <input type="radio" id="cod" name="payment" defaultChecked style={{ marginRight: '8px' }} />
                              <label htmlFor="cod" style={{ fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>Cash on Delivery (COD)</label>
                              <p style={{ margin: '5px 0 0 20px', fontSize: '12px', color: '#888' }}>Pay with cash upon delivery of your items.</p>
                            </div>
                            <div>
                              <input type="radio" id="bank" name="payment" style={{ marginRight: '8px' }} />
                              <label htmlFor="bank" style={{ fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>Direct Bank Transfer</label>
                              <p style={{ margin: '5px 0 0 20px', fontSize: '12px', color: '#888' }}>Make your payment directly into our bank account. Your order will not be shipped until the funds have cleared.</p>
                            </div>
                          </div>

                          <button 
                            type="submit" 
                            className="button alt"
                            style={{ width: '100%', height: '50px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
                          >
                            PLACE ORDER
                          </button>
                        </div>
                      </div>

                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

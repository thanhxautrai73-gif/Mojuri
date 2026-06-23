import React, { useState } from 'react';
import { useShop } from '../Context/ShopContext';

const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    navigate,
    appliedCoupon,
    discount,
    applyCoupon,
    removeCoupon
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 400;
  const discountAmount = cartSubtotal * (discount / 100);
  const shippingFee = cartSubtotal >= freeShippingThreshold ? 0 : 10;
  const finalTotal = cartSubtotal - discountAmount + shippingFee;
  const progressPercent = Math.min((cartSubtotal / freeShippingThreshold) * 100, 100);

  const handleQtyChange = (productId: string, qty: number) => {
    updateCartQuantity(productId, qty);
  };

  const handleCheckoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('checkout');
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput('');
    } else {
      alert('Invalid coupon code! Try MOJURI10, GOLD20, or SPECIAL30.');
    }
  };

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Breadcrumb */}
          <div id="title-bar" className="title-bar" style={{ background: '#f5f5f5', padding: '20px 0' }}>
            <div className="section-container">
              <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="col-md-6 col-sm-6">
                  <h1 className="title-bar-title" style={{ fontSize: '24px', margin: 0 }}>Shopping Cart</h1>
                </div>
                <div className="col-md-6 col-sm-6 text-right">
                  <ul className="breadcrumb" style={{ listStyle: 'none', display: 'flex', gap: '8px', justifyContent: 'flex-end', margin: 0, padding: 0 }}>
                    <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a></li>
                    <li>/</li>
                    <li className="active">Cart</li>
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
                    <p style={{ color: '#888', marginBottom: '20px' }}>Add some products from our store to get started.</p>
                    <button 
                      className="button"
                      style={{ background: '#000', color: '#fff', border: 'none', padding: '12px 30px', cursor: 'pointer', fontWeight: 'bold' }}
                      onClick={() => navigate('shop')}
                    >
                      RETURN TO SHOP
                    </button>
                  </div>
                ) : (
                  <div className="row">
                    {/* Cart Table list */}
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 m-b-30">
                      {/* Free Shipping Alert */}
                      <div className="free-ship-banner" style={{ background: '#f9f9f9', border: '1px solid #eee', padding: '20px', marginBottom: '25px' }}>
                        <div className="title-ship" style={{ fontSize: '15px', marginBottom: '10px' }}>
                          {cartSubtotal >= freeShippingThreshold ? (
                            <span>Congratulations! You qualify for <strong>FREE Shipping!</strong></span>
                          ) : (
                            <span>Buy <strong>${(freeShippingThreshold - cartSubtotal).toFixed(2)}</strong> more to enjoy <strong>FREE Shipping</strong></span>
                          )}
                        </div>
                        <div className="total-percent" style={{ background: '#eee', borderRadius: '5px', height: '10px', overflow: 'hidden' }}>
                          <div className="percent" style={{ width: `${progressPercent}%`, background: '#000', height: '100%', transition: 'width 0.3s ease' }} />
                        </div>
                      </div>

                      <table className="shop-cart-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                            <th style={{ padding: '12px 5px' }}>Product</th>
                            <th style={{ padding: '12px 5px' }}>Price</th>
                            <th style={{ padding: '12px 5px' }}>Quantity</th>
                            <th style={{ padding: '12px 5px' }}>Subtotal</th>
                            <th style={{ padding: '12px 5px' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((item) => (
                            <tr key={item.product.id} style={{ borderBottom: '1px solid #eee' }}>
                              {/* Product Info */}
                              <td style={{ padding: '15px 5px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <img src={item.product.images[0]} alt="" style={{ width: '70px', height: '70px', objectFit: 'cover', border: '1px solid #eee' }} />
                                <div>
                                  <a 
                                    href={`#/details?id=${item.product.id}`} 
                                    onClick={(e) => { e.preventDefault(); navigate('details', item.product.id); }}
                                    style={{ color: '#000', fontWeight: 'bold', fontSize: '15px' }}
                                  >
                                    {item.product.name}
                                  </a>
                                  <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>SKU: {item.product.sku}</div>
                                </div>
                              </td>
                              
                              {/* Price */}
                              <td style={{ padding: '15px 5px', fontSize: '15px' }}>
                                ${item.product.price.toFixed(2)}
                              </td>

                              {/* Qty Selector */}
                              <td style={{ padding: '15px 5px' }}>
                                <div className="quantity" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                  <button 
                                    type="button" 
                                    style={{ height: '35px', width: '30px', background: '#fff', border: '1px solid #ddd', cursor: 'pointer' }}
                                    onClick={() => handleQtyChange(item.product.id, item.quantity - 1)}
                                  >
                                    -
                                  </button>
                                  <input 
                                    type="number" 
                                    value={item.quantity}
                                    onChange={(e) => handleQtyChange(item.product.id, parseInt(e.target.value) || 1)}
                                    min="1"
                                    max={item.product.stock}
                                    style={{ height: '35px', width: '40px', textAlign: 'center', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', borderLeft: 'none', borderRight: 'none', outline: 'none' }}
                                  />
                                  <button 
                                    type="button" 
                                    style={{ height: '35px', width: '30px', background: '#fff', border: '1px solid #ddd', cursor: 'pointer' }}
                                    onClick={() => handleQtyChange(item.product.id, item.quantity + 1)}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>

                              {/* Subtotal */}
                              <td style={{ padding: '15px 5px', fontSize: '15px', fontWeight: 'bold' }}>
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </td>

                              {/* Remove */}
                              <td style={{ padding: '15px 5px' }}>
                                <button 
                                  className="btn-remove" 
                                  onClick={() => removeFromCart(item.product.id)}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '16px' }}
                                >
                                  <i className="icon_close" /> Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                        <button 
                          className="button"
                          style={{ border: '1px solid #000', background: '#fff', color: '#000', padding: '10px 25px', cursor: 'pointer', fontWeight: 'bold' }}
                          onClick={() => navigate('shop')}
                        >
                          CONTINUE SHOPPING
                        </button>
                        
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          {appliedCoupon ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f5f5f5', border: '1px solid #eee', padding: '8px 15px' }}>
                              <span style={{ fontSize: '14px', color: '#333' }}>Coupon: <strong>{appliedCoupon}</strong> ({discount}% OFF)</span>
                              <button 
                                onClick={removeCoupon} 
                                style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', padding: '0 5px' }}
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '10px', margin: 0 }}>
                              <input 
                                type="text" 
                                placeholder="Coupon code (e.g. MOJURI10)" 
                                value={couponInput}
                                onChange={(e) => setCouponInput(e.target.value)}
                                style={{ padding: '0 15px', border: '1px solid #ddd', height: '40px', minWidth: '220px', outline: 'none', background: '#fff' }}
                              />
                              <button 
                                type="submit"
                                className="button"
                                style={{ background: '#000', color: '#fff', border: 'none', padding: '0 20px', height: '40px', cursor: 'pointer', fontWeight: 'bold' }}
                              >
                                APPLY COUPON
                              </button>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Cart Totals Summary */}
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                      <div className="cart-collaterals" style={{ background: '#f9f9f9', padding: '25px', border: '1px solid #eee' }}>
                        <h2 style={{ fontSize: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px', margin: 0 }}>Cart Totals</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '15px' }}>
                          <span>Subtotal</span>
                          <strong>${cartSubtotal.toFixed(2)}</strong>
                        </div>
                        {discount > 0 && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '15px', color: '#27ae60' }}>
                            <span>Coupon Discount ({discount}%)</span>
                            <strong>-${discountAmount.toFixed(2)}</strong>
                          </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
                          <span>Shipping</span>
                          <span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '18px', fontWeight: 'bold' }}>
                          <span>Total</span>
                          <span style={{ color: '#000' }}>
                            ${finalTotal.toFixed(2)}
                          </span>
                        </div>
                        <button 
                          className="button checkout"
                          onClick={handleCheckoutClick}
                          style={{ width: '100%', height: '50px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
                        >
                          PROCEED TO CHECKOUT
                        </button>
                      </div>
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

export default Cart;

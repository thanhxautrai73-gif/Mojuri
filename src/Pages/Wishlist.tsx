import React from 'react';
import { useShop } from '../Context/ShopContext';

const Wishlist: React.FC = () => {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    navigate
  } = useShop();

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleRemove = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
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
                  <h1 className="title-bar-title" style={{ fontSize: '24px', margin: 0 }}>Wishlist</h1>
                </div>
                <div className="col-md-6 col-sm-6 text-right">
                  <ul className="breadcrumb" style={{ listStyle: 'none', display: 'flex', gap: '8px', justifyContent: 'flex-end', margin: 0, padding: 0 }}>
                    <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a></li>
                    <li>/</li>
                    <li className="active">Wishlist</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container large">
                {wishlist.length === 0 ? (
                  <div style={{ padding: '60px 0', textAlign: 'center' }}>
                    <h2>Your wishlist is empty!</h2>
                    <p style={{ color: '#888', marginBottom: '20px' }}>Add some products from our store to save them here.</p>
                    <button 
                      className="button"
                      style={{ background: '#000', color: '#fff', border: 'none', padding: '12px 30px', cursor: 'pointer', fontWeight: 'bold' }}
                      onClick={() => navigate('shop')}
                    >
                      RETURN TO SHOP
                    </button>
                  </div>
                ) : (
                  <table className="shop-cart-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                        <th style={{ padding: '12px 5px' }}>Product</th>
                        <th style={{ padding: '12px 5px' }}>Unit Price</th>
                        <th style={{ padding: '12px 5px' }}>Stock Status</th>
                        <th style={{ padding: '12px 5px' }}>Action</th>
                        <th style={{ padding: '12px 5px' }}>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist.map((product) => (
                        <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                          {/* Product image and name */}
                          <td style={{ padding: '15px 5px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <img src={product.images[0]} alt="" style={{ width: '70px', height: '70px', objectFit: 'cover', border: '1px solid #eee' }} />
                            <div>
                              <a 
                                href={`#/details?id=${product.id}`} 
                                onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}
                                style={{ color: '#000', fontWeight: 'bold', fontSize: '15px' }}
                              >
                                {product.name}
                              </a>
                              <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>SKU: {product.sku}</div>
                            </div>
                          </td>

                          {/* Unit price */}
                          <td style={{ padding: '15px 5px', fontSize: '15px' }}>
                            ${product.price.toFixed(2)}
                          </td>

                          {/* Stock status */}
                          <td style={{ padding: '15px 5px', fontSize: '14px' }}>
                            {product.stock > 0 ? (
                              <span style={{ color: '#5cb85c', fontWeight: 'bold' }}>In Stock</span>
                            ) : (
                              <span style={{ color: '#d9534f', fontWeight: 'bold' }}>Out of Stock</span>
                            )}
                          </td>

                          {/* Add to cart action */}
                          <td style={{ padding: '15px 5px' }}>
                            <button 
                              className="button btn btn-xs"
                              onClick={(e) => handleAddToCart(product, e)}
                              disabled={product.stock <= 0}
                              style={{ 
                                background: '#000', 
                                color: '#fff', 
                                border: 'none', 
                                padding: '8px 20px', 
                                cursor: 'pointer', 
                                fontWeight: 'bold',
                                fontSize: '13px'
                              }}
                            >
                              Add to cart
                            </button>
                          </td>

                          {/* Remove action */}
                          <td style={{ padding: '15px 5px' }}>
                            <button 
                              className="btn-remove" 
                              onClick={(e) => handleRemove(product, e)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '16px' }}
                            >
                              <i className="icon_close" /> Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

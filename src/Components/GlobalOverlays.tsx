import { useState } from 'react';
import { useShop } from '../Context/ShopContext';

const GlobalOverlays = () => {
  const {
    compare,
    quickViewProduct,
    closeQuickView,
    removeFromCompare,
    addToCart,
    navigate
  } = useShop();

  const [quickViewQty, setQuickViewQty] = useState(1);

  // Close compare popup trigger
  const handleCloseCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    const popup = document.querySelector('.compare-popup');
    if (popup) popup.classList.remove('active');
  };

  const handleQuickViewAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickViewProduct) {
      addToCart(quickViewProduct, quickViewQty);
      closeQuickView();
      setQuickViewQty(1);
    }
  };

  const handleLinkClick = (page: string, id: string | null = null) => {
    navigate(page, id);
    closeQuickView();
    // Also remove active from compare popup just in case
    const popup = document.querySelector('.compare-popup');
    if (popup) popup.classList.remove('active');
  };

  return (
    <>
      {/* Compare Popup */}
      <div className="compare-popup">
        <div className="compare-popup-inner">
          <div className="compare-table">
            <div className="compare-table-inner">
              <a href="#" id="compare-table-close" className="compare-table-close" onClick={handleCloseCompare}>
                <span className="compare-table-close-icon" />
              </a>
              <div className="compare-table-items">
                {compare.length === 0 ? (
                  <div style={{ padding: '40px', textAlign: 'center' }}>
                    <h3>No products added for comparison.</h3>
                  </div>
                ) : (
                  <table id="product-table" className="product-table">
                    <thead>
                      <tr>
                        <th>
                          <a href="#" className="compare-table-settings" onClick={(e) => e.preventDefault()}>Settings</a>
                        </th>
                        {compare.map((item) => (
                          <th key={item.id}>
                            <a href={`#/details?id=${item.id}`} onClick={(e) => { e.preventDefault(); handleLinkClick('details', item.id); }}>
                              {item.name}
                            </a>{' '}
                            <span className="remove" onClick={() => removeFromCompare(item.id)}>remove</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="tr-image">
                        <td className="td-label">Image</td>
                        {compare.map((item) => (
                          <td key={item.id}>
                            <a href={`#/details?id=${item.id}`} onClick={(e) => { e.preventDefault(); handleLinkClick('details', item.id); }}>
                              <img width={600} height={600} src={item.images[0]} alt={item.name} />
                            </a>
                          </td>
                        ))}
                      </tr>
                      <tr className="tr-sku">
                        <td className="td-label">SKU</td>
                        {compare.map((item) => (
                          <td key={item.id}>{item.sku}</td>
                        ))}
                      </tr>
                      <tr className="tr-rating">
                        <td className="td-label">Rating</td>
                        {compare.map((item) => (
                          <td key={item.id}>
                            <div className="star-rating">
                              <span style={{ width: `${(item.rating / 5) * 100}%` }} />
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="tr-price">
                        <td className="td-label">Price</td>
                        {compare.map((item) => (
                          <td key={item.id}>
                            {item.originalPrice ? (
                              <>
                                <del><span className="amount">${item.originalPrice.toFixed(2)}</span></del>{' '}
                                <ins><span className="amount">${item.price.toFixed(2)}</span></ins>
                              </>
                            ) : (
                              <span className="amount">${item.price.toFixed(2)}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr className="tr-add-to-cart">
                        <td className="td-label">Add to cart</td>
                        {compare.map((item) => (
                          <td key={item.id}>
                            <div data-title="Add to cart">
                              <button 
                                className="button" 
                                onClick={() => addToCart(item, 1)}
                                disabled={item.stock <= 0}
                              >
                                {item.stock > 0 ? 'Add to cart' : 'Out of Stock'}
                              </button>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="tr-description">
                        <td className="td-label">Description</td>
                        {compare.map((item) => (
                          <td key={item.id}>{item.description}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quickview Popup */}
      {quickViewProduct && (
        <div className="quickview-popup active" style={{ display: 'block' }}>
          <div id="quickview-container">
            <div className="quickview-container">
              <a href="#" className="quickview-close" onClick={(e) => { e.preventDefault(); closeQuickView(); }} />
              <div className="quickview-notices-wrapper" />
              <div className="product single-product product-type-simple">
                <div className="product-detail">
                  <div className="row">
                    <div className="img-quickview col-md-6 col-sm-12">
                      <div className="product-images-slider">
                        <div id="quickview-slick-carousel">
                          <div className="images">
                            <div className="scroll-image">
                              <div className="slick-wrap">
                                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px 0' }}>
                                  {quickViewProduct.images.map((imgSrc, idx) => (
                                    <div className="img-thumbnail" key={idx} style={{ flex: '0 0 100%' }}>
                                      <img width={900} height={900} src={imgSrc} alt="" style={{ width: '100%', height: 'auto' }} />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="quickview-single-info col-md-6 col-sm-12">
                      <div className="product-content-detail entry-summary">
                        <h1 className="product-title entry-title">{quickViewProduct.name}</h1>
                        <div className="price-single">
                          <div className="price">
                            {quickViewProduct.originalPrice && (
                              <del style={{ marginRight: '10px' }}><span>${quickViewProduct.originalPrice.toFixed(2)}</span></del>
                            )}
                            <span>${quickViewProduct.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="product-rating">
                          <div className="star-rating">
                            <span style={{ width: `${(quickViewProduct.rating / 5) * 100}%` }} />
                          </div>
                          <span className="review-link">({quickViewProduct.reviewsCount} customer reviews)</span>
                        </div>
                        <div className="description">
                          <p>{quickViewProduct.description}</p>
                        </div>
                        <form className="cart" onSubmit={handleQuickViewAddToCart}>
                          <div className="quantity-button">
                            <div className="quantity">
                              <button 
                                type="button" 
                                className="minus"
                                onClick={() => setQuickViewQty(q => Math.max(1, q - 1))}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                className="input-text qty text"
                                name="quantity"
                                value={quickViewQty}
                                onChange={(e) => setQuickViewQty(Math.max(1, parseInt(e.target.value) || 1))}
                                min={1}
                                max={quickViewProduct.stock}
                              />
                              <button 
                                type="button" 
                                className="plus"
                                onClick={() => setQuickViewQty(q => Math.min(quickViewProduct.stock, q + 1))}
                              >
                                +
                              </button>
                            </div>
                            <button 
                              type="submit" 
                              className="single_add_to_cart_button button alt"
                              disabled={quickViewProduct.stock <= 0}
                            >
                              {quickViewProduct.stock > 0 ? 'Add to cart' : 'Out of Stock'}
                            </button>
                          </div>
                        </form>
                        <div className="product_meta">
                          <span className="sku_wrapper">SKU: <span className="sku">{quickViewProduct.sku}</span></span>
                          <span className="posted_in">Category: <a href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}>{quickViewProduct.category}</a></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalOverlays;

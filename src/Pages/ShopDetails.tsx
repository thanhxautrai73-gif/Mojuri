import React, { useState, useMemo } from 'react';
import { useShop } from '../Context/ShopContext';

const ShopDetails: React.FC = () => {
  const {
    selectedId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    navigate,
    products
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [reviewsList, setReviewsList] = useState<Array<{ name: string; date: string; rating: number; comment: string }>>([
    { name: 'Sarah M.', date: 'May 12, 2023', rating: 5, comment: 'Simply stunning! The craftmanship is beautiful, and I get compliments every time I wear it.' },
    { name: 'Michael K.', date: 'June 01, 2023', rating: 4, comment: 'High quality materials and quick delivery. Fits perfectly!' }
  ]);

  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  // Find current product
  const product = useMemo(() => {
    return products.find((p) => p.id === selectedId) || products[0];
  }, [selectedId, products]);

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Related products (same category, excluding current product)
  const relatedProducts = useMemo(() => {
    return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product, products]);

  const wishlisted = isInWishlist(product.id);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment) {
      alert('Please fill out all fields.');
      return;
    }
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });
    setReviewsList((prev) => [
      ...prev,
      {
        name: newReviewName,
        date: today,
        rating: newReviewRating,
        comment: newReviewComment
      }
    ]);
    setNewReviewName('');
    setNewReviewComment('');
    setNewReviewRating(5);
    alert('Thank you for your review!');
  };

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    addToCart(product, quantity);
  };

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Breadcrumbs */}
          <div id="title-bar" className="title-bar" style={{ background: '#f5f5f5', padding: '20px 0' }}>
            <div className="section-container">
              <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="col-md-6 col-sm-6">
                  <h1 className="title-bar-title" style={{ fontSize: '24px', margin: 0 }}>{product.name}</h1>
                </div>
                <div className="col-md-6 col-sm-6 text-right">
                  <ul className="breadcrumb" style={{ listStyle: 'none', display: 'flex', gap: '8px', justifyContent: 'flex-end', margin: 0, padding: 0 }}>
                    <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a></li>
                    <li>/</li>
                    <li><a href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Shop</a></li>
                    <li>/</li>
                    <li className="active">{product.name}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container large">
                <div className="row" style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '50px' }}>
                  {/* Left Column: Images */}
                  <div className="col-md-6 col-sm-12 m-b-30">
                    <div className="product-images-gallery" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div className="main-image-wrapper" style={{ border: '1px solid #eee', background: '#fff' }}>
                        <img 
                          src={product.images[activeImageIdx]} 
                          alt={product.name} 
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </div>
                      <div className="thumbnails-wrapper" style={{ display: 'flex', gap: '10px' }}>
                        {product.images.map((img, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setActiveImageIdx(idx)}
                            style={{ 
                              width: '80px', 
                              height: '80px', 
                              border: activeImageIdx === idx ? '2px solid #000' : '1px solid #eee', 
                              cursor: 'pointer',
                              padding: '2px',
                              background: '#fff'
                            }}
                          >
                            <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Info */}
                  <div className="col-md-6 col-sm-12">
                    <div className="product-content-detail entry-summary" style={{ paddingLeft: '15px' }}>
                      <h1 className="product-title entry-title" style={{ fontSize: '32px', marginBottom: '15px', fontWeight: 'bold' }}>{product.name}</h1>
                      
                      <div className="price-single" style={{ marginBottom: '20px' }}>
                        <div className="price" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                          {product.originalPrice ? (
                            <>
                              <del style={{ color: '#aaa', marginRight: '15px', fontWeight: 'normal', fontSize: '20px' }}>${product.originalPrice.toFixed(2)}</del>
                              <span style={{ color: '#000' }}>${product.price.toFixed(2)}</span>
                            </>
                          ) : (
                            <span>${product.price.toFixed(2)}</span>
                          )}
                        </div>
                      </div>

                      <div className="product-rating" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <div className="star-rating">
                          <span style={{ width: `${(product.rating / 5) * 100}%` }} />
                        </div>
                        <span className="review-link" style={{ fontSize: '14px', color: '#666' }}>
                          ({product.reviewsCount + reviewsList.length - 2} customer reviews)
                        </span>
                      </div>

                      <div className="description" style={{ color: '#666', lineHeight: '1.7', marginBottom: '25px', fontSize: '15px' }}>
                        <p>{product.description}</p>
                      </div>

                      {/* Stock availability */}
                      <div className="stock-info" style={{ marginBottom: '25px', fontSize: '14px' }}>
                        Availability: {' '}
                        {product.stock > 0 ? (
                          <span style={{ color: '#5cb85c', fontWeight: 'bold' }}>In stock ({product.stock} units available)</span>
                        ) : (
                          <span style={{ color: '#d9534f', fontWeight: 'bold' }}>Out of stock</span>
                        )}
                      </div>

                      {/* Add to Cart Form */}
                      <form className="cart" onSubmit={handleAddToCart} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '35px' }}>
                        <div className="quantity" style={{ display: 'flex', alignItems: 'center' }}>
                          <button 
                            type="button" 
                            className="minus" 
                            style={{ height: '45px', width: '40px', background: '#fff', border: '1px solid #ddd', cursor: 'pointer' }}
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                          >
                            -
                          </button>
                          <input 
                            type="number" 
                            className="input-text qty text" 
                            name="quantity" 
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                            min="1" 
                            max={product.stock}
                            style={{ height: '45px', width: '60px', textAlign: 'center', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', borderLeft: 'none', borderRight: 'none', outline: 'none' }}
                          />
                          <button 
                            type="button" 
                            className="plus" 
                            style={{ height: '45px', width: '40px', background: '#fff', border: '1px solid #ddd', cursor: 'pointer' }}
                            onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          type="submit" 
                          className="single_add_to_cart_button button alt"
                          disabled={product.stock <= 0}
                          style={{ height: '45px', padding: '0 40px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          {product.stock > 0 ? 'Add to cart' : 'Out of Stock'}
                        </button>

                        <div className="btn-actions" style={{ display: 'flex', gap: '10px' }}>
                          <button 
                            type="button"
                            className="button btn-default" 
                            onClick={() => toggleWishlist(product)}
                            style={{ height: '45px', width: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', color: wishlisted ? '#d9534f' : '#333' }}
                          >
                            <i className="icon-heart" />
                          </button>
                          <button 
                            type="button"
                            className="button btn-default" 
                            onClick={() => addToCompare(product)}
                            style={{ height: '45px', padding: '0 15px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
                          >
                            Compare
                          </button>
                        </div>
                      </form>

                      {/* Metadata */}
                      <div className="product_meta" style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span>SKU: <strong className="sku">{product.sku}</strong></span>
                        <span>Category: <strong className="posted_in" style={{ cursor: 'pointer' }} onClick={() => { navigate('shop'); }}>{product.category}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs Section */}
                <div className="product-tabs" style={{ marginBottom: '60px' }}>
                  <div className="tabs-header" style={{ display: 'flex', gap: '30px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
                    <h3 
                      onClick={() => setActiveTab('description')}
                      style={{ 
                        fontSize: '18px', 
                        paddingBottom: '12px', 
                        cursor: 'pointer', 
                        borderBottom: activeTab === 'description' ? '2px solid #000' : 'none',
                        margin: 0,
                        fontWeight: activeTab === 'description' ? 'bold' : 'normal'
                      }}
                    >
                      Description
                    </h3>
                    <h3 
                      onClick={() => setActiveTab('reviews')}
                      style={{ 
                        fontSize: '18px', 
                        paddingBottom: '12px', 
                        cursor: 'pointer', 
                        borderBottom: activeTab === 'reviews' ? '2px solid #000' : 'none',
                        margin: 0,
                        fontWeight: activeTab === 'reviews' ? 'bold' : 'normal'
                      }}
                    >
                      Reviews ({reviewsList.length})
                    </h3>
                  </div>

                  <div className="tabs-content" style={{ minHeight: '150px' }}>
                    {activeTab === 'description' ? (
                      <div className="description-tab-content" style={{ lineHeight: '1.8', color: '#666', fontSize: '15px' }}>
                        <p>{product.description}</p>
                        <p>All our jewelry is thoughtfully designed and ethically sourced. We believe in providing premium-quality pieces that stand the test of time, made with carefully selected stones and hypoallergenic metals.</p>
                      </div>
                    ) : (
                      <div className="reviews-tab-content">
                        {/* Reviews List */}
                        <div className="reviews-list" style={{ marginBottom: '40px' }}>
                          {reviewsList.map((review, index) => (
                            <div className="review-item" key={index} style={{ borderBottom: '1px solid #f9f9f9', paddingBottom: '15px', marginBottom: '15px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                <strong style={{ fontSize: '15px' }}>{review.name}</strong>
                                <span style={{ fontSize: '12px', color: '#999' }}>{review.date}</span>
                              </div>
                              <div className="star-rating" style={{ marginBottom: '8px' }}>
                                <span style={{ width: `${(review.rating / 5) * 100}%` }} />
                              </div>
                              <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>{review.comment}</p>
                            </div>
                          ))}
                        </div>

                        {/* Add Review Form */}
                        <form className="add-review-form" onSubmit={handleReviewSubmit} style={{ maxWidth: '600px' }}>
                          <h4 style={{ fontSize: '18px', marginBottom: '15px' }}>Add a Review</h4>
                          
                          <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Your Rating</label>
                            <select 
                              value={newReviewRating} 
                              onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                              style={{ height: '35px', padding: '0 10px', border: '1px solid #ddd' }}
                            >
                              <option value="5">5 Stars (Excellent)</option>
                              <option value="4">4 Stars (Good)</option>
                              <option value="3">3 Stars (Average)</option>
                              <option value="2">2 Stars (Poor)</option>
                              <option value="1">1 Star (Very Poor)</option>
                            </select>
                          </div>

                          <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Your Name *</label>
                            <input 
                              type="text" 
                              required 
                              value={newReviewName}
                              onChange={(e) => setNewReviewName(e.target.value)}
                              style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px' }}
                            />
                          </div>

                          <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Your Review *</label>
                            <textarea 
                              required 
                              rows={5}
                              value={newReviewComment}
                              onChange={(e) => setNewReviewComment(e.target.value)}
                              style={{ width: '100%', border: '1px solid #ddd', padding: '10px' }}
                            />
                          </div>

                          <button 
                            type="submit" 
                            className="button"
                            style={{ height: '45px', padding: '0 30px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}
                          >
                            Submit Review
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                  <div className="related-products">
                    <div className="block-title" style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '30px' }}>
                      <h2 style={{ fontSize: '24px', margin: 0 }}>Related Products</h2>
                    </div>
                    <div className="row">
                      {relatedProducts.map((p) => (
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 m-b-30" key={p.id}>
                          <div className="products-entry clearfix product-wapper">
                            <div className="products-thumb">
                              <div className="product-thumb-hover">
                                <a href={`#/details?id=${p.id}`} onClick={(e) => { e.preventDefault(); navigate('details', p.id); }}>
                                  <img width={600} height={600} src={p.images[0]} className="post-image" alt={p.name} />
                                </a>
                              </div>
                            </div>
                            <div className="products-content">
                              <div className="contents">
                                <h3 className="product-title" style={{ fontSize: '16px' }}>
                                  <a href={`#/details?id=${p.id}`} onClick={(e) => { e.preventDefault(); navigate('details', p.id); }}>{p.name}</a>
                                </h3>
                                <span className="price">${p.price.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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

export default ShopDetails;

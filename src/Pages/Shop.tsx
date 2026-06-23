import React, { useState, useMemo } from 'react';
import { useShop } from '../Context/ShopContext';

const Shop: React.FC = () => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    openQuickView,
    navigate,
    searchQuery,
    setSearchQuery,
    products,
    categories
  } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(250);
  const [sortBy, setSortBy] = useState<string>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products based on search query, category, and price range
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter((p) => p.price <= priceRange);

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Shop Breadcrumb */}
          <div id="title-bar" className="title-bar" style={{ background: '#f5f5f5', padding: '30px 0' }}>
            <div className="section-container">
              <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="col-md-6 col-sm-6">
                  <h1 className="title-bar-title" style={{ fontSize: '28px', margin: 0 }}>Shop</h1>
                </div>
                <div className="col-md-6 col-sm-6 text-right">
                  <ul className="breadcrumb" style={{ listStyle: 'none', display: 'flex', gap: '8px', justifyContent: 'flex-end', margin: 0, padding: 0 }}>
                    <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a></li>
                    <li>/</li>
                    <li className="active">Shop</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container large">
                <div className="row">
                  {/* Sidebar - Filter Column */}
                  <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 sidebar-left">
                    <div className="sidebar" style={{ paddingRight: '20px' }}>
                      {/* Search Reset info */}
                      {searchQuery && (
                        <div className="box-widget-wrap" style={{ marginBottom: '20px', background: '#fcf8e3', padding: '15px', border: '1px solid #faebcc' }}>
                          <span style={{ fontSize: '13px' }}>Showing search results for: <strong>"{searchQuery}"</strong></span>
                          <button 
                            className="btn btn-xs btn-danger" 
                            style={{ marginLeft: '10px', padding: '2px 5px', fontSize: '11px', background: '#d9534f', color: '#fff', border: 'none' }}
                            onClick={() => setSearchQuery('')}
                          >
                            Clear
                          </button>
                        </div>
                      )}

                      {/* Product Categories Widget */}
                      <div className="block block-product-cats style-1" style={{ marginBottom: '30px' }}>
                        <div className="block-title" style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
                          <h2 style={{ fontSize: '18px', margin: 0 }}>Product Categories</h2>
                        </div>
                        <div className="block-content">
                          <ul className="product-cats-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ padding: '8px 0', borderBottom: '1px solid #f9f9f9' }}>
                              <a 
                                href="#/shop"
                                onClick={(e) => { e.preventDefault(); setSelectedCategory(null); }}
                                style={{ fontWeight: selectedCategory === null ? 'bold' : 'normal', color: '#000' }}
                              >
                                All Categories
                              </a>
                            </li>
                            {categories.map((cat: string) => (
                              <li key={cat} style={{ padding: '8px 0', borderBottom: '1px solid #f9f9f9' }}>
                                <a 
                                  href="#/shop" 
                                  onClick={(e) => { e.preventDefault(); setSelectedCategory(cat); }}
                                  style={{ fontWeight: selectedCategory === cat ? 'bold' : 'normal', color: '#000' }}
                                >
                                  {cat}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Filter by Price Widget */}
                      <div className="block block-price-filter" style={{ marginBottom: '30px' }}>
                        <div className="block-title" style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
                          <h2 style={{ fontSize: '18px', margin: 0 }}>Filter by Price</h2>
                        </div>
                        <div className="block-content">
                          <div className="price-slider-wrapper">
                            <input 
                              type="range" 
                              min="50" 
                              max="250" 
                              step="5"
                              value={priceRange} 
                              onChange={(e) => setPriceRange(parseInt(e.target.value))}
                              style={{ width: '100%', accentColor: '#000', cursor: 'pointer' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '14px' }}>
                              <span>Min: <strong>$50.00</strong></span>
                              <span>Max: <strong>${priceRange.toFixed(2)}</strong></span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Banner Widget */}
                      <div className="block block-image-banner" style={{ marginTop: '20px' }}>
                        <a href="#/shop" onClick={(e) => e.preventDefault()}>
                          <img src="images/banner-1-2.jpg" alt="Promo" style={{ width: '100%', height: 'auto', border: '1px solid #eee' }} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Products Column */}
                  <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 products-column">
                    {/* Toolbar (Toggles and Sorters) */}
                    <div className="shop-topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                      <div className="view-mode" style={{ display: 'flex', gap: '15px' }}>
                        <button 
                          className="grid-view-btn" 
                          onClick={() => setViewMode('grid')}
                          style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: viewMode === 'grid' ? '#000' : '#ccc' }}
                        >
                          <i className="icon-grid" /> Grid
                        </button>
                        <button 
                          className="list-view-btn" 
                          onClick={() => setViewMode('list')}
                          style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: viewMode === 'list' ? '#000' : '#ccc' }}
                        >
                          <i className="icon-list" /> List
                        </button>
                      </div>
                      <div className="results-count" style={{ fontSize: '14px', color: '#666' }}>
                        Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
                      </div>
                      <div className="sorting-select">
                        <select 
                          value={sortBy} 
                          onChange={(e) => setSortBy(e.target.value)}
                          style={{ height: '40px', padding: '0 10px', border: '1px solid #ddd', outline: 'none' }}
                        >
                          <option value="default">Default sorting</option>
                          <option value="price-low">Price: low to high</option>
                          <option value="price-high">Price: high to low</option>
                          <option value="rating">Average rating</option>
                        </select>
                      </div>
                    </div>

                    {/* Products Content */}
                    {filteredProducts.length === 0 ? (
                      <div style={{ padding: '60px 0', textAlign: 'center' }}>
                        <h2>No products match your criteria.</h2>
                        <p style={{ color: '#888' }}>Try resetting your category or price slider.</p>
                      </div>
                    ) : (
                      <div className={`products-list ${viewMode === 'grid' ? 'grid row' : 'list'}`}>
                        {filteredProducts.map((product) => {
                          const wishlisted = isInWishlist(product.id);
                          
                          if (viewMode === 'grid') {
                            return (
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 m-b-30" key={product.id}>
                                <div className="products-entry clearfix product-wapper">
                                  <div className="products-thumb">
                                    <div className="product-lable">
                                      {product.originalPrice && <div className="onsale">Sale</div>}
                                      {product.stock <= 0 && <div className="onsale" style={{ background: '#777' }}>Out</div>}
                                    </div>
                                    <div className="product-thumb-hover">
                                      <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}>
                                        <img width={600} height={600} src={product.images[0]} className="post-image" alt={product.name} />
                                        {product.images[1] && (
                                          <img width={600} height={600} src={product.images[1]} className="hover-image back" alt={product.name} />
                                        )}
                                      </a>
                                    </div>		
                                    <div className="product-button">
                                      <div className="btn-add-to-cart">
                                        <button 
                                          className="product-btn button" 
                                          onClick={() => addToCart(product)}
                                          disabled={product.stock <= 0}
                                        >
                                          Add to cart
                                        </button>
                                      </div>
                                      <div className="btn-wishlist">
                                        <button 
                                          className={`product-btn ${wishlisted ? 'active' : ''}`}
                                          onClick={() => toggleWishlist(product)}
                                          style={{ color: wishlisted ? '#d9534f' : 'inherit' }}
                                        >
                                          <i className="icon-heart" />
                                        </button>
                                      </div>
                                      <div className="btn-compare">
                                        <button className="product-btn" onClick={() => addToCompare(product)}>Compare</button>
                                      </div>
                                      <span className="product-quickview">
                                        <a 
                                          href="#" 
                                          className="quickview quickview-button"
                                          onClick={(e) => { e.preventDefault(); openQuickView(product); }}
                                        >
                                          Quick View <i className="icon-search" />
                                        </a>
                                      </span>		
                                    </div>
                                  </div>
                                  <div className="products-content">
                                    <div className="contents">
                                      <div className="rating">
                                        <div className="star-rating" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                                          <span style={{ width: `${(product.rating / 5) * 100}%` }} />
                                        </div>
                                        <span className="count">({product.reviewsCount})</span>
                                      </div>
                                      <h3 className="product-title">
                                        <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}>
                                          {product.name}
                                        </a>
                                      </h3>
                                      <span className="price">
                                        {product.originalPrice ? (
                                          <>
                                            <del aria-hidden="true"><span>${product.originalPrice.toFixed(2)}</span></del> 
                                            <ins><span>${product.price.toFixed(2)}</span></ins>
                                          </>
                                        ) : (
                                          <span>${product.price.toFixed(2)}</span>
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          } else {
                            // List View rendering
                            return (
                              <div className="row product-list-item m-b-40" key={product.id} style={{ display: 'flex', borderBottom: '1px solid #f5f5f5', paddingBottom: '30px' }}>
                                <div className="col-md-4 col-sm-5 col-xs-12">
                                  <div className="products-entry clearfix product-wapper" style={{ border: 'none' }}>
                                    <div className="products-thumb" style={{ position: 'relative' }}>
                                      <div className="product-lable">
                                        {product.originalPrice && <div className="onsale">Sale</div>}
                                        {product.stock <= 0 && <div className="onsale" style={{ background: '#777' }}>Out</div>}
                                      </div>
                                      <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}>
                                        <img width={600} height={600} src={product.images[0]} className="post-image" alt={product.name} style={{ width: '100%', height: 'auto' }} />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-8 col-sm-7 col-xs-12" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                  <div className="rating" style={{ marginBottom: '10px' }}>
                                    <div className="star-rating" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                                      <span style={{ width: `${(product.rating / 5) * 100}%` }} />
                                    </div>
                                    <span className="count">({product.reviewsCount} review)</span>
                                  </div>
                                  <h2 style={{ fontSize: '22px', margin: '0 0 10px 0' }}>
                                    <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }} style={{ color: '#000' }}>
                                      {product.name}
                                    </a>
                                  </h2>
                                  <div className="price" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                                    {product.originalPrice ? (
                                      <>
                                        <del style={{ color: '#aaa', marginRight: '10px', fontSize: '16px', fontWeight: 'normal' }}>${product.originalPrice.toFixed(2)}</del> 
                                        <span style={{ color: '#000' }}>${product.price.toFixed(2)}</span>
                                      </>
                                    ) : (
                                      <span>${product.price.toFixed(2)}</span>
                                    )}
                                  </div>
                                  <div className="description" style={{ color: '#666', fontSize: '14px', marginBottom: '20px', lineHeight: '1.6' }}>
                                    {product.description}
                                  </div>
                                  <div className="product-actions-list" style={{ display: 'flex', gap: '10px' }}>
                                    <button 
                                      className="button btn btn-primary" 
                                      style={{ height: '45px', padding: '0 25px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}
                                      onClick={() => addToCart(product)}
                                      disabled={product.stock <= 0}
                                    >
                                      Add to cart
                                    </button>
                                    <button 
                                      className="button btn btn-default" 
                                      onClick={() => toggleWishlist(product)}
                                      style={{ height: '45px', width: '45px', padding: 0, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', color: wishlisted ? '#d9534f' : '#333' }}
                                    >
                                      <i className="icon-heart" />
                                    </button>
                                    <button 
                                      className="button btn btn-default" 
                                      onClick={() => addToCompare(product)}
                                      style={{ height: '45px', width: '45px', padding: 0, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', color: '#333' }}
                                    >
                                      Compare
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Shop;

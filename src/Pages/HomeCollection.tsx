import { useEffect } from 'react';
import { useShop } from '../Context/ShopContext';
import { PRODUCTS } from '../data/db';
import { initSlickSliders } from '../utils/jqueryHelper';

const HomeCollection = () => {
  const { addToCart, toggleWishlist, isInWishlist, addToCompare, openQuickView, navigate } = useShop();

  useEffect(() => {
    setTimeout(() => {
      initSlickSliders();
    }, 100);
  }, []);

  const collectionProducts = PRODUCTS.slice(0, 8);

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="content" className="site-content" role="main">
            
            {/* Slider Section */}
            <section className="section m-b-70">
              <div className="block block-sliders auto-height color-white nav-center">
                <div className="slick-sliders" data-autoplay="true" data-dots="true" data-nav="true" data-columns={1}>
                  <div className="item slick-slide">
                    <div className="item-content">
                      <div className="content-image">
                        <img width={1920} height={1080} src="images/parallax-bg-3.jpg" alt="Collection Slider" />
                      </div>
                      <div className="item-info horizontal-center vertical-middle text-center">
                        <div className="content">
                          <h2 className="title-slider" style={{ fontSize: '48px', fontWeight: 'bold' }}>The Royal Collection</h2>
                          <p style={{ fontSize: '18px', marginBottom: '30px' }}>Exclusive handcrafted jewelry for noble moments</p>
                          <a className="button-slider button button-white button-outline thick-border" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Explore Collections</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item slick-slide">
                    <div className="item-content">
                      <div className="content-image">
                        <img width={1920} height={1080} src="images/parallax-bg-1.jpg" alt="Collection Slider" />
                      </div>
                      <div className="item-info horizontal-center vertical-middle text-center">
                        <div className="content">
                          <h2 className="title-slider" style={{ fontSize: '48px', fontWeight: 'bold' }}>Golden Glow</h2>
                          <p style={{ fontSize: '18px', marginBottom: '30px' }}>Shine bright with our premium 24K gold collections</p>
                          <a className="button-slider button button-white button-outline thick-border" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Shop Gold Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Collections Grid */}
            <section className="section section-padding m-b-70">
              <div className="section-container large">
                <div className="block block-banners layout-1 banners-effect">
                  <div className="block-widget-wrap small-space">
                    <div className="block-title text-center m-b-40">
                      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#000' }}>Featured Collections</h2>
                      <p style={{ fontSize: '14px', color: '#888' }}>Find your signature style from our popular collections</p>
                    </div>
                    <div className="row">
                      <div className="section-column col-md-6 col-12 m-b-30">
                        <div className="block-widget-banner">
                          <div className="bg-banner">
                            <div className="banner-wrapper banners">
                              <div className="banner-image">
                                <a href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>
                                  <img width={800} height={500} src="images/banner-1-4.jpg" alt="Bridal Collection" style={{ objectFit: 'cover', height: '400px' }} />
                                </a>
                              </div>
                              <div className="banner-wrapper-infor">
                                <div className="info">
                                  <div className="content">
                                    <h3 className="title-banner" style={{ color: '#fff', fontSize: '28px' }}>Bridal & Wedding</h3>
                                    <a className="button" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }} style={{ color: '#fff', borderBottomColor: '#fff' }}>View Collection</a>						
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="section-column col-md-6 col-12 m-b-30">
                        <div className="block-widget-banner">
                          <div className="bg-banner">
                            <div className="banner-wrapper banners">
                              <div className="banner-image">
                                <a href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>
                                  <img width={800} height={500} src="images/banner-1-5.jpg" alt="Diamond Collection" style={{ objectFit: 'cover', height: '400px' }} />
                                </a>
                              </div>
                              <div className="banner-wrapper-infor">
                                <div className="info">
                                  <div className="content">
                                    <h3 className="title-banner" style={{ color: '#fff', fontSize: '28px' }}>Pure Diamonds</h3>
                                    <a className="button" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }} style={{ color: '#fff', borderBottomColor: '#fff' }}>View Collection</a>						
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Curator's Picks List */}
            <section className="section section-padding m-b-70">
              <div className="section-container large">
                <div className="block block-products parent-active">
                  <div className="block-widget-wrap">
                    <div className="block-title text-center m-b-40">
                      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#000' }}>Curated Selections</h2>
                      <p style={{ fontSize: '14px', color: '#888' }}>Handpicked masterpieces by our design experts</p>
                    </div>
                    <div className="block-content">
                      <div className="products-list grid">
                        <div className="row">
                          {collectionProducts.map((product) => {
                            const wishlisted = isInWishlist(product.id);
                            return (
                              <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 m-b-30" key={product.id}>
                                <div className="product-item style-1">
                                  <div className="products-entry clearfix">
                                    <div className="products-thumb">
                                      <div className="product-image">
                                        <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}>
                                          <img src={product.images[0]} alt={product.name} />
                                          {product.images[1] && <img className="back-image" src={product.images[1]} alt={product.name} />}
                                        </a>
                                      </div>
                                      <div className="product-lable">
                                        {product.originalPrice && <div className="onsale">Sale</div>}
                                        {product.stock <= 0 && <div className="onsale" style={{ background: '#777' }}>Out</div>}
                                      </div>
                                      <div className="product-action">
                                        <div className="btn-compare">
                                          <a href="#" className="compare" onClick={(e) => { e.preventDefault(); addToCompare(product); }}>
                                            <i className="icon-sliders" />Compare
                                          </a>
                                        </div>
                                        <div className="btn-quickview">
                                          <a href="#" className="quickview" onClick={(e) => { e.preventDefault(); openQuickView(product); }}>
                                            <i className="icon-eye" />Quick View
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="products-content">
                                      <div className="contents text-center">
                                        <div className="rating">
                                          <div className="star-rating" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                                            <span style={{ width: `${(product.rating / 5) * 100}%` }} />
                                          </div>
                                          <span className="count">({product.reviewsCount})</span>
                                        </div>
                                        <h3 className="product-title">
                                          <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}>{product.name}</a>
                                        </h3>
                                        <span className="price">
                                          {product.originalPrice ? (
                                            <>
                                              <del>${product.originalPrice.toFixed(2)}</del>
                                              <ins>${product.price.toFixed(2)}</ins>
                                            </>
                                          ) : (
                                            `$${product.price.toFixed(2)}`
                                          )}
                                        </span>
                                        <div className="btn-add-to-cart">
                                          <a 
                                            href="#" 
                                            className="product-btn" 
                                            onClick={(e) => { e.preventDefault(); addToCart(product); }}
                                          >
                                            Add to cart
                                          </a>
                                        </div>
                                        <div className="btn-wishlist">
                                          <a href="#" className={`wishlist ${wishlisted ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}>
                                            <i className="icon-heart" />Wishlist
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCollection;

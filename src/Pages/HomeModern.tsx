import { useEffect } from 'react';
import { useShop } from '../Context/ShopContext';
import { PRODUCTS } from '../data/db';
import { initSlickSliders } from '../utils/jqueryHelper';

const HomeModern = () => {
  const { addToCart, navigate } = useShop();

  useEffect(() => {
    setTimeout(() => {
      initSlickSliders();
    }, 100);
  }, []);

  const modernProducts = PRODUCTS.slice(4, 10);

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
                        <img width={1920} height={1080} src="images/1-3.jpg" alt="Modern Slider" />
                      </div>
                      <div className="item-info horizontal-start vertical-middle">
                        <div className="content" style={{ paddingLeft: '10%' }}>
                          <h2 className="title-slider" style={{ fontSize: '56px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>Modern Luxury</h2>
                          <p style={{ fontSize: '18px', color: '#fff', marginBottom: '40px', maxWidth: '500px' }}>Elegance is the only beauty that never fades. Indulge in modern luxury jewelry crafted for today's bold expressions.</p>
                          <a className="button-slider button button-white button-outline thick-border" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Shop Collection</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contemporary Banner */}
            <section className="section section-padding m-b-70">
              <div className="section-container large">
                <div className="block block-banners layout-1 banners-effect">
                  <div className="block-widget-wrap">
                    <div className="row" style={{ display: 'flex', alignItems: 'center', background: '#fcf8f6', padding: '50px 30px', margin: 0 }}>
                      <div className="col-md-5 col-12 text-left p-l-50">
                        <span style={{ color: '#cb8161', fontWeight: 'bold', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>Limited Edition</span>
                        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '38px', color: '#000', margin: '15px 0 25px 0' }}>The Golden Hour Collection</h2>
                        <p style={{ color: '#666', marginBottom: '30px' }}>Discover the warmth and richness of our selected solid gold designs. Perfectly polished and ready to elevate your style.</p>
                        <a className="button button-outline button-black" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Shop Now</a>
                      </div>
                      <div className="col-md-7 col-12">
                        <img src="images/banner-1-3.jpg" alt="Golden Hour Collection" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Trending Modern Grid */}
            <section className="section section-padding m-b-70">
              <div className="section-container large">
                <div className="block block-products">
                  <div className="block-widget-wrap">
                    <div className="block-title text-center m-b-40">
                      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#000' }}>Modern Trends</h2>
                      <p style={{ fontSize: '14px', color: '#888' }}>Hot and trending jewelry pieces of the season</p>
                    </div>
                    <div className="block-content">
                      <div className="products-list grid">
                        <div className="row">
                          {modernProducts.map((product) => {
                            return (
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 m-b-30" key={product.id}>
                                <div className="product-item style-1">
                                  <div className="products-entry clearfix">
                                    <div className="products-thumb">
                                      <div className="product-image">
                                        <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}>
                                          <img src={product.images[0]} alt={product.name} />
                                        </a>
                                      </div>
                                    </div>
                                    <div className="products-content">
                                      <div className="contents text-center">
                                        <h3 className="product-title">
                                          <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}>{product.name}</a>
                                        </h3>
                                        <span className="price">${product.price.toFixed(2)}</span>
                                        <div style={{ marginTop: '10px' }}>
                                          <button 
                                            className="button btn-primary" 
                                            onClick={() => addToCart(product)}
                                            style={{ padding: '8px 20px', fontSize: '12px', height: 'auto', lineHeight: 'normal' }}
                                          >
                                            Add to cart
                                          </button>
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

export default HomeModern;

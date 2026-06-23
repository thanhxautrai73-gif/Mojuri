import { useEffect } from 'react';
import { useShop } from '../Context/ShopContext';
import { PRODUCTS } from '../data/db';
import { initSlickSliders } from '../utils/jqueryHelper';

const HomeUnique = () => {
  const { addToCart, navigate } = useShop();

  useEffect(() => {
    setTimeout(() => {
      initSlickSliders();
    }, 100);
  }, []);

  const uniqueProducts = PRODUCTS.slice(2, 8);

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
                        <img width={1920} height={1080} src="images/1-3.jpg" alt="Unique Slider" />
                      </div>
                      <div className="item-info horizontal-center vertical-middle text-center">
                        <div className="content">
                          <h2 className="title-slider" style={{ fontSize: '50px', fontWeight: 'bold', fontFamily: 'Cormorant Garamond, serif', letterSpacing: '3px' }}>Simply Unique</h2>
                          <p style={{ fontSize: '18px', color: '#fff', marginBottom: '35px' }}>Artisan jewelry designed to tell your unique life story</p>
                          <a className="button-slider button button-white button-outline thick-border" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Explore Unique</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Asymmetric Staggered Grid */}
            <section className="section section-padding m-b-70">
              <div className="section-container large">
                <div className="block block-products">
                  <div className="block-widget-wrap">
                    <div className="block-title text-center m-b-50">
                      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#000' }}>Uniquely Crafted</h2>
                      <p style={{ fontSize: '14px', color: '#888' }}>Asymmetric and artisan statement pieces</p>
                    </div>
                    <div className="block-content">
                      <div className="products-list grid">
                        <div className="row">
                          {uniqueProducts.map((product, index) => {
                            // Create staggered layouts depending on index
                            const isTall = index % 3 === 0;
                            return (
                              <div className={`col-lg-${isTall ? '6' : '3'} col-md-6 col-sm-6 col-12 m-b-30`} key={product.id}>
                                <div className="product-item style-1" style={{ border: '1px solid #eee', padding: '15px' }}>
                                  <div className="products-entry clearfix">
                                    <div className="products-thumb">
                                      <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}>
                                        <img src={product.images[0]} alt={product.name} style={{ height: isTall ? '350px' : '220px', objectFit: 'cover', width: '100%' }} />
                                      </a>
                                    </div>
                                    <div className="products-content text-center" style={{ paddingTop: '15px' }}>
                                      <h3 className="product-title" style={{ fontSize: '16px', fontWeight: '500' }}>
                                        <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}>{product.name}</a>
                                      </h3>
                                      <span className="price">${product.price.toFixed(2)}</span>
                                      <div style={{ marginTop: '10px' }}>
                                        <a href="#" className="button btn-primary" onClick={(e) => { e.preventDefault(); addToCart(product); }} style={{ padding: '6px 20px', height: 'auto', fontSize: '12px', lineHeight: 'normal' }}>Add to cart</a>
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

export default HomeUnique;

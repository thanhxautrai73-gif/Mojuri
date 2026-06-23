import { useEffect } from 'react';
import { useShop } from '../Context/ShopContext';
import { PRODUCTS } from '../data/db';
import { initSlickSliders } from '../utils/jqueryHelper';

const HomeStyle = () => {
  const { navigate } = useShop();

  useEffect(() => {
    setTimeout(() => {
      initSlickSliders();
    }, 100);
  }, []);

  const styledProducts = PRODUCTS.slice(3, 7);

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
                        <img width={1920} height={1080} src="images/1-2_1.jpg" alt="Style Slider" />
                      </div>
                      <div className="item-info horizontal-start vertical-middle">
                        <div className="content" style={{ paddingLeft: '8%' }}>
                          <h2 className="title-slider" style={{ fontSize: '48px', color: '#cb8161', fontFamily: 'Cormorant Garamond, serif' }}>Styled Lifestyle</h2>
                          <p style={{ fontSize: '18px', color: '#555', marginBottom: '30px' }}>Jewelry is like the perfect spice – it always complements what’s already there.</p>
                          <a className="button-slider button button-black button-outline thick-border" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Explore Looks</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Editorial Showcase */}
            <section className="section section-padding m-b-70">
              <div className="section-container large">
                <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="col-md-6 col-12">
                    <img src="images/banner-1-1.jpg" alt="Style Editorial" style={{ width: '100%', height: '450px', objectFit: 'cover' }} />
                  </div>
                  <div className="col-md-6 col-12 text-left p-l-50">
                    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', color: '#000' }}>Editorial: Summer Lovin'</h2>
                    <p style={{ color: '#666', fontSize: '15px', margin: '20px 0 30px 0', lineHeight: '1.8' }}>
                      Bring warmth and radiance to your summer outfit. Our sterling silver hoop earrings and stackable gold rings are designed to match the bright sun and cool breeze of this summer's most iconic styling looks.
                    </p>
                    <a className="button button-outline button-black" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Get The Look</a>
                  </div>
                </div>
              </div>
            </section>

            {/* Curated Products */}
            <section className="section section-padding m-b-70">
              <div className="section-container large">
                <div className="block block-products">
                  <div className="block-widget-wrap">
                    <div className="block-title text-center m-b-40">
                      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#000' }}>Style Staples</h2>
                      <p style={{ fontSize: '14px', color: '#888' }}>Essential pieces to elevate any daily outfit</p>
                    </div>
                    <div className="block-content">
                      <div className="products-list grid">
                        <div className="row">
                          {styledProducts.map((product) => {
                            return (
                              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 m-b-30" key={product.id}>
                                <div className="product-item style-1">
                                  <div className="products-entry clearfix">
                                    <div className="products-thumb">
                                      <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}>
                                        <img src={product.images[0]} alt={product.name} />
                                      </a>
                                    </div>
                                    <div className="products-content text-center">
                                      <h3 className="product-title">
                                        <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}>{product.name}</a>
                                      </h3>
                                      <span className="price">${product.price.toFixed(2)}</span>
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

export default HomeStyle;

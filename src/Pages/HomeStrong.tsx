import { useEffect } from 'react';
import { useShop } from '../Context/ShopContext';
import { PRODUCTS } from '../data/db';
import { initSlickSliders } from '../utils/jqueryHelper';

const HomeStrong = () => {
  const { addToCart, navigate } = useShop();

  useEffect(() => {
    setTimeout(() => {
      initSlickSliders();
    }, 100);
  }, []);

  const strongProducts = PRODUCTS.slice(1, 7);

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
                        <img width={1920} height={1080} src="images/1-1.jpg" alt="Strong Slider" />
                      </div>
                      <div className="item-info horizontal-center vertical-middle text-center">
                        <div className="content">
                          <h2 className="title-slider" style={{ fontSize: '64px', fontWeight: '900', textTransform: 'uppercase', color: '#fff', textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>BOLD INDIVIDUALITY</h2>
                          <p style={{ fontSize: '18px', color: '#fff', marginBottom: '30px', fontWeight: 'bold' }}>Wear your statement. Express your inner power with bold creations.</p>
                          <a className="button-slider button button-black button-outline thick-border" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }} style={{ background: '#000', color: '#fff', border: 'none' }}>DISCOVER BOLD</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Bold Showcase Grid */}
            <section className="section section-padding m-b-70">
              <div className="section-container large">
                <div className="block block-products">
                  <div className="block-widget-wrap">
                    <div className="block-title text-center m-b-40">
                      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#000', fontWeight: '900' }}>THE BOLD STATEMENT</h2>
                      <p style={{ fontSize: '14px', color: '#888' }}>Stand out from the crowd with our signature heavy-detailed selections</p>
                    </div>
                    <div className="block-content">
                      <div className="products-list grid">
                        <div className="row">
                          {strongProducts.map((product) => {
                            return (
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 m-b-40" key={product.id}>
                                <div className="product-item style-1" style={{ background: '#fafafa', padding: '15px' }}>
                                  <div className="products-entry clearfix">
                                    <div className="products-thumb">
                                      <div className="product-image">
                                        <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}>
                                          <img src={product.images[0]} alt={product.name} />
                                        </a>
                                      </div>
                                    </div>
                                    <div className="products-content text-center" style={{ paddingTop: '15px' }}>
                                      <h3 className="product-title" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                        <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}>{product.name}</a>
                                      </h3>
                                      <div className="price" style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', margin: '5px 0 15px 0' }}>
                                        ${product.price.toFixed(2)}
                                      </div>
                                      <div>
                                        <button 
                                          className="button"
                                          onClick={() => addToCart(product)}
                                          style={{ width: '100%', height: '40px', background: '#000', color: '#fff', border: 'none', fontWeight: 'bold' }}
                                        >
                                          ADD TO CART
                                        </button>
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

export default HomeStrong;

import { useEffect } from 'react';
import { useShop } from '../Context/ShopContext';
import { PRODUCTS } from '../data/db';
import { initSlickSliders } from '../utils/jqueryHelper';

const HomeMinimal = () => {
  const { addToCart, toggleWishlist, isInWishlist, navigate } = useShop();

  useEffect(() => {
    setTimeout(() => {
      initSlickSliders();
    }, 100);
  }, []);

  const minimalProducts = PRODUCTS.slice(2, 6);

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
                        <img width={1920} height={1080} src="images/1-2_1.jpg" alt="Minimal Slider" />
                      </div>
                      <div className="item-info horizontal-start vertical-middle">
                        <div className="content" style={{ paddingLeft: '8%' }}>
                          <h2 className="title-slider" style={{ fontSize: '42px', color: '#000', fontWeight: 'light', fontFamily: 'Cormorant Garamond, serif' }}>Minimalism</h2>
                          <p style={{ fontSize: '16px', color: '#555', marginBottom: '30px' }}>Simple lines, pure emotions, eternal designs</p>
                          <a className="button-slider button button-black button-outline thick-border" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Explore Minimal</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Minimal Grid Section */}
            <section className="section section-padding m-b-70">
              <div className="section-container small">
                <div className="block block-products">
                  <div className="block-widget-wrap">
                    <div className="block-title text-center m-b-50">
                      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', color: '#000', fontWeight: '300' }}>Minimalist Essentials</h2>
                      <div style={{ width: '40px', height: '1px', background: '#000', margin: '15px auto' }} />
                    </div>
                    <div className="block-content">
                      <div className="products-list grid">
                        <div className="row">
                          {minimalProducts.map((product) => {
                            const wishlisted = isInWishlist(product.id);
                            return (
                              <div className="col-md-6 col-sm-6 col-12 m-b-40" key={product.id}>
                                <div className="product-item style-1" style={{ border: '1px solid #f2f2f2', padding: '20px' }}>
                                  <div className="products-entry clearfix" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <div className="products-thumb" style={{ width: '150px', flexShrink: 0 }}>
                                      <div className="product-image">
                                        <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}>
                                          <img src={product.images[0]} alt={product.name} />
                                        </a>
                                      </div>
                                    </div>
                                    <div className="products-content" style={{ textAlign: 'left', width: '100%' }}>
                                      <h3 className="product-title" style={{ fontSize: '18px', marginBottom: '8px' }}>
                                        <a href={`#/details?id=${product.id}`} onClick={(e) => { e.preventDefault(); navigate('details', product.id); }}>{product.name}</a>
                                      </h3>
                                      <div className="price" style={{ fontSize: '16px', color: '#cb8161', marginBottom: '15px' }}>
                                        ${product.price.toFixed(2)}
                                      </div>
                                      <div style={{ display: 'flex', gap: '15px' }}>
                                        <a 
                                          href="#" 
                                          onClick={(e) => { e.preventDefault(); addToCart(product); }}
                                          style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold', color: '#000', borderBottom: '1px solid #000', paddingBottom: '2px' }}
                                        >
                                          Add To Cart
                                        </a>
                                        <a 
                                          href="#" 
                                          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                                          style={{ textTransform: 'uppercase', fontSize: '12px', color: wishlisted ? '#cb8161' : '#888' }}
                                        >
                                          {wishlisted ? 'Saved' : 'Wishlist'}
                                        </a>
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

export default HomeMinimal;

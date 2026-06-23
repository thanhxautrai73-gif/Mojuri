import { useEffect } from 'react';
import { useShop } from '../Context/ShopContext';
import { PRODUCTS } from '../data/db';
import { initSlickSliders } from '../utils/jqueryHelper';

const HomeParallax = () => {
  const { addToCart, navigate } = useShop();

  useEffect(() => {
    setTimeout(() => {
      initSlickSliders();
    }, 100);
  }, []);

  const parallaxProducts = PRODUCTS.slice(0, 4);

  return (
    <div id="site-main" className="site-main" style={{ overflow: 'hidden' }}>
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="content" className="site-content" role="main">
            
            {/* Parallax Block 1 */}
            <div 
              className="parallax-section"
              style={{
                backgroundImage: 'url("images/parallax-bg-3.jpg")',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)' }} />
              <div className="content" style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '64px', fontWeight: 'bold', margin: '0 0 20px 0' }}>Infinite Brilliance</h2>
                <p style={{ fontSize: '20px', letterSpacing: '1px', marginBottom: '30px' }}>Discover jewelry that echoes your soul's timeless grace</p>
                <a className="button button-white button-outline thick-border" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }} style={{ color: '#fff', borderColor: '#fff' }}>SHOP THE COLLECTION</a>
              </div>
            </div>

            {/* Info / Products Row */}
            <section className="section section-padding m-t-70 m-b-70">
              <div className="section-container large">
                <div className="block-title text-center m-b-50">
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#000' }}>Timeless Favorites</h2>
                  <p style={{ fontSize: '14px', color: '#888' }}>Our most beloved classic jewelry pieces</p>
                </div>
                <div className="products-list grid">
                  <div className="row">
                    {parallaxProducts.map((product) => {
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
                                <div style={{ marginTop: '10px' }}>
                                  <a href="#" className="button btn-primary" onClick={(e) => { e.preventDefault(); addToCart(product); }} style={{ padding: '5px 15px', height: 'auto', fontSize: '12px', lineHeight: 'normal' }}>Add to cart</a>
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
            </section>

            {/* Parallax Block 2 */}
            <div 
              className="parallax-section"
              style={{
                backgroundImage: 'url("images/parallax-bg-1.jpg")',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)' }} />
              <div className="content" style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', margin: '0 0 15px 0' }}>Crafted in Pure Harmony</h2>
                <p style={{ fontSize: '16px', marginBottom: '25px' }}>Every design is a result of absolute dedication and perfection</p>
                <a className="button button-white button-outline" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }} style={{ color: '#fff', borderColor: '#fff' }}>EXPLORE CRAFTSMANSHIP</a>
              </div>
            </div>

            {/* Parallax Block 3 */}
            <div 
              className="parallax-section"
              style={{
                backgroundImage: 'url("images/parallax-bg-2.jpg")',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.35)' }} />
              <div className="content" style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', margin: '0 0 15px 0' }}>A Promise of Elegance</h2>
                <p style={{ fontSize: '16px', marginBottom: '25px' }}>Complimentary lifetime warranty and secure express shipping globally</p>
                <a className="button button-white button-outline" href="#/about" onClick={(e) => { e.preventDefault(); navigate('about'); }} style={{ color: '#fff', borderColor: '#fff' }}>LEARN MORE</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeParallax;

import React, { useEffect, useState } from 'react';
import { useShop } from '../Context/ShopContext';
import { CATEGORIES } from '../data/db';
import { initSlickSliders } from '../utils/jqueryHelper';

const Home = () => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    openQuickView,
    navigate,
    setSearchQuery,
    products
  } = useShop();

  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    // Re-initialize slick sliders when Home page mounts
    setTimeout(() => {
      initSlickSliders();
    }, 100);
  }, []);

  const handleCategoryClick = (category: string) => {
    setSearchQuery(category);
    navigate('shop');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      alert('Please enter your email.');
      return;
    }
    alert('Thank you for subscribing to our newsletter!');
    setNewsletterEmail('');
  };

  // Filter products for trending sections
  const trendingProducts = products.filter(p => p.trending);

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="content" className="site-content" role="main">
            {/* Block Sliders */}
            <section className="section m-b-70">
              <div className="block block-sliders auto-height color-white nav-center">
                <div className="slick-sliders" data-autoplay="true" data-dots="true" data-nav="true" data-columns={1}>
                  <div className="item slick-slide">
                    <div className="item-content">
                      <div className="content-image">
                        <img width={1920} height={1080} src="images/1-1.jpg" alt="Image Slider" />
                      </div>
                      <div className="item-info horizontal-start vertical-middle">
                        <div className="content">
                          <h2 className="title-slider">Discover a <br />world of jewelry</h2>
                          <a className="button-slider button button-white button-outline thick-border" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Explore Bestseller</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item slick-slide">
                    <div className="item-content">
                      <div className="content-image">
                        <img width={1920} height={1080} src="images/1-2_1.jpg" alt="Image Slider" />
                      </div>
                      <div className="item-info horizontal-start vertical-middle">
                        <div className="content">
                          <h2 className="title-slider">Discover the<br /> Best of the Best</h2>
                          <a className="button-slider button button-white button-outline thick-border" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Explore Bestseller</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item slick-slide">
                    <div className="item-content">
                      <div className="content-image">
                        <img width={1920} height={1080} src="images/1-3.jpg" alt="Image Slider" />
                      </div>
                      <div className="item-info horizontal-start vertical-middle">
                        <div className="content">
                          <h2 className="title-slider">Oh,<br /> Hello Newness!</h2>
                          <a className="button-slider button button-white button-outline thick-border" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Explore Bestseller</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Block Banners layout 1 */}
            <section className="section section-padding m-b-70">
              <div className="section-container large">
                <div className="block block-banners layout-1 banners-effect">
                  <div className="block-widget-wrap small-space">
                    <div className="row">
                      <div className="section-column left sm-m-b col-md-4">
                        <div className="block-widget-banner">
                          <div className="bg-banner">
                            <div className="banner-wrapper banners">
                              <div className="banner-image">
                                <a href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>
                                  <img width={630} height={457} src="images/banner-1-1.jpg" alt="Banner Image" />
                                </a>
                              </div>
                              <div className="banner-wrapper-infor">
                                <div className="info">
                                  <div className="content">
                                    <h3 className="title-banner">New Arrivals</h3>
                                    <a className="button" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Shop Now</a>						
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="section-column center sm-m-b col-md-4">
                        <div className="block-widget-banner">
                          <div className="bg-banner">
                            <div className="banner-wrapper banners">
                              <div className="banner-image">
                                <a href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>
                                  <img width={450} height={457} src="images/banner-1-2.jpg" alt="Banner Image" />
                                </a>
                              </div>
                              <div className="banner-wrapper-infor text-center">
                                <div className="info">
                                  <div className="content">
                                    <h3 className="title-banner">Best Seller</h3>
                                    <a className="button center" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Shop Now</a>						
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="section-column right col-md-4">
                        <div className="block-widget-banner">
                          <div className="bg-banner">
                            <div className="banner-wrapper banners">
                              <div className="banner-image">
                                <a href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>
                                  <img width={630} height={457} src="images/banner-1-3.jpg" alt="Banner Image" />
                                </a>
                              </div>
                              <div className="banner-wrapper-infor">
                                <div className="info">
                                  <div className="content">
                                    <h3 className="title-banner">Clearance Sale</h3>
                                    <a className="button" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Shop Now</a>						
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

            {/* Block Categories */}
            <section className="section section-padding m-b-70">
              <div className="section-container">
                <div className="block block-product-cats slider round-border">
                  <div className="block-widget-wrap">
                    <div className="block-title"><h2>Top Categories</h2></div>
                    <div className="block-content">
                      <div className="product-cats-list slick-wrap">
                        <div className="slick-sliders content-category" data-dots="false" data-nav="true" data-columns={5}>
                          {CATEGORIES.map((cat, idx) => (
                            <div className="item item-product-cat slick-slide" key={cat}>	
                              <div className="item-product-cat-content">
                                <a href="#/shop" onClick={(e) => { e.preventDefault(); handleCategoryClick(cat); }}>
                                  <div className="item-image animation-horizontal">
                                    <img width={258} height={258} src={`images/cat-${(idx % 5) + 1}.jpg`} alt={cat} />
                                  </div>
                                </a>			
                                <div className="product-cat-content-info">
                                  <h2 className="item-title">
                                    <a href="#/shop" onClick={(e) => { e.preventDefault(); handleCategoryClick(cat); }}>{cat}</a>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Block Intro */}
            <section className="section background-img bg-img-1 m-b-70">
              <div className="block block-intro">
                <div className="row">
                  <div className="section-column left col-md-6 col-sm-12">
                    <div className="intro-wrap">
                      <h2 className="intro-title">Handcrafted<br /> &amp; Ethically Sourced</h2>
                      <div className="intro-item">
                        <div className="icon">
                          <span className="wrap animation-horizontal">
                            <i className="icon-diamond" style={{ fontSize: '32px', color: '#000' }} />
                          </span>
                        </div>
                        <div className="content">
                          <h3 className="title">FAIR PRICING</h3>
                          <div className="text">Nullam quis ante. Pellentesque libero tortor, tincidunt et, tinciduntamet est.In hac habitasse platea dictumst. Praesent nec nisl a purus blandit viverra</div>
                        </div>
                      </div>
                      <div className="intro-item">
                        <div className="icon">
                          <span className="wrap animation-horizontal">
                            <i className="icon-star" style={{ fontSize: '32px', color: '#000' }} />
                          </span>
                        </div>
                        <div className="content">
                          <h3 className="title">HIGH QUALITY</h3>
                          <div className="text">Nullam quis ante. Pellentesque libero tortor, tincidunt et, tinciduntamet est.In hac habitasse platea dictumst. Praesent nec nisl a purus blandit viverra</div>
                        </div>
                      </div>
                      <div className="intro-btn">
                        <a href="#/about" onClick={(e) => { e.preventDefault(); navigate('about'); }} className="button button-black button-arrow animation-horizontal">LEARN MORE</a>
                      </div>
                    </div>
                  </div>
                  <div className="section-column right col-md-6 col-sm-12">
                    <a href="#/" onClick={(e) => e.preventDefault()}>
                      <img className="hover-opacity" width={820} height={674} src="images/intro-1.jpg" alt="intro" style={{ width: '100%', height: 'auto' }} />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Block Products */}
            <section className="section section-padding m-b-70">
              <div className="section-container large">
                <div className="block block-products slider">
                  <div className="block-widget-wrap">
                    <div className="block-title"><h2>Trending Products</h2></div>
                    <div className="block-content">
                      <div className="content-product-list slick-wrap">
                        <div className="slick-sliders products-list grid" data-dots="false" data-nav="true" data-columns={4}>
                          {trendingProducts.map((product) => {
                            const wishlisted = isInWishlist(product.id);
                            return (
                              <div className="item-product slick-slide" key={product.id}>
                                <div className="items">
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
                                        <div className="btn-add-to-cart" data-title="Add to cart">
                                          <button 
                                            className="product-btn button" 
                                            onClick={() => addToCart(product)}
                                            disabled={product.stock <= 0}
                                          >
                                            Add to cart
                                          </button>
                                        </div>
                                        <div className="btn-wishlist" data-title="Wishlist">
                                          <button 
                                            className={`product-btn ${wishlisted ? 'active' : ''}`}
                                            onClick={() => toggleWishlist(product)}
                                            style={{ color: wishlisted ? '#d9534f' : 'inherit' }}
                                          >
                                            <i className="icon-heart" />
                                          </button>
                                        </div>
                                        <div className="btn-compare" data-title="Compare">
                                          <button className="product-btn" onClick={() => addToCompare(product)}>Compare</button>
                                        </div>
                                        <span className="product-quickview" data-title="Quick View">
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

            {/* Block Banners layout 2 */}
            <section className="section section-padding">
              <div className="section-container large">
                <div className="block block-banners layout-2 banners-effect">
                  <div className="block-widget-wrap">
                    <div className="row">
                      <div className="col-md-6 col-sm-12 m-b-15">
                        <div className="block-widget-banner">
                          <div className="bg-banner">
                            <div className="banner-wrapper banners">
                              <div className="banner-image">
                                <a href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>
                                  <img width={856} height={496} src="images/banner-1-4.jpg" alt="Banner Image" />
                                </a>
                              </div>
                              <div className="banner-wrapper-infor">
                                <div className="info">
                                  <div className="content">
                                    <h3 className="title-banner">Summer Collections</h3>
                                    <div className="banner-image-description">
                                      Freshwater pearl necklace and earrings
                                    </div>
                                    <a className="button button-outline thick-border border-white button-arrow" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Explore</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="block-widget-banner">
                          <div className="bg-banner">
                            <div className="banner-wrapper banners">
                              <div className="banner-image">
                                <a href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>
                                  <img width={856} height={496} src="images/banner-1-5.jpg" alt="Banner Image" />
                                </a>
                              </div>
                              <div className="banner-wrapper-infor">
                                <div className="info">
                                  <div className="content">
                                    <h3 className="title-banner"> Make It Memorable</h3>
                                    <div className="banner-image-description">
                                      Freshwater pearl necklace and earrings
                                    </div>
                                    <a className="button button-outline thick-border border-white button-arrow" href="#/shop" onClick={(e) => { e.preventDefault(); navigate('shop'); }}>Explore</a>
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

            {/* Testimonials */}
            <section className="section section-padding background-img bg-img-2 m-b-70 p-t-140 p-b-70 m-t-n-130">
              <div className="section-container">
                <div className="block block-testimonial layout-2">
                  <div className="block-widget-wrap">
                    <div className="block-title"><h2>What Our Customers Say</h2></div>
                    <div className="block-content">
                      <div className="testimonial-wrap slick-wrap">
                        <div className="slick-sliders" data-slidestoscroll="true" data-nav="true" data-dots="false" data-columns={3}>
                          <div className="testimonial-content">
                            <div className="item">
                              <div className="testimonial-item">
                                <div className="testimonial-icon">
                                  <div className="rating">
                                    <div className="star star-5" />
                                  </div>
                                </div>
                                <h2 className="testimonial-title">“Amazing piece of history”</h2>
                                <div className="testimonial-excerpt">
                                  Blood bank canine teeth larynx occupational therapist oncologist optician plaque spinal tap stat strep... 
                                </div>								
                              </div>
                              <div className="testimonial-image image-position-top">
                                <div className="thumbnail">
                                  <img width={110} height={110} src="images/1_2.jpg" alt="" />							
                                </div>
                                <div className="testimonial-info">
                                  <h2 className="testimonial-customer-name">Robet Smith</h2>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="testimonial-content">
                            <div className="item">
                              <div className="testimonial-item">
                                <div className="testimonial-icon">
                                  <div className="rating">
                                    <div className="star star-4" />
                                  </div>
                                </div>
                                <h2 className="testimonial-title">“Fabulous Grounds”</h2>
                                <div className="testimonial-excerpt">
                                  Blood bank canine teeth larynx occupational therapist oncologist optician plaque spinal tap stat strep... 
                                </div>								
                              </div>
                              <div className="testimonial-image image-position-top">
                                <div className="thumbnail">
                                  <img width={110} height={110} src="images/2_2.jpg" alt="" />							
                                </div>
                                <div className="testimonial-info">
                                  <h2 className="testimonial-customer-name">Saitama One</h2>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="testimonial-content">
                            <div className="item">
                              <div className="testimonial-item">
                                <div className="testimonial-icon">
                                  <div className="rating">
                                    <div className="star star-5" />
                                  </div>
                                </div>
                                <h2 className="testimonial-title">“Great vineyard tour and tasting!”</h2>
                                <div className="testimonial-excerpt">
                                  Blood bank canine teeth larynx occupational therapist oncologist optician plaque spinal tap stat strep... 
                                </div>								
                              </div>
                              <div className="testimonial-image image-position-top">
                                <div className="thumbnail">
                                  <img width={110} height={110} src="images/3_2.jpg" alt="" />							
                                </div>
                                <div className="testimonial-info">
                                  <h2 className="testimonial-customer-name">Sara Colinton</h2>
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

            {/* Newsletter */}
            <section className="section section-padding m-b-80">
              <div className="section-container">
                <div className="block block-newsletter layout-2 one-col">
                  <div className="block-widget-wrap">
                    <div className="newsletter-title-wrap">
                      <h2 className="newsletter-title">Latest From MoJuri!</h2>
                      <div className="newsletter-text">Sign-up to receive 10% off your next purchase. Plus hear about new arrivals and offers.</div>
                    </div>
                    <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                      <input 
                        type="email" 
                        placeholder="Email address" 
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                      />
                      <span className="btn-submit">
                        <input type="submit" value="SUBSCRIBE" />
                      </span>
                    </form>
                  </div>
                </div>
              </div>
            </section>

            {/* Brand Logo Slider */}
            <section className="section section-padding top-border p-t-10 p-b-10 m-b-0">
              <div className="section-container">
                <div className="block block-image slider">
                  <div className="block-widget-wrap">
                    <div className="slick-wrap">
                      <div className="slick-sliders" data-nav="false" data-columns={5}>
                        <div className="item slick-slide">
                          <div className="item-image animation-horizontal">
                            <a href="#/" onClick={(e) => e.preventDefault()}> 
                              <img width={450} height={450} src="images/1_3.jpg" alt="Brand 1" />
                            </a>
                          </div>
                        </div>
                        <div className="item slick-slide">
                          <div className="item-image animation-horizontal">
                            <a href="#/" onClick={(e) => e.preventDefault()}> 
                              <img width={450} height={450} src="images/2_3.jpg" alt="Brand 2" />
                            </a>
                          </div>
                        </div>
                        <div className="item slick-slide">
                          <div className="item-image animation-horizontal">
                            <a href="#/" onClick={(e) => e.preventDefault()}> 
                              <img width={450} height={450} src="images/3_3.jpg" alt="Brand 3" />
                            </a>
                          </div>
                        </div>
                        <div className="item slick-slide">
                          <div className="item-image animation-horizontal">
                            <a href="#/" onClick={(e) => e.preventDefault()}> 
                              <img width={450} height={450} src="images/4_2.jpg" alt="Brand 4" />
                            </a>
                          </div>
                        </div>
                        <div className="item slick-slide">
                          <div className="item-image animation-horizontal">
                            <a href="#/" onClick={(e) => e.preventDefault()}> 
                              <img width={450} height={450} src="images/5.jpg" alt="Brand 5" />
                            </a>
                          </div>
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

export default Home;
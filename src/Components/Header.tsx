import React, { useState } from 'react';
import { useShop } from '../Context/ShopContext';

const Header = () => {
  const {
    cart,
    wishlist,
    removeFromCart,
    navigate,
    currentPage,
    user,
    login,
    register,
    logout,
    setSearchQuery
  } = useShop();

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [desktopCartOpen, setDesktopCartOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authPopupOpen, setAuthPopupOpen] = useState(false);

  // Cart totals
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 400;
  const progressPercent = Math.min((cartSubtotal / freeShippingThreshold) * 100, 100);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) {
      alert('Please fill in all fields.');
      return;
    }
    const success = await login(usernameInput, passwordInput);
    if (success) {
      setUsernameInput('');
      setPasswordInput('');
      setAuthPopupOpen(false);
      alert('Logged in successfully!');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !regPassword) {
      alert('Please fill in all fields.');
      return;
    }
    const username = regEmail.split('@')[0];
    const success = await register(username, regEmail, regPassword);
    if (success) {
      alert('Registered successfully! Please sign in with your new account.');
      setRegEmail('');
      setRegPassword('');
      setAuthMode('login');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    navigate('shop');
    const searchOverlay = document.querySelector('.search-overlay');
    if (searchOverlay) {
      searchOverlay.classList.remove('search-visible');
      document.body.classList.remove('search-visible');
    }
  };

  const handleLinkClick = (page: string, id: string | null = null) => {
    navigate(page, id);
    setMobileMenuOpen(false);
    setMobileCartOpen(false);
    setDesktopCartOpen(false);
  };

  const isHomePage = currentPage === 'home' || currentPage.startsWith('home-');

  // Dynamic header styles to support absolute positioning on homepage and relative on other pages
  const headerStyle: React.CSSProperties = {
    position: isHomePage ? 'absolute' : 'relative',
    width: '100%',
    zIndex: 9999,
    background: isHomePage ? 'transparent' : '#000',
    borderBottom: isHomePage ? 'none' : '1px solid #222'
  };

  return (
    <header 
      id="site-header" 
      className={`site-header header-v1 color-white ${!isHomePage ? 'bg-black' : ''}`}
      style={headerStyle}
    >
      {/* Topbar */}
      <div id="header-topbar" className="topbar-v1" style={{ borderBottom: isHomePage ? '1px solid rgba(255,255,255,0.15)' : '1px solid #222', color: isHomePage ? '#fff' : '#aaa', background: isHomePage ? 'transparent' : '#111' }}>
        <div className="section-padding">
          <div className="section-container large">
            <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: 0 }}>
              <div className="col-md-6 col-sm-6 col-12 topbar-left" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div className="phone" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <i className="fa fa-phone" style={{ color: isHomePage ? '#fff' : '#cb8161' }} /> <span style={{ fontSize: '12px' }}>+1 234 567 890</span>
                </div>
                <div className="email" style={{ display: 'flex', alignItems: 'center', gap: '5px', borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '15px' }}>
                  <i className="fa fa-envelope" style={{ color: isHomePage ? '#fff' : '#cb8161' }} /> <span style={{ fontSize: '12px' }}>support@mojuri.com</span>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-12 topbar-right" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>
                <div className="ship" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <i className="fa fa-truck" style={{ color: isHomePage ? '#fff' : '#cb8161' }} /> <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Free shipping over $400</span>
                </div>
                <ul id="topbar-menu" className="menu" style={{ display: 'flex', gap: '15px', listStyle: 'none', margin: 0, padding: 0 }}>
                  <li><a href="#/about" onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }} style={{ color: isHomePage ? '#fff' : '#888', fontSize: '12px' }}>About Us</a></li>
                  <li><a href="#/faq" onClick={(e) => { e.preventDefault(); handleLinkClick('faq'); }} style={{ color: isHomePage ? '#fff' : '#888', fontSize: '12px' }}>FAQ</a></li>
                  <li><a href="#/contact" onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }} style={{ color: isHomePage ? '#fff' : '#888', fontSize: '12px' }}>Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Header */}
      <div className="header-mobile">
        <div className="section-padding">
          <div className="section-container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-left">
                <div className="navbar-header">
                  <button 
                    type="button" 
                    id="show-megamenu" 
                    className={`navbar-toggle ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  />
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 header-center">
                <div className="site-logo">
                  <a href="#/" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
                    <img width={400} height={79} src="images/logo-white.png" alt="Mojuri – Jewelry Store HTML Template" />
                  </a>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-right">
                <div className="mojuri-topcart dropdown">
                  <div className={`dropdown mini-cart top-cart ${mobileCartOpen ? 'show' : ''}`}>
                    <div className="remove-cart-shadow" onClick={() => setMobileCartOpen(false)} />
                    <a 
                      className="dropdown-toggle cart-icon" 
                      href="#/cart" 
                      role="button"
                      onClick={(e) => { e.preventDefault(); setMobileCartOpen(!mobileCartOpen); }}
                    >
                      <div className="icons-cart">
                        <i className="icon-large-paper-bag" />
                        <span className="cart-count">{cartCount}</span>
                      </div>
                    </a>
                    {mobileCartOpen && (
                      <div className="dropdown-menu cart-popup show" style={{ display: 'block' }}>
                        {cart.length === 0 ? (
                          <div className="cart-empty-wrap">
                            <ul className="cart-list">
                              <li className="empty">
                                <span>No products in the cart.</span>
                                <a className="go-shop" href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}>
                                  GO TO SHOP<i aria-hidden="true" className="arrow_right" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        ) : (
                          <div className="cart-list-wrap">
                            <ul className="cart-list">
                              {cart.map((item) => (
                                <li className="mini-cart-item" key={item.product.id}>
                                  <a 
                                    href="#" 
                                    className="remove" 
                                    title="Remove this item"
                                    onClick={(e) => { e.preventDefault(); removeFromCart(item.product.id); }}
                                  >
                                    <i className="icon_close" />
                                  </a>
                                  <a href={`#/details?id=${item.product.id}`} onClick={(e) => { e.preventDefault(); handleLinkClick('details', item.product.id); }} className="product-image">
                                    <img width={600} height={600} src={item.product.images[0]} alt={item.product.name} />
                                  </a>
                                  <a href={`#/details?id=${item.product.id}`} onClick={(e) => { e.preventDefault(); handleLinkClick('details', item.product.id); }} className="product-name">
                                    {item.product.name}
                                  </a>
                                  <div className="quantity">Qty: {item.quantity}</div>
                                  <div className="price">${item.product.price.toFixed(2)}</div>
                                </li>
                              ))}
                            </ul>
                            <div className="total-cart">
                              <div className="title-total">Total: </div>
                              <div className="total-price"><span>${cartSubtotal.toFixed(2)}</span></div>
                            </div>
                            <div className="free-ship">
                              <div className="title-ship">
                                {cartSubtotal >= freeShippingThreshold ? (
                                  <span>You qualify for <strong>FREE Shipping!</strong></span>
                                ) : (
                                  <span>Buy <strong>${(freeShippingThreshold - cartSubtotal).toFixed(2)}</strong> more to enjoy <strong>FREE Shipping</strong></span>
                                )}
                              </div>
                              <div className="total-percent">
                                <div className="percent" style={{ width: `${progressPercent}%` }} />
                              </div>
                            </div>
                            <div className="buttons">
                              <a href="#/cart" onClick={(e) => { e.preventDefault(); handleLinkClick('cart'); }} className="button btn view-cart btn-primary">View cart</a>
                              <a href="#/checkout" onClick={(e) => { e.preventDefault(); handleLinkClick('checkout'); }} className="button btn checkout btn-default">Check out</a>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu content */}
        {mobileMenuOpen && (
          <div className="site-mobile-navigation active" style={{ display: 'block' }}>
            <span 
              id="remove-megamenu" 
              className="remove-megamenu icon-remove"
              onClick={() => setMobileMenuOpen(false)}
            >
              Close
            </span>
            <nav className="mobile-menu">
              <ul className="menu">
                <li><a href="#/" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>Home</a></li>
                <li><a href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}>Shop</a></li>
                <li><a href="#/blog" onClick={(e) => { e.preventDefault(); handleLinkClick('blog'); }}>Blog</a></li>
                <li><a href="#/about" onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}>About Us</a></li>
                <li><a href="#/contact" onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }}>Contact</a></li>
                <li><a href="#/faq" onClick={(e) => { e.preventDefault(); handleLinkClick('faq'); }}>FAQ</a></li>
                {user?.loggedIn ? (
                  <li>
                    <span style={{ padding: '10px 20px', display: 'block', color: '#888' }}>Hello, {user.username}</span>
                    {user.role === 'admin' && (
                      <a href="#/admin" onClick={(e) => { e.preventDefault(); handleLinkClick('admin'); }} style={{ color: '#cb8161', fontWeight: 'bold' }}>Admin Dashboard</a>
                    )}
                    <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>Logout</a>
                  </li>
                ) : (
                  <li><a href="#/account" onClick={(e) => { e.preventDefault(); handleLinkClick('account'); }}>Login / Register</a></li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Header */}
      <div className="header-desktop">
        <div className="header-wrapper">
          <div className="section-padding">
            <div className="section-container large p-l-r">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 header-left">
                  <div className="site-logo">
                    <a href="#/" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
                      <img width={400} height={140} src="images/logo-white.png" alt="Mojuri – Jewelry Store HTML Template" />
                    </a>
                  </div>
                </div>
                
                {/* Desktop Navigation - EXACT layout matching original sub-menus */}
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 text-center header-center">
                  <div className="site-navigation">
                    <nav id="main-navigation">
                      <ul id="menu-main-menu" className="menu">
                        <li className={`level-0 menu-item menu-item-has-children ${isHomePage ? 'current-menu-item' : ''}`}>
                          <a href="#/" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
                            <span className="menu-item-text">Home</span>
                          </a>
                          <ul className="sub-menu">
                            <li><a href="#/" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}><span className="menu-item-text">Home Clean</span></a></li>
                            <li><a href="#/" onClick={(e) => { e.preventDefault(); handleLinkClick('home-collection'); }}><span className="menu-item-text">Home Collection</span></a></li>
                            <li><a href="#/" onClick={(e) => { e.preventDefault(); handleLinkClick('home-minimal'); }}><span className="menu-item-text">Home Minimal</span></a></li>
                            <li><a href="#/" onClick={(e) => { e.preventDefault(); handleLinkClick('home-modern'); }}><span className="menu-item-text">Home Modern</span></a></li>
                            <li><a href="#/" onClick={(e) => { e.preventDefault(); handleLinkClick('home-parallax'); }}><span className="menu-item-text">Home Parallax</span></a></li>
                            <li><a href="#/" onClick={(e) => { e.preventDefault(); handleLinkClick('home-strong'); }}><span className="menu-item-text">Home Strong</span></a></li>
                            <li><a href="#/" onClick={(e) => { e.preventDefault(); handleLinkClick('home-style'); }}><span className="menu-item-text">Home Style</span></a></li>
                            <li><a href="#/" onClick={(e) => { e.preventDefault(); handleLinkClick('home-unique'); }}><span className="menu-item-text">Home Unique</span></a></li>
                          </ul>
                        </li>
                        <li className={`level-0 menu-item menu-item-has-children ${currentPage === 'shop' || currentPage === 'details' || currentPage === 'cart' || currentPage === 'checkout' || currentPage === 'wishlist' ? 'current-menu-item' : ''}`}>
                          <a href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}>
                            <span className="menu-item-text">Shop</span>
                          </a>
                          <ul className="sub-menu">
                            <li className="level-1 menu-item menu-item-has-children">
                              <a href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}><span className="menu-item-text">Shop - Products</span></a>
                              <ul className="sub-menu">
                                <li><a href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}><span className="menu-item-text">Shop Grid - Left Sidebar</span></a></li>
                                <li><a href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}><span className="menu-item-text">Shop List - Left Sidebar</span></a></li>
                                <li><a href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}><span className="menu-item-text">Shop Grid - Right Sidebar</span></a></li>
                                <li><a href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}><span className="menu-item-text">Shop List - Right Sidebar</span></a></li>
                                <li><a href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}><span className="menu-item-text">Shop Grid - No Sidebar</span></a></li>
                              </ul>
                            </li>
                            <li><a href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}><span className="menu-item-text">Shop Details</span></a></li>
                            <li><a href="#/cart" onClick={(e) => { e.preventDefault(); handleLinkClick('cart'); }}><span className="menu-item-text">Shop - Cart</span></a></li>
                            <li><a href="#/checkout" onClick={(e) => { e.preventDefault(); handleLinkClick('checkout'); }}><span className="menu-item-text">Shop - Checkout</span></a></li>
                            <li><a href="#/wishlist" onClick={(e) => { e.preventDefault(); handleLinkClick('wishlist'); }}><span className="menu-item-text">Shop - Wishlist</span></a></li>
                          </ul>
                        </li>
                        <li className={`level-0 menu-item menu-item-has-children mega-menu mega-menu-fullwidth align-center ${currentPage === 'blog' || currentPage === 'blog-details' ? 'current-menu-item' : ''}`}>
                          <a href="#/blog" onClick={(e) => { e.preventDefault(); handleLinkClick('blog'); }}>
                            <span className="menu-item-text">Blog</span>
                          </a>
                          <div className="sub-menu">
                            <div className="row" style={{ padding: '20px' }}>
                              <div className="col-md-5">
                                <div className="menu-section">
                                  <h2 className="sub-menu-title" style={{ color: '#000', fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>Blog Category</h2>
                                  <ul className="menu-list" style={{ listStyle: 'none', padding: 0 }}>
                                    <li><a href="#/blog" onClick={(e) => { e.preventDefault(); handleLinkClick('blog'); }}><span className="menu-item-text">Blog Grid - Left Sidebar</span></a></li>
                                    <li><a href="#/blog" onClick={(e) => { e.preventDefault(); handleLinkClick('blog'); }}><span className="menu-item-text">Blog Grid - Right Sidebar</span></a></li>
                                    <li><a href="#/blog" onClick={(e) => { e.preventDefault(); handleLinkClick('blog'); }}><span className="menu-item-text">Blog List - Left Sidebar</span></a></li>
                                    <li><a href="#/blog" onClick={(e) => { e.preventDefault(); handleLinkClick('blog'); }}><span className="menu-item-text">Blog List - Right Sidebar</span></a></li>
                                    <li><a href="#/blog" onClick={(e) => { e.preventDefault(); handleLinkClick('blog'); }}><span className="menu-item-text">Blog Grid - No Sidebar</span></a></li>
                                  </ul>
                                </div>
                                <div className="menu-section" style={{ marginTop: '20px' }}>
                                  <h2 className="sub-menu-title" style={{ color: '#000', fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>Blog Details</h2>
                                  <ul className="menu-list" style={{ listStyle: 'none', padding: 0 }}>
                                    <li><a href="#/blog" onClick={(e) => { e.preventDefault(); handleLinkClick('blog'); }}><span className="menu-item-text">Blog Details - Left Sidebar</span></a></li>
                                    <li><a href="#/blog" onClick={(e) => { e.preventDefault(); handleLinkClick('blog'); }}><span className="menu-item-text">Blog Details - Right Sidebar</span></a></li>
                                    <li><a href="#/blog" onClick={(e) => { e.preventDefault(); handleLinkClick('blog'); }}><span className="menu-item-text">Blog Details - No Sidebar</span></a></li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-md-7">
                                <div className="menu-section">
                                  <h2 className="sub-menu-title" style={{ color: '#000', fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>Recent Posts</h2>
                                  <div className="block block-posts recent-posts p-t-5">
                                    <ul className="posts-list" style={{ listStyle: 'none', padding: 0 }}>
                                      <li className="post-item" style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                        <a href="#/blog" onClick={(e) => { e.preventDefault(); handleLinkClick('blog-details', 'bridal-fair-collections'); }} className="post-image">
                                          <img src="images/1.jpg" alt="" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                        </a>
                                        <div className="post-content" style={{ textAlign: 'left' }}>
                                          <h2 className="post-title" style={{ fontSize: '14px', margin: '0 0 5px 0' }}>
                                            <a href="#/blog" onClick={(e) => { e.preventDefault(); handleLinkClick('blog-details', 'bridal-fair-collections'); }}>
                                              Bridal Fair Collections 2023
                                            </a>
                                          </h2>
                                          <div className="post-time" style={{ fontSize: '11px', color: '#999' }}>
                                            <span className="post-date">May 30, 2022</span>
                                          </div>
                                        </div>
                                      </li>
                                      <li className="post-item" style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                        <a href="#/blog" onClick={(e) => { e.preventDefault(); handleLinkClick('blog-details', 'our-sterling-silver'); }} className="post-image">
                                          <img src="images/2.jpg" alt="" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                        </a>
                                        <div className="post-content" style={{ textAlign: 'left' }}>
                                          <h2 className="post-title" style={{ fontSize: '14px', margin: '0 0 5px 0' }}>
                                            <a href="#/blog" onClick={(e) => { e.preventDefault(); handleLinkClick('blog-details', 'our-sterling-silver'); }}>
                                              Our Sterling Silver
                                            </a>
                                          </h2>
                                          <div className="post-time" style={{ fontSize: '11px', color: '#999' }}>
                                            <span className="post-date">Aug 24, 2022</span>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className={`level-0 menu-item menu-item-has-children ${currentPage === 'about' || currentPage === 'contact' || currentPage === 'faq' || currentPage === 'account' ? 'current-menu-item' : ''}`}>
                          <a href="#" onClick={(e) => e.preventDefault()}><span className="menu-item-text">Pages</span></a>
                          <ul className="sub-menu">
                            <li><a href="#/account" onClick={(e) => { e.preventDefault(); handleLinkClick('account'); }}><span className="menu-item-text">Login / Register</span></a></li>
                            <li><a href="#/forgot-password" onClick={(e) => { e.preventDefault(); handleLinkClick('forgot-password'); }}><span className="menu-item-text">Forgot Password</span></a></li>
                            <li><a href="#/account" onClick={(e) => { e.preventDefault(); handleLinkClick('account'); }}><span className="menu-item-text">My Account</span></a></li>
                            <li><a href="#/about" onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}><span className="menu-item-text">About Us</span></a></li>
                            <li><a href="#/contact" onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }}><span className="menu-item-text">Contact</span></a></li>
                            <li><a href="#/faq" onClick={(e) => { e.preventDefault(); handleLinkClick('faq'); }}><span className="menu-item-text">FAQ</span></a></li>
                            <li><a href="#/404" onClick={(e) => { e.preventDefault(); handleLinkClick('404'); }}><span className="menu-item-text">Page 404</span></a></li>
                          </ul>
                        </li>
                        <li className={`level-0 menu-item ${currentPage === 'contact' ? 'current-menu-item' : ''}`}>
                          <a href="#/contact" onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }}><span className="menu-item-text">Contact</span></a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>

                {/* Right Links */}
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 header-right">
                  <div className="header-page-link">
                    {/* Search */}
                    <div className="search-box">
                      <div 
                        className="search-toggle"
                        onClick={() => {
                          const overlay = document.querySelector('.search-overlay');
                          if (overlay) {
                            overlay.classList.add('search-visible');
                            document.body.classList.add('search-visible');
                          }
                        }}
                      >
                        <i className="icon-search" />
                      </div>
                    </div>

                    {/* Login Widget */}
                    <div className="login-header icon">
                      <a 
                        className="active-login" 
                        href="#/account"
                        onClick={(e) => {
                          e.preventDefault();
                          setAuthPopupOpen(!authPopupOpen);
                        }}
                      >
                        <i className="icon-user" />
                      </a>
                      
                      <div className={`form-login-register ${authPopupOpen ? 'active' : ''}`}>
                        <div className="box-form-login">
                          <div className="box-content" style={{ position: 'relative' }}>
                            {/* Close Button */}
                            <a 
                              href="#" 
                              className="close-login" 
                              onClick={(e) => {
                                e.preventDefault();
                                setAuthPopupOpen(false);
                              }} 
                              style={{ 
                                position: 'absolute', 
                                top: '15px', 
                                right: '15px', 
                                fontSize: '20px', 
                                color: '#888', 
                                cursor: 'pointer',
                                zIndex: 10,
                                fontWeight: '300',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #eee',
                                borderRadius: '50%',
                                background: '#fff'
                              }}
                            >
                              &times;
                            </a>

                            {user?.loggedIn ? (
                              <div className="active" style={{ padding: '20px', textAlign: 'center' }}>
                                <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#000' }}>Welcome, {user.username}!</h3>
                                <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>{user.email}</p>
                                <button 
                                  className="button"
                                  onClick={() => {
                                    logout();
                                    setAuthPopupOpen(false);
                                  }}
                                  style={{ width: '100%', height: '40px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}
                                >
                                  LOGOUT
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className={`form-login ${authMode === 'login' ? 'active' : ''}`}>
                                  <form className="login" onSubmit={handleLoginSubmit}>
                                    <h2>Sign in</h2>
                                    <div className="content">
                                      <div className="username">
                                        <input 
                                          type="text" 
                                          className="input-text" 
                                          placeholder="Username or Email" 
                                          value={usernameInput}
                                          onChange={(e) => setUsernameInput(e.target.value)}
                                        />
                                      </div>
                                      <div className="password">
                                        <input 
                                          type="password" 
                                          className="input-text" 
                                          placeholder="Password" 
                                          value={passwordInput}
                                          onChange={(e) => setPasswordInput(e.target.value)}
                                        />
                                      </div>
                                      <div className="rememberme-lost">
                                        <div className="rememberme">
                                          <input type="checkbox" id="rememberme" />
                                          <label htmlFor="rememberme" className="inline">Remember me</label>
                                        </div>
                                        <div className="lost_password">
                                          <a href="#/forgot-password" onClick={(e) => { e.preventDefault(); handleLinkClick('forgot-password'); }}>Lost password?</a>
                                        </div>
                                      </div>
                                      <div className="button-login">
                                        <input type="submit" className="button" value="Login" />
                                      </div>
                                      <div style={{ marginTop: '15px', textAlign: 'center' }}>
                                        <span style={{ fontSize: '13px', color: '#666' }}>Don't have an account? </span>
                                        <a 
                                          href="#" 
                                          onClick={(e) => { e.preventDefault(); setAuthMode('register'); }} 
                                          style={{ color: '#cb8161', textDecoration: 'underline', fontSize: '13px', fontWeight: '500' }}
                                        >
                                          Register here
                                        </a>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className={`form-register ${authMode === 'register' ? 'active' : ''}`}>
                                  <form className="register" onSubmit={handleRegisterSubmit}>
                                    <h2>Register</h2>
                                    <div className="content">
                                      <div className="email">
                                        <input 
                                          type="email" 
                                          className="input-text" 
                                          placeholder="Email" 
                                          value={regEmail}
                                          onChange={(e) => setRegEmail(e.target.value)}
                                        />
                                      </div>
                                      <div className="password">
                                        <input 
                                          type="password" 
                                          className="input-text" 
                                          placeholder="Password" 
                                          value={regPassword}
                                          onChange={(e) => setRegPassword(e.target.value)}
                                        />
                                      </div>
                                      <div className="button-register">
                                        <input type="submit" className="button" value="Register" />
                                      </div>
                                      <div style={{ marginTop: '15px', textAlign: 'center' }}>
                                        <a 
                                          href="#" 
                                          onClick={(e) => { e.preventDefault(); setAuthMode('login'); }} 
                                          style={{ color: '#888', textDecoration: 'underline', fontSize: '13px', fontWeight: '500' }}
                                        >
                                          Back to Sign in
                                        </a>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Wishlist Link */}
                    <div className="wishlist-box">
                      <a href="#/wishlist" onClick={(e) => { e.preventDefault(); handleLinkClick('wishlist'); }}>
                        <i className="icon-heart" />
                      </a>
                      <span className="count-wishlist">{wishlist.length}</span>
                    </div>

                    {/* Cart Trigger */}
                    <div className="mojuri-topcart dropdown light">
                      <div className={`dropdown mini-cart top-cart ${desktopCartOpen ? 'show' : ''}`}>
                        <div className="remove-cart-shadow" onClick={() => setDesktopCartOpen(false)} />
                        <a 
                          className="dropdown-toggle cart-icon" 
                          href="#/cart" 
                          onClick={(e) => {
                            e.preventDefault();
                            setDesktopCartOpen(!desktopCartOpen);
                          }}
                        >
                          <div className="icons-cart">
                            <i className="icon-large-paper-bag" />
                            <span className="cart-count">{cartCount}</span>
                          </div>
                        </a>
                        
                        {desktopCartOpen && (
                          <div className="dropdown-menu cart-popup show" style={{ display: 'block' }}>
                            {cart.length === 0 ? (
                              <div className="cart-empty-wrap">
                                <ul className="cart-list">
                                  <li className="empty">
                                    <span>No products in the cart.</span>
                                    <a className="go-shop" href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}>
                                      GO TO SHOP<i aria-hidden="true" className="arrow_right" />
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              <div className="cart-list-wrap">
                                <ul className="cart-list">
                                  {cart.map((item) => (
                                    <li className="mini-cart-item" key={item.product.id}>
                                      <a 
                                        href="#" 
                                        className="remove" 
                                        title="Remove this item"
                                        onClick={(e) => { e.preventDefault(); removeFromCart(item.product.id); }}
                                      >
                                        <i className="icon_close" />
                                      </a>
                                      <a href={`#/details?id=${item.product.id}`} onClick={(e) => { e.preventDefault(); handleLinkClick('details', item.product.id); }} className="product-image">
                                        <img width={600} height={600} src={item.product.images[0]} alt={item.product.name} />
                                      </a>
                                      <a href={`#/details?id=${item.product.id}`} onClick={(e) => { e.preventDefault(); handleLinkClick('details', item.product.id); }} className="product-name">
                                        {item.product.name}
                                      </a>
                                      <div className="quantity">Qty: {item.quantity}</div>
                                      <div className="price">${item.product.price.toFixed(2)}</div>
                                    </li>
                                  ))}
                                </ul>
                                <div className="total-cart">
                                  <div className="title-total">Total: </div>
                                  <div className="total-price"><span>${cartSubtotal.toFixed(2)}</span></div>
                                </div>
                                <div className="free-ship">
                                  <div className="title-ship">
                                    {cartSubtotal >= freeShippingThreshold ? (
                                      <span>You qualify for <strong>FREE Shipping!</strong></span>
                                    ) : (
                                      <span>Buy <strong>${(freeShippingThreshold - cartSubtotal).toFixed(2)}</strong> more to enjoy <strong>FREE Shipping</strong></span>
                                    )}
                                  </div>
                                  <div className="total-percent">
                                    <div className="percent" style={{ width: `${progressPercent}%` }} />
                                  </div>
                                </div>
                                <div className="buttons">
                                  <a href="#/cart" onClick={(e) => { e.preventDefault(); handleLinkClick('cart'); }} className="button btn view-cart btn-primary">View cart</a>
                                  <a href="#/checkout" onClick={(e) => { e.preventDefault(); handleLinkClick('checkout'); }} className="button btn checkout btn-default">Check out</a>
                                </div>
                              </div>
                            )}
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
      </div>

      {/* Search Overlay */}
      <div className="search-overlay">
        <div 
          className="close-search" 
          onClick={() => {
            const overlay = document.querySelector('.search-overlay');
            if (overlay) {
              overlay.classList.remove('search-visible');
              document.body.classList.remove('search-visible');
            }
          }}
        />
        <div className="wrapper-search">
          <form className="search-from ajax-search" onSubmit={handleSearchSubmit}>
            <a 
              href="#" 
              className="search-close"
              onClick={(e) => {
                e.preventDefault();
                const overlay = document.querySelector('.search-overlay');
                if (overlay) {
                  overlay.classList.remove('search-visible');
                  document.body.classList.remove('search-visible');
                }
              }}
            />
            <div className="search-box">
              <button id="searchsubmit" className="btn" type="submit">
                <i className="icon-search" />
              </button>
              <input 
                type="text" 
                className="input-search s" 
                placeholder="Search..." 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <div className="content-menu_search">
                <label>Suggested</label>
                <ul id="menu_search" className="menu">
                  <li><a href="#/shop" onClick={(e) => { e.preventDefault(); setSearchInput('Earrings'); setSearchQuery('Earrings'); navigate('shop'); }}>Earrings</a></li>
                  <li><a href="#/shop" onClick={(e) => { e.preventDefault(); setSearchInput('Necklaces'); setSearchQuery('Necklaces'); navigate('shop'); }}>Necklaces</a></li>
                  <li><a href="#/shop" onClick={(e) => { e.preventDefault(); setSearchInput('Bracelets'); setSearchQuery('Bracelets'); navigate('shop'); }}>Bracelets</a></li>
                  <li><a href="#/shop" onClick={(e) => { e.preventDefault(); setSearchInput('Rings'); setSearchQuery('Rings'); navigate('shop'); }}>Rings</a></li>
                </ul>			
              </div>
            </div>
          </form>	
        </div>	
      </div>
    </header>
  );
};

export default Header;
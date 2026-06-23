
import { useShop } from '../Context/ShopContext';

const Footer = () => {
  const { navigate, setSearchQuery } = useShop();

  const handleLinkClick = (page: string) => {
    navigate(page);
  };

  const handleCatalogSearch = (category: string) => {
    setSearchQuery(category);
    navigate('shop');
  };

  return (
    <footer id="site-footer" className="site-footer background four-columns">
      <div className="footer">
        <div className="section-padding">
          <div className="section-container">
            <div className="block-widget-wrap">
              <div className="row">
                <div className="col-lg-3 col-md-6 column-1">
                  <div className="block block-menu m-b-20">
                    <h2 className="block-title">Contact Us</h2>
                    <div className="block-content">
                      <ul>
                        <li>
                          <span>Head Office:</span> 26 Wyle Cop, Shrewsbury, Shropshire, SY1 1XD
                        </li>
                        <li>
                          <span>Tel:</span> 01743 234500
                        </li>
                        <li>
                          <span>Email:</span> <a href="mailto:support@mojuri.com">support@mojuri.com</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="block block-social">
                    <ul className="social-link">
                      <li><a href="#/"><i className="fa fa-twitter" /></a></li>
                      <li><a href="#/"><i className="fa fa-instagram" /></a></li>
                      <li><a href="#/"><i className="fa fa-dribbble" /></a></li>
                      <li><a href="#/"><i className="fa fa-behance" /></a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 column-2">
                  <div className="block block-menu">
                    <h2 className="block-title">Customer Services</h2>
                    <div className="block-content">
                      <ul>
                        <li>
                          <a href="#/contact" onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }}>Contact Us</a>
                        </li>
                        <li>
                          <a href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}>Track Your Order</a>
                        </li>
                        <li>
                          <a href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}>Product Care &amp; Repair</a>
                        </li>
                        <li>
                          <a href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}>Book an Appointment</a>
                        </li>
                        <li>
                          <a href="#/faq" onClick={(e) => { e.preventDefault(); handleLinkClick('faq'); }}>Frequently Asked Questions</a>
                        </li>
                        <li>
                          <a href="#/shop" onClick={(e) => { e.preventDefault(); handleLinkClick('shop'); }}>Shipping &amp; Returns</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 column-3">
                  <div className="block block-menu">
                    <h2 className="block-title">About Us</h2>
                    <div className="block-content">
                      <ul>
                        <li>
                          <a href="#/about" onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}>About Us</a>
                        </li>
                        <li>
                          <a href="#/faq" onClick={(e) => { e.preventDefault(); handleLinkClick('faq'); }}>FAQ</a>
                        </li>
                        <li>
                          <a href="#/about" onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}>Our Producers</a>
                        </li>
                        <li>
                          <a href="#/" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>Sitemap</a>
                        </li>
                        <li>
                          <a href="#/about" onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}>Terms &amp; Conditions</a>
                        </li>
                        <li>
                          <a href="#/about" onClick={(e) => { e.preventDefault(); handleLinkClick('about'); }}>Privacy Policy</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 column-4">
                  <div className="block block-menu">
                    <h2 className="block-title">Catalog</h2>
                    <div className="block-content">
                      <ul>
                        <li>
                          <a href="#/shop" onClick={(e) => { e.preventDefault(); handleCatalogSearch('Earrings'); }}>Earrings</a>
                        </li>
                        <li>
                          <a href="#/shop" onClick={(e) => { e.preventDefault(); handleCatalogSearch('Necklaces'); }}>Necklaces</a>
                        </li>
                        <li>
                          <a href="#/shop" onClick={(e) => { e.preventDefault(); handleCatalogSearch('Bracelets'); }}>Bracelets</a>
                        </li>
                        <li>
                          <a href="#/shop" onClick={(e) => { e.preventDefault(); handleCatalogSearch('Rings'); }}>Rings</a>
                        </li>
                        <li>
                          <a href="#/shop" onClick={(e) => { e.preventDefault(); handleCatalogSearch('Charms'); }}>Charms</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="section-padding">
          <div className="section-container">
            <div className="block-widget-wrap">
              <div className="row">
                <div className="col-md-6">
                  <div className="footer-left">
                    <p className="copyright">Copyright © 2023. All Right Reserved</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="footer-right">
                    <div className="block block-image">
                      <img width={309} height={32} src="images/payments.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
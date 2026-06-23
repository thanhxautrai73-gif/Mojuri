import React from 'react';
import { useShop } from '../Context/ShopContext';

const AboutUs: React.FC = () => {
  const { navigate } = useShop();

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Breadcrumb */}
          <div id="title-bar" className="title-bar" style={{ background: '#f5f5f5', padding: '25px 0' }}>
            <div className="section-container">
              <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="col-md-6 col-sm-6">
                  <h1 className="title-bar-title" style={{ fontSize: '24px', margin: 0 }}>About Us</h1>
                </div>
                <div className="col-md-6 col-sm-6 text-right">
                  <ul className="breadcrumb" style={{ listStyle: 'none', display: 'flex', gap: '8px', justifyContent: 'flex-end', margin: 0, padding: 0 }}>
                    <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a></li>
                    <li>/</li>
                    <li className="active">About Us</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container large" style={{ maxWidth: '960px', margin: '0 auto' }}>
                <div className="about-intro m-b-50" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }}>
                  <div style={{ flex: '1 1 400px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '20px', fontWeight: 'bold' }}>Our Story</h2>
                    <p style={{ color: '#666', lineHeight: '1.8', fontSize: '15px' }}>
                      Founded in 2020, Mojuri was built with the belief that premium fine jewelry shouldn't be reserved only for special occasions or require traditional luxury markups. 
                    </p>
                    <p style={{ color: '#666', lineHeight: '1.8', fontSize: '15px' }}>
                      We partner directly with the world's top jewelry craftsmen, sourcing ethical gemstones and premium recycled gold and silver, to bring you beautiful, modern designs directly at fair pricing.
                    </p>
                  </div>
                  <div style={{ flex: '1 1 400px' }}>
                    <img src="images/banner-1-4.jpg" alt="About Mojuri" style={{ width: '100%', height: 'auto', border: '1px solid #eee' }} />
                  </div>
                </div>

                <div className="about-features m-b-50" style={{ borderTop: '1px solid #eee', paddingTop: '40px' }}>
                  <h2 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '40px', fontWeight: 'bold' }}>Our Core Values</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
                    <div style={{ flex: '1 1 250px', textAlign: 'center', padding: '20px' }}>
                      <div style={{ fontSize: '36px', color: '#000', marginBottom: '15px' }}><i className="icon-diamond" /></div>
                      <h3 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: 'bold' }}>Ethically Sourced</h3>
                      <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>We source all precious metals and stones responsibly, adhering to strict environmental standards.</p>
                    </div>
                    <div style={{ flex: '1 1 250px', textAlign: 'center', padding: '20px' }}>
                      <div style={{ fontSize: '36px', color: '#000', marginBottom: '15px' }}><i className="icon-star" /></div>
                      <h3 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: 'bold' }}>Premium Quality</h3>
                      <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Each piece is meticulously crafted by skilled master artisans using high-quality 925 sterling silver and 18k gold plating.</p>
                    </div>
                    <div style={{ flex: '1 1 250px', textAlign: 'center', padding: '20px' }}>
                      <div style={{ fontSize: '36px', color: '#000', marginBottom: '15px' }}><i className="icon-large-paper-bag" /></div>
                      <h3 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: 'bold' }}>Fair Pricing</h3>
                      <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>By eliminating the traditional middleman markup, we offer fine jewelry at a fraction of the cost of legacy brands.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;

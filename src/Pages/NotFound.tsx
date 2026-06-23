import React from 'react';
import { useShop } from '../Context/ShopContext';

const NotFound: React.FC = () => {
  const { navigate } = useShop();

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container large" style={{ textAlign: 'center', padding: '80px 0' }}>
                <h1 style={{ fontSize: '120px', fontWeight: 'bold', margin: '0 0 10px 0', lineHeight: '1', color: '#000' }}>404</h1>
                <h2 style={{ fontSize: '28px', marginBottom: '20px', fontWeight: 'bold' }}>Page Not Found</h2>
                <p style={{ color: '#666', fontSize: '16px', marginBottom: '35px', maxWidth: '500px', margin: '0 auto 35px auto' }}>
                  The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <button 
                  className="button"
                  style={{ background: '#000', color: '#fff', border: 'none', padding: '15px 40px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
                  onClick={() => navigate('home')}
                >
                  GO BACK TO HOME
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

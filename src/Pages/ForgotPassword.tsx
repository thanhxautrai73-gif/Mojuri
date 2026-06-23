import React, { useState } from 'react';
import { useShop } from '../Context/ShopContext';

const ForgotPassword: React.FC = () => {
  const { navigate } = useShop();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email.');
      return;
    }
    alert(`A password reset link has been sent to ${email}!`);
    setEmail('');
    navigate('account');
  };

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Breadcrumb */}
          <div id="title-bar" className="title-bar" style={{ background: '#f5f5f5', padding: '25px 0' }}>
            <div className="section-container">
              <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="col-md-6 col-sm-6">
                  <h1 className="title-bar-title" style={{ fontSize: '24px', margin: 0 }}>Lost Password</h1>
                </div>
                <div className="col-md-6 col-sm-6 text-right">
                  <ul className="breadcrumb" style={{ listStyle: 'none', display: 'flex', gap: '8px', justifyContent: 'flex-end', margin: 0, padding: 0 }}>
                    <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a></li>
                    <li>/</li>
                    <li><a href="#/account" onClick={(e) => { e.preventDefault(); navigate('account'); }}>Account</a></li>
                    <li>/</li>
                    <li className="active">Lost Password</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container large" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit} style={{ background: '#fcfcfc', padding: '30px', border: '1px solid #eee' }}>
                  <p style={{ color: '#666', lineHeight: '1.6', fontSize: '14px', marginBottom: '20px' }}>
                    Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.
                  </p>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Username or email *</label>
                    <input 
                      type="text" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px', background: '#fff' }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="button"
                    style={{ height: '45px', padding: '0 30px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    RESET PASSWORD
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

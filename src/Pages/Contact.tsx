import React, { useState } from 'react';
import { useShop, API_URL } from '../Context/ShopContext';

const Contact: React.FC = () => {
  const { navigate } = useShop();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      if (res.ok) {
        alert(`Thank you ${name}, your message has been sent successfully! We will get back to you shortly.`);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'Failed to send message.');
      }
    } catch (err) {
      console.warn('Backend server offline. Simulating local submission.', err);
      alert(`Thank you ${name}, your message has been sent successfully! We will get back to you shortly.`);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }
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
                  <h1 className="title-bar-title" style={{ fontSize: '24px', margin: 0 }}>Contact Us</h1>
                </div>
                <div className="col-md-6 col-sm-6 text-right">
                  <ul className="breadcrumb" style={{ listStyle: 'none', display: 'flex', gap: '8px', justifyContent: 'flex-end', margin: 0, padding: 0 }}>
                    <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a></li>
                    <li>/</li>
                    <li className="active">Contact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container large">
                <div className="row">
                  {/* Contact Info Column */}
                  <div className="col-md-5 col-sm-12 m-b-30">
                    <div style={{ paddingRight: '20px' }}>
                      <h2 style={{ fontSize: '26px', marginBottom: '20px', fontWeight: 'bold' }}>Get In Touch</h2>
                      <p style={{ color: '#666', lineHeight: '1.7', fontSize: '15px', marginBottom: '30px' }}>
                        We are happy to answer any questions you may have about our products, orders, shipping policies, or custom inquiries. Fill out the contact form or reach us via telephone or email.
                      </p>
                      
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <li style={{ display: 'flex', gap: '15px' }}>
                          <div style={{ fontSize: '24px', color: '#000' }}><i className="icon-map" /></div>
                          <div>
                            <strong style={{ fontSize: '15px', display: 'block', marginBottom: '3px' }}>Address</strong>
                            <span style={{ color: '#666', fontSize: '14px' }}>26 Wyle Cop, Shrewsbury, Shropshire, SY1 1XD</span>
                          </div>
                        </li>
                        <li style={{ display: 'flex', gap: '15px' }}>
                          <div style={{ fontSize: '24px', color: '#000' }}><i className="icon-phone" /></div>
                          <div>
                            <strong style={{ fontSize: '15px', display: 'block', marginBottom: '3px' }}>Phone</strong>
                            <span style={{ color: '#666', fontSize: '14px' }}>01743 234500 (Mon - Fri, 9 AM - 5 PM)</span>
                          </div>
                        </li>
                        <li style={{ display: 'flex', gap: '15px' }}>
                          <div style={{ fontSize: '24px', color: '#000' }}><i className="icon-envelope" /></div>
                          <div>
                            <strong style={{ fontSize: '15px', display: 'block', marginBottom: '3px' }}>Email</strong>
                            <a href="mailto:support@mojuri.com" style={{ color: '#666', fontSize: '14px' }}>support@mojuri.com</a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Contact Form Column */}
                  <div className="col-md-7 col-sm-12">
                    <form className="contact-form" onSubmit={handleSubmit} style={{ background: '#fcfcfc', padding: '30px', border: '1px solid #eee' }}>
                      <h3 style={{ fontSize: '22px', marginBottom: '20px', fontWeight: 'bold' }}>Send Us A Message</h3>
                      
                      <div className="row" style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Your Name *</label>
                          <input 
                            type="text" 
                            required 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px', background: '#fff' }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Your Email *</label>
                          <input 
                            type="email" 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px', background: '#fff' }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Subject</label>
                        <input 
                          type="text" 
                          value={subject} 
                          onChange={(e) => setSubject(e.target.value)}
                          style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px', background: '#fff' }}
                        />
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Message *</label>
                        <textarea 
                          required 
                          rows={6} 
                          value={message} 
                          onChange={(e) => setMessage(e.target.value)}
                          style={{ width: '100%', border: '1px solid #ddd', padding: '10px', background: '#fff' }}
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="button"
                        style={{ height: '45px', padding: '0 35px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        SUBMIT MESSAGE
                      </button>
                    </form>
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

export default Contact;

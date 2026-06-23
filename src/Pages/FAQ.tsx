import React, { useState } from 'react';
import { useShop } from '../Context/ShopContext';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const { navigate } = useShop();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'What materials are your jewelry made of?',
      answer: 'All our silver jewelry is made from premium nickel-free 925 sterling silver, finished with rhodium plating to prevent tarnishing. Our gold items are plated in heavy 18k yellow gold over sterling silver or brass.'
    },
    {
      question: 'Where do you ship to?',
      answer: 'We offer shipping worldwide. Shipping is free for orders over $400. For orders under $400, a flat shipping rate of $10 applies.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We accept returns on all unworn items in original packaging within 30 days of delivery. Custom-made items and earrings are final sale due to hygiene regulations.'
    },
    {
      question: 'How do I care for my sterling silver jewelry?',
      answer: 'Store your jewelry in a cool, dry place. Avoid contact with water, perfumes, and lotions. To clean, gently rub with a lint-free silver polishing cloth.'
    },
    {
      question: 'Do you offer warranty on your products?',
      answer: 'Yes! We provide a 1-year manufacturing warranty on all jewelry items. If a piece breaks due to craftsmanship issues, we will replace or repair it for free.'
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
                  <h1 className="title-bar-title" style={{ fontSize: '24px', margin: 0 }}>Frequently Asked Questions</h1>
                </div>
                <div className="col-md-6 col-sm-6 text-right">
                  <ul className="breadcrumb" style={{ listStyle: 'none', display: 'flex', gap: '8px', justifyContent: 'flex-end', margin: 0, padding: 0 }}>
                    <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a></li>
                    <li>/</li>
                    <li className="active">FAQ</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container large" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '40px', fontWeight: 'bold' }}>General Inquiries</h2>
                
                <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                      <div 
                        key={index} 
                        style={{ 
                          border: '1px solid #eee', 
                          background: '#fff', 
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Question Title Header */}
                        <div 
                          onClick={() => handleToggle(index)}
                          style={{ 
                            padding: '18px 20px', 
                            background: isOpen ? '#f9f9f9' : '#fff',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            userSelect: 'none',
                            borderBottom: isOpen ? '1px solid #eee' : 'none'
                          }}
                        >
                          <span>{faq.question}</span>
                          <span style={{ fontSize: '18px' }}>{isOpen ? '−' : '+'}</span>
                        </div>

                        {/* Answer Accordion Body */}
                        {isOpen && (
                          <div 
                            style={{ 
                              padding: '20px', 
                              lineHeight: '1.7', 
                              color: '#666', 
                              fontSize: '14px',
                              background: '#fff'
                            }}
                          >
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '50px', textAlign: 'center', background: '#fcfcfc', border: '1px solid #eee', padding: '30px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Still Have Questions?</h3>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>Our customer support representatives are available Monday through Friday to help you.</p>
                  <button 
                    className="button"
                    style={{ background: '#000', color: '#fff', border: 'none', padding: '10px 25px', cursor: 'pointer', fontWeight: 'bold' }}
                    onClick={() => navigate('contact')}
                  >
                    CONTACT SUPPORT
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQ;

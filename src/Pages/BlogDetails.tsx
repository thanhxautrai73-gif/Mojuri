import React, { useState, useMemo } from 'react';
import { useShop } from '../Context/ShopContext';

const BlogDetails: React.FC = () => {
  const { selectedId, navigate, blogs } = useShop();

  // Find active blog
  const blog = useMemo(() => {
    return blogs.find((b) => b.id === selectedId) || blogs[0];
  }, [selectedId, blogs]);

  const [commentName, setCommentName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentList, setCommentList] = useState(() => blog.comments || []);

  // Update comments when blog selection changes
  React.useEffect(() => {
    setCommentList(blog.comments || []);
  }, [blog]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentContent) {
      alert('Please fill out all fields.');
      return;
    }
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });
    setCommentList((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        author: commentName,
        date: today,
        content: commentContent
      }
    ]);
    setCommentName('');
    setCommentContent('');
    alert('Comment posted successfully!');
  };

  return (
    <div id="site-main" className="site-main">
      <div id="main-content" className="main-content">
        <div id="primary" className="content-area">
          {/* Breadcrumb */}
          <div id="title-bar" className="title-bar" style={{ background: '#f5f5f5', padding: '25px 0' }}>
            <div className="section-container">
              <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="col-md-8 col-sm-8">
                  <h1 className="title-bar-title" style={{ fontSize: '24px', margin: 0 }}>{blog.title}</h1>
                </div>
                <div className="col-md-4 col-sm-4 text-right">
                  <ul className="breadcrumb" style={{ listStyle: 'none', display: 'flex', gap: '8px', justifyContent: 'flex-end', margin: 0, padding: 0 }}>
                    <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a></li>
                    <li>/</li>
                    <li><a href="#/blog" onClick={(e) => { e.preventDefault(); navigate('blog'); }}>Blog</a></li>
                    <li>/</li>
                    <li className="active">Detail</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container large">
                <div className="row">
                  {/* Article content */}
                  <div className="col-md-9 col-sm-12 col-xs-12">
                    <article className="post-detail-item" style={{ marginBottom: '50px' }}>
                      <div className="post-image" style={{ marginBottom: '25px' }}>
                        <img src={blog.image} alt={blog.title} style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }} />
                      </div>
                      <div className="post-content">
                        <div className="post-meta" style={{ fontSize: '13px', color: '#999', marginBottom: '15px' }}>
                          <span className="post-date" style={{ marginRight: '15px' }}>
                            <i className="fa fa-calendar-o" style={{ marginRight: '5px' }} />
                            {blog.date}
                          </span>
                          <span className="post-category" style={{ marginRight: '15px' }}>
                            <i className="fa fa-folder-open-o" style={{ marginRight: '5px' }} />
                            {blog.category}
                          </span>
                          <span className="post-comments">
                            <i className="fa fa-comment-o" style={{ marginRight: '5px' }} />
                            {commentList.length} Comments
                          </span>
                        </div>
                        
                        <div 
                          className="post-body" 
                          style={{ 
                            color: '#333', 
                            lineHeight: '1.9', 
                            fontSize: '16px', 
                            whiteSpace: 'pre-line',
                            marginBottom: '40px' 
                          }}
                        >
                          {blog.content}
                        </div>
                      </div>
                    </article>

                    {/* Comments Section */}
                    <div className="comments-section" style={{ borderTop: '1px solid #eee', paddingTop: '40px', marginBottom: '50px' }}>
                      <h3 style={{ fontSize: '22px', marginBottom: '25px', fontWeight: 'bold' }}>
                        Comments ({commentList.length})
                      </h3>
                      
                      <div className="comments-list" style={{ marginBottom: '40px' }}>
                        {commentList.map((c) => (
                          <div key={c.id} style={{ display: 'flex', gap: '15px', borderBottom: '1px solid #f9f9f9', paddingBottom: '20px', marginBottom: '20px' }}>
                            <div 
                              style={{ 
                                width: '50px', 
                                height: '50px', 
                                borderRadius: '50%', 
                                background: '#eee', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                color: '#666'
                              }}
                            >
                              {c.author.charAt(0).toUpperCase()}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <strong style={{ fontSize: '15px' }}>{c.author}</strong>
                                <span style={{ fontSize: '12px', color: '#999' }}>{c.date}</span>
                              </div>
                              <p style={{ color: '#666', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>{c.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Post a Comment Form */}
                      <form className="comment-form" onSubmit={handleCommentSubmit} style={{ maxWidth: '600px', background: '#fcfcfc', padding: '30px', border: '1px solid #eee' }}>
                        <h4 style={{ fontSize: '18px', marginBottom: '20px', fontWeight: 'bold' }}>Leave a Comment</h4>
                        
                        <div style={{ marginBottom: '15px' }}>
                          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Name *</label>
                          <input 
                            type="text" 
                            required 
                            value={commentName}
                            onChange={(e) => setCommentName(e.target.value)}
                            style={{ width: '100%', height: '40px', border: '1px solid #ddd', padding: '0 10px', background: '#fff' }}
                          />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Comment *</label>
                          <textarea 
                            required 
                            rows={6}
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            style={{ width: '100%', border: '1px solid #ddd', padding: '10px', background: '#fff' }}
                          />
                        </div>

                        <button 
                          type="submit" 
                          className="button"
                          style={{ height: '45px', padding: '0 35px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          POST COMMENT
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Sidebar (Recent posts list) */}
                  <div className="col-md-3 col-sm-12 col-xs-12">
                    <div className="sidebar" style={{ paddingLeft: '15px' }}>
                      <div className="widget widget-recent-posts" style={{ marginBottom: '30px' }}>
                        <h3 className="widget-title" style={{ fontSize: '18px', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>Recent Articles</h3>
                        <ul className="posts-list" style={{ listStyle: 'none', padding: 0 }}>
                          {blogs.map((b) => (
                            <li key={b.id} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                              <img src={b.image} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                              <div>
                                <h4 style={{ fontSize: '14px', margin: '0 0 5px 0' }}>
                                  <a href={`#/blog-details?id=${b.id}`} onClick={(e) => { e.preventDefault(); navigate('blog-details', b.id); }} style={{ color: '#000' }}>
                                    {b.title}
                                  </a>
                                </h4>
                                <span style={{ fontSize: '12px', color: '#999' }}>{b.date}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
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
  );
};

export default BlogDetails;

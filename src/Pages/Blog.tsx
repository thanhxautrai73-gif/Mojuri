import React from 'react';
import { useShop } from '../Context/ShopContext';

const Blog: React.FC = () => {
  const { navigate, blogs } = useShop();

  const handleBlogClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate('blog-details', id);
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
                  <h1 className="title-bar-title" style={{ fontSize: '24px', margin: 0 }}>Our Blog</h1>
                </div>
                <div className="col-md-6 col-sm-6 text-right">
                  <ul className="breadcrumb" style={{ listStyle: 'none', display: 'flex', gap: '8px', justifyContent: 'flex-end', margin: 0, padding: 0 }}>
                    <li><a href="#/" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a></li>
                    <li>/</li>
                    <li className="active">Blog</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div id="content" className="site-content" role="main">
            <div className="section-padding">
              <div className="section-container large">
                <div className="row">
                  {/* Blog posts list */}
                  <div className="col-md-9 col-sm-12 col-xs-12">
                    <div className="blog-posts-list">
                      {blogs.map((blog) => (
                        <article className="post-item m-b-50" key={blog.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '40px' }}>
                          <div className="post-image" style={{ marginBottom: '20px' }}>
                            <a href={`#/blog-details?id=${blog.id}`} onClick={(e) => handleBlogClick(blog.id, e)}>
                              <img src={blog.image} alt={blog.title} style={{ width: '100%', height: 'auto', maxHeight: '450px', objectFit: 'cover' }} />
                            </a>
                          </div>
                          <div className="post-content">
                            <div className="post-meta" style={{ fontSize: '13px', color: '#999', marginBottom: '10px' }}>
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
                                {blog.commentsCount} Comments
                              </span>
                            </div>
                            <h2 className="post-title" style={{ fontSize: '26px', margin: '0 0 15px 0', fontWeight: 'bold' }}>
                              <a href={`#/blog-details?id=${blog.id}`} onClick={(e) => handleBlogClick(blog.id, e)} style={{ color: '#000' }}>
                                {blog.title}
                              </a>
                            </h2>
                            <p className="post-excerpt" style={{ color: '#666', lineHeight: '1.7', fontSize: '15px', marginBottom: '20px' }}>
                              {blog.summary}
                            </p>
                            <a 
                              href={`#/blog-details?id=${blog.id}`} 
                              onClick={(e) => handleBlogClick(blog.id, e)} 
                              className="button btn-read-more"
                              style={{ 
                                display: 'inline-block',
                                background: '#000', 
                                color: '#fff', 
                                padding: '10px 25px', 
                                textTransform: 'uppercase', 
                                fontSize: '13px', 
                                fontWeight: 'bold'
                              }}
                            >
                              Read More
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  {/* Sidebar column */}
                  <div className="col-md-3 col-sm-12 col-xs-12">
                    <div className="sidebar" style={{ paddingLeft: '15px' }}>
                      <div className="widget widget-recent-posts" style={{ marginBottom: '30px' }}>
                        <h3 className="widget-title" style={{ fontSize: '18px', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>Recent Posts</h3>
                        <ul className="posts-list" style={{ listStyle: 'none', padding: 0 }}>
                          {blogs.map((blog) => (
                            <li key={blog.id} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                              <img src={blog.image} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                              <div>
                                <h4 style={{ fontSize: '14px', margin: '0 0 5px 0' }}>
                                  <a href={`#/blog-details?id=${blog.id}`} onClick={(e) => handleBlogClick(blog.id, e)} style={{ color: '#000' }}>
                                    {blog.title}
                                  </a>
                                </h4>
                                <span style={{ fontSize: '12px', color: '#999' }}>{blog.date}</span>
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

export default Blog;

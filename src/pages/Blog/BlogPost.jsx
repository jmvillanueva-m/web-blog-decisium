import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Icon from '../../components/Icon/Icon';
import Footer from '../../components/Footer/Footer';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import './BlogPost.css';

const BlogPost = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/wp-json/wp/v2/posts?slug=${slug}&_embed`);
        
        if (!response.ok) {
          throw new Error('Error al cargar el artículo');
        }
        const data = await response.json();
        
        if (data.length === 0) {
          throw new Error('Artículo no encontrado');
        }
        
        setPost(data[0]);
      } catch (err) {
        setError(err.message);
        setTimeout(() => {
          navigate('/404');
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return null;

  return (
    <>
      <header className="blog-post-header">
        <nav>
          <div className="container flex-container">
            <Link to="/blog" className="back-to-blog">
              <Icon name="thin-arrow-lf" size="24px" color="var(--color-white)" />
              <span>
                <Icon name="blog" size="24px" color="var(--color-white)" />
                Volver al Blog
              </span>
            </Link>
            <Link to="/" className="back-to-home">
              <Icon name="home" size="24px" color="var(--color-white)" />
              <span>Página Principal</span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="blog-post-main">
        <article className="blog-post-container">
          <div className="post-header">
            <div className="post-meta">
              <span className="article-date-">{formatDate(post.date)}</span>
              {post._embedded && post._embedded.author && (
                <span className="post-author">Por {post._embedded.author[0].name}</span>
              )}
              {post._embedded && post._embedded['wp:term'] && (
                <div className="post-categories">
                  {post._embedded['wp:term'][0].map(category => (
                    <span key={category.id} className="post-category">
                      {category.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <h1 className="post-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            
            {post._embedded && post._embedded['wp:featuredmedia'] && (
              <div className="post-featured-image">
                <img 
                  src={post._embedded['wp:featuredmedia'][0].source_url} 
                  alt={post.title.rendered}
                  loading="lazy"
                />
              </div>
            )}
          </div>

          <div 
            className="post-content" 
            dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
          />

          <div className="post-footer">
            <Link to="/blog" className="btn-primary back-to-blog-btn">
              <Icon name="thin-arrow-lf" size="20px" />
              Volver al Blog
            </Link>
          </div>
        </article>
      </main>

      <FloatingButton />
      <Footer />
    </>
  );
};

export default BlogPost;
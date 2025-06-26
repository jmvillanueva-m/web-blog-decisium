import { Link } from 'react-router-dom';
import Icon from "../../Icon/Icon";
import './BlogPostCard.css';

const BlogPostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getFeaturedImage = () => {
    if (post._embedded && post._embedded['wp:featuredmedia']) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return 'https://via.placeholder.com/600x400?text=Decisium';
  };

  const getExcerpt = () => {
    if (post.excerpt && post.excerpt.rendered) {
      return post.excerpt.rendered.replace(/<[^>]+>/g, '').substring(0, 150) + '...';
    }
    return '';
  };

  return (
    <article className="blog-post-card">
      <div className="post-image-container">
        <img 
          src={getFeaturedImage()} 
          alt={post.title.rendered} 
          className="post-image"
          loading="lazy"
        />
        <div className="post-date">{formatDate(post.date)}</div>
      </div>
      
      <div className="post-content">
        <h3 className="post-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        
        <div className="post-meta-card">
          {post._embedded && post._embedded.author && (
            <span className="post-author">
              Por {post._embedded.author[0].name}
            </span>
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
        
        <p className="post-excerpt">{getExcerpt()}</p>
        
        <div>
          <Link 
            to={`/blog/${post.slug}`} 
            className="flex read-more-btn"
          >
            <Icon name="read-article" size="24px" color="var(--color-primary)" />
            Leer artículo completo
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
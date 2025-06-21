import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import FloatingButton from '../../components/FloatingButton/FloatingButton'
import BlogPostCard from '../../components/Blog/Card/BlogPostCard';
import BlogSearch from '../../components/Blog/BlogSearch/BlogSearch';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Icon from '../../components/Icon/Icon';
import Footer from '../../components/Footer/Footer';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const apiURL = `${import.meta.env.VITE_API_URL}?_embed&per_page=20`;

  // Memoizar la función de búsqueda
  const handleSearch = useCallback((searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
      return;
    }
    
    const filtered = posts.filter(post => 
      post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.rendered.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post._embedded && post._embedded['wp:term'] && 
        post._embedded['wp:term'].flat().some(term => 
          term.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ))
    
    setFilteredPosts(filtered);
  }, [posts]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log(apiURL);
        const response = await fetch(`${apiURL}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar los posts');
        }
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [apiURL]);

  // Calcular posts actuales basados en paginación
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Función de paginación persistente
  const paginate = useCallback((pageNumber) => {
    // Validar que el número de página esté dentro del rango
    const validPage = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(validPage);
    
    // Scroll suave hacia arriba
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [totalPages]);

  // Resetear a página 1 solo cuando cambian los resultados filtrados
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPosts]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <header>
        <nav>
          <div className="blog-nav container flex-container">
            <Link to="/" className="back-to-home">
              <Icon name="thin-arrow-lf" size="24px" color="var(--color-white)" />
              <span>
                <Icon name="home" size="24px" color="var(--color-white)" />
                Regresar a la Página Principal
              </span>
            </Link>
          </div>
        </nav>
      </header>    
      
      <section id="blog" className="blog-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Blog</span>
            <h2 className="section-title-blog">DECISIUM LEX</h2>
            <div className="header-divider">
              <div className="divider-line"></div>
              <Icon name="blog" size="24px" color="var(--color-primary)" />
              <div className="divider-line"></div>
            </div>
            <p className="blog-subtitle">Consejos Jurídicos Prácticos</p>
          </div>
         
          <BlogSearch onSearch={handleSearch} />
          
          <div className="blog-grid">
            {currentPosts.length > 0 ? (
              currentPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="no-results">
                <h3>No se encontraron resultados</h3>
                <p>Intenta con otros términos de búsqueda</p>
              </div>
            )}
          </div>

          {/* Paginación mejorada */}
          {filteredPosts.length > postsPerPage && (
            <div className="pagination">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className="pagination-button"
                aria-label="Página anterior"
              >
                <Icon name="thin-arrow-lf" size="16px" color={currentPage === 1 ? "var(--color-gray)" : "var(--color-primary)"} />
                Anterior
              </button>
              
              {/* Mostrar números de página con lógica para muchos resultados */}
              {totalPages <= 6 ? (
                Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                    aria-label={`Ir a página ${number}`}
                  >
                    {number}
                  </button>
                ))
              ) : (
                <>
                  {currentPage > 3 && (
                    <button onClick={() => paginate(1)} className="pagination-number">
                      1
                    </button>
                  )}
                  {currentPage > 4 && <span className="pagination-ellipsis">...</span>}
                  
                  {[
                    currentPage - 2,
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    currentPage + 2
                  ].filter(num => num > 0 && num <= totalPages).map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  {currentPage < totalPages - 3 && <span className="pagination-ellipsis">...</span>}
                  {currentPage < totalPages - 2 && (
                    <button onClick={() => paginate(totalPages)} className="pagination-number">
                      {totalPages}
                    </button>
                  )}
                </>
              )}
              
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="pagination-button"
                aria-label="Página siguiente"
              >
                Siguiente
                <Icon name="thin-arrow-rt" size="16px" color={currentPage === totalPages ? "var(--color-gray)" : "var(--color-primary)"} />
              </button>
            </div>
          )}
        </div>
      </section>
      <FloatingButton></FloatingButton>
      <Footer></Footer>
    </>
  );
};

export default Blog;
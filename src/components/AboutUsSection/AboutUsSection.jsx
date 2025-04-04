import { useEffect, useRef, useState } from 'react';
import Icon from "../Icon/Icon";
import './AboutUsSection.css';

import aboutImg1 from '../../assets/images/about1.jpg'
import aboutImg2 from '../../assets/images/about2.jpg'
import aboutImg3 from '../../assets/images/equipo.jpg'

const AboutUsSection = () => {
  const countersRef = useRef([]);
  const [activeImage, setActiveImage] = useState(0);
  const statsContainerRef = useRef(null);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  
  const images = [
    { id: 1, src: aboutImg3, alt: 'Oficina principal' },
    { id: 2, src: aboutImg2, alt: 'Equipo de trabajo' },
    { id: 3, src: aboutImg1, alt: 'Reunión con clientes' },
  ];

  const stats = [
    { value: 10, symbol: "+", label: "Años de experiencia" },
    { value: 50, symbol: "+", label: "Clientes satisfechos" },
    { value: 94, symbol: "%", label: "Casos exitosos" },
    { value: 100, symbol: "+", label: "Proyectos completados" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    countersRef.current.forEach((counter) => {
      if (counter) observer.observe(counter);
    });

    return () => {
      countersRef.current.forEach((counter) => {
        if (counter) observer.unobserve(counter);
      });
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      const interval = setInterval(() => {
        setCurrentStatIndex((prev) => (prev + 1) % stats.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [stats.length]);

  const animateCounter = (element) => {
    const target = +element.getAttribute('data-target');
    const count = +element.innerText;
    const duration = 2000;
    const increment = target / (duration / 16);

    const updateCount = () => {
      const currentCount = +element.innerText;
      if (currentCount < target) {
        element.innerText = Math.ceil(currentCount + increment);
        setTimeout(updateCount, 16);
      } else {
        element.innerText = target;
      }
    };

    updateCount();
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section id="about-us-section" className="about-section">
      <div className="container">
        {/* Encabezado moderno */}
        <div className="section-header">
          <span className="section-subtitle">Nuestra Historia</span>
          <h2 className="section-title">DECISIUM LEX</h2>
          <div className="header-divider">
            <div className="divider-line"></div>
            <Icon name="balance-scale" size="24px" color="var(--color-accent)" />
            <div className="divider-line"></div>
          </div>
        </div>
        
        {/* Contenido principal */}
        <div className="about-content">
          {/* Galería de imágenes */}
          <div className="gallery-container">
            <div className="main-image-container">
              <img 
                src={images[activeImage].src} 
                alt={images[activeImage].alt}
                className="main-image"
                loading="lazy"
              />
              <div className="image-controls">
                <button className="control-btn prev" onClick={prevImage} aria-label="Imagen anterior">
                  <Icon name="arrow-lf" size="24px" />
                </button>
                <button className="control-btn next" onClick={nextImage} aria-label="Imagen siguiente">
                  <Icon name="arrow-rh" size="24px" />
                </button>
              </div>
            </div>
            
            <div className="thumbnails">
              {images.map((img, index) => (
                <div 
                  key={img.id}
                  className={`thumbnail ${index === activeImage ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Texto descriptivo */}
          <div className="about-description">
            <h3>Somos Excelencia Jurídica</h3>
            <p>
              Desde nuestra fundación nos enfocamos en brindar asesoramiento jurídico integral y personalizado. 
              Nuestra misión es proporcionar asistencia legal de alta calidad, construyendo relaciones duraderas 
              con nuestros clientes y contribuyendo a una sociedad más justa.
            </p>
            <div className="about-values">
              <div className="value-item">
                <Icon name="shield" size="24px" color="var(--color-accent)" />
                <span>Confianza y Transparencia</span>
              </div>
              <div className="value-item">
                <Icon name="expertise" size="24px" color="var(--color-accent)" />
                <span>Experiencia Comprobada</span>
              </div>
              <div className="value-item">
                <Icon name="personalized" size="24px" color="var(--color-accent)" />
                <span>Enfoque Personalizado</span>
              </div>
            </div>
            <a
              href="https://www.linkedin.com/"
              className="btn-transparent"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="linkedin" size="20px" />
              Conoce más en LinkedIn
            </a>
          </div>
        </div>
                
        {/* Estadísticas */}
        <div className="stats-section">
          <div className="stats-header">
            <h3>Nuestros Logros</h3>
            <p>Los números hablan por nosotros</p>
          </div>
          
          {/* Versión desktop - Grid normal */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-content">
                  <div className="counter-container">
                    <span 
                      ref={el => countersRef.current[index] = el} 
                      className="counter" 
                      data-target={stat.value}
                    >
                      0
                    </span>
                    <span className="counter-symbol">{stat.symbol}</span>
                  </div>
                  <p className="stat-label">{stat.label}</p>
                </div>
                <div className="stat-decoration"></div>
              </div>
            ))}
          </div>
          
          {/* Versión móvil - Carrusel */}
          <div className="stats-carousel">
            {stats.map((stat, index) => (
              <div 
                className={`stat-card ${index === currentStatIndex ? 'active' : ''}`} 
                key={`mobile-${index}`}
              >
                <div className="stat-content">
                  <div className="counter-container">
                    <span 
                      ref={el => countersRef.current[index + stats.length] = el} 
                      className="counter" 
                      data-target={stat.value}
                    >
                      0
                    </span>
                    <span className="counter-symbol">{stat.symbol}</span>
                  </div>
                  <p className="stat-label">{stat.label}</p>
                </div>
                <div className="stat-decoration"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
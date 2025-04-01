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
    { value: 50, symbol: "+", label: "Clientes" },
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
    <section id="about-us-section">
      <div className="container">
        <div className="centered-text">
          <div className="line"></div>
          <h2>¿QUIENES SOMOS?</h2>
          <div className="line"></div>
        </div>
        
        <div className="media-text-container">
          <div className="media-container flex">
            <div className="main-media ">
              <img 
                src={images[activeImage].src} 
                alt={images[activeImage].alt}
                className="main-image"
              />
            </div>
            
            <div className="thumbnail-carousel">
              {images.map((img, index) => (
                <div 
                  key={img.id}
                  className={`thumbnail ${index === activeImage ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img.src} alt={img.alt} />
                </div>
              ))}
            </div>
          
            <button className="btn-control prev" onClick={prevImage}>
              <Icon name="thin-arrow-lf" size="3rem" />
            </button>
            <button className="btn-control next" onClick={nextImage}>
              <Icon name="thin-arrow-rh" size="3rem" />
            </button>
          </div>

          <div className="about-text">
            <h3 className='font-heading'>
              Decisium Lex una empresa creada a tu servicio
            </h3>
            <article>
              Desde nuestra fundación nos enfocamos en brindar asesoramiento jurídico integral y personalizado a nuestros clientes. A partir de nuestra misión de proporcionar asistencia jurídica de alta calidad, nos esforzamos por construir relaciones duraderas con nuestros clientes y contribuir a una comunidad más justa y equitativa.
            </article>
            <div className="more-info">
              <p>Más información:</p>
              <a
                href="https://www.linkedin.com/"
                className="btn-transparent btn-hover-effect"
                target="_blank"
              >
                <Icon name="external-link" size="1.2rem" />
                Visítanos en: 
                <Icon name="linkedin" size="1.7rem" />
              </a>
            </div>
          </div>
        </div>
                
        <div className="stats-section">
          <div className='flex'>
            <span className="font-heading stats-title">SOMOS RESULTADOS</span>
            <div className='line'></div>
          </div>
          
          {/* Versión desktop - Grid normal */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-item" key={index}>
                <div className="counter-container">
                  <span 
                    ref={el => countersRef.current[index] = el} 
                    className="counter" 
                    data-target={stat.value}
                  >
                    0
                  </span>
                  <span>{stat.symbol}</span>
                </div>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
          
          {/* Versión móvil - Carrusel */}
          <div className="stats-carousel">
            {stats.map((stat, index) => (
              <div 
                className={`stat-item ${index === currentStatIndex ? 'active' : ''}`} 
                key={index}
              >
                <div className="counter-container">
                  <span 
                    ref={el => countersRef.current[index + stats.length] = el} 
                    className="counter" 
                    data-target={stat.value}
                  >
                    0
                  </span>
                  <span>{stat.symbol}</span>
                </div>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
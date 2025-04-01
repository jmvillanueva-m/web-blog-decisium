import React, { useState, useEffect, useRef } from 'react';
import Icon from "../Icon/Icon";
import './Carousel.css';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Empezamos en el primer slide real
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoSlideTimer = useRef(null);
  const slideContentRefs = useRef([]);

  const slides = [
    {
      title: "¿Busca asesoramiento jurídico de calidad?",
      content: "Su éxito es nuestra prioridad, y estamos preparados para estar a su lado con la experiencia y dedicación que se merece.",
      links: [
        { text: "Ver Servicios Legales", url: "#servicios", icon: "external-link", type: "btn-secondary" },
        { text: "Obtener asistencia", url: "#asistencia", icon: "customer-service", type: "btn-primary" }
      ],
      backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
    },
    {
      title: "Expertos en derecho corporativo",
      content: "Nuestro equipo de abogados especializados ofrece soluciones legales integrales para su empresa.",
      links: [
        { text: "Consultoría empresarial", url: "#consultoria", icon: "external-link", type: "btn-secondary" },
        { text: "Contáctenos", url: "#contacto", icon: "customer-service", type: "btn-primary" }
      ],
      backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
    },
    {
      title: "Defensa legal personalizada",
      content: "Protección jurídica adaptada a sus necesidades personales con un enfoque humano y profesional.",
      links: [
        { text: "Casos de éxito", url: "#casos", icon: "external-link", type: "btn-secondary" },
        { text: "Agendar cita", url: "#cita", icon: "customer-service", type: "btn-primary" }
      ],
      backgroundImage: "url('https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
    }
  ];

  // Clonamos el último slide al inicio y el primero al final
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  // Auto slide cada 8 segundos
  useEffect(() => {
    autoSlideTimer.current = setInterval(goToNextSlide, 8000);
    return () => clearInterval(autoSlideTimer.current);
  }, []);

  useEffect(() => {
    slideContentRefs.current = slideContentRefs.current.slice(0, extendedSlides.length);
  }, [extendedSlides]);

  // Animaciones del contenido del slide
  useEffect(() => {
    if (slideContentRefs.current[activeIndex]) {
      const slideContent = slideContentRefs.current[activeIndex];
      const h1 = slideContent.querySelector('h1');
      const p = slideContent.querySelector('p');
      const buttons = slideContent.querySelectorAll('.btn-hover-effect');

      // Reiniciar animaciones
      h1.style.animation = 'none';
      p.style.animation = 'none';
      buttons.forEach(btn => btn.style.animation = 'none');

      // Forzar reflow
      void h1.offsetHeight;
      void p.offsetHeight;
      buttons.forEach(btn => void btn.offsetHeight);

      // Aplicar animaciones
      h1.style.animation = 'slideInLeft 0.8s ease-out forwards';
      p.style.animation = 'slideInRight 0.8s ease-out 0.3s forwards';

      buttons.forEach((btn, i) => {
        btn.style.animation = `fadeInUp 0.6s ease-out ${0.6 + i * 0.15}s forwards`;
      });
    }
  }, [activeIndex]);

  const resetAutoSlideTimer = () => {
    clearInterval(autoSlideTimer.current);
    autoSlideTimer.current = setInterval(goToNextSlide, 8000);
  };

  const goToNextSlide = () => {
    if (isTransitioning) return; // Evitar acciones durante transición
    setIsTransitioning(true);

    setActiveIndex(prevIndex => prevIndex + 1);
    resetAutoSlideTimer();
  };

  const goToPrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setActiveIndex(prevIndex => prevIndex - 1);
    resetAutoSlideTimer();
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setActiveIndex(index + 1); // Ajustar índice para omitir el clon inicial
    resetAutoSlideTimer();
  };

  // Detectar y corregir cuando el slide está en los clones
  useEffect(() => {
    const carouselInner = document.querySelector('.carousel-inner');

    if (activeIndex === extendedSlides.length - 1) {
      // Desactivar transición temporalmente
      carouselInner.style.transition = 'none';
      setTimeout(() => {
        setActiveIndex(1); // Ir al primer slide real
        // Reactivar transición después de ajustar el índice
        setTimeout(() => {
          carouselInner.style.transition = 'transform 0.5s ease-in-out';
          setIsTransitioning(false);
        }, 50); // Tiempo mínimo para que el navegador procese el cambio
      }, 50);
    } else if (activeIndex === 0) {
      // Desactivar transición temporalmente
      carouselInner.style.transition = 'none';
      setTimeout(() => {
        setActiveIndex(extendedSlides.length - 2); // Ir al último slide real
        // Reactivar transición después de ajustar el índice
        setTimeout(() => {
          carouselInner.style.transition = 'transform 0.5s ease-in-out';
          setIsTransitioning(false);
        }, 50);
      }, 50);
    } else {
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [activeIndex]);

  // Handlers para touch events
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX); // Inicializar touchEnd para evitar NaN
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (isTransitioning) return; // No permitir swipe durante transición

    // Determinar si el swipe fue suficiente
    if (touchStart - touchEnd > 50) {
      goToNextSlide();
    } else if (touchStart - touchEnd < -50) {
      goToPrevSlide();
    }
  };

  return (
    <div className="carousel-container">
      <div 
        className="carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="carousel-inner"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: isTransitioning ? "transform 0.5s ease-in-out" : "none"
          }}
        >
          {extendedSlides.map((slide, index) => (
            <div 
              key={index}
              className="carousel-slide"
              style={{ backgroundImage: slide.backgroundImage }}
            >
              <div
                className="slide-content"
                ref={(el) => (slideContentRefs.current[index] = el)}
              >
                <h1 className="font-heading">{slide.title}</h1>
                <p>{slide.content}</p>
                <div className="links-container">
                  {slide.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      className={`${link.type} btn-hover-effect`}
                      style={{ opacity: 0, transform: 'translateY(20px)' }}
                    >
                      <Icon name={link.icon} size="2rem" />
                      {link.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-indicators">
          <button 
            className="carousel-control prev" 
            onClick={goToPrevSlide} 
            aria-label="Previous slide"
          >
            <Icon name="thin-arrow-lf" size="3rem" />
          </button>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeIndex - 1 ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          <button 
            className="carousel-control next" 
            onClick={goToNextSlide} 
            aria-label="Next slide"
          >
            <Icon name="thin-arrow-rh" size="3rem" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
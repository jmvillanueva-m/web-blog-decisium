import React, { useState } from 'react';
import Icon from "../Icon/Icon";
import './Carousel.css';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const slides = [
    {
      title: "¿Busca asesoramiento jurídico de calidad?",
      content: "Su éxito es nuestra prioridad, y estamos preparados para estar a su lado con la experiencia y dedicación que se merece.",
      links: [
        { text: "Ver Servicios Legales", url: "#servicios" },
        { text: "Obtener asistencia", url: "#asistencia" }
      ],
      backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
    },
    {
      title: "Expertos en derecho corporativo",
      content: "Nuestro equipo de abogados especializados ofrece soluciones legales integrales para su empresa.",
      links: [
        { text: "Consultoría empresarial", url: "#consultoria" },
        { text: "Contáctenos", url: "#contacto" }
      ],
      backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
    },
    {
      title: "Defensa legal personalizada",
      content: "Protección jurídica adaptada a sus necesidades personales con un enfoque humano y profesional.",
      links: [
        { text: "Casos de éxito", url: "#casos" },
        { text: "Agendar cita", url: "#cita" }
      ],
      backgroundImage: "url('https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
    }
  ];

  const goToPrevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <div 
          className="carousel-inner"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index}
              className="carousel-slide"
              style={{ backgroundImage: slide.backgroundImage }}
            >
              <div className="slide-content">
                <h1 className='title-font'>{slide.title}</h1>
                <p>{slide.content}</p>
                <div className="links-container">
                  {slide.links.map((link, i) => (
                    <a key={i} href={link.url} className="slide-link">
                      {link.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control prev" onClick={goToPrevSlide}>
          <Icon name="arrow-lf" size="3rem" />
        </button>
        <button className="carousel-control next" onClick={goToNextSlide}>
          <Icon name="arrow-rh" size="3rem"/>
        </button>

        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
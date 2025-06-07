import { useState, useEffect, useRef } from 'react';
import Icon from "../Icon/Icon"; 
import './ServicesCarousel.css';

import visaLogo from "../../assets/images/brands-logos/visa.webp"
import masterLogo from "../../assets/images/brands-logos/mastercard.webp"
import americanLogo from "../../assets/images/brands-logos/american.webp"
import paypalLogo from "../../assets/images/brands-logos/paypal.webp"
import dinersLogo from "../../assets/images/brands-logos/diners.webp"
import service from "../../assets/images/services.webp"
import service2 from "../../assets/images/services2.webp"

const ServicesCarousel = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const paymentScrollerRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "Derecho Administrativo",
      shortDescription: "Diagnostica a tiempo las implicaciones de contratar personal, conoce todo la documentación que se...",
      fullDescription: "Nuestro servicio de asesoría laboral te ayuda a navegar por las complejidades de la contratación de personal. Ofrecemos orientación sobre contratos, nóminas, derechos laborales y obligaciones patronales.",
      image: service,
      icon: "balance-scale"
    },
    {
      id: 2,
      title: "Derecho Constritucional",
      shortDescription: "Protege tus creaciones, marcas y patentes con nuestro equipo especializado en propiedad intelectual.",
      fullDescription: "Protegemos tus activos intelectuales mediante el registro de marcas, patentes y derechos de autor. Nuestros expertos te guiarán en todo el proceso.",
      image: service2,
      icon: "gavel"
    },
    {
      id: 3,
      title: "Derecho Bancario",
      shortDescription: "Maximiza tus oportunidades en licitaciones y contratos con el sector público con nuestra asesoría.",
      fullDescription: "Especialistas en procesos de contratación pública, te ayudamos a preparar documentación y cumplir con requisitos para licitaciones gubernamentales.",
      image: service,
      icon: "university"
    },
    {
      id: 4,
      title: "Derecho Notarial Y Mediación",
      shortDescription: "Asesoría legal especializada para empresas en formación, operación y transformación.",
      fullDescription: "Brindamos soluciones legales integrales para empresas en todas las etapas de su ciclo de vida, desde su constitución hasta operaciones complejas.",
      image: service2,
      icon: "handshake"
    },
    {
      id: 5,
      title: "Derecho de Familia",
      shortDescription: "Representación legal en disputas civiles y comerciales con altas posibilidades de éxito.",
      fullDescription: "Nuestro equipo de litigantes cuenta con amplia experiencia en resolver conflictos civiles y comerciales mediante estrategias legales efectivas.",
      image: service,
      icon: "family"
    },
    {
      id: 6,
      title: "Derecho Penal",
      shortDescription: "Asesoría legal especializada para empresas en formación, operación y transformación.",
      fullDescription: "Brindamos soluciones legales integrales para empresas en todas las etapas de su ciclo de vida, desde su constitución hasta operaciones complejas.",
      image: service2,
      icon: "handcuffs"
    },
  ];

  const paymentMethods = [
    { 
      name: "Visa", 
      image: visaLogo
    },
    { 
      name: "Mastercard", 
      image: masterLogo
    },
    { 
      name: "American Express", 
      image: americanLogo
    },
    { 
      name: "PayPal", 
      image: paypalLogo
    },
    { 
      name: "Diners Club", 
      image: dinersLogo
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Configuración del auto-scroll para métodos de pago
    const scroller = paymentScrollerRef.current;
    let animationFrameId;
    let scrollSpeed = 1;
    
    const autoScroll = () => {
      if (scroller) {
        scroller.scrollLeft += scrollSpeed;
        
        // Reiniciar el scroll cuando llegue al final
        if (scroller.scrollLeft >= (scroller.scrollWidth - scroller.clientWidth) / 2) {
          scroller.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };
    
    autoScroll();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleOpenDialog = (service) => {
    setSelectedService(service);
    setShowDialog(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    document.body.style.overflow = 'auto';
  };

  const handleAgendarClick = (serviceTitle = null) => {
    const serviceName = serviceTitle || (selectedService ? selectedService.title : 'servicio jurídico');
    const encodedMessage = encodeURIComponent(
      `¡Buen día! Estoy interesado(a) en el servicio de *${serviceName}* que ofrecen.\n` +
      `Me gustaría recibir más información sobre éste.\n` +
      `Saludos, [Escriba su nombre]`
    );
    
    window.open(`https://wa.me/593996805484?text=${encodedMessage}`, '_blank');
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= services.length - itemsToShow ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? services.length - itemsToShow : prevIndex - 1
    );
  };

  const visibleServices = services.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <section id="services-section" className="services-section">
      <div className="container">

        <div className="section-header">
          <span className="section-subtitle">Lo que ofrecemos</span>
          <h2 className="section-title">Nuestros Servicios Especializados</h2>
          <div className="header-divider">
            <div className="divider-line"></div>
            <Icon name="services-lg" size="24px" color="var(--color-accent)" />
            <div className="divider-line"></div>
          </div>
        </div>

        {/* Carousel de servicios mejorado */}
        <div className="services-carousel-container">
          <div className="services-carousel-wrapper">
            <button className="carousel-button prev" onClick={prevSlide} aria-label="Anterior">
              <Icon name="arrow-lf" size="35px" color="var(--color-accent)" />
            </button>
            
            <div className="services-carousel">
              {visibleServices.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="card-icon">
                    <Icon name={service.icon} size="48px" color="var(--color-accent)" />
                  </div>
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="service-image"
                    loading="lazy"
                  />
                  <div className="service-content">
                    <h4>{service.title}</h4>
                    <p>{service.shortDescription}</p>
                    <div className="service-actions">
                      <button 
                        className="read-more"
                        onClick={() => handleOpenDialog(service)}
                      >
                        <Icon name="read" />
                        <span>Leer más</span>
                      </button>
                      <button 
                        className="agendar"
                        onClick={() => handleAgendarClick(service.title)}
                      >
                          <Icon name="calendar" />
                          <span>Agendar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          
            <button className="carousel-button next" onClick={nextSlide} aria-label="Siguiente">
              <Icon name="arrow-rh" size="35px" color="var(--color-accent)" />
            </button>
          </div>
        </div>

        {/* Modal moderno */}
        {showDialog && selectedService && (
          <div className="service-dialog-overlay">
            <div className="service-dialog">
              <button className="close-dialog" onClick={handleCloseDialog} aria-label="Cerrar">
                <Icon name="close" size="24px" />
              </button>
              <div className="dialog-header">
                <div className="dialog-icon">
                  <Icon name={selectedService.icon} size="48px" color="var(--color-accent)" />
                </div>
                <h3>{selectedService.title}</h3>
              </div>
              <div className="dialog-content">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title}
                  className="dialog-image"
                  loading="lazy"
                />
                <p>{selectedService.fullDescription}</p>
                <div className="dialog-actions">
                  <button onClick={handleCloseDialog} className="back-btn">
                    <Icon name="arrow-lf" size="16px" />
                    Regresar
                  </button>
                  <button onClick={() => handleAgendarClick(selectedService.title)} className="agendar-btn">
                    <Icon name="whatsapp" size="16px" />
                    Agendar por WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sección de métodos de pago modernizada */}
        <div className="payment-section">
          <div className="payment-header">
            <h4>Métodos de Pago Aceptados</h4>
            <p>Ofrecemos múltiples opciones para tu comodidad</p>
          </div>
          
          <div className="payment-methods-container">
            <div 
              className="payment-methods-scroller"
              ref={paymentScrollerRef}
            >
              {[...paymentMethods, ...paymentMethods].map((method, index) => (
                <div key={`${method.name}-${index}`} className="payment-method">
                  <img 
                    src={method.image} 
                    alt={method.name}
                    className="payment-method-image"
                    loading="lazy"
                  />
                  <span>{method.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="payment-footer">
            <div className="payment-info">
              <Icon name="shield" size="24px" color="var(--color-accent)" />
              <span>Transacciones seguras garantizadas</span>
            </div>
          </div>
        </div>
      </div>     
    </section>
  );
};

export default ServicesCarousel;
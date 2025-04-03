import { useState, useEffect } from 'react';
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

  const services = [
    {
      id: 1,
      title: "Derecho Administrativo",
      shortDescription: "Diagnostica a tiempo las implicaciones de contratar personal, conoce todo la documentación que se...",
      fullDescription: "Nuestro servicio de asesoría laboral te ayuda a navegar por las complejidades de la contratación de personal. Ofrecemos orientación sobre contratos, nóminas, derechos laborales y obligaciones patronales.",
      image: service
    },
    {
      id: 2,
      title: "Derecho Constritucional",
      shortDescription: "Protege tus creaciones, marcas y patentes con nuestro equipo especializado en propiedad intelectual.",
      fullDescription: "Protegemos tus activos intelectuales mediante el registro de marcas, patentes y derechos de autor. Nuestros expertos te guiarán en todo el proceso.",
      image: service2
    },
    {
      id: 3,
      title: "Derecho Bancario",
      shortDescription: "Maximiza tus oportunidades en licitaciones y contratos con el sector público con nuestra asesoría.",
      fullDescription: "Especialistas en procesos de contratación pública, te ayudamos a preparar documentación y cumplir con requisitos para licitaciones gubernamentales.",
      image: service
    },
    {
      id: 4,
      title: "Derecho Notarial Y Mediación",
      shortDescription: "Asesoría legal especializada para empresas en formación, operación y transformación.",
      fullDescription: "Brindamos soluciones legales integrales para empresas en todas las etapas de su ciclo de vida, desde su constitución hasta operaciones complejas.",
      image: service2
    },
    {
      id: 5,
      title: "Derecho de Familia",
      shortDescription: "Representación legal en disputas civiles y comerciales con altas posibilidades de éxito.",
      fullDescription: "Nuestro equipo de litigantes cuenta con amplia experiencia en resolver conflictos civiles y comerciales mediante estrategias legales efectivas.",
      image: service
    },
    {
      id: 6,
      title: "Derecho Penal",
      shortDescription: "Asesoría legal especializada para empresas en formación, operación y transformación.",
      fullDescription: "Brindamos soluciones legales integrales para empresas en todas las etapas de su ciclo de vida, desde su constitución hasta operaciones complejas.",
      image: service2
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

  const duplicatedMethods = [...paymentMethods, ...paymentMethods];

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
    return () => window.removeEventListener('resize', handleResize);
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

  const handleAgendarClick = () => {
    window.open('https://wa.me/1234567890', '_blank');
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
        <div className='centered-text'>
            <div className="line"></div>
            <h2 className="text-white">SERVICIOS</h2>
            <div className="line"></div>
        </div>
        <div>
            <h3 className='font-heading'>
            Nos especializamos en las siguientes áreas
            </h3>
        </div>

        <div className="services-carousel-container">
          <button className="carousel-button prev" onClick={prevSlide}>
            <Icon name="thin-arrow-lf" size="50px" color="var(--color-accent)" />
          </button>
          
          <div className="services-carousel">
            {visibleServices.map((service) => (
              <div key={service.id} className="service-card-wrapper">
                <div className="rotating-border">
                  <div className="service-card">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="service-image"
                    />
                    <div className="service-title">
                      <h4>{service.title}</h4>
                    </div>
                    <div className="service-overlay">
                      <div className="service-content">
                        <p>{service.shortDescription}</p>
                        <div className="service-actions">
                          <button 
                            className="read-more"
                            onClick={() => handleOpenDialog(service)}
                          >
                            <div className='flex'>
                              <Icon name="read" />
                              Leer más
                            </div>
                          </button>
                          <button 
                            className="agendar"
                            onClick={handleAgendarClick}
                          >
                            <div className='flex'>
                              <Icon name="calendar" ></Icon>
                              Agendar
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
          <button className="carousel-button next" onClick={nextSlide}>
            <Icon name="thin-arrow-rh" size="50px" color="var(--color-accent)" />
          </button>
        </div>

        {showDialog && selectedService && (
          <div className="service-dialog-overlay">
            <div className="service-dialog">
              <button className="close-dialog" onClick={handleCloseDialog}>×</button>
              <h3>{selectedService.title}</h3>
              <img 
                src={selectedService.image} 
                alt={selectedService.title}
                className="dialog-image"
              />
              <p>{selectedService.fullDescription}</p>
              <div className="dialog-actions">
                <button onClick={handleCloseDialog} className="back-btn">Regresar</button>
                <button onClick={handleAgendarClick} className="agendar-btn">Agendar</button>
              </div>
            </div>
          </div>
        )}

      <div className="payment-methods-title">
        <h4>Métodos de pago</h4>
        <span>EFECTIVO, TARJETA DE CRÉDITO, TRANSFERENCIA O DEPÓSITO BANCARIO</span>
      </div>
      <div className="payment-methods">
        <div className="payment-scroller">
          {duplicatedMethods.map((method, index) => (
            <div key={index} className="payment-method">
              <img 
                src={method.image} 
                alt={method.name}
                className="payment-method-image"
              />
              <span>{method.name}</span>
            </div>
          ))}
        </div>
      </div>  
      </div>     
    </section>
  );
};

export default ServicesCarousel;
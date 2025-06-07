import { useState } from 'react';
import Icon from "../Icon/Icon";
import './TeamSection.css';

// Importa las imágenes de los miembros del equipo
import davidImage from '../../assets/images/team/david.jpg';
import abog1Image from '../../assets/images/team/abogado.webp';
import abog2Image from '../../assets/images/team/persona.webp';

const TeamSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const teamMembers = [
    {
      id: 1,
      name: "David Cárdenas",
      position: "Fundador y Gerente",
      image: davidImage,
      email: "decisiumlex@gmail.com",
      linkedin: "https://linkedin.com/in/juliabrown"
      
    },
    {
      id: 2,
      name: "Andrés Hurtado",
      position: "Especialista en derecho",
      image: abog1Image,
      email: "pedro.zabala@decisiumlex.com",
      linkedin: "https://www.linkedin.com/in/andr%C3%A9s-hurtado-troya-698509354/"
    },
    {
      id: 3,
      name: "Sofía Sánchez",
      position: "Especialista en derecho",
      image: abog2Image,
      email: "sofia.sanchez@decisiumlex.com",
      linkedin: "https://linkedin.com/in/sofiasanchez"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="team-section">
      <div className="container">
        {/* Encabezado */}
        <div className="section-header">
          <span className="section-subtitle">Profesionales calificados</span>
          <h2 className="section-title">CONOCE A NUESTRO EQUIPO</h2>
          <div className="header-divider">
            <div className="divider-line"></div>
            <Icon name="team" size="24px" color="var(--color-accent)" />
            <div className="divider-line"></div>
          </div>
        </div>

        {/* Carrusel del equipo */}
        <div className="team-carousel-container">
          <button 
            className="carousel-button prev" 
            onClick={prevSlide}
            aria-label="Miembro anterior"
          >
            <Icon name="arrow-lf" size="40px" color="var(--color-accent)" />
          </button>
          
          <div className="team-carousel">
  {teamMembers.map((member, index) => (
    <div 
      key={member.id}
      className={`team-member ${index === currentIndex ? 'active' : ''}`}
    >
      <div className="member-image-container">
        <img 
          src={member.image} 
          alt={member.name}
          className="member-image"
          loading="lazy"
        />
        <div className="member-overlay">
          <div className="social-links">
            <a 
              href={`mailto:${member.email}`}
              aria-label={`Enviar email a ${member.name}`}
            >
              <Icon name="email" size="20px" color="white" />
            </a>
            <a 
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Perfil de LinkedIn de ${member.name}`}
            >
              <Icon name="linkedin" size="20px" color="white" />
            </a>
          </div>
        </div>
      </div>
      <div className="member-info">
        <h3>{member.name}</h3>
        <p>{member.position}</p>
      </div>
    </div>
  ))}
</div>
        
          <button 
            className="carousel-button next" 
            onClick={nextSlide}
            aria-label="Siguiente miembro"
          >
            <Icon name="arrow-rh" size="40px" color="var(--color-accent)" />
          </button>
        </div>
        
      </div>
    </section>
  );
};

export default TeamSection;
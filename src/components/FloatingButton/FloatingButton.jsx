import React, { useState, useEffect } from 'react';
import Icon from "../Icon/Icon";
import './FloatingButton.css';
import throttle from 'lodash/throttle';

import andresPhoto from '../../assets/images/andres-hurtado.jpg';
import davidPhoto from '../../assets/images/david-cardenas.jpg';

const FloatingButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    // Mostrar tooltip inicial
    setShowTooltip(true);
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    // Detectar posición de scroll
    const handleScroll = throttle(() => {
      const firstSection = document.getElementById('home-section');
      if (firstSection) {
        const firstSectionHeight = firstSection.offsetHeight;
        setShowScrollButton(window.scrollY > firstSectionHeight);
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
    setShowTooltip(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const teamMembers = [
    { 
      name: "Andrés Hurtado", 
      role: "Abogado Especialista", 
      status: "online",
      photo: andresPhoto,
      whatsapp: "+593983084209",
      message: "Saludos Abg. Andrés H., necesito información sobre ...",
    },
    { 
      name: "David Cárdenas", 
      role: "Abogado Especialista", 
      status: "online",
      photo: davidPhoto,
      whatsapp: "+593996805484",
      message: "Saludos Abg.David C., necesito información sobre ...",
    },
  ];

  return (
    <div className="floating-container">
      {/* Chat Window */}
      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <button className='close-btn' onClick={handleChatToggle}>
              <Icon name="whatsapp" size="32px" />
            </button>
            <div>
              <h4>Inicia una Conversación</h4>
              <p className="instruction">Haz clic en uno de nuestros representantes para hablar por WhatsApp</p>
            </div>
          </div>
          <div className="chat-body">
            <p className="response-time">El equipo suele responder en unos minutos</p>
            
            <div className="team-members flex-column">
              {teamMembers.map((member, index) => (
                <a 
                  key={index} 
                  href={`https://wa.me/${member.whatsapp}?text=${member.message}`}
                  className="member-card-ws flex"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className='flex'>
                    <div className="member-avatar">
                      <div className="avatar-image">
                        <img loading='lazy' src={member.photo} alt={member.name} />
                      </div>
                      <span className={`status ${member.status === "online" ? 'online' : 'away'}`}></span>
                    </div>
                    <div className="member-info-ws">
                      <h4>{member.name}</h4>
                      <p>{member.role}</p>
                      {member.status !== "online" && <span className="status-message">{member.status}</span>}
                    </div>
                  </div>
                  
                  <div className="message-icon">
                    <Icon name="send-msj" size="32px" color="#25d366"/>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {showScrollButton && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <Icon name="arrow-up" />
        </div>
      )}

      <div 
        className={`whatsapp-button ${isChatOpen ? 'active' : ''}`}
        onClick={handleChatToggle}
        onMouseEnter={() => !isChatOpen && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {isChatOpen ? (
          <Icon name="close" size="32px" />
        ) : (
          <Icon name="whatsapp" size="32px" />
        )}
        {showTooltip && <span className="tooltip flex">
            <Icon name="cellphone" />
            <div>
              ¿Necesitas ayuda?<br />Habla con nosotros. 
            </div>
          </span>}
      </div>
    </div>
  );
};

export default FloatingButton;
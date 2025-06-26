import React from 'react';
import Icon from "../Icon/Icon";
import './Footer.css';

const SocialMediaLinks = () => (
  <div className="social-icons">
    {['facebook', 'instagram', 'linkedin', 'x', 'youtube'].map((platform) => (
      <a 
        key={platform} 
        href="#" 
        className="social-icon"
        aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}
      >
        <Icon name={platform === 'instagram' ? 'instragram' : platform} />
      </a>
    ))}
  </div>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="footer-brand">
          <div className="brand-info">
            <h3 className="brand-name font-logo">DECISIUM LEX</h3>
            <span className="brand-tagline font-heading">ASESORES JURÍDICOS</span>
          </div>
          
          <div className="social-section">
            <span className="social-title">Síguenos en nuestras redes</span>
            <SocialMediaLinks />
            <p className="social-handle">@decisiumlex_ec</p>
          </div>
        </div>

        <div className="footer-links">
          <div className="links-column">
            <h3 className="links-title">ENLACES</h3>
            <div className="links-list">
              <a href="#" className="footer-link">ACERCA DE NOSOTROS</a>
              <a href="#" className="footer-link">SERVICIOS</a>
              <a href="#" className="footer-link">VER UBICACIÓN</a>
              <a href="#" className="footer-link">BLOG</a>
              <a href="#" className="footer-link">TÉRMINOS Y CONDICIONES</a>
            </div>
          </div>
        </div>

        <div className="footer-cta">
          <h3 className="cta-title">¿EN BÚSQUEDA DE ASESORÍA LEGAL?</h3>
          <button 
             onClick={() => window.open(
              "https://wa.me/593996805484?text=Saludos%20Abg.%20David%20C.,%20necesito%20información%20sobre...", 
              "_blank"
            )}
            className="cta-button">
            <Icon name="customer-service" size="16px" />
            Hablar con un asesor 
          </button>
          <p className="cta-text">
            Nuestro equipo de expertos te ayuda. <br /> 
            Comunícate con nosotros.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            ©Copyright 2025 | DECISIUM LEX | Derechos reservados | Creada por wiphala.ec
          </p>
          <div className="made-in">
            <span className="flag-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36">
                <path fill="#ed1c23" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4z" />
                <path fill="#034ea2" d="M0 17h36v7H0z" />
                <path fill="#fd0" d="M36 17V9a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v8z" />
                <path fill="#fd0" d="M23 19a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2z" />
                <path fill="#034ea2" d="M22 18c0 1.104-.896 3-2 3h-4c-1.104 0-2-1.896-2-3v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2z" />
                <path fill="#ed1c23" d="M21 18c0 1.104-.896 3-2 3h-2c-1.104 0-2-1.896-2-3v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <span>Made in Ecuador</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import './Footer.css';

// Import icons
import { ReactComponent as FacebookIcon } from "../../assets/icons/sm/facebook.svg";
import { ReactComponent as InstagramIcon } from "../../assets/icons/sm/instragram.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/sm/x.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/icons/sm/linkedin.svg";



const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="logo-section">
          <span>Síguenos en nuestras redes</span>
          <p>@decisium-ec</p>
          <div className="social-media">
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
            <LinkedinIcon />
          </div>
          <div className='title-font flex-column '>
            <h3>DECISIUM LEX</h3>
            <span>Asesores Jurídicos</span>
          </div>
        </div>
        <div className="links-section">
          <div className="links-column">
            <h3>ENLACES</h3>
            <a href="#">ACERCA DE NOSOTROS</a>
            <a href="#">SERVICIOS</a>
            <a href="#">VER UBICACIÓN</a>
            <a href="#">BLOG</a>
            <a href="#">TERMINOS Y CONDICIONES</a>
          </div>
        </div>
        <div className="contact-section">
          <h3>¿EN BÚSQUEDA DE ASESORÍA LEGAL?</h3>
          <button>Hablar con un asesor →</button>
          <p>Nuestro equipo de expertos te ayuda. <br /> Comunicate con nosotros.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>©Copyright 2025 | DECISION LEX | Derechos reservados | Creada por wiphala.ec</p>
        <span className='flex'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36">
            <path fill="#ed1c23" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4z" />
            <path fill="#034ea2" d="M0 17h36v7H0z" />
            <path fill="#fd0" d="M36 17V9a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v8z" />
            <path fill="#fd0" d="M23 19a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2z" />
            <path fill="#034ea2" d="M22 18c0 1.104-.896 3-2 3h-4c-1.104 0-2-1.896-2-3v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2z" />
            <path fill="#ed1c23" d="M21 18c0 1.104-.896 3-2 3h-2c-1.104 0-2-1.896-2-3v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2z" />
            <path fill="#6dbe46" d="M19.973 14.135c-.133.488-.961.865-1.973.865s-1.84-.377-1.973-.865C14.822 14.307 15 14.628 15 15c0 .552.791 1 3 1s3-.448 3-1c0-.372.178-.693-1.027-.865" />
            <path fill="#a6d388" d="M19 19a1 1 0 1 1-2 0v-3a1 1 0 0 1 2 0z" />
            <path fill="#662113" d="M21.5 12c.44 0 .858.052 1.246.137C22.123 11.061 20 10 18 12c-2-2-4.123-.939-4.746.137A5.8 5.8 0 0 1 14.5 12c1.933 0 3.5.896 3.5 2c0-1.104 1.566-2 3.5-2" />
            <ellipse cx="18" cy="17.5" fill="#8ed2e7" rx="2" ry="3.5" />
            <path fill="#6dbe46" d="M17.5 17c-.536 0-1.037.13-1.491.345c-.001.052-.009.102-.009.155c0 1.933.896 3.5 2 3.5c1.003 0 1.825-1.295 1.97-2.979A3.5 3.5 0 0 0 17.5 17" />
            <ellipse cx="18" cy="22" fill="#ffcc4d" rx="3" ry="1" />
            <path fill="#034ea2" d="M20 23…96-2 2-2s2 1.172 2 2" />
            <path fill="#ed1c23" d="M17 23c0-.828.448-2 1-2s1 1.172 1 2s-.448 1-1 1s-1-.172-1-1" />
            <path fill="#ccd6dd" d="M17 11c0-.552.448 0 1 0s1-.552 1 0a1 1 0 0 1-2 0" />
            <ellipse cx="18" cy="17.5" fill="#fff" rx="1" ry=".5" />
            <ellipse cx="13" cy="15.5" fill="#c1694f" rx="1" ry=".5" />
            <ellipse cx="14" cy="13.5" fill="#c1694f" rx="1" ry=".5" />
            <ellipse cx="23" cy="15.5" fill="#c1694f" rx="1" ry=".5" />
            <ellipse cx="22" cy="13.5" fill="#c1694f" rx="1" ry=".5" />
          </svg>
          Made in Ecuador
        </span>
      </div>
    </footer>
  );
};

export default Footer;
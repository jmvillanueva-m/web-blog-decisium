import React, { useEffect, useState, useRef, useMemo, useCallback, forwardRef } from "react";
import throttle from 'lodash/throttle';
import Icon from "../Icon/Icon";
import ".././Navbar/Navbar.css";
import "../../index.css";

// Componente para los enlaces de redes sociales
const SocialMediaLinks = () => (
  <div className="sm-info flex">
    {['facebook', 'instagram', 'linkedin', 'x', 'youtube'].map((platform) => (
      <a key={platform} href="#" aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}>
        <div className="icon-link flex">
          <Icon name={platform === 'instagram' ? 'instragram' : platform} className="icon-interactive" />
        </div>
      </a>
    ))}
  </div>
);

// Componente para los ítems de contacto
const ContactItem = ({ icon, children, href, isLink = true }) => {
  const content = (
    <div className="flex">
      <div className="icon-link flex">
        <Icon name={icon} />
      </div>
      <span>{children}</span>
    </div>
  );

  return isLink ? <a href={href} target="_blank" rel="noopener noreferrer">{content}</a> : content;
};

// Componente para la barra de información superior
const InfoBar = ({ isVisible, message }) => (
  <div className={`info-bar ${isVisible ? '' : 'hidden'}`}>
    <div className="container flex-container">
      <div className="content-bar">
        <ContactItem icon="email" href="mailto:decisiumlex@gmail.com">
          decisiumlex@gmail.com
        </ContactItem>
        <ContactItem icon="phone-call" href={`tel:+593996805484`}>
          (+593) 099 680 5484
        </ContactItem>
        <ContactItem icon="time" isLink={false}>
          (LU-VI) 8h30 a 17h30 
        </ContactItem>
        <ContactItem icon="location" href="https://maps.app.goo.gl/t3PNNkjRFyQfk8uQ7">
          Dir. Oficina
        </ContactItem>
      </div>
      <SocialMediaLinks />
    </div>
  </div>
);

// Componente para el logo
const Logo = () => (
  <div className="navbar-logo">
    <div>
      <h1 className="font-logo">DECISIUM LEX</h1>
    </div>
    <span className="font-heading">ASESORES JURÍDICOS</span>
  </div>
);

const NavMenu = forwardRef(({ isOpen, navLinks, activeSection, onLinkClick }, ref) => {
  return (
    <div ref={ref} className={`menu-links ${isOpen ? 'open' : ''}`}>
      <nav>
        <div className={`title-menu ${isOpen ? "appear" : ""}`}>
          MENÚ DE NAVEGACIÓN
        </div>
        <ul>
          {navLinks.map((link, index) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={isOpen ? "appear" : ""}
                style={{ animationDelay: `0.${index + 2}s` }}
                onClick={onLinkClick}
              >
                <div className={`content-link ${
                  activeSection === link.href.replace("#", "") ? "active" : ""
                }`}>
                  <Icon name={link.icon} size="32px" />
                  <span>{link.label}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <div className={`sm-container ${isOpen ? "appear" : ""}`}>
          <span>SÍGUENOS EN REDES: </span>
          <SocialMediaLinks />
        </div>
      </nav>
    </div>
  );
});
NavMenu.displayName = 'NavMenu';

// Main Component Navbar
const Navbar = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  const navLinks = useMemo(() => [
    { id: "home", href: "#home-section", label: "Inicio", icon: "home" },
    { id: "about-us", href: "#about-us-section", label: "¿Quiénes Somos?",icon: "about-us" },
    { id: "services", href: "#services-section", label: "Servicios", icon: "services-lg" },
    { id: "faq", href: "#faq-section", label: "FAQ", icon: "info" },
    { id: "contact", href: "#contact-section", label: "Contáctanos", icon: "contact" },
    { id: "blog", href: "/web-blog-decisium/blog", label: "Blog", icon: "blog" },
  ], []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY + 100;
      let newActiveSection = null;

      document.querySelectorAll("section").forEach((section) => {
        const { offsetTop, offsetHeight, id } = section;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          newActiveSection = id;
        }
      });

      setActiveSection(newActiveSection);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const isHomeSection = activeSection === 'home-section';
  const message = encodeURIComponent("Hola, me gustaría obtener más información sobre...");

  return (
    <header className={`${!isHomeSection ? 'compact' : ''} ${isHomeSection ? 'transparent' : ''}`}>
      <InfoBar isVisible={isHomeSection} message={message} />
      
      <div className="container flex-container">
        <Logo />
        
        <button
          ref={burgerRef}
          className={`flex-column burger ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
          <Icon name="close" size="32px" color="var(--color-white)" />
        ) : (
          <Icon name="menu" size="32px" color="var(--color-white)" />
        )}
        </button>
                
        <div className={`background-menu ${isMenuOpen ? 'open' : ''}`} />
        
        <NavMenu 
          ref={menuRef}
          isOpen={isMenuOpen}
          navLinks={navLinks}
          activeSection={activeSection}
          onLinkClick={handleLinkClick}
        />
      </div>
    </header>
  );
};

export default Navbar;
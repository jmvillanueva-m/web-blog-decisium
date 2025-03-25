import React, { useRef, useEffect, useState } from "react";
import "../Navbar/Navbar.css";
import "../../index.css";

// Import icons for navbar
import { ReactComponent as HomeIcon } from "../../assets/icons/navbar/home.svg";
import { ReactComponent as AboutUsIcon } from "../../assets/icons/navbar/about-us.svg";
import { ReactComponent as ServicesIcon } from "../../assets/icons/navbar/services-lg.svg";
import { ReactComponent as BlogIcon } from "../../assets/icons/navbar/blog.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/navbar/info.svg";
import { ReactComponent as ContactIcon } from "../../assets/icons/navbar/contact.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/sm/facebook.svg";
import { ReactComponent as InstagramIcon } from "../../assets/icons/sm/instragram.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/sm/x.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/icons/sm/linkedin.svg";
import { ReactComponent as WhatsAppIcon } from "../../assets/icons/sm/whatsapp.svg";
import { ReactComponent as EmailIcon } from "../../assets/icons/sm/email.svg";
import { ReactComponent as CallIcon } from "../../assets/icons/sm/call.svg";


const Navbar = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);

    const navLinks = [
        {
            id: "home",
            href: "#home-section",
            label: "INICIO",
            icon: <HomeIcon />,
        },
        {
            id: "about-us",
            href: "#about-us-section",
            label: "QUIENES SOMOS",
            icon: <AboutUsIcon />,
        },
        {
            id: "services",
            href: "#services-section",
            label: "SERVICIOS",
            icon: <ServicesIcon />,
        },
        {
            id: "faq",
            href: "#faq-section",
            label: "FAQ",
            icon: <InfoIcon />,
        },
        {
            id: "contact",
            href: "#contact-section",
            label: "CONTACTO",
            icon: <ContactIcon />,
        },
        {
            id: "blog",
            href: "#blog-section",
            label: "BLOG",
            icon: <BlogIcon />,
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100; // Ajusta el offset según la altura de tu navbar
            const sections = document.querySelectorAll("section");

            let newActiveSection = null;

            sections.forEach((section) => {
                if (
                    scrollPosition >= section.offsetTop &&
                    scrollPosition < section.offsetTop + section.offsetHeight
                ) {
                    newActiveSection = section.id;
                }
            });

            setActiveSection(newActiveSection); // Actualiza el estado solo si cambia
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const searchDialogRef = useRef(null);

    const openSearchDialog = () => {
        searchDialogRef.current.showModal();
    };

    const closeSearchDialog = () => {
        searchDialogRef.current.close();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const message = encodeURIComponent("Hola, me gustaría obtener más información sobre...");
    
    return (
        <header>
            <div className="info-bar">
                <div className="container flex-container">
                    <div className="content-bar">
                        <div>                              
                            <a href="mailto:contact.us@logalcompany.cc">
                                <div className="flex">
                                    <EmailIcon />   
                                    <span>decisium-lex@gmail.com</span>
                                </div>
                            </a>
                        </div>
                        <div>
                            <a href="tel:+59323678123">
                                <div className="flex">
                                    <CallIcon />        
                                    <span>(QUITO) 02 3678 123</span>
                                </div>  
                            </a>
                        </div>
                        <div>
                            <a href={`https://wa.me/593996805484?text=${message}`}>
                                <div className="flex">
                                    <WhatsAppIcon />
                                    <span>(EC) +593 99 680 5484</span>
                                </div>
                            </a>

                        </div>
                    </div>
                    <div className="sm-info">
                        <FacebookIcon />
                        <InstagramIcon />
                        <TwitterIcon />
                        <LinkedinIcon />
                    </div>
                </div>
            </div>

            <nav className="container">
                <ul className="navbar-left">
                    {navLinks.slice(0, 3).map((link) => (
                        <li key={link.id}>
                            <a
                                href={link.href}
                                className={activeSection === link.href.replace("#", "") ? "active" : ""}
                            >
                                <div className="content-link">
                                    {link.icon}
                                    <span>{link.label}</span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="navbar-logo title-font">
                    <h1>DECISIUM LEX</h1>
                    <span>Asesores Jurídicos</span>
                </div>
                <ul className="navbar-right">
                    {navLinks.slice(3).map((link) => (
                        <li key={link.id}>
                            <a
                                href={link.href}
                                className={activeSection === link.href.replace("#", "") ? "active" : ""}
                            >
                                <div className="content-link">
                                    {link.icon}
                                    {link.label}
                                </div>
                            </a>
                        </li>
                    ))}
                    <button className="search-button" onClick={openSearchDialog}>
                        <SearchIcon />
                    </button>

                    <div 
                        id="icon-menu" 
                        className={`hamburger ${isMenuOpen ? 'open' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Menú"
                    >
                        <div className="hamburger-line line-1"></div>
                        <div className="hamburger-line line-2"></div>
                        <div className="hamburger-line line-3"></div>
                    </div>
                </ul>

                <dialog ref={searchDialogRef} className="search-dialog">
                    <input type="text" placeholder="Buscar..." className="search-input" />
                    <button className="close-button" onClick={closeSearchDialog}>
                        Cerrar
                    </button>
                </dialog>

            </nav>

            {isMenuOpen && (
                <div 
                    className="menu-overlay" 
                    onClick={toggleMenu}
                />
           )}

            <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
                <ul className="navbar">
                    {navLinks.slice(0).map((link) => (
                        <li key={link.id}>
                            <a
                                href={link.href}
                                className={activeSection === link.href.replace("#", "") ? "active" : ""}
                                onClick={toggleMenu}
                            >
                                <div className="content-link">
                                    {link.icon}
                                    <span>{link.label}</span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

        </header>
    );
};

export default Navbar;
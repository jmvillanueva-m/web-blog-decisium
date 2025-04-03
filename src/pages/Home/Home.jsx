import { useState } from 'react'
import './Home.css'

import Navbar from '../../components/Navbar/Navbar'
import Carousel from  '../../components/Carousel/Carousel'
import FloatingButton from '../../components/FloatingButton/FloatingButton'
import AboutUsSection from '../../components/AboutUsSection/AboutUsSection'
import ServicesCarousel from '../../components/ServicesCarousel/ServicesCarousel'
import ContactSection from '../../components/ContactSection/ContactSection'
import Footer from '../../components/Footer/Footer'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>  
        <Navbar></Navbar>
        <FloatingButton></FloatingButton>
        <section id="home-section">
             <Carousel></Carousel>
        </section>

        <AboutUsSection />
        <ServicesCarousel />

        <section id="faq-section">
            <div className='container'>
                <div className='centered-text'>
                    <div className="line"></div>
                    <h2>PREGUNTAS FRECUENTES</h2>
                    <div className="line"></div>
                </div>
                <div>
                    <h3 className='font-heading'>
                    ¿Tienes dudas sobre un tema?
                    </h3>
                    <p>Consulta aquí las respuesta a las preguntas más comunes de nuestros clientes</p>
                </div>
            </div>
        </section>

        {/* <section id="contact-section">
          <div className="container">
            <div className='centered-text'>
                <div className="line"></div>
                <h2 className="text-white">CONTACTO</h2>
                <div className="line"></div>
            </div>
            <div>
                <h3 className='font-heading'>
                ¿Interesado en contratar nuestros servicios?
                <br />
                Por favor, déjanos tu mensaje.
                </h3>
                <p>Pronto nuestro equipo se comunicará contigo.</p>
            </div>
          </div>
            
        </section> */}
        <ContactSection />

        <section id="team-section">
            <div className='container'>
                <div className='centered-text'>
                    <div className="line"></div>
                    <h2>CONOCE A NUESTRO EQUIPO</h2>
                    <div className="line"></div>
                </div>
            </div>
        </section>

        <Footer></Footer>
    </>
  )
}

export default Home

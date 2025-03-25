import { useState } from 'react'
import './Home.css'

import Navbar from '../../components/Navbar/Navbar'
import Carousel from  '../../components/Carousel/Carousel'
import FloatingButton from '../../components/FloatingButton/FloatingButton'
import Footer from '../../components/Footer/Footer'


function Home() {
  const [count, setCount] = useState(0)

  return (
    <>  
        <Navbar></Navbar>
        <FloatingButton></FloatingButton>
        <section id="home-section">
             {/* <Carousel></Carousel> */}
        </section>

        <section id="about-us-section">
            <div className='container'>
                <div className='centered-text'>
                    <div className="line"></div>
                    <h2 className="text">NUESTRA HISTORIA</h2>
                    <div className="line"></div>
                </div>
                <div>
                    <h3 className='title-font'>
                        Somos DECISIUM LEX, una empresa comprometida con tus casos
                    </h3>
                    <article>
                    Desde nuestra fundación nos enfocamos en brindar asesoramiento jurídico integral y personalizado a nuestros clientes. A partir de nuestra misión de proporcionar asistencia jurídica de alta calidad, nos esforzamos por construir relaciones duraderas con nuestros clientes y contribuir a una comunidad más justa y equitativa.
                    </article>
                </div>
            </div>
        </section>

        <section id="services-section">
            <div className="container">
                <div className='centered-text'>
                    <div className="line"></div>
                    <h2 className="text-white">SERVICIOS</h2>
                    <div className="line"></div>
                </div>
                <div>
                    <h3 className='title-font'>
                    Somos especialistas en las siguiente áreas
                    </h3>
                </div>
            </div>
        </section>
        <section id="faq-section">
            <div className='container'>
                <div className='centered-text'>
                    <div className="line"></div>
                    <h2>PREGUNTAS FRECUENTES</h2>
                    <div className="line"></div>
                </div>
                <div>
                    <h3 className='title-font'>
                    ¿Tienes dudas sobre un tema?
                    </h3>
                    <p>Consulta aquí las respuesta a las preguntas más comunes de nuestros clientes</p>
                </div>
            </div>
        </section>

        <section id="contact-section">
          <div className="container">
            <div className='centered-text'>
                <div className="line"></div>
                <h2 className="text-white">CONTACTO</h2>
                <div className="line"></div>
            </div>
            <div>
                <h3 className='title-font'>
                ¿Interesado en contratar nuestros servicios?
                <br />
                Por favor, déjanos tu mensaje.
                </h3>
                <p>Pronto nuestro equipo se comunicará contigo.</p>
            </div>
          </div>
            
        </section>

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

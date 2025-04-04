import { useState } from 'react'
import './Home.css'

import Navbar from '../../components/Navbar/Navbar'
import Carousel from  '../../components/Carousel/Carousel'
import FloatingButton from '../../components/FloatingButton/FloatingButton'
import AboutUsSection from '../../components/AboutUsSection/AboutUsSection'
import ServicesCarousel from '../../components/ServicesCarousel/ServicesCarousel'
import FaqSection from '../../components/FAQ/FAQ'
import ContactSection from '../../components/ContactSection/ContactSection'
import TeamSection from '../../components/TeamSection/TeamSection'
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
        <FaqSection />
        <ContactSection />
        <TeamSection />
        <Footer></Footer>
    </>
  )
}

export default Home

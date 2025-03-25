import React, { useState } from "react";
import './Carousel.css';

// Import icons
import { ReactComponent as ArrowLfIcon } from "../../assets/icons/arrows/arrow-lf.svg";
import { ReactComponent as ArrowRgIcon } from "../../assets/icons/arrows/arrow-rg.svg";

const Carousel = () => {
  const images = ['justice-figure.png', 'e2.png', 'e3.png'];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectNewImage = (next = true) => {
    const condition = next ? selectedIndex < images.length - 1 : selectedIndex > 0;
    const nextIndex = next 
      ? (condition ? selectedIndex + 1 : 0)
      : (condition ? selectedIndex - 1 : images.length - 1);
    setSelectedIndex(nextIndex);
  };

  const previous = () => {
    selectNewImage(false);
  };

  const next = () => {
    selectNewImage(true);
  };

  return (
    <div className="container">
      <div className="carousel">
        <button onClick={previous}><ArrowLfIcon /></button>
        <div className="content-hero">
          <div className="img-hero">
            <img 
              src={`${import.meta.env.BASE_URL}img/hero/${images[selectedIndex]}`} 
              alt="carousel" 
            />
          </div>
          {/* <div className="text-hero">
            <h2 className="amiri-regular">¿Busca asesoramiento jurídico de calidad?</h2>
            <p>Su éxito es nuestra prioridad, y estamos preparados para estar a su lado con la experiencia y dedicación que se merece.</p>
            <div className="buttons-hero">
              <button className="btn-service">[✔] Ver Servicios Legales</button>
              <button className="btn-assistance">[🔍] Obtener asistencia</button>
            </div>
          </div> */}
        </div>
        <button onClick={next}><ArrowRgIcon /></button>
      </div>
    </div>
  );
};

export default Carousel;
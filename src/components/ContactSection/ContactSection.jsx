import React, { useState } from 'react';
import './ContactSection.css';
import Icon from '../Icon/Icon'

const ContactSection = () => {
  const [selectedOffice, setSelectedOffice] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const offices = {
    1: {
      name: "Matriz",
      address: "Edificio Parlamento, Of. 207. Hermanos Pazmiño y 6 de Diciembre",
      phone1: "0969168326",
      phone2: "0969168326",
      hours: "08h30 - 17h30",
      srcGoogle:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1108.8704381989899!2d-78.50051009886776!3d-0.21370834824550186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59b3c3d03d941%3A0x34d4b0926765f1fd!2sEdificio%20Parlamento!5e0!3m2!1ses!2sec!4v1743651427962!5m2!1ses!2sec',
      mapUrl: "https://maps.app.goo.gl/sVSXd6tNvNTyPPsG8"
    },
    2: {
      name: "Sucursal",
      address: "Edificio André, 4to piso. El Comercio E8-113 y Av. De los Shyris",
      phone1: "0969168326",
      phone2: "0969168326",
      hours: "08h30 - 17h30",
      srcGoogle: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7996163242315!2d-78.48294492552286!3d-0.17544003541980246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59b67f59a8971%3A0x81bac2a0bd1c0b86!2sEdificio%20Andre!5e0!3m2!1ses!2sec!4v1743725082957!5m2!1ses!2sec",
      mapUrl: "https://maps.app.goo.gl/BAX7XUb3yZggCfFr5"
    }
  };

  return (
    <section id="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">CONTÁCTANOS</span>
          <h2 className="section-title">¿Interesado en contratar nuestros servicios? <br /> Por favor, déjanos tu mensaje.</h2>
          <div className="header-divider">
            <div className="divider-line"></div>
            <Icon name="contact" size="24px" color="var(--color-accent)" />
            <div className="divider-line"></div>
          </div>
        </div>

        <div className="contact-container">
          {/* Form Column - Left */}
          <div className="form-column">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Nombre:</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Ingrese su nombre"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo electrónico:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ejm: ingresar.email@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Número de celular:</label>
                <div className="phone-input">
                  <span> <Icon name="flag-ec" />EC +593</span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Ejm: 0995910820"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="service">¿Qué servicio deseas contratar?</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un servicio</option>
                  <option value="Derecho Administrativo">Derecho Administrativo</option>
                  <option value="Derecho Constitucional">Derecho Constitucional</option>
                  <option value="Derecho Bancario">Derecho Bancario</option>
                  <option value="Derecho Notarial">Derecho Notarial y Mediación</option>
                  <option value="Derecho de Familia">Derecho de Familia</option>
                  <option value="Derecho de Público">Derecho Público</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Escriba su mensaje"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                <Icon name="send-msj" />
                Enviar mensaje
                </button>
            </form>
          </div>

          {/* Central Image */}
          <div className="image-column">
            <div className="contact-image"></div>
          </div>

          {/* Offices Column - Right */}
          <div className="offices-column">
            <div className="office-selector">
              <button
                className={selectedOffice === 1 ? 'active' : ''}
                onClick={() => setSelectedOffice(1)}
              >
                Oficina Matriz
              </button>
              <button
                className={selectedOffice === 2 ? 'active' : ''}
                onClick={() => setSelectedOffice(2)}
              >
                Oficina Sucursal
              </button>
            </div>

            <div className="office-info">
              <h4><Icon name="map" />Ubicación {offices[selectedOffice].name}</h4>
              <p><Icon name="maps-duotone" />{offices[selectedOffice].address}</p>
              <p><Icon name="phone" />{offices[selectedOffice].phone1}</p>
              <p><Icon name="cellphone" />{offices[selectedOffice].phone2}</p>
              <p><Icon name="time" />Horario de Atención {offices[selectedOffice].hours}</p>
            </div>

            <div className="map-container flex-column">
              <div className="map-placeholder">
                <iframe src={offices[selectedOffice].srcGoogle} 
                style={{width: "100%", height: "200px", border: "none"}}
                allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
              <a 
                href={offices[selectedOffice].mapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-btn"
              >
                <Icon name="location"></Icon>
                Ver Mapa
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
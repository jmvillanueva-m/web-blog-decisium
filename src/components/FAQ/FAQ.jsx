import React, { useState } from 'react';
import Icon from "../Icon/Icon";
import './FAQ.css'; 

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: '¿Qué tipo de servicios legales ofrecen?',
      answer: (
        <>
          Ofrecemos asesoría y representación en diversas áreas del derecho, incluyendo:
          <ul className="faq-list">
            <li>  
              <strong>Derecho Administrativo</strong>  
              <p>Asesoría en procedimientos ante entidades públicas, recursos administrativos y contratación estatal.</p>  
            </li>  
            <li>  
              <strong>Derecho Constitucional</strong>  
              <p>Protección de derechos fundamentales, acciones de amparo y defensa ante tribunales constitucionales.</p>  
            </li>  
            <li>  
              <strong>Derecho Bancario</strong>  
              <p>Defensa en conflictos con entidades financieras, reclamaciones de cláusulas abusivas y asesoría regulatoria.</p>  
            </li>  
            <li>  
              <strong>Derecho Notarial y Mediación</strong>  
              <p>Legalización de documentos, protocolos notariales y resolución extrajudicial de conflictos.</p>  
            </li>  
            <li>  
              <strong>Derecho Civil</strong> (divorcios, herencias, contratos)  
              <p>Representación en demandas civiles, sucesiones, divorcios incausados y redacción de contratos privados.</p>  
            </li>  
            <li>  
              <strong>Derecho Laboral</strong> (despidos, liquidaciones)  
              <p>Reclamos por despido injustificado, cálculo de beneficios laborales y defensa en inspecciones de trabajo.</p>  
            </li>  
            <li>  
              <strong>Derecho Penal</strong> (defensas, denuncias)  
              <p>Defensa en procesos penales, asesoría a víctimas y estrategias para sobreseimientos o reducción de penas.</p>  
            </li>  
            <li>  
              <strong>Derecho de Familia</strong> (pensión alimenticia, régimen de visitas)  
              <p>Fijación de pensiones, custodia compartida y procesos de adopción o patria potestad.</p>  
            </li> 
          </ul>
        </>
      )
    },
    {
      question: '¿Atienden casos en todo el país?',
      answer: 'Sí, brindamos atención legal en todo el territorio ecuatoriano, tanto de manera presencial como virtual, según las necesidades del cliente.'
    },
    {
      question: '¿Ofrecen consultas legales en línea?',
      answer: 'Sí, puede agendar una consulta legal por videollamada o llamada telefónica. También ofrecemos atención vía WhatsApp y correo electrónico.'
    },
    {
      question: '¿Cuál es el costo de una consulta legal?',
      answer: 'El valor de la consulta inicial es accesible y se informa al momento de agendar la cita. En algunos casos, ofrecemos una primera evaluación gratuita del caso.'
    },
    {
      question: '¿Qué documentos necesito para una asesoría legal?',
      answer: (
        <>
          Depende del tipo de caso. Generalmente se requiere:
          <ul className="faq-list">
            <li>Cédula de identidad</li>
            <li>Documentos relacionados con el caso (contratos, sentencias, certificados, etc.)</li>
          </ul>
        </>
      )
    },
    {
      question: '¿Cuánto tiempo tarda un proceso legal en Ecuador?',
      answer: 'El tiempo varía según el tipo de proceso. Por ejemplo, un divorcio de mutuo acuerdo puede tomar entre 2 y 4 semanas, mientras que procesos judiciales más complejos pueden durar varios meses.'
    },
    {
      question: '¿Pueden ayudarme con trámites notariales o escrituras?',
      answer: 'Sí, realizamos gestiones notariales como elaboración de escrituras, poderes, contratos y otros documentos legales.'
    },
    {
      question: '¿Aceptan tarjeta de crédito como forma de pago?',
      answer: '¡Sí! Aceptamos tarjeta de crédito como método de pago, además de transferencias bancarias y depósitos. Contamos con sistema de pago seguro y también ofrecemos facilidades de pago en cuotas, dependiendo del servicio contratado.'
    },
    {
      question: '¿Pueden representarme si estoy en el extranjero?',
      answer: 'Sí, representamos a ecuatorianos y extranjeros que residen fuera del país. Coordinamos toda la asesoría de forma remota y gestionamos su caso en Ecuador.'
    },
    {
      question: '¿Cómo agendo una cita con un abogado?',
      answer: 'Puede agendar su cita llamando o escribiendo a nuestro número de WhatsApp, por correo electrónico o a través del formulario de contacto en nuestra página web.'
    }
  ];

  return (
    <section id="faq-section">
      <div className='container'>

        <div className="faq-intro">
          <div className="section-header">
            <span className="section-subtitle">Preguntas Frecuentes</span>
            <h2 className="section-title">Todo lo que necesitas saber sobre nuestros servicios</h2>
            <div className="header-divider">
              <div className="divider-line"></div>
              <Icon name="info" size="24px" color="var(--color-accent)" />
              <div className="divider-line"></div>
            </div>
          </div>
        </div>
        
        <div className="flex-column">
            <div className="faq-container-wrapper">
              <div className="faq-container">
                {faqItems.map((item, index) => (
                  <div 
                    key={index} 
                    className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="faq-question">
                      <span className='flex'>
                        <Icon name="question"/>
                        {index + 1}. {item.question}
                      </span>
                      <span className="faq-toggle">
                        {activeIndex === index ? 
                        <Icon name="arrow-up"/> : '+'
                        }
                      </span>
                    </div>
                    {activeIndex === index && item.answer && (
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="faq-footer">
              <div className="faq-help">
                <span>¿Necesitas ayuda?</span>
                <span>Consulta a nuestro equipo</span>
              </div>
              <a
                href={`https://wa.me/593983084209?text=${encodeURIComponent("Saludos Abg. Andrés H., necesito información sobre ...")}`}
                target="_blank"
                rel="noopener noreferrer" 
                className="btn-transparent">
                  <Icon name="whatsapp"/>
                  ¡Escríbenos ahora!
              </a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
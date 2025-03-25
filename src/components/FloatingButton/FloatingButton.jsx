import React, { useState } from 'react';
import './FloatingButton.css';

// Import icons
import { ReactComponent as WhatsAppIcon } from "../../assets/icons/sm/whatsapp.svg";
import { ReactComponent as ArrowUpIcon } from "../../assets/arrow-up.svg";
import { ReactComponent as SendIcon } from "../../assets/icons/send.svg";


const FloatingButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
    setShowTooltip(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <div 
        className="whatsapp-button" 
        onClick={handleChatToggle}
        onMouseEnter={() => !isChatOpen && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {showTooltip && <span className="tooltip">Escríbenos</span>}
        <WhatsAppIcon />
      </div>

      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>WhatsApp</h3>
            <button className='close-btn' onClick={handleChatToggle}>X</button>
          </div>
          <div className="chat-body">
            <p>¡Hola! 👋 <br />¿En qué podemos ayudarte?</p>
            <button onClick={handleChatToggle}>
                <div>
                    <SendIcon />
                    <span>Abrir Chat</span>
                </div>
            </button>
          </div>
        </div>
      )}

      <div className="scroll-to-top" onClick={scrollToTop}>
        <ArrowUpIcon />
      </div>

    </div>
  );
};

export default FloatingButton;
import React from "react";
import "../Navbar/Navbar.css";

const SearchDialog = ({ onClose }) => {
    return (
        <div className="search-dialog-overlay">
            <div className="search-dialog">
                <input type="text" placeholder="Buscar..." className="search-input" />
                <button className="close-button" onClick={onClose}>
                    Cerrar
                </button>
            </div>
            
        </div>
    );
};

export default SearchDialog;
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ScrollToTop = ({ children }) => {
    // Hook para detectar cambios en la ruta actual
    const location = useLocation();

    useEffect(() => {
        // Desplaza la página al inicio cuando cambia la ruta
        window.scrollTo(0, 0);
    }, [location.pathname]); // Se ejecuta solo cuando cambia la ruta

    // Renderiza los componentes hijos sin modificaciones
    return children;
};

export default ScrollToTop;

// Validación de tipos para las props del componente
ScrollToTop.propTypes = {
    children: PropTypes.any
};
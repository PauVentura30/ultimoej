import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <>
    {/* Estilos para footer fijo en la parte inferior */}
    <style>{`
      /* Asegurar que el body y html ocupen toda la altura */
      html, body {
        height: 100%;
      }
      
      /* Hacer que el contenedor principal use flexbox */
      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      
      /* El main content se expande para ocupar el espacio disponible */
      .main-content {
        flex: 1;
      }
      
      /* El footer se mantiene siempre al final */
      .footer-sticky {
        margin-top: auto;
      }
    `}</style>
    
    <footer className="footer-sticky bg-dark text-white pt-4 pb-2">
      <div className="container">
        <div className="row g-3">
          <div className="col-lg-3 col-md-6">
            <h6 className="mb-2">BambasShop</h6>
            <p className="mb-2 small">Tu tienda online de confianza para tus zapatillas favoritas!</p>
            <div className="d-flex gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <h6 className="mb-2">Navegación</h6>
            <ul className="list-unstyled small mb-0">
              <li className="mb-1">
                <Link to="/" className="text-white-50 text-decoration-none">Inicio</Link>
              </li>
              <li className="mb-1">
                <Link to="/productos" className="text-white-50 text-decoration-none">Productos</Link>
              </li>
              <li className="mb-1">
                <Link to="/ofertas" className="text-white-50 text-decoration-none">Ofertas</Link>
              </li>
              <li className="mb-1">
                <Link to="/cesta" className="text-white-50 text-decoration-none">Carrito</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <h6 className="mb-2">Información</h6>
            <ul className="list-unstyled small mb-0">
              <li className="mb-1">
                <Link to="/contacto" className="text-white-50 text-decoration-none">Contacto</Link>
              </li>
              <li className="mb-1">
                <a href="#" className="text-white-50 text-decoration-none">Términos y condiciones</a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-white-50 text-decoration-none">Política de privacidad</a>
              </li>
              <li className="mb-1">
                <a href="#" className="text-white-50 text-decoration-none">Devoluciones</a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <h6 className="mb-2">Contacto</h6>
            <ul className="list-unstyled small mb-0">
              <li className="mb-1 d-flex align-items-center">
                <i className="bi bi-geo-alt me-2"></i>
                Calle Principal 123, Barcelona
              </li>
              <li className="mb-1 d-flex align-items-center">
                <i className="bi bi-envelope me-2"></i>
                info@bambasshop.com
              </li>
              <li className="mb-1 d-flex align-items-center">
                <i className="bi bi-telephone me-2"></i>
                +34 934 567 890
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-3"/>
        
        <div className="row align-items-center">
          <div className="col-md-6 mb-2 mb-md-0">
            <p className="mb-0 small">&copy; 2025 BambasShop. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
import React from 'react';

export const Footer = () => (
  <footer className="bg-dark text-white pt-5 pb-3">
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-3 col-md-6">
          <h5 className="mb-3">BambasShop</h5>
          <p className="mb-3">Tu tienda online de confianza para todos tus productos favoritos.</p>
          <div className="d-flex gap-2">
            <a href="#" className="text-white">
              <i className="bi bi-facebook fs-5"></i>
            </a>
            <a href="#" className="text-white">
              <i className="bi bi-twitter fs-5"></i>
            </a>
            <a href="#" className="text-white">
              <i className="bi bi-instagram fs-5"></i>
            </a>
          </div>
        </div>
        
        <div className="col-lg-3 col-md-6">
          <h5 className="mb-3">Navegación</h5>
          <ul className="list-unstyled">
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Inicio</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Productos</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Categorías</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Ofertas</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Blog</a></li>
          </ul>
        </div>
        
        <div className="col-lg-3 col-md-6">
          <h5 className="mb-3">Información</h5>
          <ul className="list-unstyled">
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Sobre nosotros</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Contacto</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Términos y condiciones</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Política de privacidad</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Devoluciones</a></li>
          </ul>
        </div>
        
        <div className="col-lg-3 col-md-6">
          <h5 className="mb-3">Contacto</h5>
          <ul className="list-unstyled">
            <li className="mb-2 d-flex align-items-center">
              <i className="bi bi-geo-alt me-2"></i>
              Calle Principal 123, Ciudad
            </li>
            <li className="mb-2 d-flex align-items-center">
              <i className="bi bi-envelope me-2"></i>
              info@bambasshop.com
            </li>
            <li className="mb-2 d-flex align-items-center">
              <i className="bi bi-telephone me-2"></i>
              +1 234 567 890
            </li>
          </ul>
        </div>
      </div>
      
      <hr className="my-4"/>
      
      <div className="row align-items-center">
        <div className="col-md-6 mb-3 mb-md-0">
          <p className="mb-0">&copy; 2025 BambasShop. Todos los derechos reservados.</p>
        </div>
        <div className="col-md-6 text-md-end">
          <img src="https://via.placeholder.com/40x25" alt="Visa" className="me-2 mb-2 payment-icon" />
          <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="me-2 mb-2 payment-icon" />
          <img src="https://via.placeholder.com/40x25" alt="PayPal" className="me-2 mb-2 payment-icon" />
          <img src="https://via.placeholder.com/40x25" alt="Apple Pay" className="mb-2 payment-icon" />
        </div>
      </div>
    </div>
  </footer>
);

// También exportamos por defecto para compatibilidad con otras partes de la aplicación
export default Footer;
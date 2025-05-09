import { useState } from 'react';

// Barra de navegación
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
      {/* Banner superior */}
      <div className="bg-primary text-white py-2 text-center">
        <div className="container">
          <small>¡Ofertas especiales! 20% de descuento en todos los productos - ¡Por tiempo limitado!</small>
        </div>
      </div>
      
      {/* Navbar principal */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="#">BambasShop</a>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Productos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Categorías</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Ofertas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contacto</a>
              </li>
            </ul>
            
            <form className="d-flex me-3">
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Buscar productos..." 
                />
                <button className="btn btn-outline-secondary" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
            
            <div className="d-flex align-items-center">
              <a href="#" className="text-dark me-3">
                <i className="bi bi-heart fs-5"></i>
              </a>
              <a href="#" className="text-dark position-relative">
                <i className="bi bi-cart3 fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  3
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
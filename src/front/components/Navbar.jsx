import { useState } from 'react';
import { Link } from 'react-router-dom';

// Barra de navegación
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
      {/* Navbar principal */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/">BambasShop</Link>
          
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
                <Link className="nav-link active" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categorias">Categorías</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ofertas">Ofertas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
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
              {/* Icono del carrito con contador dinámico */}
              <Link to="/cesta" className="text-dark position-relative me-3">
                <i className="bi bi-cart3 fs-5"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  </span>
                
              </Link>
              <a href="./register" className="text-dark">
                <i className="bi bi-person fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
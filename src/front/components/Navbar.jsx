import { useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';

// Barra de navegación
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { store } = useGlobalReducer();
  
  // Calcular total de items en el carrito
  const cartItemsCount = store.cart ? store.cart.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;
  
  // Verificar si el usuario está logueado
  const isLoggedIn = store.token || localStorage.getItem('auth_token');
  
  return (
    <>
      {/* Navbar principal */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-dark" href="/">BambasShop</a>
          
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
                <a className="nav-link active" href="/">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/productos">Productos</a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="/ofertas">Ofertas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contacto">Contacto</a>
              </li>
            </ul>
            
            <div className="d-flex me-3">
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
            </div>
            
            <div className="d-flex align-items-center">
              {/* Icono del carrito con contador dinámico */}
              <a href="/cesta" className="text-dark position-relative me-3">
                <i className="bi bi-cart3 fs-5"></i>
                {cartItemsCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                    {cartItemsCount}
                  </span>
                )}
              </a>
              
              {/* Icono de usuario con navegación condicional */}
              <a 
                href={isLoggedIn ? "/private" : "/register"} 
                className="text-dark d-flex align-items-center text-decoration-none"
                title={isLoggedIn ? "Mi cuenta" : "Registrarse"}
              >
                <i className="bi bi-person fs-5 me-1"></i>
                {isLoggedIn ? (
                  <span className="d-none d-sm-inline small">
                    {store.user ? store.user.split('@')[0] : "Mi cuenta"}
                  </span>
                ) : (
                  <span className="d-none d-sm-inline small">Entrar</span>
                )}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
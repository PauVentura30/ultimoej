import { useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useAuth } from '../hooks/useAuth';

// Barra de navegación
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { store, dispatch } = useGlobalReducer();
  const { isLoggedIn, user } = useAuth();
  
  // Calcular total de items en el carrito
  const cartItemsCount = store.cart ? store.cart.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;
  
  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      console.log("🔍 Buscando:", searchTerm.trim());
      
      // Despachar acción para guardar el término de búsqueda en el estado global
      dispatch({
        type: 'SET_SEARCH_TERM',
        payload: searchTerm.trim()
      });
      
      // Indicar que se está buscando
      dispatch({
        type: 'SET_SEARCHING',
        payload: true
      });
      
      // Redirigir a la página de productos con el término de búsqueda
      const searchUrl = `/productos?search=${encodeURIComponent(searchTerm.trim())}`;
      
      // Si estamos en la misma página, forzar recarga para que se procese la búsqueda
      if (window.location.pathname === '/productos') {
        window.location.href = searchUrl;
      } else {
        window.location.href = searchUrl;
      }
      
      // Limpiar el campo de búsqueda después de buscar
      setSearchTerm('');
    }
  };
  
  // Función para manejar cambios en el input
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Función para manejar Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };
  
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
            
            {/* Formulario de búsqueda mejorado */}
            <form onSubmit={handleSearch} className="d-flex me-3">
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
                <button 
                  className="btn btn-outline-secondary" 
                  type="submit"
                  disabled={!searchTerm.trim()}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
            
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
                    {user?.name || user?.email?.split('@')[0] || "Mi cuenta"}
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
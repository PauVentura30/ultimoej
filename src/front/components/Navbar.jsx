import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const navigate = useNavigate();

  // Estado para controlar la visibilidad del menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estado para manejar el término de búsqueda actual
  const [searchTerm, setSearchTerm] = useState('');

  // Hook para acceder al estado global y dispatcher
  const { store, dispatch } = useGlobalReducer();

  // Hook para verificar el estado de autenticación del usuario
  const { isLoggedIn, user } = useAuth();

  // Calcula el número total de items en el carrito (cuenta items diferentes, no cantidad total)
  const cartItemsCount = store.cart ? store.cart.length : 0;

  // Función para procesar y ejecutar la búsqueda de productos
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      console.log("🔍 Buscando:", searchTerm.trim());

      // Guarda el término de búsqueda en el estado global
      dispatch({
        type: 'SET_SEARCH_TERM',
        payload: searchTerm.trim()
      });

      // Activa el estado de búsqueda en el store
      dispatch({
        type: 'SET_SEARCHING',
        payload: true
      });

      // Construye la URL de búsqueda con parámetros codificados
      const searchUrl = `/productos?search=${encodeURIComponent(searchTerm.trim())}`;

      // Navega usando React Router en lugar de window.location
      navigate(searchUrl);

      // Limpia el campo de búsqueda después de ejecutar la búsqueda
      setSearchTerm('');
    }
  };

  // Maneja los cambios en el input de búsqueda
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Permite ejecutar búsqueda al presionar Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <>
      {/* Barra de navegación principal con Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          {/* Logo de la tienda */}
          <Link className="navbar-brand" to="/">
            <img 
              src="/img/logo-bambas-navbar.png" 
              alt="BambasShop" 
              height="70"
              className="d-inline-block align-top"
            />
          </Link>

          {/* Botón hamburguesa para menú móvil */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Contenido colapsable del navbar */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            {/* Enlaces de navegación principales */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
              </li>
            </ul>

            {/* Formulario de búsqueda con validación y eventos */}
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

            {/* Sección de iconos de usuario y carrito */}
            <div className="d-flex align-items-center">
              {/* Icono del carrito con badge de conteo dinámico */}
              <Link to="/cesta" className="text-dark position-relative me-3">
                <i className="bi bi-cart3 fs-5"></i>
                {cartItemsCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Icono de usuario con navegación condicional según estado de login */}
              <Link
                to={isLoggedIn ? "/private" : "/register"}
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
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
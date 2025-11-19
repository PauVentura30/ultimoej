import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../styles/productos.css";

const ProductosPage = () => {
  console.log('🔴 PRODUCTOS.JSX SE ESTÁ RENDERIZANDO');

  // Hook para manejar parámetros de búsqueda en URL
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  // Estado global
  const { store, dispatch } = useGlobalReducer();

  // Estados de productos
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de filtros - CAMBIADO: selectedBrands -> selectedStyles
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  // Cargar productos desde el backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`);

        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }

        const data = await response.json();

        if (data.success) {
          setProductos(data.products);
          setFilteredProductos(data.products);
          
          // Establecer rango de precios automático basado en productos
          const prices = data.products.map(p => p.price);
          const minPrice = Math.floor(Math.min(...prices));
          const maxPrice = Math.ceil(Math.max(...prices));
          setPriceRange({ min: minPrice, max: maxPrice });
        } else {
          throw new Error('Error en la respuesta del servidor');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Obtener estilos únicos de los productos (category en lugar de brand)
  const uniqueStyles = [...new Set(productos.map(p => p.category))].sort();

  // Aplicar filtros y búsqueda
  useEffect(() => {
    let result = [...productos];

    // 1. Filtro de búsqueda
    if (searchQuery.trim() !== '') {
      const searchLower = searchQuery.toLowerCase();
      result = result.filter(producto => {
        const nameMatch = producto.name.toLowerCase().includes(searchLower);
        const brandMatch = producto.brand.toLowerCase().includes(searchLower);
        const categoryMatch = producto.category.toLowerCase().includes(searchLower);
        return nameMatch || brandMatch || categoryMatch;
      });
    }

    // 2. Filtro por estilos (category)
    if (selectedStyles.length > 0) {
      result = result.filter(producto => selectedStyles.includes(producto.category));
    }

    // 3. Filtro por precio
    result = result.filter(producto => 
      producto.price >= priceRange.min && producto.price <= priceRange.max
    );

    // 4. Ordenamiento
    switch(sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // default - orden original
        break;
    }

    setFilteredProductos(result);
    
    // Actualizar store global
    if (searchQuery.trim() !== '') {
      dispatch({
        type: 'SET_SEARCH_RESULTS',
        payload: result
      });
    }
    
    console.log(`🔍 Filtros aplicados - ${result.length} productos`);
  }, [searchQuery, productos, selectedStyles, priceRange, sortBy, dispatch]);

  // Manejar selección de estilos
  const toggleStyle = (style) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  // Limpiar todos los filtros
  const clearFilters = () => {
    setSelectedStyles([]);
    const prices = productos.map(p => p.price);
    setPriceRange({ 
      min: Math.floor(Math.min(...prices)), 
      max: Math.ceil(Math.max(...prices)) 
    });
    setSortBy('default');
  };

  // Verificar si hay filtros activos
  const hasActiveFilters = selectedStyles.length > 0 || sortBy !== 'default';

  // Iconos para cada estilo
  const getStyleIcon = (style) => {
    const icons = {
      'Basketball': '🏀',
      'Casual': '👟',
      'Sport': '⚡',
      'Running': '🏃'
    };
    return icons[style] || '👟';
  };

  // Loading state
  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando productos...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center" role="alert">
          <h4>Error al cargar productos</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            {searchQuery ? (
              <>
                <h1 className="fw-bold mb-2">Resultados para "{searchQuery}"</h1>
                <p className="text-muted">
                  {filteredProductos.length === 0 
                    ? 'No se encontraron productos' 
                    : `${filteredProductos.length} ${filteredProductos.length === 1 ? 'producto encontrado' : 'productos encontrados'}`
                  }
                </p>
              </>
            ) : (
              <>
                <h1 className="fw-bold mb-2">Nuestra Colección Nike</h1>
                <p className="text-muted">
                  {filteredProductos.length} productos disponibles
                </p>
              </>
            )}
          </div>
        </div>

        <div className="row">
          {/* SIDEBAR DE FILTROS - Desktop */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">
                    <i className="bi bi-funnel me-2"></i>
                    Filtros
                  </h5>
                  {hasActiveFilters && (
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={clearFilters}
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                {/* Filtro por estilo */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Estilo</h6>
                  {uniqueStyles.map(style => (
                    <div key={style} className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`style-${style}`}
                        checked={selectedStyles.includes(style)}
                        onChange={() => toggleStyle(style)}
                      />
                      <label className="form-check-label" htmlFor={`style-${style}`}>
                        <span className="me-2">{getStyleIcon(style)}</span>
                        {style}
                        <span className="text-muted small ms-1">
                          ({productos.filter(p => p.category === style).length})
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <hr />

                {/* Filtro por precio */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Rango de precio</h6>
                  <div className="mb-3">
                    <label className="form-label small">
                      Precio mínimo: ${priceRange.min}
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      min={Math.floor(Math.min(...productos.map(p => p.price)))}
                      max={Math.ceil(Math.max(...productos.map(p => p.price)))}
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="form-label small">
                      Precio máximo: ${priceRange.max}
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      min={Math.floor(Math.min(...productos.map(p => p.price)))}
                      max={Math.ceil(Math.max(...productos.map(p => p.price)))}
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTÓN FILTROS MÓVIL */}
          <div className="col-12 d-lg-none mb-3">
            <button 
              className="btn btn-outline-dark w-100"
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className="bi bi-funnel me-2"></i>
              {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
              {hasActiveFilters && (
                <span className="badge bg-dark ms-2">{selectedStyles.length}</span>
              )}
            </button>
          </div>

          {/* SIDEBAR FILTROS - Móvil (colapsable) */}
          {showFilters && (
            <div className="col-12 d-lg-none mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">
                      <i className="bi bi-funnel me-2"></i>
                      Filtros
                    </h5>
                    {hasActiveFilters && (
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={clearFilters}
                      >
                        Limpiar
                      </button>
                    )}
                  </div>

                  {/* Filtro por estilo - Móvil */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Estilo</h6>
                    {uniqueStyles.map(style => (
                      <div key={style} className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`style-mobile-${style}`}
                          checked={selectedStyles.includes(style)}
                          onChange={() => toggleStyle(style)}
                        />
                        <label className="form-check-label" htmlFor={`style-mobile-${style}`}>
                          <span className="me-2">{getStyleIcon(style)}</span>
                          {style}
                          <span className="text-muted small ms-1">
                            ({productos.filter(p => p.category === style).length})
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>

                  <hr />

                  {/* Filtro por precio - Móvil */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Rango de precio</h6>
                    <div className="mb-3">
                      <label className="form-label small">
                        Precio mínimo: ${priceRange.min}
                      </label>
                      <input
                        type="range"
                        className="form-range"
                        min={Math.floor(Math.min(...productos.map(p => p.price)))}
                        max={Math.ceil(Math.max(...productos.map(p => p.price)))}
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="form-label small">
                        Precio máximo: ${priceRange.max}
                      </label>
                      <input
                        type="range"
                        className="form-range"
                        min={Math.floor(Math.min(...productos.map(p => p.price)))}
                        max={Math.ceil(Math.max(...productos.map(p => p.price)))}
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ÁREA DE PRODUCTOS */}
          <div className="col-lg-9">
            {/* Barra de ordenamiento */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="text-muted">
                {filteredProductos.length} producto{filteredProductos.length !== 1 ? 's' : ''}
              </span>
              <select 
                className="form-select form-select-sm" 
                style={{ width: 'auto' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Orden por defecto</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name-asc">Nombre: A-Z</option>
                <option value="name-desc">Nombre: Z-A</option>
                <option value="rating">Mejor valorados</option>
              </select>
            </div>

            {/* Mensaje sin resultados */}
            {filteredProductos.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-search text-muted" style={{ fontSize: '4rem' }}></i>
                <h3 className="mt-4 mb-2">No encontramos productos</h3>
                <p className="text-muted mb-4">
                  Intenta ajustar los filtros o explora toda nuestra colección
                </p>
                <button 
                  className="btn btn-dark"
                  onClick={() => {
                    clearFilters();
                    window.location.href = '/productos';
                  }}
                >
                  Ver todos los productos
                </button>
              </div>
            )}

            {/* Grid de productos */}
            {filteredProductos.length > 0 && (
              <div className="row g-4">
                {filteredProductos.map((producto) => (
                  <div key={producto.id} className="col-sm-6 col-lg-4">
                    <ProductCard product={producto} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductosPage;
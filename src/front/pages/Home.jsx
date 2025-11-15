import React from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link, useNavigate } from 'react-router-dom';

// Componente del banner principal hero con imagen destacada
const HeroBanner = () => (
  <div className="bg-dark bg-gradient text-white py-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          {/* Contenido textual del banner */}
          <h1 className="display-4 fw-bold mb-3">Las mejores zapatillas</h1>
          <p className="lead mb-4">Descubre nuestra colección de las marcas más exclusivas.</p>
          <Link to="/productos" className="btn btn-light btn-lg px-4">
            Ver productos
          </Link>
        </div>
        <div className="col-lg-6">
          {/* Imagen destacada con manejo de errores */}
          <div className="card bg-white p-2 shadow-lg border-0 rounded-3 transform-rotate-3">
            <img 
              src="/img/lilnas.webp" 
              className="img-fluid rounded" 
              alt="Productos destacados"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x300/cccccc/333333?text=Imagen+no+encontrada";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Componente de productos destacados con funcionalidad de carrito
const FeaturedProducts = () => {
  const navigate = useNavigate();
  
  // Array de productos destacados con datos completos
  const products = [
    {
      id: 1,
      name: "Adidas Superstar",
      price: 89.99,
      rating: 4.8,
      reviews: 124,
      image: "/img/adidas-superstar.webp",
      badge: "Nuevo"
    },
    {
      id: 2,
      name: "Nike Air Jordan 1",
      price: 189.99,
      oldPrice: 249.99,
      rating: 4.5,
      reviews: 86,
      image: "/img/Jordan-1.webp",
      badge: "Popular"
    },
    {
      id: 3,
      name: "Converse Chuck Taylor All Star",
      price: 69.99,
      rating: 4.2,
      reviews: 52,
      image: "/img/converseallstar.webp"
    },
    {
      id: 4,
      name: "Nike Air Force 1",
      price: 109.99,
      rating: 4.7,
      reviews: 94,
      image: "/img/Nike-Air-Force-One.webp",
      badge: "Popular"
    }
  ];

  // Función para navegar al detalle del producto
  const handleCardClick = (productId) => {
    navigate(`/producto/${productId}`);
  };

  // Función para agregar productos al carrito con feedback visual
  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Evitar que se active el click de la card
    alert(`${product.name} añadido al carrito!`);
  };
  
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="fw-bold mb-2">Productos destacados</h2>
        <p className="text-muted mb-4">Descubre nuestros productos más populares</p>
        
        {/* Grid responsivo de productos */}
        <div className="row g-4">
          {products.map(product => (
            <div key={product.id} className="col-sm-6 col-md-3 mb-4">
              <div 
                className="card product-card border-0 shadow-sm"
                onClick={() => handleCardClick(product.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="position-relative">
                  {/* Badge condicional para ofertas, nuevo, etc. */}
                  {product.badge && (
                    <span className={`badge-feature badge ${
                      product.badge === 'Popular' ? 'bg-dark' :
                      product.badge === 'Nuevo' ? 'bg-success' :
                      'bg-danger'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  {/* Contenedor de imagen con fallback */}
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      className="product-image" 
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/300x200/cccccc/333333?text=${encodeURIComponent(product.name)}`;
                      }}
                    />
                  </div>
                </div>
                
                {/* Cuerpo de la tarjeta con información del producto */}
                <div className="card-body product-body">
                  <h5 className="card-title text-truncate" title={product.name}>{product.name}</h5>
                  
                  {/* Sistema de calificación con estrellas */}
                  <div className="mb-2 d-flex align-items-center">
                    <div className="text-warning me-1">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star"></i>
                    </div>
                    <small className="text-muted">{product.rating} ({product.reviews})</small>
                  </div>
                  
                  {/* Footer con precios y botón de agregar al carrito */}
                  <div className="d-flex justify-content-between align-items-center product-footer">
                    <div>
                      {/* Precio anterior tachado si existe */}
                      {product.oldPrice && (
                        <small className="text-decoration-line-through text-muted me-2">${product.oldPrice.toFixed(2)}</small>
                      )}
                      <span className="fw-bold">${product.price.toFixed(2)}</span>
                    </div>
                    <button 
                      className="btn btn-dark btn-sm"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente principal que compone la página home completa
export function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedProducts />
    </>
  );
}
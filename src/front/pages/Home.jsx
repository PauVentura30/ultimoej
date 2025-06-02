import React from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import Navbar from '../components/Navbar';

// Componente del banner principal hero con imagen destacada
const HeroBanner = () => (
  <div className="bg-dark bg-gradient text-white py-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          {/* Contenido textual del banner */}
          <h1 className="display-4 fw-bold mb-3">Las mejores ofertas de verano</h1>
          <p className="lead mb-4">Descubre nuestra nueva colección con hasta 50% de descuento.</p>
          <a href="/ofertas" className="btn btn-light btn-lg px-4">
            Comprar ahora
          </a>
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
  // Hook para dispatchar acciones al estado global
  const { dispatch } = useGlobalReducer();
  
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
      badge: "Oferta"
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

  // Función para agregar productos al carrito con feedback visual
  const handleAddToCart = (product) => {
    dispatch({ type: "add_to_cart", payload: product });
    alert(`${product.name} añadido al carrito!`);
  };
  
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="fw-bold mb-2">Productos destacados</h2>
        <p className="text-muted mb-4">Descubre nuestros productos más populares</p>
        
        {/* Estilos CSS en línea para animaciones y efectos de las tarjetas */}
        <style>
          {`
            .product-card {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              height: 100%;
              display: flex;
              flex-direction: column;
            }
            .product-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
            }
            .product-image-container {
              height: 220px;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #f8f9fa;
              border-radius: 4px 4px 0 0;
            }
            .product-image {
              max-height: 100%;
              max-width: 100%;
              object-fit: contain;
            }
            .product-body {
              display: flex;
              flex-direction: column;
              flex-grow: 1;
            }
            .product-footer {
              margin-top: auto;
            }
            .badge-feature {
              position: absolute;
              top: 10px;
              right: 10px;
              z-index: 10;
            }
          `}
        </style>
        
        {/* Grid responsivo de productos */}
        <div className="row g-4">
          {products.map(product => (
            <div key={product.id} className="col-sm-6 col-md-3 mb-4">
              <div className="card product-card border-0 shadow-sm">
                <div className="position-relative">
                  {/* Badge condicional para ofertas, nuevo, etc. */}
                  {product.badge && (
                    <span className={`badge-feature badge ${
                      product.badge === 'Oferta' ? 'bg-danger' :
                      product.badge === 'Nuevo' ? 'bg-success' :
                      'bg-dark'
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
                      onClick={() => handleAddToCart(product)}
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
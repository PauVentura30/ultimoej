import React, { useState, useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link, useNavigate } from 'react-router-dom';

// Componente del banner principal hero con imagen destacada
const HeroBanner = () => (
  <div className="bg-dark bg-gradient text-white py-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <h1 className="display-4 fw-bold mb-3" style={{ color: 'white' }}>
            Las mejores zapatillas Nike
          </h1>
          <p className="lead mb-4" style={{ color: 'white' }}>
            Descubre nuestra colección exclusiva de las zapatillas más icónicas.
          </p>
          <Link to="/productos" className="btn btn-light btn-lg px-4">
            Ver todos los productos
          </Link>
        </div>
        <div className="col-lg-6">
          <div className="card bg-white p-2 shadow-lg border-0 rounded-3">
            <img 
              src="/img/bambasshop-homepicture.jpg" 
              className="img-fluid rounded" 
              alt="BambasShop Collection"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Componente de productos destacados
const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.products.slice(0, 4));
        }
      } catch (error) {
        console.error('Error cargando productos destacados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/producto/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    
    const cartItem = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      quantity: 1
    };

    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = currentCart.findIndex(item => item.id === cartItem.id);
    
    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push(cartItem);
    }
    
    localStorage.setItem("cart", JSON.stringify(currentCart));
    dispatch({ type: "SET_CART", payload: currentCart });
    
    alert(`✅ ${product.name} añadido al carrito!`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half"></i>);
    }
    while (stars.length < 5) {
      stars.push(<i key={`empty-${stars.length}`} className="bi bi-star"></i>);
    }
    
    return stars;
  };
  
  if (loading) {
    return (
      <section className="py-5">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando productos destacados...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="fw-bold mb-2">Productos destacados</h2>
        <p className="text-muted mb-4">Descubre nuestros productos más populares</p>
        
        <div className="row g-4">
          {products.map(product => (
            <div key={product.id} className="col-sm-6 col-md-3">
              <div 
                className="card product-card border-0 h-100"
                onClick={() => handleCardClick(product.id)}
              >
                <div className="position-relative product-image-container">
                  {product.badge && (
                    <span className={`badge-feature ${
                      product.badge === 'Popular' || product.badge === 'Nuevo' ? 'bg-dark' :
                      product.badge === 'Oferta' ? 'bg-danger' :
                      'bg-success'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <img 
                    src={product.image} 
                    className="product-image" 
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x200/cccccc/333333?text=${encodeURIComponent(product.name)}`;
                    }}
                  />
                </div>
                
                <div className="card-body product-body">
                  <p className="text-muted small mb-1">{product.brand}</p>
                  <h6 className="card-title mb-2">{product.name}</h6>
                  
                  <div className="d-flex align-items-center mb-2">
                    <div className="text-warning me-2">
                      {renderStars(product.rating)}
                    </div>
                    <small className="text-muted">({product.reviews_count})</small>
                  </div>
                  
                  <div className="product-footer">
                    <span className="fw-bold">${product.price.toFixed(2)}</span>
                    <button 
                      className="btn btn-dark btn-sm"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <i className="bi bi-cart-plus me-1"></i>
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link to="/productos" className="btn btn-outline-dark btn-lg">
            Ver toda la colección
            <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Componente principal
export function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedProducts />
    </>
  );
}
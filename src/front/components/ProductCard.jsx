import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import useToast from '../hooks/useToast';
import "../styles/productos.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  const toast = useToast();

  // Navegar al detalle del producto
  const handleCardClick = () => {
    navigate(`/producto/${product.id}`);
  };

  // Añadir al carrito
  const handleAddToCart = (e) => {
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
    
    toast.success(`${product.name} añadido al carrito`);
  };

  // Renderizar estrellas
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

  return (
    <div 
      className="card product-card border-0 h-100"
      onClick={handleCardClick}
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
            onClick={handleAddToCart}
          >
            <i className="bi bi-cart-plus me-1"></i>
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
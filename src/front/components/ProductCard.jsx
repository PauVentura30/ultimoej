import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Función para navegar al detalle del producto
  const handleCardClick = () => {
    navigate(`/producto/${product.id}`);
  };

  // Función para agregar el producto al carrito
  const addToCart = (e) => {
    e.stopPropagation(); // Evita que se active el click de la card

    const cartItem = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      quantity: 1
    };

    // Obtener carrito actual del localStorage
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Verificar si el producto ya existe
    const existingItemIndex = currentCart.findIndex(item => item.id === cartItem.id);

    if (existingItemIndex > -1) {
      // Si existe, aumentar cantidad
      currentCart[existingItemIndex].quantity += 1;
    } else {
      // Si no existe, añadir nuevo item
      currentCart.push(cartItem);
    }

    // Guardar en localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart));

    alert(`✅ ${product.name} añadido al carrito`);
  };

  return (
    <div
      className="card product-card border-0 shadow-sm"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Badge si existe */}
      {product.badge && (
        <span className="badge bg-danger position-absolute top-0 end-0 m-2">
          {product.badge}
        </span>
      )}

      {/* Imagen del producto */}
      <div className="product-image-container">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="product-image card-img-top"
          />
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="card-body product-body">
        {/* Marca */}
        {product.brand && (
          <span className="badge bg-secondary mb-2">{product.brand}</span>
        )}

        {/* Nombre del producto */}
        <h5 className="card-title">{product.name}</h5>

        {/* Descripción */}
        {product.description && (
          <p className="card-text text-muted small">{product.description}</p>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="mb-2">
            <span className="text-warning">{"⭐".repeat(Math.round(product.rating))}</span>
            {product.reviews_count && (
              <span className="text-muted small ms-1">({product.reviews_count})</span>
            )}
          </div>
        )}

        {/* Footer con precio y botón */}
        <div className="d-flex justify-content-between align-items-center mt-3 product-footer">
          {/* Precio */}
          <div>
            {product.old_price && (
              <span className="text-muted text-decoration-line-through small me-2">
                ${product.old_price}
              </span>
            )}
            <span className="fw-bold fs-5">${product.price}</span>
          </div>

          {/* Botón agregar al carrito */}
          <button
            onClick={addToCart}
            className="btn btn-primary btn-sm"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Agotado' : 'Añadir'}
          </button>
        </div>

        {/* Info de stock */}
        {product.stock > 0 && product.stock < 10 && (
          <p className="text-warning small mt-2 mb-0">¡Solo quedan {product.stock}!</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
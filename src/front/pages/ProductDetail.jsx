import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../styles/productDetail.css";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");

  // Cargar producto desde la API
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setProducto(data.product);
          setMainImage(data.product.image);
        } else {
          throw new Error('Error al cargar el producto');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  // Añadir al carrito
  const handleAddToCart = () => {
    // Validar que se haya seleccionado una talla
    if (!selectedSize) {
      alert("⚠️ Por favor selecciona una talla antes de añadir al carrito");
      return;
    }

    const cartItem = {
      id: producto.id,
      name: producto.name,
      brand: producto.brand,
      price: producto.price,
      image: producto.image,
      size: selectedSize,
      quantity: quantity,
      badge: producto.badge || null
    };

    // Obtener carrito actual del localStorage
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Verificar si el producto ya existe con la misma talla
    const existingItemIndex = currentCart.findIndex(
      item => item.id === cartItem.id && item.size === cartItem.size
    );

    if (existingItemIndex > -1) {
      // Si existe, aumentar cantidad
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      // Si no existe, añadir nuevo item
      currentCart.push(cartItem);
    }

    // Guardar en localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart));
    
    // Actualizar el store global - pasar TODO el carrito actualizado
    dispatch({ type: "SET_CART", payload: currentCart });
    
    // Mensaje de confirmación
    alert(`✅ ${quantity} x ${producto.name} (Talla ${selectedSize}) añadido al carrito`);
    
    // Resetear la selección
    setSelectedSize("");
    setQuantity(1);
  };

  // Incrementar cantidad
  const incrementQuantity = () => {
    if (quantity < producto.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Decrementar cantidad
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando producto...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !producto) {
    return (
      <div className="product-detail-container">
        <div className="alert alert-danger text-center" role="alert">
          <h4>Error</h4>
          <p>{error || "Producto no encontrado"}</p>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/productos")}>
            Volver a productos
          </button>
        </div>
      </div>
    );
  }

  // Tallas disponibles
  const availableSizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

  return (
    <div className="product-detail-container">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Inicio</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/productos" onClick={(e) => { e.preventDefault(); navigate("/productos"); }}>Productos</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">{producto.name}</li>
        </ol>
      </nav>

      <div className="product-detail-content">
        {/* Galería de imágenes */}
        <div className="product-gallery">
          <div className="main-image">
            <img src={mainImage} alt={producto.name} />
            {producto.badge && (
              <span className="product-badge">{producto.badge}</span>
            )}
          </div>
          
          {/* Thumbnails - Si tienes más imágenes */}
          {producto.additional_images && producto.additional_images.length > 0 && (
            <div className="image-thumbnails">
              <img 
                src={producto.image} 
                alt={producto.name}
                className={mainImage === producto.image ? "active" : ""}
                onClick={() => setMainImage(producto.image)}
              />
              {producto.additional_images.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`${producto.name} ${index + 1}`}
                  className={mainImage === img ? "active" : ""}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info del producto */}
        <div className="product-info">
          <span className="product-brand">{producto.brand}</span>
          <h1 className="product-title">{producto.name}</h1>
          
          {/* Rating */}
          <div className="product-rating">
            <div className="stars">
              {"⭐".repeat(Math.round(producto.rating || 0))}
              <span className="rating-number">({producto.rating || 0})</span>
            </div>
            <span className="reviews-count">{producto.reviews_count || 0} valoraciones</span>
          </div>

          {/* Precio */}
          <div className="product-price">
            {producto.old_price && (
              <span className="old-price">${producto.old_price}</span>
            )}
            <span className="current-price">${producto.price}</span>
          </div>

          {/* Descripción */}
          <p className="product-description">{producto.description}</p>

          {/* Selector de talla */}
          <div className="product-option">
            <label>
              Selecciona tu talla: 
              {selectedSize && <strong className="text-success"> {selectedSize} ✓</strong>}
              {!selectedSize && <span className="text-danger"> *</span>}
            </label>
            <div className="size-selector">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <small className="text-muted d-block mt-2">
                <i className="bi bi-info-circle me-1"></i>
                Selecciona una talla para continuar
              </small>
            )}
          </div>

          {/* Cantidad EN HORIZONTAL */}
          <div className="quantity-wrapper">
            <span>Cantidad:</span>
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={decrementQuantity}>-</button>
              <span className="quantity-value">{quantity}</span>
              <button className="quantity-btn" onClick={incrementQuantity}>+</button>
            </div>
            <span className="stock-info">
              {producto.stock > 0 ? (
                producto.stock < 10 ? (
                  <span className="low-stock">¡Solo quedan {producto.stock}!</span>
                ) : (
                  <span className="in-stock">✓ En stock</span>
                )
              ) : (
                <span className="out-stock">Agotado</span>
              )}
            </span>
          </div>

          {/* Botón añadir al carrito */}
          <div className="product-actions">
            <button 
              className="btn-add-cart"
              onClick={handleAddToCart}
              disabled={producto.stock === 0}
            >
              {producto.stock === 0 ? "Agotado" : "Añadir al carrito"}
            </button>
          </div>

          {/* Info adicional */}
          <div className="product-meta">
            <p><strong>Categoría:</strong> {producto.category}</p>
            <p><strong>SKU:</strong> {producto.id}</p>
          </div>
        </div>
      </div>

      {/* Sección de productos relacionados (opcional) */}
      <div className="related-products">
        <h2>Productos relacionados</h2>
        <p className="text-muted">Próximamente...</p>
      </div>
    </div>
  );
};
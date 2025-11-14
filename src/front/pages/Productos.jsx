import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/productos.css";

const Productos = () => {
  console.log('🔴 PRODUCTOS.JSX SE ESTÁ RENDERIZANDO');
  const navigate = useNavigate();

  // Estado para almacenar los productos desde la API
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos desde el backend cuando el componente se monte
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.BACKEND_URL}/api/products`);

        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }

        const data = await response.json();

        if (data.success) {
          setProductos(data.products);
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

  // Función para navegar al detalle del producto
  const handleProductClick = (productId) => {
    navigate(`/producto/${productId}`);
  };

  // Mostrar loading mientras cargan los productos
  if (loading) {
    return (
      <div className="productos-container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando productos...</p>
        </div>
      </div>
    );
  }

  // Mostrar error si falló la carga
  if (error) {
    return (
      <div className="productos-container">
        <div className="alert alert-danger text-center" role="alert">
          <h4>Error al cargar productos</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="productos-container">
      <div className="productos-header">
        <h1>Nuestra Colección</h1>
        <p>Descubre las mejores zapatillas de las marcas más exclusivas</p>
      </div>

      <div className="productos-grid">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="producto-card"
            onClick={() => handleProductClick(producto.id)}
            style={{ cursor: 'pointer' }}
          >
            {producto.badge && (
              <span className="badge-nuevo">{producto.badge}</span>
            )}

            <div className="producto-imagen">
              <img
                src={producto.image}
                alt={producto.name}
                onError={(e) => {
                  e.target.src = '/img/placeholder.png';
                }}
              />
            </div>

            <div className="producto-info">
              <span className="marca">{producto.brand}</span>
              <h3 className="nombre">{producto.name}</h3>
              <p className="descripcion">{producto.description}</p>

              <div className="colores">
                {producto.colors && producto.colors.length > 0 && producto.colors.map((color, index) => (
                  <span
                    key={index}
                    className="color-dot"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  ></span>
                ))}
              </div>

              <div className="rating">
                <span className="estrellas">{"⭐".repeat(Math.round(producto.rating))}</span>
                <span className="reviews">({producto.reviews_count} reviews)</span>
              </div>

              <div className="producto-footer">
                <div className="precio-container">
                  {producto.old_price && (
                    <span className="precio-anterior">${producto.old_price}</span>
                  )}
                  <span className="precio">${producto.price}</span>
                </div>

                <button
                  className="btn-agregar"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que se active el click del card
                    // Aquí puedes mantener tu lógica de añadir al carrito si la tienes
                    alert(`Añadido ${producto.name} al carrito`);
                  }}
                >
                  Añadir al carrito
                </button>
              </div>

              {producto.stock < 10 && producto.stock > 0 && (
                <p className="stock-bajo">¡Solo quedan {producto.stock}!</p>
              )}

              {producto.stock === 0 && (
                <p className="sin-stock">Agotado</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
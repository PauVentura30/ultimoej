import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import "../../styles/productos.css";

const Productos = () => {
  console.log('🔴 PRODUCTOS.JSX SE ESTÁ RENDERIZANDO');

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

  // Mostrar loading mientras cargan los productos
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

  // Mostrar error si falló la carga
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
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-2">Nuestra Colección</h1>
          <p className="text-muted">Descubre las mejores zapatillas de las marcas más exclusivas</p>
        </div>

        {/* Grid de productos usando ProductCard */}
        <div className="row g-4">
          {productos.map((producto) => (
            <div key={producto.id} className="col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={producto} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductosPage;

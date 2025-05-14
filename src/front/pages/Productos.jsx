// src/front/pages/Productos.jsx

import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

export function Productos() {
  const { addItem } = useCart();
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState(300);
  const [sortBy, setSortBy] = useState('popular');

  // Datos de zapatillas famosas
  const zapatillas = [
    {
      id: 1,
      name: "Nike Air Jordan 1",
      brand: "Nike",
      price: 189.99,
      rating: 4.8,
      reviews: 324,
      image: "https://via.placeholder.com/300",
      colors: ["Rojo", "Negro", "Blanco"],
      isNew: true
    },
    {
      id: 2,
      name: "Adidas Superstar",
      brand: "Adidas",
      price: 89.99,
      rating: 4.6,
      reviews: 512,
      image: "https://via.placeholder.com/300",
      colors: ["Blanco", "Negro", "Azul"]
    },
    {
      id: 3,
      name: "Converse Chuck Taylor All Star",
      brand: "Converse",
      price: 69.99,
      rating: 4.5,
      reviews: 478,
      image: "https://via.placeholder.com/300",
      colors: ["Negro", "Blanco", "Rojo"]
    },
    {
      id: 4,
      name: "Nike Air Force 1",
      brand: "Nike",
      price: 109.99,
      rating: 4.7,
      reviews: 389,
      image: "https://via.placeholder.com/300",
      colors: ["Blanco", "Negro", "Gris"],
      isNew: true
    },
    {
      id: 5,
      name: "Vans Old Skool",
      brand: "Vans",
      price: 79.99,
      rating: 4.4,
      reviews: 421,
      image: "https://via.placeholder.com/300",
      colors: ["Negro", "Blanco", "Azul"]
    },
    {
      id: 6,
      name: "Puma Suede Classic",
      brand: "Puma",
      price: 84.99,
      rating: 4.3,
      reviews: 287,
      image: "https://via.placeholder.com/300",
      colors: ["Negro", "Azul", "Rojo"]
    },
    {
      id: 7,
      name: "New Balance 574",
      brand: "New Balance",
      price: 99.99,
      rating: 4.5,
      reviews: 342,
      image: "https://via.placeholder.com/300",
      colors: ["Gris", "Azul", "Negro"]
    },
    {
      id: 8,
      name: "Reebok Classic Leather",
      brand: "Reebok",
      price: 94.99,
      rating: 4.2,
      reviews: 265,
      image: "https://via.placeholder.com/300",
      colors: ["Blanco", "Negro", "Beige"]
    },
    {
      id: 9,
      name: "Nike Air Max 90",
      brand: "Nike",
      price: 139.99,
      rating: 4.6,
      reviews: 356,
      image: "https://via.placeholder.com/300",
      colors: ["Negro", "Blanco", "Gris"]
    },
    {
      id: 10,
      name: "Adidas Yeezy Boost 350",
      brand: "Adidas",
      price: 249.99,
      rating: 4.9,
      reviews: 467,
      image: "https://via.placeholder.com/300",
      colors: ["Gris", "Negro", "Beige"],
      isNew: true
    },
    {
      id: 11,
      name: "Adidas NMD R1",
      brand: "Adidas",
      price: 149.99,
      rating: 4.7,
      reviews: 312,
      image: "https://via.placeholder.com/300",
      colors: ["Negro", "Blanco", "Rojo"]
    },
    {
      id: 12,
      name: "Gucci Ace Sneakers",
      brand: "Gucci",
      price: 299.99,
      rating: 4.8,
      reviews: 217,
      image: "https://via.placeholder.com/300",
      colors: ["Blanco", "Negro", "Verde"],
      isNew: true
    }
  ];

  // Filtrar por marca
  const filteredByBrand = selectedBrand === 'all' 
    ? zapatillas 
    : zapatillas.filter(item => item.brand === selectedBrand);

  // Filtrar por precio
  const filteredByPrice = filteredByBrand.filter(item => item.price <= priceRange);

  // Ordenar productos
  const sortedProducts = [...filteredByPrice].sort((a, b) => {
    if (sortBy === 'priceLow') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Por defecto, ordenar por popularidad (reviews)
    return b.reviews - a.reviews;
  });

  // Marcas únicas para el filtro
  const brands = [...new Set(zapatillas.map(item => item.brand))];

  // Función para manejar la adición al carrito
  const handleAddToCart = (product) => {
    addItem(product);
    alert(`${product.name} añadido al carrito`);
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Zapatillas de Calle</h1>
      
      {/* Filtros y ordenación */}
      <div className="row mb-4">
        <div className="col-md-9">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="row g-3">
                {/* Filtro por marca */}
                <div className="col-md-4">
                  <label htmlFor="brandFilter" className="form-label">Marca</label>
                  <select 
                    id="brandFilter" 
                    className="form-select"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    <option value="all">Todas las marcas</option>
                    {brands.map((brand, index) => (
                      <option key={index} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                
                {/* Filtro por precio */}
                <div className="col-md-4">
                  <label htmlFor="priceRange" className="form-label">Precio máximo: ${priceRange}</label>
                  <input 
                    type="range" 
                    className="form-range" 
                    id="priceRange" 
                    min="50" 
                    max="300" 
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  />
                </div>
                
                {/* Ordenar por */}
                <div className="col-md-4">
                  <label htmlFor="sortBy" className="form-label">Ordenar por</label>
                  <select 
                    id="sortBy" 
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popular">Popularidad</option>
                    <option value="priceLow">Precio: Menor a Mayor</option>
                    <option value="priceHigh">Precio: Mayor a Menor</option>
                    <option value="rating">Mejor valorados</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card h-100 bg-primary text-white border-0">
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title">Resultados</h5>
              <p className="card-text mb-0">Mostrando {sortedProducts.length} de {zapatillas.length} productos</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lista de productos */}
      <div className="row g-4">
        {sortedProducts.map(product => (
          <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
            <div className="card h-100 border-0 shadow-sm hover-shadow">
              <div className="position-relative">
                <img src={product.image} className="card-img-top" alt={product.name} />
                {product.isNew && (
                  <span className="position-absolute top-0 end-0 m-2 badge bg-success">
                    Nuevo
                  </span>
                )}
              </div>
              
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted small mb-0">{product.brand}</p>
                
                <div className="mb-2 mt-2 d-flex align-items-center">
                  <div className="text-warning me-1">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`bi ${i < Math.floor(product.rating) ? 'bi-star-fill' : 'bi-star'}`}
                      ></i>
                    ))}
                  </div>
                  <small className="text-muted">({product.reviews})</small>
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fs-5 fw-bold">${product.price}</span>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    <i className="bi bi-cart-plus me-1"></i> Añadir
                  </button>
                </div>
                
                <div className="mt-3">
                  <small className="text-muted">Colores: {product.colors.join(", ")}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Si no hay resultados */}
      {sortedProducts.length === 0 && (
        <div className="alert alert-info text-center p-5">
          <i className="bi bi-search fs-1 mb-3"></i>
          <h4>No se encontraron productos</h4>
          <p>Intenta cambiar los filtros para ver más resultados.</p>
        </div>
      )}
      
      {/* Paginación */}
      <nav className="mt-5">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Anterior</a>
          </li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Siguiente</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Productos;
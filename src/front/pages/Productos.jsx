import React, { useState, useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useSearch } from '../hooks/useSearch';

export function Productos() {
 // Estados para controlar los filtros del catálogo
 const [selectedBrand, setSelectedBrand] = useState('all');
 const [priceRange, setPriceRange] = useState(300);
 const [sortBy, setSortBy] = useState('popular');
 
 // Hook para dispatchar acciones al estado global
 const { dispatch } = useGlobalReducer();
 
 // Hook personalizado para funcionalidad de búsqueda
 const { searchTerm, isSearching, searchProducts, getSearchTermFromURL, clearSearch } = useSearch();

 // Array de productos del catálogo con información completa
 const zapatillas = [
   {
     id: 1,
     name: "Nike Air Jordan 1",
     brand: "Nike",
     price: 189.99,
     rating: 4.8,
     reviews: 324,
     image: "/img/Jordan-1.webp",
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
     image: "/img/adidas-superstar.webp",
     colors: ["Blanco", "Negro", "Azul"]
   },
   {
     id: 3,
     name: "Converse Chuck Taylor All Star",
     brand: "Converse",
     price: 69.99,
     rating: 4.5,
     reviews: 478,
     image: "/img/converseallstar.webp",
     colors: ["Negro", "Blanco", "Rojo"]
   },
   {
     id: 4,
     name: "Nike Air Force 1",
     brand: "Nike",
     price: 109.99,
     rating: 4.7,
     reviews: 389,
     image: "/img/Nike-Air-Force-One.webp",
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
     image: "/img/vans-old-skool.webp",
     colors: ["Negro", "Blanco", "Azul"]
   },
   {
     id: 6,
     name: "Puma Suede Classic",
     brand: "Puma",
     price: 84.99,
     rating: 4.3,
     reviews: 287,
     image: "/img/Suede-Classic-Sneakers.webp",
     colors: ["Negro", "Azul", "Rojo"]
   },
   {
     id: 7,
     name: "New Balance 574",
     brand: "New Balance",
     price: 99.99,
     rating: 4.5,
     reviews: 342,
     image: "/img/zapatilla-new-balance-574-gris-1.webp",
     colors: ["Gris", "Azul", "Negro"]
   },
   {
     id: 8,
     name: "Reebok Classic Leather",
     brand: "Reebok",
     price: 94.99,
     rating: 4.2,
     reviews: 265,
     image: "/img/reebok-classic-leather-zapatillas-deportivas.webp",
     colors: ["Blanco", "Negro", "Beige"]
   },
   {
     id: 9,
     name: "Nike Air Max 90",
     brand: "Nike",
     price: 139.99,
     rating: 4.6,
     reviews: 356,
     image: "/img/WMNS+AIR+MAX+90.webp",
     colors: ["Negro", "Blanco", "Gris"]
   },
   {
     id: 10,
     name: "Adidas Yeezy Boost 350",
     brand: "Adidas",
     price: 249.99,
     rating: 4.9,
     reviews: 467,
     image: "/img/yeezy-boost-350.webp",
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
     image: "/img/nmd-r1.webp",
     colors: ["Negro", "Blanco", "Rojo"]
   },
   {
     id: 12,
     name: "Gucci Ace Sneakers",
     brand: "Gucci",
     price: 299.99,
     rating: 4.8,
     reviews: 217,
     image: "/img/gucci.webp",
     colors: ["Blanco", "Negro", "Verde"],
     isNew: true
   }
 ];

 // Estado para mantener productos filtrados por búsqueda
 const [searchFilteredProducts, setSearchFilteredProducts] = useState(zapatillas);

 // Efecto para aplicar búsqueda cuando se carga la página o cambia el término
 useEffect(() => {
   const urlSearchTerm = getSearchTermFromURL();
   const currentSearchTerm = urlSearchTerm || searchTerm;
   
   if (currentSearchTerm && currentSearchTerm.trim()) {
     console.log("🔍 Aplicando búsqueda:", currentSearchTerm);
     const results = searchProducts(currentSearchTerm, zapatillas);
     setSearchFilteredProducts(results);
   } else {
     // Mostrar todos los productos si no hay término de búsqueda
     setSearchFilteredProducts(zapatillas);
   }
 }, [searchTerm]);

 // Aplicar filtro de marca sobre productos ya filtrados por búsqueda
 const filteredByBrand = selectedBrand === 'all' 
   ? searchFilteredProducts 
   : searchFilteredProducts.filter(item => item.brand === selectedBrand);

 // Aplicar filtro de precio sobre productos filtrados por marca
 const filteredByPrice = filteredByBrand.filter(item => item.price <= priceRange);

 // Ordenar productos según criterio seleccionado
 const sortedProducts = [...filteredByPrice].sort((a, b) => {
   if (sortBy === 'priceLow') return a.price - b.price;
   if (sortBy === 'priceHigh') return b.price - a.price;
   if (sortBy === 'rating') return b.rating - a.rating;
   return b.reviews - a.reviews; // Por popularidad (número de reviews)
 });

 // Obtener marcas únicas basadas en productos filtrados por búsqueda
 const brands = [...new Set(searchFilteredProducts.map(item => item.brand))];

 // Función para agregar productos al carrito con feedback visual
 const handleAddToCart = (product) => {
   dispatch({ type: "add_to_cart", payload: product });
   alert(`${product.name} añadido al carrito`);
 };

 // Función para limpiar búsqueda y resetear todos los filtros
 const handleClearSearch = () => {
   clearSearch();
   setSearchFilteredProducts(zapatillas);
   setSelectedBrand('all');
   setPriceRange(300);
   setSortBy('popular');
 };

 return (
   <div className="container py-5">
     {/* Header informativo cuando hay búsqueda activa */}
     {searchTerm && (
       <div className="row mb-4">
         <div className="col-12">
           <div className="alert alert-info d-flex justify-content-between align-items-center mb-0">
             <div>
               {isSearching ? (
                 <>
                   <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                   <strong>Buscando "{searchTerm}"...</strong>
                 </>
               ) : (
                 <>
                   <i className="bi bi-search me-2"></i>
                   <strong>Resultados para: "{searchTerm}"</strong>
                   <span className="text-muted ms-2">
                     ({searchFilteredProducts.length} producto{searchFilteredProducts.length !== 1 ? 's' : ''} encontrado{searchFilteredProducts.length !== 1 ? 's' : ''})
                   </span>
                 </>
               )}
             </div>
             <button 
               className="btn btn-outline-primary btn-sm"
               onClick={handleClearSearch}
             >
               <i className="bi bi-x-circle me-1"></i>
               Limpiar búsqueda
             </button>
           </div>
         </div>
       </div>
     )}

     {/* Título dinámico basado en si hay búsqueda */}
     <h1 className="mb-4">
       {searchTerm ? `Búsqueda: "${searchTerm}"` : "Zapatillas de Calle"}
     </h1>
     
     {/* Panel de filtros y ordenación */}
     <div className="row mb-4">
       <div className="col-md-9">
         <div className="card border-0 shadow-sm">
           <div className="card-body">
             <div className="row g-3">
               {/* Filtro por marca dinámico */}
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
               
               {/* Filtro de precio con slider */}
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
               
               {/* Selector de ordenamiento */}
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
       
       {/* Tarjeta de resumen de resultados */}
       <div className="col-md-3">
         <div className="card h-100 bg-dark text-white border-0">
           <div className="card-body d-flex flex-column justify-content-center">
             <h5 className="card-title">Resultados</h5>
             <p className="card-text mb-0">
               Mostrando {sortedProducts.length} de {searchTerm ? searchFilteredProducts.length : zapatillas.length} productos
             </p>
             {searchTerm && (
               <small className="text-light opacity-75">
                 ({zapatillas.length} productos en total)
               </small>
             )}
           </div>
         </div>
       </div>
     </div>
     
     {/* Estilos CSS personalizados para tarjetas de productos uniformes */}
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
           height: 250px;
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
         .badge-new {
           position: absolute;
           top: 10px;
           right: 10px;
           z-index: 10;
         }
       `}
     </style>
     
     {/* Grid responsivo de productos */}
     <div className="row g-4">
       {sortedProducts.map(product => (
         <div key={product.id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
           <div className="card product-card border-0 shadow-sm">
             <div className="position-relative">
               {/* Badge de producto nuevo condicional */}
               {product.isNew && (
                 <span className="badge bg-success badge-new">
                   Nuevo
                 </span>
               )}
               
               {/* Contenedor de imagen del producto */}
               <div className="product-image-container">
                 <img 
                   src={product.image} 
                   className="product-image" 
                   alt={product.name}
                 />
               </div>
             </div>
             
             {/* Cuerpo de la tarjeta con información del producto */}
             <div className="card-body product-body">
               <h5 className="card-title text-truncate" title={product.name}>{product.name}</h5>
               <p className="card-text text-muted small mb-2">{product.brand}</p>
               
               {/* Sistema de calificación con estrellas dinámicas */}
               <div className="mb-2 d-flex align-items-center">
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
               
               {/* Información de colores disponibles */}
               <div className="mt-2 small text-muted">
                 Colores: {product.colors.join(", ")}
               </div>
               
               {/* Footer con precio y botón de agregar al carrito */}
               <div className="d-flex justify-content-between align-items-center mt-3 product-footer">
                 <span className="fs-5 fw-bold">${product.price.toFixed(2)}</span>
                 <button 
                   className="btn btn-dark"
                   onClick={() => handleAddToCart(product)}
                 >
                   <i className="bi bi-cart-plus me-1"></i> Añadir
                 </button>
               </div>
             </div>
           </div>
         </div>
       ))}
     </div>
     
     {/* Estados vacíos y de carga cuando no hay resultados */}
     {sortedProducts.length === 0 && (
       <div className="text-center py-5">
         {isSearching ? (
           // Estado de carga durante búsqueda
           <div>
             <div className="spinner-border text-primary mb-3" role="status">
               <span className="visually-hidden">Buscando...</span>
             </div>
             <h4>Buscando productos...</h4>
             <p className="text-muted">Por favor espera mientras buscamos "{searchTerm}"</p>
           </div>
         ) : searchTerm ? (
           // Estado de sin resultados para búsqueda
           <div className="alert alert-warning">
             <i className="bi bi-search fs-1 mb-3 d-block"></i>
             <h4>No se encontraron productos para "{searchTerm}"</h4>
             <p className="text-muted mb-3">
               No hay zapatillas que coincidan con tu búsqueda.
               <br />
               Intenta con otros términos o revisa los filtros aplicados.
             </p>
             <button 
               className="btn btn-primary me-2"
               onClick={handleClearSearch}
             >
               <i className="bi bi-arrow-clockwise me-1"></i>
               Ver todos los productos
             </button>
           </div>
         ) : (
           // Estado de sin resultados por filtros
           <div className="alert alert-info">
             <i className="bi bi-funnel fs-1 mb-3 d-block"></i>
             <h4>No se encontraron productos</h4>
             <p className="text-muted">Intenta cambiar los filtros para ver más resultados.</p>
           </div>
         )}
       </div>
     )}
   </div>
 );
}

export default Productos;
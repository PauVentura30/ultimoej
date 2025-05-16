import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

// Banner principal
const HeroBanner = () => (
  <div className="bg-primary bg-gradient text-white py-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <h1 className="display-4 fw-bold mb-3">Las mejores ofertas de verano</h1>
          <p className="lead mb-4">Descubre nuestra nueva colección con hasta 50% de descuento.</p>
          <button className="btn btn-light btn-lg px-4">
            Comprar ahora
          </button>
        </div>
        <div className="col-lg-6">
          <div className="card bg-white p-2 shadow-lg border-0 rounded-3 transform-rotate-3">
            <img 
              src="https://via.placeholder.com/600x400" 
              className="img-fluid rounded" 
              alt="Productos destacados" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Categorías
const Categories = () => {
  const categories = [
    { name: "Electrónica", image: "https://via.placeholder.com/200" },
    { name: "Ropa", image: "https://via.placeholder.com/200" },
    { name: "Hogar", image: "https://via.placeholder.com/200" },
    { name: "Deportes", image: "https://via.placeholder.com/200" }
  ];
  
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold mb-2">Compra por categoría</h2>
        <p className="text-center text-muted mb-4">Explora nuestros productos por categorías</p>
        
        <div className="row g-4">
          {categories.map((category, index) => (
            <div key={index} className="col-6 col-md-3">
              <div className="card h-100 shadow-sm border-0 hover-scale">
                <img src={category.image} className="card-img-top" alt={category.name} />
                <div className="card-body">
                  <h5 className="card-title">{category.name}</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">Ver productos</small>
                    <i className="bi bi-chevron-right text-primary"></i>
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

// Productos destacados
const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Adidas Superstar",
      price: 89.99,
      rating: 4.8,
      reviews: 124,
      image: "src/front/img/adidas-superstar.webp",
      badge: "Nuevo"
    },
    {
      id: 2,
      name: "Nike Air Jordan 1",
      price: 189.99,
      oldPrice: 249.99,
      rating: 4.5,
      reviews: 86,
      image: "src/front/img/Jordan-1.webp",
      badge: "Oferta"
    },
    {
      id: 3,
      name: "Converse Chuck Taylor All Star",
      price: 69.99,
      rating: 4.2,
      reviews: 52,
      image: "src/front/img/converseallstar.webp"
    },
    {
      id: 4,
      name: "Nike Air Force 1",
      price: 109.99,
      rating: 4.7,
      reviews: 94,
      image: "src/front/img/Nike-Air-Force-One.webp",
      badge: "Popular"
    }
  ];
  
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="fw-bold mb-2">Productos destacados</h2>
        <p className="text-muted mb-4">Descubre nuestros productos más populares</p>
        
        <div className="row g-4">
          {products.map(product => (
            <div key={product.id} className="col-sm-6 col-md-3">
              <div className="card h-100 shadow-sm hover-shadow">
                <div className="position-relative">
                  <img src={product.image} className="card-img-top" alt={product.name} />
                  {product.badge && (
                    <span className={`position-absolute top-0 end-0 m-2 badge ${
                      product.badge === 'Oferta' ? 'bg-danger' :
                      product.badge === 'Nuevo' ? 'bg-success' :
                      'bg-primary'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <button className="btn btn-light btn-sm position-absolute bottom-0 end-0 m-2 rounded-circle">
                    <i className="bi bi-heart"></i>
                  </button>
                </div>
                
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
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
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {product.oldPrice && (
                        <small className="text-decoration-line-through text-muted me-2">${product.oldPrice}</small>
                      )}
                      <span className="fw-bold">${product.price}</span>
                    </div>
                    <button className="btn btn-primary btn-sm">
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-4">
          <button className="btn btn-outline-primary">
            Ver todos los productos
            <i className="bi bi-chevron-right ms-1"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

// Página completa
export function Home() {
  return (
    <>
      {/* Los enlaces de Bootstrap CSS y Bootstrap Icons */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" 
        crossOrigin="anonymous" 
      />
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" 
      />
      
      {/* Estilos personalizados adicionales */}
      <style dangerouslySetInnerHTML={{__html: `
        .hover-scale {
          transition: transform 0.3s ease;
        }
        .hover-scale:hover {
          transform: scale(1.03);
        }
        .hover-shadow:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        .transform-rotate-3 {
          transform: rotate(3deg);
        }
        .payment-icon {
          height: 25px;
        }
      `}} />
      
      <HeroBanner />
      <Categories />
      <FeaturedProducts />
      
      {/* Script de Bootstrap */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
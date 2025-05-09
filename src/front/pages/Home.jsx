import { useState } from 'react';
import { Navbar } from '../components/Navbar';

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
      name: "Auriculares Bluetooth Premium",
      price: 89.99,
      rating: 4.8,
      reviews: 124,
      image: "https://via.placeholder.com/300",
      badge: "Nuevo"
    },
    {
      id: 2,
      name: "Smartwatch Serie 5",
      price: 199.99,
      oldPrice: 249.99,
      rating: 4.5,
      reviews: 86,
      image: "https://via.placeholder.com/300",
      badge: "Oferta"
    },
    {
      id: 3,
      name: "Cámara Instantánea",
      price: 69.99,
      rating: 4.2,
      reviews: 52,
      image: "https://via.placeholder.com/300"
    },
    {
      id: 4,
      name: "Altavoz Inteligente",
      price: 129.99,
      rating: 4.7,
      reviews: 94,
      image: "https://via.placeholder.com/300",
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

// Banner promocional
const PromoBanner = () => (
  <div className="bg-dark text-white py-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <h2 className="fw-bold mb-3">Suscríbete a nuestro newsletter</h2>
          <p className="mb-4">Recibe noticias sobre nuevos productos y ofertas exclusivas.</p>
          <div className="row g-2">
            <div className="col-sm-8">
              <input 
                type="email" 
                className="form-control form-control-lg" 
                placeholder="Tu correo electrónico" 
              />
            </div>
            <div className="col-sm-4">
              <button className="btn btn-primary btn-lg w-100">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <img 
            src="https://via.placeholder.com/500x300" 
            className="img-fluid rounded" 
            alt="Newsletter" 
          />
        </div>
      </div>
    </div>
  </div>
);

// Testimonios
const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "María García",
      role: "Cliente habitual",
      content: "Excelente servicio y productos de alta calidad. Lo recomiendo totalmente.",
      avatar: "https://via.placeholder.com/100"
    },
    {
      id: 2,
      name: "Juan Pérez",
      role: "Comprador verificado",
      content: "Envío rápido y atención al cliente excepcional. Volveré a comprar sin duda.",
      avatar: "https://via.placeholder.com/100"
    },
    {
      id: 3,
      name: "Ana Martínez",
      role: "Cliente nuevo",
      content: "Mi primera compra y quedé encantada. Los productos superaron mis expectativas.",
      avatar: "https://via.placeholder.com/100"
    }
  ];
  
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold mb-2">Lo que dicen nuestros clientes</h2>
        <p className="text-center text-muted mb-4">Más de 10,000 clientes satisfechos</p>
        
        <div className="row g-4">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="col-md-4">
              <div className="card h-100 p-4 shadow-sm">
                <div className="d-flex align-items-center mb-3">
                  <img 
                    src={testimonial.avatar} 
                    className="rounded-circle me-3" 
                    alt={testimonial.name}
                    width="50" 
                  />
                  <div>
                    <h6 className="mb-0">{testimonial.name}</h6>
                    <small className="text-muted">{testimonial.role}</small>
                  </div>
                </div>
                <p className="card-text">{testimonial.content}</p>
                <div className="text-warning mt-2">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="bg-dark text-white pt-5 pb-3">
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-3 col-md-6">
          <h5 className="mb-3">TiendaX</h5>
          <p className="mb-3">Tu tienda online de confianza para todos tus productos favoritos.</p>
          <div className="d-flex gap-2">
            <a href="#" className="text-white">
              <i className="bi bi-facebook fs-5"></i>
            </a>
            <a href="#" className="text-white">
              <i className="bi bi-twitter fs-5"></i>
            </a>
            <a href="#" className="text-white">
              <i className="bi bi-instagram fs-5"></i>
            </a>
          </div>
        </div>
        
        <div className="col-lg-3 col-md-6">
          <h5 className="mb-3">Navegación</h5>
          <ul className="list-unstyled">
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Inicio</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Productos</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Categorías</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Ofertas</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Blog</a></li>
          </ul>
        </div>
        
        <div className="col-lg-3 col-md-6">
          <h5 className="mb-3">Información</h5>
          <ul className="list-unstyled">
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Sobre nosotros</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Contacto</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Términos y condiciones</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Política de privacidad</a></li>
            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Devoluciones</a></li>
          </ul>
        </div>
        
        <div className="col-lg-3 col-md-6">
          <h5 className="mb-3">Contacto</h5>
          <ul className="list-unstyled">
            <li className="mb-2 d-flex align-items-center">
              <i className="bi bi-geo-alt me-2"></i>
              Calle Principal 123, Ciudad
            </li>
            <li className="mb-2 d-flex align-items-center">
              <i className="bi bi-envelope me-2"></i>
              info@tiendax.com
            </li>
            <li className="mb-2 d-flex align-items-center">
              <i className="bi bi-telephone me-2"></i>
              +1 234 567 890
            </li>
          </ul>
        </div>
      </div>
      
      <hr className="my-4"/>
      
      <div className="row align-items-center">
        <div className="col-md-6 mb-3 mb-md-0">
          <p className="mb-0">&copy; 2025 TiendaX. Todos los derechos reservados.</p>
        </div>
        <div className="col-md-6 text-md-end">
          <img src="https://via.placeholder.com/40x25" alt="Visa" className="me-2 mb-2 payment-icon" />
          <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="me-2 mb-2 payment-icon" />
          <img src="https://via.placeholder.com/40x25" alt="PayPal" className="me-2 mb-2 payment-icon" />
          <img src="https://via.placeholder.com/40x25" alt="Apple Pay" className="mb-2 payment-icon" />
        </div>
      </div>
    </div>
  </footer>
);

// Página completa
export function Home() {
  return (
    <>
      {/* Necesitamos incluir los enlaces de Bootstrap CSS y Bootstrap Icons para que funcione correctamente */}
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
      <PromoBanner />
      <Testimonials />
      <Footer />
      
      {/* Script de Bootstrap */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
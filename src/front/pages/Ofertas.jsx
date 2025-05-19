import React from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';

export function Ofertas() {
  const { dispatch } = useGlobalReducer();

  // Datos para ofertas (solo 4 productos)
  const ofertasData = [
    {
      id: 5,
      name: "Nike Air Mag",
      description: "Zapatillas futuristas inspiradas en Volver al Futuro.",
      category: "Moda",
      price: 12599.99,
      oldPrice: 17999.99,
      discount: 30,
      rating: 4.9,
      reviews: 521,
      image: "src/front/img/nike-entourage.webp",
      endDate: "2025-06-30",
      isLimitedTime: true
    },
    {
      id: 6,
      name: "Adidas Yeezy Red October",
      description: "Edición rara diseñada por Kanye West.",
      category: "Moda",
      price: 9369.99,
      oldPrice: 13999.99,
      discount: 33,
      rating: 4.8,
      reviews: 389,
      image: "src/front/img/yeezy-red.webp",
      endDate: "2025-06-30",
      isLimitedTime: true
    },
    {
      id: 7,
      name: "Dior x Air Jordan 1",
      description: "Colaboración de lujo entre Dior y Nike.",
      category: "Moda",
      price: 6270.00,
      oldPrice: 11000.00,
      discount: 43,
      rating: 4.9,
      reviews: 742,
      image: "src/front/img/jordan-dior.webp",
      endDate: "2025-06-30",
      isLimitedTime: true
    },
    {
      id: 8,
      name: "MSCHF x Lil Nas X 'Satan Shoes'",
      description: "Controversial colaboración limitada con detalles únicos.",
      category: "Moda",
      price: 650.00,
      oldPrice: 1300.00,
      discount: 50,
      rating: 4.7,
      reviews: 215,
      image: "src/front/img/lilnas.webp",
      endDate: "2025-06-30",
      isLimitedTime: true
    }
  ];

  // Calcular días restantes de la oferta
  const calculateDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Función para manejar la adición al carrito
  const handleAddToCart = (product) => {
    dispatch({ type: "add_to_cart", payload: product });
    alert(`${product.name} añadido al carrito`);
  };

  return (
    <div className="container py-5">
      {/* Cabecera */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3">Ofertas Especiales</h1>
        <p className="lead text-muted">Aprovecha estos descuentos por tiempo limitado</p>
      </div>
      
      {/* Banner principal */}
      <div 
        className="card border-0 shadow-lg mb-5 text-white overflow-hidden position-relative" 
        style={{ 
          height: '300px',
          backgroundImage: 'url(src/front/img/imgbannerofertas.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="row g-0 h-100">
          {/* Espacio vacío en desktop, contenido completo en móvil */}
          <div className="col-lg-6 d-none d-lg-block"></div>
          
          {/* Texto - responsive */}
          <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-3 p-md-4 p-lg-5">
            <div className="bg-dark p-3 p-md-4 rounded-3 text-center text-lg-start w-100">
              <h2 className="display-6 fw-bold mb-3 text-white">¡Super Descuentos!</h2>
              <p className="lead mb-3 mb-md-4 text-white">Hasta 50% de descuento en productos seleccionados</p>
              <p className="mb-0 text-white-50 small">Ofertas válidas hasta agotar existencias. No acumulable con otras promociones.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Estilos personalizados */}
      <style>
        {`
          .offer-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .offer-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
          }
          .offer-image-container {
            height: 250px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f8f9fa;
            border-radius: 4px 4px 0 0;
            position: relative;
          }
          .offer-image {
            max-height: 100%;
            max-width: 100%;
            object-fit: contain;
          }
          .offer-body {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          }
          .offer-footer {
            margin-top: auto;
          }
          .badge-discount {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 10;
          }
          .badge-time {
            position: absolute;
            bottom: 10px;
            right: 10px;
            z-index: 10;
          }
          .badge-limited {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 10;
          }
          .price-old {
            text-decoration: line-through;
            color: #6c757d;
          }
          .price-new {
            color: #dc3545;
            font-weight: bold;
            font-size: 1.25rem;
          }
        `}
      </style>
      
      {/* Lista de ofertas */}
      <div className="row g-4">
        {ofertasData.map(oferta => (
          <div key={oferta.id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="card offer-card border-0 shadow-sm">
              <div className="position-relative">
                <span className="badge bg-danger badge-discount">
                  -{oferta.discount}%
                </span>
                
                {oferta.isLimitedTime && (
                  <span className="badge bg-warning text-dark badge-limited">
                    ¡Tiempo limitado!
                  </span>
                )}
                
                <span className="badge bg-dark bg-opacity-75 badge-time">
                  <i className="bi bi-clock me-1"></i>
                  {calculateDaysLeft(oferta.endDate)} días
                </span>
                
                <div className="offer-image-container">
                  <img 
                    src={oferta.image} 
                    className="offer-image" 
                    alt={oferta.name}
                  />
                </div>
              </div>
              
              <div className="card-body offer-body">
                <h5 className="card-title text-truncate" title={oferta.name}>{oferta.name}</h5>
                <p className="card-text text-muted small mb-2">{oferta.category}</p>
                <p className="card-text small text-muted mb-3">{oferta.description}</p>
                
                <div className="mb-2 d-flex align-items-center">
                  <div className="text-warning me-1">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`bi ${i < Math.floor(oferta.rating) ? 'bi-star-fill' : 'bi-star'}`}
                      ></i>
                    ))}
                  </div>
                  <small className="text-muted">({oferta.reviews})</small>
                </div>
                
                <div className="d-flex align-items-center mb-3 offer-footer">
                  <div className="me-auto">
                    <div className="price-new">${oferta.price.toFixed(2)}</div>
                    <div className="price-old small">${oferta.oldPrice.toFixed(2)}</div>
                  </div>
                  <button 
                    className="btn btn-dark"
                    onClick={() => handleAddToCart(oferta)}
                  >
                    <i className="bi bi-cart-plus me-1"></i> Añadir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ofertas;
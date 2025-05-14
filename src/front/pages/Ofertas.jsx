// src/front/pages/Ofertas.jsx

import React from 'react';

export function Ofertas() {
  // Datos de ejemplo para ofertas
  const ofertasData = [
    {
      id: 1,
      name: "Smartwatch Serie 5",
      description: "Monitor de actividad física, notificaciones y más.",
      price: 199.99,
      oldPrice: 299.99,
      discount: "33%",
      image: "https://via.placeholder.com/300",
      endDate: "2025-06-15"
    },
    {
      id: 2,
      name: "Auriculares Inalámbricos",
      description: "Cancelación de ruido activa y 20 horas de batería.",
      price: 89.99,
      oldPrice: 149.99,
      discount: "40%",
      image: "https://via.placeholder.com/300",
      endDate: "2025-06-10"
    },
    {
      id: 3,
      name: "Tablet Pro 10.5",
      description: "Pantalla retina, 128GB de almacenamiento.",
      price: 349.99,
      oldPrice: 449.99,
      discount: "22%",
      image: "https://via.placeholder.com/300",
      endDate: "2025-06-20"
    },
    {
      id: 4,
      name: "Zapatillas Running Pro",
      description: "Máxima amortiguación y ligereza para tus entrenamientos.",
      price: 79.99,
      oldPrice: 129.99,
      discount: "38%",
      image: "https://via.placeholder.com/300",
      endDate: "2025-06-12"
    },
    {
      id: 5,
      name: "Altavoz Bluetooth",
      description: "Sonido 360º, resistente al agua.",
      price: 59.99,
      oldPrice: 89.99,
      discount: "33%",
      image: "https://via.placeholder.com/300",
      endDate: "2025-06-25"
    },
    {
      id: 6,
      name: "Cafetera Automática",
      description: "5 intensidades, compatible con cápsulas.",
      price: 119.99,
      oldPrice: 179.99,
      discount: "33%",
      image: "https://via.placeholder.com/300",
      endDate: "2025-06-18"
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

  return (
    <div className="container py-5">
      {/* Cabecera */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3">Ofertas Especiales</h1>
        <p className="lead text-muted">Aprovecha estos descuentos por tiempo limitado</p>
      </div>
      
      {/* Banner principal */}
      <div className="card border-0 shadow-sm mb-5 bg-primary text-white overflow-hidden">
        <div className="row g-0">
          <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
            <h2 className="display-6 fw-bold mb-3">¡Super Descuentos!</h2>
            <p className="lead mb-4">Hasta 40% de descuento en productos seleccionados</p>
            <p className="mb-0">Ofertas válidas hasta agotar existencias. No acumulable con otras promociones.</p>
          </div>
          <div className="col-md-6">
            <img src="https://via.placeholder.com/600x400" alt="Ofertas especiales" className="img-fluid" />
          </div>
        </div>
      </div>
      
      {/* Productos en oferta */}
      <div className="row g-4">
        {ofertasData.map((oferta) => (
          <div key={oferta.id} className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm hover-shadow">
              <div className="position-relative">
                <img src={oferta.image} className="card-img-top" alt={oferta.name} />
                <div className="position-absolute top-0 start-0 bg-danger text-white m-3 py-1 px-2 rounded-pill">
                  <strong>-{oferta.discount}</strong>
                </div>
                <div className="position-absolute bottom-0 end-0 bg-dark bg-opacity-75 text-white m-3 py-1 px-2 rounded-pill">
                  <small><i className="bi bi-clock me-1"></i>{calculateDaysLeft(oferta.endDate)} días restantes</small>
                </div>
              </div>
              <div className="card-body">
                <h3 className="h5 card-title">{oferta.name}</h3>
                <p className="card-text text-muted">{oferta.description}</p>
                <div className="d-flex align-items-center mb-3">
                  <span className="text-danger fw-bold fs-4 me-2">${oferta.price}</span>
                  <span className="text-muted text-decoration-line-through">${oferta.oldPrice}</span>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary">
                    <i className="bi bi-cart-plus me-2"></i>
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Cupón de descuento */}
      <div className="card border-0 shadow-sm mt-5 bg-light">
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-8 mb-3 mb-md-0">
              <h3 className="h4 mb-2">¿Quieres un 10% extra en tu primera compra?</h3>
              <p className="mb-0">Suscríbete a nuestro boletín y recibe un cupón de descuento para tu primera compra.</p>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Tu email" aria-label="Email" />
                <button className="btn btn-primary" type="button">Suscribirse</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ofertas;
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function CheckoutCancel() {
  // Hook para navegación programática entre páginas
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center p-5">
              {/* Icono de advertencia grande */}
              <div className="text-warning mb-4">
                <i className="bi bi-exclamation-triangle-fill" style={{fontSize: '4rem'}}></i>
              </div>
              
              {/* Título principal de cancelación */}
              <h1 className="text-warning mb-3">Pago cancelado</h1>
              
              {/* Mensaje explicativo de la cancelación */}
              <p className="lead mb-4">
                Has cancelado el proceso de pago. No se ha realizado ningún cargo a tu tarjeta.
              </p>

              {/* Alert informativo tranquilizador */}
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                <strong>No te preocupes</strong> - tus productos siguen en el carrito y puedes completar la compra cuando quieras.
              </div>

              {/* Botones de navegación para continuar con la experiencia */}
              <div className="d-flex gap-3 justify-content-center mt-4">
                <button 
                  className="btn btn-dark btn-lg"
                  onClick={() => navigate('/cesta')}
                >
                  <i className="bi bi-cart me-2"></i>
                  Volver al carrito
                </button>
                <button 
                  className="btn btn-outline-dark btn-lg"
                  onClick={() => navigate('/productos')}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Seguir comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCancel;
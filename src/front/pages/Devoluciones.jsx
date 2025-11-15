import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Devoluciones = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState('');
  const [reason, setReason] = useState('');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Mock de pedidos (en producción vendrían del backend)
  const orders = [
    { id: 'ORD-2024-001', date: '2024-11-10', product: 'Nike Air Jordan 1' },
    { id: 'ORD-2024-002', date: '2024-10-25', product: 'Adidas Superstar' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedOrder || !reason) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Aquí iría la llamada al backend
    console.log('Solicitud de devolución:', { selectedOrder, reason, comments });
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm text-center p-5">
              <i className="bi bi-check-circle text-success" style={{ fontSize: '4rem' }}></i>
              <h2 className="mt-4 mb-3">¡Solicitud Enviada!</h2>
              <p className="text-muted mb-4">
                Hemos recibido tu solicitud de devolución. Te contactaremos en las próximas 24-48 horas.
              </p>
              <p className="small text-muted mb-4">
                Recibirás un email con las instrucciones para enviar el producto.
              </p>
              <button 
                className="btn btn-dark"
                onClick={() => navigate('/private')}
              >
                Volver a mi cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        {/* Columna izquierda: Política */}
        <div className="col-lg-5 mb-4 mb-lg-0">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h3 className="mb-4">Política de Devoluciones</h3>
              
              <div className="mb-4">
                <h6 className="fw-bold">
                  <i className="bi bi-calendar-check text-primary me-2"></i>
                  30 días para devolver
                </h6>
                <p className="text-muted small">
                  Tienes 30 días desde la recepción del pedido para solicitar una devolución.
                </p>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold">
                  <i className="bi bi-box-seam text-primary me-2"></i>
                  Producto sin usar
                </h6>
                <p className="text-muted small">
                  El producto debe estar en perfecto estado, sin usar y con todas sus etiquetas.
                </p>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold">
                  <i className="bi bi-arrow-left-right text-primary me-2"></i>
                  Reembolso completo
                </h6>
                <p className="text-muted small">
                  Te devolveremos el 100% del importe una vez recibamos el producto.
                </p>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold">
                  <i className="bi bi-truck text-primary me-2"></i>
                  Envío gratuito
                </h6>
                <p className="text-muted small">
                  Nos hacemos cargo de los gastos de envío de la devolución.
                </p>
              </div>

              <hr className="my-4" />

              <h6 className="fw-bold mb-3">Proceso de devolución</h6>
              <ol className="small text-muted ps-3">
                <li className="mb-2">Completa el formulario de solicitud</li>
                <li className="mb-2">Recibirás un email con una etiqueta de envío</li>
                <li className="mb-2">Empaqueta el producto en su caja original</li>
                <li className="mb-2">Lleva el paquete a la oficina de correos</li>
                <li className="mb-2">Recibirás tu reembolso en 5-7 días hábiles</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Columna derecha: Formulario */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="mb-4">Solicitar Devolución</h3>
              
              <form onSubmit={handleSubmit}>
                {/* Seleccionar pedido */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Selecciona el pedido <span className="text-danger">*</span>
                  </label>
                  <select 
                    className="form-select form-select-lg"
                    value={selectedOrder}
                    onChange={(e) => setSelectedOrder(e.target.value)}
                    required
                  >
                    <option value="">-- Selecciona un pedido --</option>
                    {orders.map(order => (
                      <option key={order.id} value={order.id}>
                        {order.id} - {order.product} ({new Date(order.date).toLocaleDateString('es-ES')})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Motivo de devolución */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Motivo de la devolución <span className="text-danger">*</span>
                  </label>
                  <select 
                    className="form-select form-select-lg"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  >
                    <option value="">-- Selecciona un motivo --</option>
                    <option value="talla">Talla incorrecta</option>
                    <option value="defecto">Producto defectuoso</option>
                    <option value="color">Color diferente al esperado</option>
                    <option value="expectativas">No cumple expectativas</option>
                    <option value="duplicado">Pedido duplicado</option>
                    <option value="otro">Otro motivo</option>
                  </select>
                </div>

                {/* Comentarios adicionales */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Comentarios adicionales (opcional)
                  </label>
                  <textarea 
                    className="form-control"
                    rows="4"
                    placeholder="Cuéntanos más detalles sobre tu devolución..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  ></textarea>
                </div>

                {/* Información adicional */}
                <div className="alert alert-info border-0">
                  <i className="bi bi-info-circle me-2"></i>
                  <small>
                    Una vez enviada la solicitud, recibirás un email con las instrucciones y la etiqueta de envío.
                  </small>
                </div>

                {/* Botones */}
                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-dark btn-lg flex-grow-1"
                  >
                    <i className="bi bi-send me-2"></i>
                    Enviar solicitud
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary btn-lg"
                    onClick={() => navigate('/private')}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
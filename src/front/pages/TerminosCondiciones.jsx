import React from 'react';

const TerminosCondiciones = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold">Términos y Condiciones</h1>
            <p className="text-muted">Última actualización: 29 de mayo de 2025</p>
          </div>

          {/* Alerta importante */}
          <div className="alert alert-dark mb-4">
            <h5 className="alert-heading">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Información Importante
            </h5>
            <p className="mb-0">
              Al usar este sitio web, aceptas estos términos y condiciones. 
              Si no estás de acuerdo, no uses nuestros servicios.
            </p>
          </div>

          {/* Contenido principal */}
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              
              <h3 className="fw-bold mb-3">1. Información General</h3>
              <p className="text-muted mb-4">
                Estos términos regulan el uso del sitio web de <strong>BambasSop</strong>. 
                Se aplican a todos los usuarios del sitio web.
              </p>

              <h3 className="fw-bold mb-3">2. Uso del Sitio</h3>
              <p className="text-muted mb-2">Puedes usar nuestro sitio para:</p>
              <ul className="text-muted mb-4">
                <li>Navegar y consultar productos</li>
                <li>Realizar compras para uso personal</li>
                <li>Crear una cuenta de usuario</li>
              </ul>

              <p className="text-muted mb-2">No puedes:</p>
              <ul className="text-muted mb-4">
                <li>Usar el sitio para actividades ilegales</li>
                <li>Intentar hackear o dañar el sitio</li>
                <li>Copiar nuestro contenido sin permiso</li>
              </ul>

              <h3 className="fw-bold mb-3">3. Productos y Precios</h3>
              <p className="text-muted mb-4">
                Nos esforzamos por mantener información precisa sobre productos y precios, 
                pero estos pueden cambiar sin previo aviso. Los productos están sujetos a disponibilidad.
              </p>

              <h3 className="fw-bold mb-3">4. Pagos y Envíos</h3>
              <p className="text-muted mb-4">
                Aceptamos pagos con tarjeta de crédito a través de Stripe. 
                Los envíos se realizan en 2-5 días hábiles. Los gastos de envío se calculan al finalizar la compra.
              </p>

              <h3 className="fw-bold mb-3">5. Devoluciones</h3>
              <p className="text-muted mb-4">
                Puedes devolver productos dentro de 30 días de la entrega, 
                siempre que estén en perfecto estado y con su embalaje original.
              </p>

              <h3 className="fw-bold mb-3">6. Privacidad</h3>
              <p className="text-muted mb-4">
                Respetamos tu privacidad. La información personal se utiliza únicamente 
                para procesar pedidos y mejorar nuestros servicios.
              </p>

              <h3 className="fw-bold mb-3">7. Limitación de Responsabilidad</h3>
              <p className="text-muted mb-4">
                BambasSop no se hace responsable de daños indirectos derivados del uso del sitio web 
                en la máxima medida permitida por la ley.
              </p>

              <h3 className="fw-bold mb-3">8. Modificaciones</h3>
              <p className="text-muted mb-4">
                Podemos modificar estos términos en cualquier momento. 
                Los cambios entran en vigor inmediatamente tras su publicación.
              </p>

            </div>
          </div>

          {/* Información de contacto */}
          <div className="card border-dark shadow-sm mb-4">
            <div className="card-header bg-dark text-white">
              <h4 className="mb-0">
                <i className="bi bi-envelope me-2"></i>
                Contacto
              </h4>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                Si tienes preguntas sobre estos términos, contáctanos:
              </p>
              <div className="row">
                <div className="col-md-6">
                  <h6 className="fw-bold">Email:</h6>
                  <p className="text-muted">info@bambassop.com</p>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold">Teléfono:</h6>
                  <p className="text-muted">+34 123 456 789</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="text-center">
            <div className="bg-light p-4 rounded">
              <p className="text-muted mb-3">
                <small>
                  <i className="bi bi-calendar3 me-1"></i>
                  Términos efectivos desde el 29 de mayo de 2025
                </small>
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <button 
                  className="btn btn-dark btn-sm"
                  onClick={() => window.print()}
                >
                  <i className="bi bi-printer me-1"></i>
                  Imprimir
                </button>
                <button 
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => window.history.back()}
                >
                  <i className="bi bi-arrow-left me-1"></i>
                  Volver
                </button>
                <a 
                  href="/politica-privacidad" 
                  className="btn btn-outline-dark btn-sm"
                >
                  <i className="bi bi-shield-check me-1"></i>
                  Política de Privacidad
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TerminosCondiciones;
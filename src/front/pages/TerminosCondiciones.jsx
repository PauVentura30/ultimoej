import React from 'react';

const TerminosCondiciones = () => {
  return (
    <>
      {/* Header con gradiente similar al HeroBanner */}
      <div className="bg-dark bg-gradient text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="display-5 fw-bold mb-2">Términos y Condiciones</h1>
              <p className="lead opacity-75">Última actualización: [FECHA]</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              
              {/* Alerta destacada */}
              <div className="alert alert-dark border-0 shadow-sm mb-4" role="alert">
                <h4 className="alert-heading fw-bold">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Información Importante
                </h4>
                <p className="mb-0">
                  Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos y condiciones. 
                  Si no está de acuerdo con alguno de estos términos, no debe utilizar este sitio.
                </p>
              </div>

              {/* Secciones de términos */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">1. Información General</h2>
                  <p className="text-muted mb-3">
                    Los presentes términos y condiciones regulan el uso del sitio web 
                    <strong> [NOMBRE DEL SITIO]</strong> (en adelante, "el Sitio"), propiedad de 
                    <strong> [NOMBRE DE LA EMPRESA]</strong> (en adelante, "la Empresa").
                  </p>
                  <p className="text-muted">
                    Estos términos se aplican a todos los usuarios del sitio web, incluyendo visitantes, 
                    usuarios registrados y cualquier otra persona que acceda o utilice el servicio.
                  </p>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">2. Aceptación de los Términos</h2>
                  <p className="text-muted mb-3">
                    Al acceder y utilizar este sitio web, usted declara que:
                  </p>
                  <ul className="text-muted">
                    <li className="mb-2">Ha leído, entendido y acepta estar sujeto a estos términos y condiciones</li>
                    <li className="mb-2">Tiene al menos 18 años de edad o actúa bajo supervisión parental</li>
                    <li className="mb-2">Proporcionará información veraz, exacta y completa</li>
                    <li className="mb-2">Utilizará el sitio de manera legal y responsable</li>
                  </ul>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">3. Uso del Sitio Web</h2>
                  <h5 className="fw-bold mb-2">3.1 Uso Permitido</h5>
                  <p className="text-muted mb-3">
                    Este sitio web está destinado para uso personal y no comercial. Puede navegar, 
                    consultar información y realizar compras para uso personal.
                  </p>
                  
                  <h5 className="fw-bold mb-2">3.2 Uso Prohibido</h5>
                  <p className="text-muted mb-2">Está prohibido:</p>
                  <ul className="text-muted">
                    <li className="mb-2">Usar el sitio para actividades ilegales o fraudulentas</li>
                    <li className="mb-2">Intentar acceder a áreas restringidas del sitio</li>
                    <li className="mb-2">Interferir con el funcionamiento del sitio</li>
                    <li className="mb-2">Copiar o reproducir contenido sin autorización</li>
                  </ul>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">4. Productos y Servicios</h2>
                  <h5 className="fw-bold mb-2">4.1 Información de Productos</h5>
                  <p className="text-muted mb-3">
                    Nos esforzamos por proporcionar información precisa sobre nuestros productos, 
                    incluyendo descripciones, precios e imágenes. Sin embargo, no garantizamos 
                    que toda la información sea completamente exacta.
                  </p>
                  
                  <h5 className="fw-bold mb-2">4.2 Disponibilidad</h5>
                  <p className="text-muted">
                    Los productos están sujetos a disponibilidad. Nos reservamos el derecho de 
                    limitar las cantidades de cualquier producto y discontinuar productos sin previo aviso.
                  </p>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">5. Precios y Pagos</h2>
                  <div className="row">
                    <div className="col-md-6">
                      <h5 className="fw-bold mb-2">5.1 Precios</h5>
                      <p className="text-muted mb-3">
                        Todos los precios están en [MONEDA] e incluyen impuestos aplicables. 
                        Los precios pueden cambiar sin previo aviso.
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h5 className="fw-bold mb-2">5.2 Métodos de Pago</h5>
                      <p className="text-muted mb-3">
                        Aceptamos [MÉTODOS DE PAGO]. El pago debe completarse 
                        antes del envío del producto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">6. Envíos y Entregas</h2>
                  <p className="text-muted mb-3">
                    Los tiempos de entrega son estimados y pueden variar según la ubicación y disponibilidad. 
                    Los gastos de envío se calcularán al momento de la compra.
                  </p>
                  <div className="bg-light p-3 rounded">
                    <strong>Nota:</strong> No nos hacemos responsables por retrasos causados por 
                    circunstancias fuera de nuestro control.
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">7. Política de Devoluciones</h2>
                  <p className="text-muted mb-3">
                    Puede devolver productos dentro de [NÚMERO] días de la entrega, 
                    siempre que estén en su estado original y con el embalaje original.
                  </p>
                  <div className="alert alert-light border" role="alert">
                    <strong>Proceso de devolución:</strong>
                    <ol className="mb-0 mt-2">
                      <li>Contacte nuestro servicio al cliente</li>
                      <li>Obtenga un número de autorización de devolución</li>
                      <li>Envíe el producto en su embalaje original</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">8. Protección de Datos</h2>
                  <p className="text-muted mb-3">
                    Su privacidad es importante para nosotros. La recopilación y uso de sus datos 
                    personales se rige por nuestra Política de Privacidad.
                  </p>
                  <p className="text-muted">
                    Al utilizar nuestro sitio, usted consiente la recopilación y uso de su información 
                    de acuerdo con nuestra política de privacidad.
                  </p>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">9. Limitación de Responsabilidad</h2>
                  <p className="text-muted mb-3">
                    En la máxima medida permitida por la ley, [NOMBRE DE LA EMPRESA] no será 
                    responsable de daños directos, indirectos, incidentales o consecuentes 
                    derivados del uso de este sitio web.
                  </p>
                  <div className="bg-warning bg-opacity-10 p-3 rounded border border-warning">
                    <i className="bi bi-exclamation-triangle text-warning me-2"></i>
                    <strong>Importante:</strong> Algunas jurisdicciones no permiten la limitación 
                    de responsabilidad, por lo que estas limitaciones pueden no aplicarse a usted.
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">10. Modificaciones</h2>
                  <p className="text-muted mb-3">
                    Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
                    Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.
                  </p>
                  <p className="text-muted">
                    Es su responsabilidad revisar periódicamente estos términos para estar al tanto de cualquier cambio.
                  </p>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">11. Ley Aplicable</h2>
                  <p className="text-muted mb-3">
                    Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de [PAÍS/REGIÓN], 
                    sin dar efecto a ningún principio de conflictos de leyes.
                  </p>
                  <p className="text-muted">
                    Cualquier disputa relacionada con estos términos será resuelta en los tribunales competentes de [JURISDICCIÓN].
                  </p>
                </div>
              </div>

              {/* Información de contacto destacada */}
              <div className="card border-dark mb-4">
                <div className="card-header bg-dark text-white">
                  <h2 className="fw-bold mb-0">
                    <i className="bi bi-envelope me-2"></i>
                    12. Información de Contacto
                  </h2>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-3">
                    Si tiene alguna pregunta sobre estos términos y condiciones, puede contactarnos:
                  </p>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="fw-bold">Dirección:</h6>
                      <p className="text-muted">[DIRECCIÓN COMPLETA]</p>
                      <h6 className="fw-bold">Teléfono:</h6>
                      <p className="text-muted">[NÚMERO DE TELÉFONO]</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold">Email:</h6>
                      <p className="text-muted">[EMAIL DE CONTACTO]</p>
                      <h6 className="fw-bold">Horario de atención:</h6>
                      <p className="text-muted">[HORARIO DE ATENCIÓN]</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer con botones de acción */}
              <div className="text-center">
                <div className="bg-light p-4 rounded">
                  <p className="text-muted mb-3">
                    <small>
                      <i className="bi bi-calendar3 me-1"></i>
                      Estos términos y condiciones son efectivos a partir del [FECHA DE ENTRADA EN VIGOR]
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
      </div>

      {/* Estilos adicionales para mantener consistencia */}
      <style jsx>{`
        @media print {
          .btn, .alert {
            display: none !important;
          }
        }
        
        .card {
          transition: transform 0.2s ease-in-out;
        }
        
        .card:hover {
          transform: translateY(-2px);
        }
        
        .bg-gradient {
          background: linear-gradient(135deg, #212529 0%, #495057 100%);
        }
      `}</style>
    </>
  );
};

export default TerminosCondiciones;
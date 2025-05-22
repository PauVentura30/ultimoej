import React from 'react';

const PoliticaPrivacidad = () => {
  return (
    <div>
      {/* Header con gradiente similar al HeroBanner */}
      <div className="bg-dark bg-gradient text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="display-5 fw-bold mb-2">Política de Privacidad</h1>
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
                  <i className="bi bi-shield-check me-2"></i>
                  Su Privacidad es Importante
                </h4>
                <p className="mb-0">
                  En BambasShop, respetamos y protegemos su privacidad. Esta política explica cómo 
                  recopilamos, utilizamos y protegemos su información personal cuando utiliza nuestro sitio web.
                </p>
              </div>

              {/* Secciones de política */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">1. Información que Recopilamos</h2>
                  <h5 className="fw-bold mb-2">1.1 Información Personal</h5>
                  <p className="text-muted mb-3">
                    Recopilamos información que usted nos proporciona directamente, incluyendo:
                  </p>
                  <ul className="text-muted">
                    <li className="mb-2">Nombre completo y datos de contacto</li>
                    <li className="mb-2">Dirección de entrega y facturación</li>
                    <li className="mb-2">Información de pago (procesada de forma segura)</li>
                    <li className="mb-2">Historial de compras y preferencias</li>
                  </ul>
                  
                  <h5 className="fw-bold mb-2">1.2 Información Automática</h5>
                  <p className="text-muted mb-2">También recopilamos información automáticamente:</p>
                  <ul className="text-muted">
                    <li className="mb-2">Dirección IP y datos de navegación</li>
                    <li className="mb-2">Cookies y tecnologías similares</li>
                    <li className="mb-2">Información del dispositivo y navegador</li>
                    <li className="mb-2">Páginas visitadas y tiempo de permanencia</li>
                  </ul>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">2. Cómo Utilizamos su Información</h2>
                  <div className="row">
                    <div className="col-md-6">
                      <h5 className="fw-bold mb-2">Propósitos Principales</h5>
                      <ul className="text-muted">
                        <li className="mb-2">Procesar y gestionar pedidos</li>
                        <li className="mb-2">Brindar atención al cliente</li>
                        <li className="mb-2">Mejorar nuestros productos y servicios</li>
                        <li className="mb-2">Personalizar su experiencia</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h5 className="fw-bold mb-2">Comunicaciones</h5>
                      <ul className="text-muted">
                        <li className="mb-2">Envío de confirmaciones de pedidos</li>
                        <li className="mb-2">Notificaciones de productos</li>
                        <li className="mb-2">Ofertas especiales (con su consentimiento)</li>
                        <li className="mb-2">Actualizaciones de cuenta</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">3. Cookies y Tecnologías de Seguimiento</h2>
                  <p className="text-muted mb-3">
                    Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web.
                  </p>
                  
                  <div className="row">
                    <div className="col-md-4">
                      <div className="bg-light p-3 rounded h-100">
                        <h6 className="fw-bold">Cookies Esenciales</h6>
                        <p className="small text-muted mb-0">
                          Necesarias para el funcionamiento básico del sitio
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="bg-light p-3 rounded h-100">
                        <h6 className="fw-bold">Cookies de Análisis</h6>
                        <p className="small text-muted mb-0">
                          Nos ayudan a entender cómo usa el sitio
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="bg-light p-3 rounded h-100">
                        <h6 className="fw-bold">Cookies de Marketing</h6>
                        <p className="small text-muted mb-0">
                          Para personalizar anuncios y ofertas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">4. Compartir Información</h2>
                  <p className="text-muted mb-3">
                    No vendemos, alquilamos ni compartimos su información personal con terceros, excepto en las siguientes circunstancias:
                  </p>
                  
                  <div className="alert alert-light border">
                    <h6 className="fw-bold">Compartimos información únicamente con:</h6>
                    <ul className="mb-0">
                      <li>Proveedores de servicios esenciales (envío, pagos)</li>
                      <li>Autoridades legales cuando sea requerido por ley</li>
                      <li>Empresas de análisis (datos anonimizados)</li>
                      <li>Socios de marketing (con su consentimiento explícito)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">5. Seguridad de los Datos</h2>
                  <p className="text-muted mb-3">
                    Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal:
                  </p>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="fw-bold">Medidas Técnicas</h6>
                      <ul className="text-muted">
                        <li className="mb-2">Cifrado SSL/TLS</li>
                        <li className="mb-2">Servidores seguros</li>
                        <li className="mb-2">Firewalls avanzados</li>
                        <li className="mb-2">Monitoreo de seguridad 24/7</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold">Medidas Organizativas</h6>
                      <ul className="text-muted">
                        <li className="mb-2">Acceso limitado a empleados</li>
                        <li className="mb-2">Capacitación en privacidad</li>
                        <li className="mb-2">Auditorías regulares</li>
                        <li className="mb-2">Políticas de retención de datos</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">6. Sus Derechos</h2>
                  <p className="text-muted mb-3">
                    De acuerdo con las leyes de protección de datos aplicables, usted tiene los siguientes derechos:
                  </p>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="border rounded p-3 h-100">
                        <h6 className="fw-bold text-primary">
                          <i className="bi bi-eye me-1"></i>
                          Derecho de Acceso
                        </h6>
                        <p className="small text-muted mb-0">
                          Solicitar una copia de los datos personales que tenemos sobre usted
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="border rounded p-3 h-100">
                        <h6 className="fw-bold text-primary">
                          <i className="bi bi-pencil me-1"></i>
                          Derecho de Rectificación
                        </h6>
                        <p className="small text-muted mb-0">
                          Corregir información personal inexacta o incompleta
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="border rounded p-3 h-100">
                        <h6 className="fw-bold text-primary">
                          <i className="bi bi-trash me-1"></i>
                          Derecho de Supresión
                        </h6>
                        <p className="small text-muted mb-0">
                          Solicitar la eliminación de sus datos personales
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="border rounded p-3 h-100">
                        <h6 className="fw-bold text-primary">
                          <i className="bi bi-download me-1"></i>
                          Derecho de Portabilidad
                        </h6>
                        <p className="small text-muted mb-0">
                          Recibir sus datos en un formato estructurado y legible
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">7. Retención de Datos</h2>
                  <p className="text-muted mb-3">
                    Conservamos su información personal solo durante el tiempo necesario para cumplir con los propósitos 
                    para los que fue recopilada, incluyendo:
                  </p>
                  
                  <div className="table-responsive">
                    <table className="table table-sm table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th>Tipo de Información</th>
                          <th>Periodo de Retención</th>
                          <th>Propósito</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Datos de cuenta</td>
                          <td>Hasta que se elimine la cuenta</td>
                          <td>Gestión de cuenta y servicios</td>
                        </tr>
                        <tr>
                          <td>Historial de compras</td>
                          <td>7 años</td>
                          <td>Obligaciones legales y fiscales</td>
                        </tr>
                        <tr>
                          <td>Datos de marketing</td>
                          <td>Hasta retirar consentimiento</td>
                          <td>Comunicaciones promocionales</td>
                        </tr>
                        <tr>
                          <td>Datos de navegación</td>
                          <td>2 años</td>
                          <td>Análisis y mejora del sitio</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">8. Transferencias Internacionales</h2>
                  <p className="text-muted mb-3">
                    En algunos casos, podemos transferir su información personal a países fuera del Espacio Económico Europeo (EEE). 
                    Cuando esto ocurra, implementamos salvaguardas apropiadas:
                  </p>
                  
                  <ul className="text-muted">
                    <li className="mb-2">Decisiones de adecuación de la Comisión Europea</li>
                    <li className="mb-2">Cláusulas contractuales estándar</li>
                    <li className="mb-2">Certificaciones de privacidad reconocidas</li>
                    <li className="mb-2">Medidas de seguridad adicionales</li>
                  </ul>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">9. Menores de Edad</h2>
                  <p className="text-muted mb-3">
                    Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos intencionalmente 
                    información personal de menores de 18 años.
                  </p>
                  
                  <div className="bg-warning bg-opacity-10 p-3 rounded border border-warning">
                    <i className="bi bi-exclamation-triangle text-warning me-2"></i>
                    <strong>Si tiene menos de 18 años:</strong> 
                    No debe utilizar nuestros servicios sin el consentimiento y supervisión de sus padres o tutores.
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-3">10. Cambios en esta Política</h2>
                  <p className="text-muted mb-3">
                    Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos sobre cambios significativos 
                    mediante:
                  </p>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="text-muted">
                        <li className="mb-2">Aviso en el sitio web</li>
                        <li className="mb-2">Notificación por email</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="text-muted">
                        <li className="mb-2">Actualización de la fecha</li>
                        <li className="mb-2">Notificación en la cuenta</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información de contacto para privacidad */}
              <div className="card border-dark mb-4">
                <div className="card-header bg-dark text-white">
                  <h2 className="fw-bold mb-0">
                    <i className="bi bi-person-check me-2"></i>
                    11. Contacto para Asuntos de Privacidad
                  </h2>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-3">
                    Si tiene preguntas sobre esta Política de Privacidad o el tratamiento de sus datos personales, 
                    puede contactarnos:
                  </p>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="fw-bold">Delegado de Protección de Datos:</h6>
                      <p className="text-muted">[NOMBRE DEL DPO]</p>
                      <h6 className="fw-bold">Email de Privacidad:</h6>
                      <p className="text-muted">privacidad@bambasshop.com</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold">Dirección Postal:</h6>
                      <p className="text-muted">
                        Departamento de Privacidad<br />
                        BambasShop<br />
                        Calle Principal 123<br />
                        08001 Barcelona, España
                      </p>
                    </div>
                  </div>
                  
                  <div className="alert alert-info border-0 mt-3">
                    <h6 className="fw-bold">Tiempo de Respuesta:</h6>
                    <p className="mb-0">Nos comprometemos a responder a sus consultas sobre privacidad dentro de 30 días.</p>
                  </div>
                </div>
              </div>

              {/* Footer con botones de acción */}
              <div className="text-center">
                <div className="bg-light p-4 rounded">
                  <p className="text-muted mb-3">
                    <small>
                      <i className="bi bi-calendar3 me-1"></i>
                      Esta Política de Privacidad es efectiva a partir del [FECHA DE ENTRADA EN VIGOR]
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
                    <button 
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => window.location.href = '/terminos-condiciones'}
                    >
                      <i className="bi bi-file-text me-1"></i>
                      Términos y Condiciones
                    </button>
                    <button 
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => alert('Configuración de cookies próximamente')}
                    >
                      <i className="bi bi-gear me-1"></i>
                      Configurar Cookies
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Estilos adicionales para mantener consistencia */}
      <style>{`
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
        
        .table th {
          border-top: none;
        }
      `}</style>
    </div>
  );
};

export default PoliticaPrivacidad;
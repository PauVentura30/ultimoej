import React from 'react';

export function Contacto() {
  return (
    // Contenedor principal con fondo degradado
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e7e5f4 100%)',
      paddingTop: '3rem',
      paddingBottom: '3rem'
    }}>
      <div className="container">
        {/* Cabecera de la página */}
        <div className="row">
          <div className="col-12">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-dark mb-3">Contáctanos</h1>
              <p className="lead text-muted">
                Estamos aquí para ayudarte. Ponte en contacto con nosotros a través de cualquiera de los siguientes medios.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Columna izquierda: Información de contacto */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-lg h-100 rounded-4">
              <div className="card-body p-4 p-md-5">
                <h2 className="h3 fw-bold text-dark mb-4">Información de Contacto</h2>
                
                {/* Lista de métodos de contacto con iconos */}
                <div className="row g-4">
                  {/* Sección de dirección física */}
                  <div className="col-12">
                    <div className="d-flex align-items-center p-3 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
                      <div className="flex-shrink-0 me-3">
                        <div className="d-flex align-items-center justify-content-center rounded-circle" 
                             style={{ width: '60px', height: '60px', backgroundColor: '#212529' }}>
                          <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="h6 fw-semibold text-dark mb-1">Dirección</h3>
                        <p className="text-muted mb-0">Calle Principal 123, Barcelona</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sección de email */}
                  <div className="col-12">
                    <div className="d-flex align-items-center p-3 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
                      <div className="flex-shrink-0 me-3">
                        <div className="d-flex align-items-center justify-content-center rounded-circle" 
                             style={{ width: '60px', height: '60px', backgroundColor: '#212529' }}>
                          <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.208a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="h6 fw-semibold text-dark mb-1">Email</h3>
                        <p className="text-muted mb-0">info@bambasshop.com</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sección de teléfono */}
                  <div className="col-12">
                    <div className="d-flex align-items-center p-3 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
                      <div className="flex-shrink-0 me-3">
                        <div className="d-flex align-items-center justify-content-center rounded-circle" 
                             style={{ width: '60px', height: '60px', backgroundColor: '#212529' }}>
                          <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="h6 fw-semibold text-dark mb-1">Teléfono</h3>
                        <p className="text-muted mb-0">+34 934 567 890</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sección de horarios de atención */}
                <div className="mt-4 p-4 rounded-3" style={{ backgroundColor: '#f8fafc' }}>
                  <div className="d-flex align-items-center mb-3">
                    <svg width="20" height="20" fill="none" stroke="#6b7280" viewBox="0 0 24 24" className="me-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="h6 fw-semibold text-dark mb-0">Horario de Atención</h3>
                  </div>
                  <div className="small text-muted">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Lunes a Viernes:</span>
                      <span className="fw-medium">9:00 - 20:00</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Sábados:</span>
                      <span className="fw-medium">10:00 - 18:00</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Domingos:</span>
                      <span className="fw-medium">10:00 - 14:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Columna derecha: Formulario de contacto */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-lg h-100 rounded-4">
              <div className="card-body p-4 p-md-5">
                <h2 className="h3 fw-bold text-dark mb-4">Envíanos un mensaje</h2>
                
                <div className="row g-3">
                  {/* Campo de nombre */}
                  <div className="col-12">
                    <label htmlFor="nombre" className="form-label fw-medium text-dark">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3 border-2"
                      id="nombre"
                      placeholder="Tu nombre"
                      style={{ 
                        transition: 'all 0.2s ease',
                        borderColor: '#e5e7eb'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#212529';
                        e.target.style.boxShadow = '0 0 0 0.125rem rgba(33, 37, 41, 0.25)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  {/* Campo de email */}
                  <div className="col-12">
                    <label htmlFor="email" className="form-label fw-medium text-dark">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg rounded-3 border-2"
                      id="email"
                      placeholder="tucorreo@ejemplo.com"
                      style={{ 
                        transition: 'all 0.2s ease',
                        borderColor: '#e5e7eb'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#212529';
                        e.target.style.boxShadow = '0 0 0 0.125rem rgba(33, 37, 41, 0.25)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  {/* Campo de asunto */}
                  <div className="col-12">
                    <label htmlFor="asunto" className="form-label fw-medium text-dark">
                      Asunto
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3 border-2"
                      id="asunto"
                      placeholder="Asunto de tu mensaje"
                      style={{ 
                        transition: 'all 0.2s ease',
                        borderColor: '#e5e7eb'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#212529';
                        e.target.style.boxShadow = '0 0 0 0.125rem rgba(33, 37, 41, 0.25)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  {/* Campo de mensaje */}
                  <div className="col-12">
                    <label htmlFor="mensaje" className="form-label fw-medium text-dark">
                      Mensaje
                    </label>
                    <textarea
                      className="form-control form-control-lg rounded-3 border-2"
                      id="mensaje"
                      rows={5}
                      placeholder="Escribe tu mensaje aquí..."
                      style={{ 
                        resize: 'none',
                        transition: 'all 0.2s ease',
                        borderColor: '#e5e7eb'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#212529';
                        e.target.style.boxShadow = '0 0 0 0.125rem rgba(33, 37, 41, 0.25)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    ></textarea>
                  </div>
                  
                  {/* Botón de envío con efectos hover */}
                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn btn-lg w-100 rounded-3 fw-semibold d-flex align-items-center justify-content-center"
                      style={{
                        background: 'linear-gradient(135deg, #212529 0%, #495057 100%)',
                        border: 'none',
                        color: 'white',
                        transition: 'all 0.2s ease',
                        padding: '12px 24px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #495057 0%, #6c757d 100%)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 12px rgba(33, 37, 41, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #212529 0%, #495057 100%)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="me-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Enviar mensaje
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sección final con llamada a la acción para ayuda inmediata */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="text-center">
              <div className="d-inline-flex align-items-center px-4 py-3 bg-white rounded-pill shadow-sm">
                <span className="text-muted me-2">¿Necesitas ayuda inmediata?</span>
                <span className="fw-semibold" style={{ color: '#212529' }}>Llámanos al +34 934 567 890</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
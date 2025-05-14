// src/front/pages/Contacto.jsx

import React from 'react';

export function Contacto() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="mb-4">Contacto</h1>
          
          {/* Información de contacto */}
          <div className="card mb-4 border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h4 mb-3">Información de Contacto</h2>
              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="d-flex align-items-center mb-3 mb-md-0">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <i className="bi bi-geo-alt text-primary fs-4"></i>
                    </div>
                    <div>
                      <h3 className="h6 mb-1">Dirección</h3>
                      <p className="mb-0">Calle Principal 123, Ciudad</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center mb-3 mb-md-0">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <i className="bi bi-envelope text-primary fs-4"></i>
                    </div>
                    <div>
                      <h3 className="h6 mb-1">Email</h3>
                      <p className="mb-0">info@bambasshop.com</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <i className="bi bi-telephone text-primary fs-4"></i>
                    </div>
                    <div>
                      <h3 className="h6 mb-1">Teléfono</h3>
                      <p className="mb-0">+1 234 567 890</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className="h4 mb-3">Horario de Atención</h2>
              <p>Lunes a Viernes: 9:00 - 20:00</p>
              <p>Sábados: 10:00 - 18:00</p>
              <p>Domingos: 10:00 - 14:00</p>
            </div>
          </div>
          
          {/* Formulario de contacto */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h4 mb-4">Envíanos un mensaje</h2>
              
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" placeholder="Tu nombre" />
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="tucorreo@ejemplo.com" />
              </div>
              
              <div className="mb-3">
                <label htmlFor="asunto" className="form-label">Asunto</label>
                <input type="text" className="form-control" id="asunto" placeholder="Asunto de tu mensaje" />
              </div>
              
              <div className="mb-4">
                <label htmlFor="mensaje" className="form-label">Mensaje</label>
                <textarea className="form-control" id="mensaje" rows="5" placeholder="Escribe tu mensaje aquí..."></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-send me-2"></i>
                Enviar mensaje
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
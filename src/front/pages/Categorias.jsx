import React from 'react';

export function Categorias() {
  return (
    <div className="container py-5">
      <h1>Categorías de Productos</h1>
      <p>Aquí puedes explorar todas nuestras categorías de productos.</p>
      
      {/* Ejemplo de contenido */}
      <div className="row g-4 mt-4">
        <div className="col-md-4">
          <div className="card h-100">
            <img src="https://via.placeholder.com/300" className="card-img-top" alt="Electrónica" />
            <div className="card-body">
              <h5 className="card-title">Electrónica</h5>
              <p className="card-text">Descubre los últimos productos electrónicos.</p>
              <a href="#" className="btn btn-primary">Ver productos</a>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100">
            <img src="https://via.placeholder.com/300" className="card-img-top" alt="Ropa" />
            <div className="card-body">
              <h5 className="card-title">Ropa</h5>
              <p className="card-text">Las últimas tendencias en moda.</p>
              <a href="#" className="btn btn-primary">Ver productos</a>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100">
            <img src="https://via.placeholder.com/300" className="card-img-top" alt="Hogar" />
            <div className="card-body">
              <h5 className="card-title">Hogar</h5>
              <p className="card-text">Todo para tu hogar y decoración.</p>
              <a href="#" className="btn btn-primary">Ver productos</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categorias;
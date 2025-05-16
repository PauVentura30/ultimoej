export function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Auriculares Bluetooth Premium",
      price: 89.99,
      rating: 4.8,
      reviews: 124,
      image: "https://via.placeholder.com/300",
      badge: "Nuevo"
    },
    {
      id: 2,
      name: "Smartwatch Serie 5",
      price: 199.99,
      oldPrice: 249.99,
      rating: 4.5,
      reviews: 86,
      image: "https://via.placeholder.com/300",
      badge: "Oferta"
    },
    {
      id: 3,
      name: "Cámara Instantánea",
      price: 69.99,
      rating: 4.2,
      reviews: 52,
      image: "https://via.placeholder.com/300"
    },
    {
      id: 4,
      name: "Altavoz Inteligente",
      price: 129.99,
      rating: 4.7,
      reviews: 94,
      image: "https://via.placeholder.com/300",
      badge: "Popular"
    }
  ];
  
  const handleAddToCart = (product) => {
    addItem(product);
    // Mostrar una notificación (puedes usar una biblioteca como react-toastify)
    alert(`${product.name} añadido al carrito`);
  };
  
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="fw-bold mb-2">Productos destacados</h2>
        <p className="text-muted mb-4">Descubre nuestros productos más populares</p>
        
        <div className="row g-4">
          {products.map(product => (
            <div key={product.id} className="col-sm-6 col-md-3">
              <div className="card h-100 shadow-sm hover-shadow">
                <div className="position-relative">
                  <img src={product.image} className="card-img-top" alt={product.name} />
                  {product.badge && (
                    <span className={`position-absolute top-0 end-0 m-2 badge ${
                      product.badge === 'Oferta' ? 'bg-danger' :
                      product.badge === 'Nuevo' ? 'bg-success' :
                      'bg-primary'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <div className="mb-2 d-flex align-items-center">
                    <div className="text-warning me-1">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star"></i>
                    </div>
                    <small className="text-muted">{product.rating} ({product.reviews})</small>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {product.oldPrice && (
                        <small className="text-decoration-line-through text-muted me-2">${product.oldPrice}</small>
                      )}
                      <span className="fw-bold">${product.price}</span>
                    </div>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-4">
          <button className="btn btn-outline-primary">
            Ver todos los productos
            <i className="bi bi-chevron-right ms-1"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
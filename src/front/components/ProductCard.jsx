// Componente de ejemplo para añadir un producto al carrito
import { useCart } from '../context/CartContext';

export function ProductCard({ product }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    // Opcional: Mostrar un mensaje de confirmación
    alert(`${product.name} añadido al carrito`);
  };

  return (
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
            onClick={handleAddToCart}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
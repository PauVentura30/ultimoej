import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useAuth } from '../hooks/useAuth';

export function Cesta() {
  const { store, dispatch } = useGlobalReducer();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  console.log("CESTA - Store completo:", store);
  console.log("CESTA - Carrito actual:", store.cart);
  console.log("CESTA - Longitud del carrito:", store.cart ? store.cart.length : 'undefined');

  // Funciones del carrito
  const removeItem = (id) => {
    dispatch({ type: "remove_from_cart", payload: id });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      dispatch({ type: "update_cart_quantity", payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: "clear_cart" });
  };

  // Función para proceder al checkout
  const handleCheckout = () => {
    if (!isLoggedIn) {
      // Redirigir al login si no está autenticado
      navigate('/login');
      return;
    }
    
    // Redirigir al checkout
    navigate('/checkout');
  };

  // Calcular subtotal (sin impuestos ni envío)
  const subtotal = store.cart ? store.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) : 0;
  const impuestos = subtotal * 0.21; // 21% de IVA
  const envio = subtotal > 50 ? 0 : 4.99; // Envío gratis para pedidos > 50€
  const total = subtotal + impuestos + envio;

  if (!store.cart || store.cart.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <i className="bi bi-cart-x fs-1 text-muted mb-3"></i>
          <h2>Tu carrito está vacío</h2>
          <p className="lead text-muted mb-4">Parece que no has añadido ningún producto a tu carrito todavía.</p>
          <a href="/productos" className="btn btn-dark">
            Ver productos
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Tu Carrito</h1>
      
      <div className="row">
        <div className="col-lg-8">
          {/* Cabecera de la tabla */}
          <div className="card mb-4 border-0 shadow-sm">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0">
                  <thead className="text-muted small text-uppercase">
                    <tr>
                      <th scope="col" className="ps-0">Producto</th>
                      <th scope="col" className="text-center">Cantidad</th>
                      <th scope="col" className="text-center">Precio</th>
                      <th scope="col" className="text-center">Total</th>
                      <th scope="col" className="pe-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {store.cart.map((item) => (
                      <tr key={item.id}>
                        <td className="ps-0">
                          <div className="d-flex align-items-center">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="rounded me-3" 
                              style={{width: "64px", height: "64px", objectFit: "cover"}} 
                            />
                            <div>
                              <h6 className="mb-0">{item.name}</h6>
                              {item.badge && (
                                <span className={`badge ${
                                  item.badge === 'Oferta' ? 'bg-danger' :
                                  item.badge === 'Nuevo' ? 'bg-success' :
                                  'bg-dark'
                                } me-2`}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="input-group input-group-sm" style={{maxWidth: "120px", margin: "0 auto"}}>
                            <button 
                              className="btn btn-outline-secondary" 
                              type="button"
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <input 
                              type="text" 
                              className="form-control text-center" 
                              value={item.quantity || 1}
                              readOnly
                            />
                            <button 
                              className="btn btn-outline-secondary" 
                              type="button"
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </td>
                        <td className="text-center">${item.price.toFixed(2)}</td>
                        <td className="text-center fw-bold">${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                        <td className="text-end pe-0">
                          <button 
                            className="btn btn-sm btn-link text-danger"
                            onClick={() => removeItem(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="d-flex justify-content-between mb-4">
            <a href="/productos" className="btn btn-outline-dark">
              <i className="bi bi-arrow-left me-2"></i>
              Seguir comprando
            </a>
            <button 
              className="btn btn-outline-danger"
              onClick={clearCart}
            >
              <i className="bi bi-trash me-2"></i>
              Vaciar carrito
            </button>
          </div>
        </div>
        
        <div className="col-lg-4">
          {/* Resumen del pedido */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-transparent border-0 pt-4">
              <h5 className="mb-0">Resumen del pedido</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Impuestos (21%)</span>
                <span>${impuestos.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Envío</span>
                <span>{envio === 0 ? "Gratis" : `$${envio.toFixed(2)}`}</span>
              </div>
              <hr className="my-3" />
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Total</span>
                <span className="fw-bold fs-5 text-dark">${total.toFixed(2)}</span>
              </div>
              
              {/* Botón de checkout actualizado */}
              <button 
                className="btn btn-dark w-100 mt-2"
                onClick={handleCheckout}
              >
                <i className="bi bi-credit-card me-2"></i>
                {isLoggedIn ? 'Realizar pedido' : 'Iniciar sesión para comprar'}
              </button>
              
              {!isLoggedIn && (
                <small className="text-muted d-block text-center mt-2">
                  Necesitas iniciar sesión para completar tu compra
                </small>
              )}
              
              {/* Iconos de métodos de pago */}
              <div className="text-center mt-3">
                <small className="text-muted d-block mb-2">Pagos seguros con:</small>
                <div className="d-flex justify-content-center gap-2">
                  <i className="bi bi-credit-card fs-4 text-muted"></i>
                  <i className="bi bi-paypal fs-4 text-muted"></i>
                  <i className="bi bi-apple fs-4 text-muted"></i>
                  <i className="bi bi-google fs-4 text-muted"></i>
                </div>
              </div>
            </div>
          </div>
          
          {/* Códigos promocionales */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="mb-3">Código promocional</h6>
              <div className="input-group mb-2">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Introduce tu código" 
                />
                <button className="btn btn-outline-dark" type="button">Aplicar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cesta;
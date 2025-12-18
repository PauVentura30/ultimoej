import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useAuth } from '../hooks/useAuth';

// Inicializa Stripe con la clave pública desde variables de entorno
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Configuración de estilos para el elemento de tarjeta de crédito
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      padding: '12px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

// Componente principal del formulario de checkout
function CheckoutForm() {
  // Hooks de Stripe para manejar el pago
  const stripe = useStripe();
  const elements = useElements();
  
  // Hooks de la aplicación
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const { user, isLoggedIn } = useAuth();

  // Estados para el proceso de pago
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  
  // Estado para los datos de envío del formulario
  const [shippingData, setShippingData] = useState({
    name: user?.name || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'ES'
  });

  // Cálculos de precios del pedido
  const subtotal = store.cart ? store.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) : 0;
  const impuestos = subtotal * 0.21; // IVA del 21%
  const envio = subtotal > 50 ? 0 : 4.99; // Envío gratuito para pedidos superiores a 50€
  const total = subtotal + impuestos + envio;

  // Efecto para verificar autenticación y crear Payment Intent al cargar
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (!store.cart || store.cart.length === 0) {
      navigate('/cesta');
      return;
    }

    createPaymentIntent();
  }, []);

  // Función para crear el Payment Intent en Stripe
  const createPaymentIntent = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${store.token}`
        },
        body: JSON.stringify({
          amount: Math.round(total * 100), // Stripe maneja los montos en centavos
          currency: 'eur',
          items: store.cart,
          shipping: shippingData
        })
      });

      const data = await response.json();
      
      if (data.client_secret) {
        setClientSecret(data.client_secret);
      } else {
        setError('Error al inicializar el pago');
      }
    } catch (err) {
      console.error('Error creando Payment Intent:', err);
      setError('Error de conexión con el servidor');
    }
  };

  // Maneja los cambios en los campos del formulario de envío
  const handleShippingChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value
    });
  };

  // Función principal para procesar el pago
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);
    setError('');

    // 🔥 GUARDAR CARRITO EN SESSIONSTORAGE COMO BACKUP
    sessionStorage.setItem('pending_order', JSON.stringify(store.cart));
    console.log('✅ Carrito guardado en sessionStorage como backup');

    const cardElement = elements.getElement(CardElement);

    // Confirma el pago con Stripe usando los datos del formulario
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: `${shippingData.name} ${shippingData.lastName}`,
          email: shippingData.email,
          phone: shippingData.phone,
          address: {
            line1: shippingData.address,
            city: shippingData.city,
            postal_code: shippingData.postalCode,
            country: shippingData.country,
          },
        },
      },
    });

    if (stripeError) {
      setError(stripeError.message);
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Pago exitoso: limpiar carrito y redirigir a página de éxito
      dispatch({ type: 'clear_cart' });
      navigate(`/checkout/success?payment_intent=${paymentIntent.id}`);
    }
  };

  // Renderiza mensaje si el carrito está vacío
  if (!store.cart || store.cart.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Tu carrito está vacío</h2>
          <button className="btn btn-dark" onClick={() => navigate('/productos')}>
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        {/* Columna izquierda: Formulario de checkout */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-4">Información de envío</h3>
              
              <form onSubmit={handleSubmit}>
                {/* Campos de información personal */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={shippingData.name}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Apellidos *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={shippingData.lastName}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>

                {/* Campos de contacto */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={shippingData.email}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Teléfono *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={shippingData.phone}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>

                {/* Campo de dirección */}
                <div className="mb-3">
                  <label className="form-label">Dirección *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={shippingData.address}
                    onChange={handleShippingChange}
                    placeholder="Calle, número, piso..."
                    required
                  />
                </div>

                {/* Campos de ubicación */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Ciudad *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={shippingData.city}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Código postal *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="postalCode"
                      value={shippingData.postalCode}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>

                <hr className="my-4" />

                <h3 className="fw-bold mb-4">Información de pago</h3>
                
                {/* Elemento de tarjeta de crédito de Stripe */}
                <div className="mb-4">
                  <label className="form-label">Datos de la tarjeta *</label>
                  <div className="border rounded p-3">
                    <CardElement options={cardElementOptions} />
                  </div>
                </div>

                {/* Mostrar errores de pago */}
                {error && (
                  <div className="alert alert-danger">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}

                {/* Botón de procesar pago */}
                <button
                  type="submit"
                  className="btn btn-dark w-100 py-3"
                  disabled={!stripe || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Procesando pago...
                    </>
                  ) : (
                    `Pagar €${total.toFixed(2)}`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Columna derecha: Resumen del pedido */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h5 className="mb-0">Resumen del pedido</h5>
            </div>
            <div className="card-body">
              {/* Lista de productos en el carrito */}
              {store.cart.map((item) => (
                <div key={item.id} className="d-flex align-items-center mb-3">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="rounded me-3"
                    style={{width: "50px", height: "50px", objectFit: "cover"}}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-0 small">{item.name}</h6>
                    <small className="text-muted">Cantidad: {item.quantity || 1}</small>
                  </div>
                  <span className="fw-bold">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}

              <hr />

              {/* Desglose de precios */}
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>IVA (21%)</span>
                <span>${impuestos.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Envío</span>
                <span>{envio === 0 ? "Gratis" : `$${envio.toFixed(2)}`}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-5">Total</span>
                <span className="fw-bold fs-5">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente wrapper que proporciona el contexto de Stripe Elements
export function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
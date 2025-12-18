import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import useGlobalReducer from '../hooks/useGlobalReducer';

export function CheckoutSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { store, dispatch } = useGlobalReducer();
  
  const [orderNumber, setOrderNumber] = useState('');

  const paymentIntentId = searchParams.get('payment_intent');

  const getUserName = () => {
    try {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        const parsed = JSON.parse(userData);
        return parsed.name || 'Cliente';
      }
      return 'Cliente';
    } catch (error) {
      console.error('Error obteniendo nombre de usuario:', error);
      return 'Cliente';
    }
  };

  const getUserEmail = () => {
    try {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        const parsed = JSON.parse(userData);
        return parsed.email || 'guest';
      }
      return 'guest';
    } catch (error) {
      console.error('Error obteniendo email:', error);
      return 'guest';
    }
  };

  useEffect(() => {
    console.log('🎯 CheckoutSuccess montado');
    
    // Prevenir múltiples creaciones
    const alreadyProcessed = sessionStorage.getItem(`order_processed_${paymentIntentId}`);
    if (alreadyProcessed) {
      console.log('⚠️ Pedido ya procesado anteriormente');
      setOrderNumber(alreadyProcessed);
      return;
    }

    // PRIMERO: Intentar recuperar del store de Redux
    let cartItems = store.cart || [];
    console.log('🛒 Carrito desde store:', cartItems);

    // SEGUNDO: Si está vacío, intentar desde localStorage
    if (cartItems.length === 0) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        cartItems = JSON.parse(savedCart);
        console.log('🛒 Carrito recuperado desde localStorage:', cartItems);
      }
    }

    // TERCERO: Si sigue vacío, intentar desde sessionStorage (backup)
    if (cartItems.length === 0) {
      const pendingOrder = sessionStorage.getItem('pending_order');
      if (pendingOrder) {
        cartItems = JSON.parse(pendingOrder);
        console.log('🛒 Carrito recuperado desde sessionStorage (backup):', cartItems);
      }
    }

    console.log('📧 Email del usuario:', getUserEmail());

    // Solo crear el pedido si hay items
    if (cartItems.length > 0) {
      createOrder(cartItems);
    } else {
      console.error('❌ No hay items en el carrito para crear pedido');
      alert('Error: No se pudo recuperar el carrito. Por favor contacta con soporte.');
    }
  }, [paymentIntentId]);

  const createOrder = (cartItems) => {
    try {
      console.log('📦 Creando pedido con items:', cartItems);

      // Generar número de pedido único
      const orderNum = `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      
      // Calcular totales
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
      const impuestos = subtotal * 0.21;
      const envio = subtotal > 150 ? 0 : 4.99;
      const total = subtotal + impuestos + envio;

      // Crear objeto del pedido
      const newOrder = {
        id: orderNum,
        date: new Date().toISOString().split('T')[0],
        deliveryDate: null,
        status: "Procesando",
        total: parseFloat(total.toFixed(2)),
        canReturn: true,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity || 1,
          price: item.price,
          image: item.image,
          size: item.size || null,
          brand: item.brand || null,
          badge: item.badge || null
        }))
      };

      console.log('✅ Nuevo pedido creado:', newOrder);

      // Obtener email del usuario
      const userEmail = getUserEmail();
      console.log('💾 Guardando pedido para usuario:', userEmail);

      // Obtener pedidos existentes del usuario
      const storageKey = `user_orders_${userEmail}`;
      const existingOrders = JSON.parse(localStorage.getItem(storageKey) || '[]');
      console.log('📋 Pedidos existentes:', existingOrders);
      
      // Añadir el nuevo pedido al inicio
      const updatedOrders = [newOrder, ...existingOrders];
      
      // Guardar en localStorage (por usuario)
      localStorage.setItem(storageKey, JSON.stringify(updatedOrders));
      console.log('✅ Pedido guardado en:', storageKey);
      console.log('📦 Total de pedidos ahora:', updatedOrders.length);
      
      // Vaciar el carrito
      dispatch({ type: 'clear_cart' });
      localStorage.setItem('cart', JSON.stringify([]));
      
      // Limpiar sessionStorage backup
      sessionStorage.removeItem('pending_order');
      
      // Marcar como procesado en sessionStorage
      if (paymentIntentId) {
        sessionStorage.setItem(`order_processed_${paymentIntentId}`, orderNum);
      }
      
      setOrderNumber(orderNum);
      
      console.log('✅ Pedido guardado y carrito vaciado');
      console.log('🔍 Verifica en localStorage la key:', storageKey);
    } catch (error) {
      console.error('❌ Error creando pedido:', error);
      alert('Hubo un error al crear el pedido. Por favor contacta con soporte.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center p-5">
              <div className="text-success mb-4">
                <i className="bi bi-check-circle-fill" style={{fontSize: '4rem'}}></i>
              </div>
              
              <h1 className="text-success mb-3">¡Pago realizado con éxito!</h1>
              <p className="lead mb-4">
                Gracias por tu compra, {getUserName()}. Tu pedido ha sido procesado correctamente.
              </p>

              {orderNumber && (
                <div className="bg-light rounded p-4 mb-4">
                  <div className="row text-start">
                    <div className="col-12 text-center">
                      <h6 className="fw-bold">Número de pedido:</h6>
                      <p className="text-muted fs-5">#{orderNumber}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                <strong>¿Qué sigue?</strong>
                <ul className="list-unstyled mt-2 mb-0 text-start">
                  <li>• Recibirás un email de confirmación en breve</li>
                  <li>• Procesaremos tu pedido en 1-2 días hábiles</li>
                  <li>• Te enviaremos información de seguimiento</li>
                </ul>
              </div>

              <div className="d-flex gap-3 justify-content-center mt-4">
                <button 
                  className="btn btn-dark btn-lg"
                  onClick={() => navigate('/private')}
                >
                  <i className="bi bi-person me-2"></i>
                  Ver mis pedidos
                </button>
                <button 
                  className="btn btn-outline-dark btn-lg"
                  onClick={() => navigate('/productos')}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Seguir comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
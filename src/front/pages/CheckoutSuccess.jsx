import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function CheckoutSuccess() {
  // Hooks para navegación, parámetros URL y autenticación
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  // Estados para manejar los detalles del pedido y carga
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extrae el ID del Payment Intent desde los parámetros de la URL
  const paymentIntentId = searchParams.get('payment_intent');

  // Función para obtener el nombre del usuario desde localStorage con debug completo
  const getUserName = () => {
    try {
      console.log('🔍 DEBUG: Obteniendo nombre de usuario...');
      
      // Revisar localStorage directamente para datos del usuario
      const userData = localStorage.getItem('user_data');
      console.log('📦 localStorage user_data:', userData);
      
      if (userData) {
        const parsed = JSON.parse(userData);
        console.log('📋 Datos parseados:', parsed);
        console.log('👤 Nombre encontrado:', parsed.name);
        return parsed.name || 'Cliente';
      }
      
      console.log('❌ No hay user_data en localStorage');
      return 'Cliente';
    } catch (error) {
      console.error('💥 Error obteniendo nombre de usuario:', error);
      return 'Cliente';
    }
  };

  // Efecto para cargar detalles del pedido al montar el componente
  useEffect(() => {
    // Debug detallado del estado de autenticación y localStorage
    console.log('🔍 DEBUG CheckoutSuccess - useAuth user:', user);
    console.log('🔍 DEBUG CheckoutSuccess - localStorage completo:', {
      auth_token: localStorage.getItem('auth_token') ? 'Presente' : 'Ausente',
      user_data: localStorage.getItem('user_data'),
      user_email: localStorage.getItem('user_email')
    });
    
    if (paymentIntentId) {
      fetchOrderDetails();
    } else {
      setLoading(false);
    }
  }, [paymentIntentId]);

  // Función para obtener los detalles del pedido desde el backend
  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order-details/${paymentIntentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data);
      } else {
        const errorData = await response.text();
        console.error('❌ Error response:', errorData);
      }
    } catch (error) {
      console.error('💥 Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center p-5">
              {/* Estado de carga mientras se obtienen los detalles */}
              {loading ? (
                <div>
                  <div className="spinner-border text-success mb-3" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <h4>Verificando tu pedido...</h4>
                </div>
              ) : (
                <>
                  {/* Icono de éxito */}
                  <div className="text-success mb-4">
                    <i className="bi bi-check-circle-fill" style={{fontSize: '4rem'}}></i>
                  </div>
                  
                  {/* Mensaje principal de confirmación */}
                  <h1 className="text-success mb-3">¡Pago realizado con éxito!</h1>
                  <p className="lead mb-4">
                    Gracias por tu compra, {getUserName()}. Tu pedido ha sido procesado correctamente.
                  </p>

                  {/* Detalles del pedido si están disponibles */}
                  {orderDetails && (
                    <div className="bg-light rounded p-4 mb-4">
                      <div className="row text-start">
                        <div className="col-md-6">
                          <h6 className="fw-bold">Número de pedido:</h6>
                          <p className="text-muted">#{orderDetails.order_number}</p>
                        </div>
                        <div className="col-md-6">
                          <h6 className="fw-bold">Total pagado:</h6>
                          <p className="text-muted fs-5 fw-bold">€{orderDetails.total}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Información sobre los siguientes pasos */}
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>¿Qué sigue?</strong>
                    <ul className="list-unstyled mt-2 mb-0">
                      <li>• Recibirás un email de confirmación en breve</li>
                      <li>• Procesaremos tu pedido en 1-2 días hábiles</li>
                      <li>• Te enviaremos información de seguimiento</li>
                    </ul>
                  </div>

                  {/* Botones de navegación post-compra */}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
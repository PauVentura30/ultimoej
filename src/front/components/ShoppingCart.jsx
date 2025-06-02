import React, { useState } from 'react';
import useGlobalReducer from '/workspaces/ultimoej/src/front/hooks/useGlobalReducer.jsx';

export const ShoppingCart = () => {
  // Hook para acceder al estado global y dispatcher
  const { store, dispatch } = useGlobalReducer();
  
  // Estado para controlar la visibilidad del dropdown del carrito
  const [isOpen, setIsOpen] = useState(false);
  
  // Extrae el array de productos del carrito desde el store
  const { cart } = store;
  
  // Función para mostrar/ocultar el carrito dropdown
  const toggleCart = () => setIsOpen(!isOpen);
  
  // Función para eliminar un producto específico del carrito
  const removeItem = (id) => {
    dispatch({
      type: 'remove_from_cart',
      payload: id
    });
  };
  
  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    
    dispatch({
      type: 'update_cart_quantity',
      payload: { id, quantity }
    });
  };
  
  // Función para vaciar completamente el carrito
  const clearCart = () => {
    dispatch({ type: 'clear_cart' });
  };
  
  // Función para calcular el precio total de todos los productos
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2);
  };
  
  return (
    <div className="relative">
      {/* Botón del carrito con icono SVG y contador de items */}
      <button 
        onClick={toggleCart}
        className="flex items-center p-2 text-gray-700 hover:text-blue-600"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        <span className="ml-1">{cart.length}</span>
      </button>
      
      {/* Dropdown del carrito que se muestra condicionalmente */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          {/* Header del carrito con título y botón de cerrar */}
          <div className="p-3 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Tu carrito</h3>
              <button 
                onClick={toggleCart}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Lista scrolleable de productos en el carrito */}
          <div className="max-h-64 overflow-y-auto p-3">
            {cart.length === 0 ? (
              // Mensaje cuando el carrito está vacío
              <p className="text-gray-500 text-sm text-center py-4">Tu carrito está vacío</p>
            ) : (
              // Renderiza cada producto del carrito
              cart.map(item => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                  {/* Información del producto con imagen, nombre y precio */}
                  <div className="flex items-center">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-10 h-10 object-cover rounded mr-2"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">${item.price}</p>
                    </div>
                  </div>
                  
                  {/* Controles de cantidad y botón eliminar */}
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                      className="text-gray-500 hover:text-gray-700 px-1"
                    >
                      -
                    </button>
                    <span className="text-sm mx-1">{item.quantity || 1}</span>
                    <button
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                      className="text-gray-500 hover:text-gray-700 px-1"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Footer con total y botones de acción (solo si hay productos) */}
          {cart.length > 0 && (
            <div className="p-3 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Total:</span>
                <span className="font-bold">${calculateTotal()}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={clearCart}
                  className="flex-1 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Vaciar
                </button>
                <button
                  className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
// src/front/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// Creamos el contexto
const CartContext = createContext();

// Estado inicial del carrito
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

// Proveedor del contexto para el carrito
export function CartProvider({ children }) {
  // Intentamos recuperar el carrito del localStorage
  const getInitialState = () => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : initialState;
    } catch (error) {
      console.error('Error al recuperar el carrito del localStorage:', error);
      return initialState;
    }
  };

  const [cart, setCart] = useState(getInitialState());

  // Guardamos el carrito en localStorage cuando cambia
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }, [cart]);

  // Métodos para manipular el carrito
  const addItem = (product, quantity = 1) => {
    const existingItemIndex = cart.items.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex >= 0) {
      // Si el producto ya existe, actualizamos la cantidad
      const updatedItems = [...cart.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity
      };

      setCart({
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
      });
    } else {
      // Si es un producto nuevo, lo añadimos
      const newItem = {
        ...product,
        quantity: quantity
      };

      const updatedItems = [...cart.items, newItem];
      
      setCart({
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
      });
    }
  };

  const removeItem = (productId) => {
    const filteredItems = cart.items.filter(item => item.id !== productId);
    
    setCart({
      items: filteredItems,
      totalItems: filteredItems.reduce((total, item) => total + item.quantity, 0),
      totalPrice: filteredItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      // Si la cantidad es 0 o menos, eliminamos el producto
      removeItem(productId);
      return;
    }

    const updatedItems = cart.items.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );

    setCart({
      items: updatedItems,
      totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
      totalPrice: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    });
  };

  const clearCart = () => {
    setCart(initialState);
  };

  const contextValue = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para acceder al contexto
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}

export default CartContext;
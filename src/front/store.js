// Función para cargar el carrito desde localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('bambas_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error cargando carrito desde localStorage:', error);
    return [];
  }
};

// Función para guardar el carrito en localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('bambas_cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error guardando carrito en localStorage:', error);
  }
};

export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    user: null,
    token: null,
    cart: loadCartFromStorage() // Cargar desde localStorage
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case 'set_hello':
      return { ...store, message: action.payload };
    
    case 'add_task':
      const { id, color } = action.payload;
      return { 
        ...store, 
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo)) 
      };
    
    case "signup_access":
      return { ...store, user: action.payload.user };
    
    case "login":
      return { ...store, user: action.payload.user, token: action.payload.token };
    
    // Acciones del carrito con localStorage
    case "add_to_cart":
      console.log("🛒 Añadiendo al carrito:", action.payload);
      const existingItem = store.cart.find(item => item.id === action.payload.id);
      
      let newCart;
      if (existingItem) {
        newCart = store.cart.map(item => 
          item.id === action.payload.id 
            ? {...item, quantity: (item.quantity || 1) + 1} 
            : item
        );
      } else {
        newCart = [...store.cart, {...action.payload, quantity: 1}];
      }
      
      console.log("🛒 Nuevo carrito:", newCart);
      saveCartToStorage(newCart); // Guardar en localStorage
      return { ...store, cart: newCart };
    
    case "remove_from_cart":
      console.log("🗑️ Removiendo del carrito:", action.payload);
      const filteredCart = store.cart.filter(item => item.id !== action.payload);
      console.log("🗑️ Carrito después de remover:", filteredCart);
      saveCartToStorage(filteredCart); // Guardar en localStorage
      return { ...store, cart: filteredCart };
    
    case "update_cart_quantity":
      console.log("📊 Actualizando cantidad:", action.payload);
      let updatedCart;
      if (action.payload.quantity <= 0) {
        updatedCart = store.cart.filter(item => item.id !== action.payload.id);
      } else {
        updatedCart = store.cart.map(item => 
          item.id === action.payload.id 
            ? {...item, quantity: action.payload.quantity} 
            : item
        );
      }
      console.log("📊 Carrito actualizado:", updatedCart);
      saveCartToStorage(updatedCart); // Guardar en localStorage
      return { ...store, cart: updatedCart };
    
    case "clear_cart":
      console.log("🧹 Limpiando carrito");
      saveCartToStorage([]); // Limpiar localStorage
      return { ...store, cart: [] };
    
    default:
      return store;
  }
}
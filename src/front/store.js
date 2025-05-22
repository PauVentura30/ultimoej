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

// Función para cargar datos de usuario desde localStorage
const loadUserFromStorage = () => {
  try {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    const userEmail = localStorage.getItem('user_email'); // Fallback
    
    console.log('Cargando desde localStorage:', { token, userData, userEmail });
    
    // Prioridad: user_data > user_email
    let user = null;
    if (userData) {
      user = JSON.parse(userData);
      console.log('Datos completos cargados:', user);
    } else if (userEmail) {
      user = { email: userEmail };
      console.log('Solo email cargado:', user);
    }
    
    return { token, user };
  } catch (error) {
    console.error('Error cargando datos de usuario desde localStorage:', error);
    return { token: null, user: null };
  }
};

export const initialStore = () => {
  const { token, user } = loadUserFromStorage(); // Cargar automáticamente al inicio
  
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
    user: user,                   // Cargar desde localStorage
    token: token,                // Cargar desde localStorage
    cart: loadCartFromStorage(), // Cargar desde localStorage
    searchTerm: "",             // Nuevo: término de búsqueda
    searchResults: [],          // Nuevo: resultados de búsqueda
    isSearching: false          // Nuevo: estado de carga de búsqueda
  }
};

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
      // Guardar datos completos del usuario al registrarse
      console.log('STORE: Procesando signup_access con:', action.payload);
      if (action.payload.user) {
        localStorage.setItem('user_data', JSON.stringify(action.payload.user));
        console.log('STORE: Datos guardados en localStorage');
      }
      return { ...store, user: action.payload.user };
    
    case "login":
      // Guardar datos completos cuando se hace login
      console.log('STORE: Procesando login con:', action.payload);
      if (action.payload.token) {
        localStorage.setItem('auth_token', action.payload.token);
      }
      if (action.payload.user) {
        // Siempre guardar como user_data completo
        localStorage.setItem('user_data', JSON.stringify(action.payload.user));
        console.log('STORE: Usuario completo guardado:', action.payload.user);
      }
      return { ...store, user: action.payload.user, token: action.payload.token };
    
    case "logout":
      // Limpiar localStorage cuando se hace logout
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_data'); // También limpiar datos completos
      // Mantener el carrito al hacer logout
      return { ...store, user: null, token: null };
    
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
    
    // Nuevas acciones para búsqueda
    case "SET_SEARCH_TERM":
      console.log("🔍 Estableciendo término de búsqueda:", action.payload);
      return { 
        ...store, 
        searchTerm: action.payload,
        searchResults: [] // Limpiar resultados anteriores
      };
    
    case "SET_SEARCH_RESULTS":
      console.log("📋 Estableciendo resultados de búsqueda:", action.payload);
      return { 
        ...store, 
        searchResults: action.payload,
        isSearching: false 
      };
    
    case "SET_SEARCHING":
      return { 
        ...store, 
        isSearching: action.payload 
      };
    
    case "CLEAR_SEARCH":
      console.log("🧹 Limpiando búsqueda");
      return { 
        ...store, 
        searchTerm: "",
        searchResults: [],
        isSearching: false 
      };
    
    default:
      return store;
  }
}
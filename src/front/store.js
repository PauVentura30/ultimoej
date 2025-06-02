// Función para cargar el carrito desde localStorage al inicializar
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('bambas_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error cargando carrito desde localStorage:', error);
    return [];
  }
};

// Función para persistir el carrito en localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('bambas_cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error guardando carrito en localStorage:', error);
  }
};

// Función para cargar datos de usuario y token desde localStorage
const loadUserFromStorage = () => {
  try {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    const userEmail = localStorage.getItem('user_email');
    
    console.log('Cargando desde localStorage:', { token, userData, userEmail });
    
    // Prioriza user_data completo sobre user_email básico
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

// Función para crear el estado inicial de la aplicación
export const initialStore = () => {
  // Carga automática de datos persistidos al inicializar
  const { token, user } = loadUserFromStorage();
  
  return {
    message: null,
    // Datos de ejemplo para la funcionalidad de todos
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
    user: user,                   // Usuario cargado desde localStorage
    token: token,                // Token de autenticación
    cart: loadCartFromStorage(), // Carrito persistido
    searchTerm: "",             // Término de búsqueda actual
    searchResults: [],          // Resultados de búsqueda filtrados
    isSearching: false          // Estado de carga de búsqueda
  }
};

// Reducer principal que maneja todas las acciones del estado global
export default function storeReducer(store, action = {}) {
  switch(action.type) {
    // Acción para establecer mensajes generales
    case 'set_hello':
      return { ...store, message: action.payload };
    
    // Acción para agregar tareas con colores (funcionalidad de todos)
    case 'add_task':
      const { id, color } = action.payload;
      return { 
        ...store, 
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo)) 
      };
    
    // Acción para manejar registro de usuario exitoso
    case "signup_access":
      console.log('STORE: Procesando signup_access con:', action.payload);
      if (action.payload.user) {
        localStorage.setItem('user_data', JSON.stringify(action.payload.user));
        console.log('STORE: Datos guardados en localStorage');
      }
      return { ...store, user: action.payload.user };
    
    // Acción para manejar login exitoso con token y datos de usuario
    case "login":
      console.log('STORE: Procesando login con:', action.payload);
      if (action.payload.token) {
        localStorage.setItem('auth_token', action.payload.token);
      }
      if (action.payload.user) {
        // Guarda datos completos del usuario en localStorage
        localStorage.setItem('user_data', JSON.stringify(action.payload.user));
        console.log('STORE: Usuario completo guardado:', action.payload.user);
      }
      return { ...store, user: action.payload.user, token: action.payload.token };
    
    // Acción para manejar logout y limpiar datos de autenticación
    case "logout":
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_data');
      // Mantiene el carrito al hacer logout para mejor UX
      return { ...store, user: null, token: null };
    
    // Acción para agregar productos al carrito con persistencia
    case "add_to_cart":
      console.log("🛒 Añadiendo al carrito:", action.payload);
      const existingItem = store.cart.find(item => item.id === action.payload.id);
      
      let newCart;
      if (existingItem) {
        // Incrementa cantidad si el producto ya existe
        newCart = store.cart.map(item => 
          item.id === action.payload.id 
            ? {...item, quantity: (item.quantity || 1) + 1} 
            : item
        );
      } else {
        // Agrega nuevo producto con cantidad 1
        newCart = [...store.cart, {...action.payload, quantity: 1}];
      }
      
      console.log("🛒 Nuevo carrito:", newCart);
      saveCartToStorage(newCart);
      return { ...store, cart: newCart };
    
    // Acción para eliminar productos del carrito
    case "remove_from_cart":
      console.log("🗑️ Removiendo del carrito:", action.payload);
      const filteredCart = store.cart.filter(item => item.id !== action.payload);
      console.log("🗑️ Carrito después de remover:", filteredCart);
      saveCartToStorage(filteredCart);
      return { ...store, cart: filteredCart };
    
    // Acción para actualizar cantidad de productos en el carrito
    case "update_cart_quantity":
      console.log("📊 Actualizando cantidad:", action.payload);
      let updatedCart;
      if (action.payload.quantity <= 0) {
        // Elimina el producto si la cantidad es 0 o menor
        updatedCart = store.cart.filter(item => item.id !== action.payload.id);
      } else {
        // Actualiza la cantidad del producto
        updatedCart = store.cart.map(item => 
          item.id === action.payload.id 
            ? {...item, quantity: action.payload.quantity} 
            : item
        );
      }
      console.log("📊 Carrito actualizado:", updatedCart);
      saveCartToStorage(updatedCart);
      return { ...store, cart: updatedCart };
    
    // Acción para vaciar completamente el carrito
    case "clear_cart":
      console.log("🧹 Limpiando carrito");
      saveCartToStorage([]);
      return { ...store, cart: [] };
    
    // Acción para establecer el término de búsqueda actual
    case "SET_SEARCH_TERM":
      console.log("🔍 Estableciendo término de búsqueda:", action.payload);
      return { 
        ...store, 
        searchTerm: action.payload,
        searchResults: [] // Limpia resultados anteriores
      };
    
    // Acción para establecer los resultados de búsqueda
    case "SET_SEARCH_RESULTS":
      console.log("📋 Estableciendo resultados de búsqueda:", action.payload);
      return { 
        ...store, 
        searchResults: action.payload,
        isSearching: false 
      };
    
    // Acción para controlar el estado de carga de búsqueda
    case "SET_SEARCHING":
      return { 
        ...store, 
        isSearching: action.payload 
      };
    
    // Acción para limpiar búsqueda y resetear estado
    case "CLEAR_SEARCH":
      console.log("🧹 Limpiando búsqueda");
      return { 
        ...store, 
        searchTerm: "",
        searchResults: [],
        isSearching: false 
      };
    
    // Caso por defecto que retorna el estado sin cambios
    default:
      return store;
  }
}
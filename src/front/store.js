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
    cart: [] // Añadimos el array del carrito al estado inicial
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
    
    // Nuevas acciones para el carrito
    case "add_to_cart":
      // Comprobamos si el producto ya existe en el carrito
      const existingItem = store.cart.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Si existe, incrementamos la cantidad
        return { 
          ...store, 
          cart: store.cart.map(item => 
            item.id === action.payload.id 
              ? {...item, quantity: (item.quantity || 1) + 1} 
              : item
          )
        };
      } else {
        // Si no existe, lo añadimos al carrito
        return { 
          ...store, 
          cart: [...store.cart, {...action.payload, quantity: 1}]
        };
      }
    
    case "remove_from_cart":
      return { 
        ...store, 
        cart: store.cart.filter(item => item.id !== action.payload)
      };
    
    case "update_cart_quantity":
      return { 
        ...store, 
        cart: store.cart.map(item => 
          item.id === action.payload.id 
            ? {...item, quantity: action.payload.quantity} 
            : item
        )
      };
    
    case "clear_cart":
      return { ...store, cart: [] };
    
    default:
      throw Error('Unknown action.');
  }
}
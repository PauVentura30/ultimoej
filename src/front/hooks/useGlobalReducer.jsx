import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"  

// Contexto de React para compartir el estado global en toda la aplicación
const StoreContext = createContext()

// Componente proveedor que envuelve la aplicación con el estado global
export function StoreProvider({ children }) {
    // useReducer para manejar el estado global con el reducer y estado inicial
    const [store, dispatch] = useReducer(storeReducer, initialStore())
    
    // Proporciona el store y dispatch a todos los componentes hijos
    return <StoreContext.Provider value={{ store, dispatch }}>
        {children}
    </StoreContext.Provider>
}

// Hook personalizado para acceder al estado global desde cualquier componente
export default function useGlobalReducer() {
    // Extrae dispatch y store del contexto
    const { dispatch, store } = useContext(StoreContext)
    
    // Retorna ambas funciones para uso en componentes
    return { dispatch, store };
}
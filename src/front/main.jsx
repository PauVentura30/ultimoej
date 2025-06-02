import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StoreProvider } from './hooks/useGlobalReducer';
import { BackendURL } from './components/BackendURL';

// Componente principal que configura toda la aplicación
const Main = () => {
    
    // Verificación de la variable de entorno BACKEND_URL
    if(! import.meta.env.VITE_BACKEND_URL ||  import.meta.env.VITE_BACKEND_URL == "") return (
        <React.StrictMode>
            {/* Muestra componente de configuración si falta la URL del backend */}
            <BackendURL/ >
        </React.StrictMode>
        );
    
    return (
        <React.StrictMode>  
            {/* Proveedor de estado global para toda la aplicación */}
            <StoreProvider> 
                {/* Configuración del sistema de rutas de la aplicación */}
                <RouterProvider router={router}>
                </RouterProvider>
            </StoreProvider>
        </React.StrictMode>
    );
}

// Renderiza el componente Main en el elemento root del DOM
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
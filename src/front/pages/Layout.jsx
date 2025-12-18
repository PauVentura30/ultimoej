import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Login } from "../pages/Login"
import { ToastProvider } from "../context/ToastContext"

// Componente de layout base que mantiene navbar y footer en todas las páginas
export const Layout = () => {
    return (
        // Wrapper del sistema de notificaciones global
        <ToastProvider>
            {/* Wrapper con funcionalidad de scroll automático al cambiar de página */}
            <ScrollToTop>
                {/* Barra de navegación fija en la parte superior */}
                <Navbar />
                
                {/* Área de contenido dinámico donde se renderizan las páginas específicas */}
                <Outlet />
                
                {/* Footer fijo en la parte inferior */}
                <Footer />
            </ScrollToTop>
        </ToastProvider>
    )
}
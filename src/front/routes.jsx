// Configuración de todas las rutas de la aplicación React
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Login } from "./pages/Login"
import { Private } from "./pages/Private"
import { Register } from "./pages/Register"
import Productos from './pages/Productos.jsx';
import { ProductDetail } from './pages/ProductDetail.jsx'; // ← NUEVA IMPORTACIÓN
import { Ofertas } from './pages/Ofertas.jsx';
import { Contacto } from './pages/Contacto.jsx';
import { Cesta } from './pages/Cesta.jsx';
import TerminosCondiciones from './pages/TerminosCondiciones.jsx';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad.jsx';
import { Checkout } from './pages/Checkout.jsx';
import { CheckoutSuccess } from './pages/CheckoutSuccess.jsx';
import { CheckoutCancel } from './pages/CheckoutCancel.jsx';

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements permite crear rutas de forma declarativa
    // Layout es el componente padre que mantiene Navbar y Footer en todas las vistas
    // Las rutas hijas reemplazan el <Outlet> component en Layout
    // errorElement será la página por defecto cuando no se encuentra una ruta

    // Ruta raíz: todas las navegaciones parten de aquí
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Rutas principales de la aplicación */}
      <Route path="/" element={<Home />} />  {/* Página principal/home */}
      <Route path="/login" element={<Login />} />  {/* Página de inicio de sesión */}
      <Route path="/private" element={<Private />} />  {/* Página protegida */}
      <Route path="/single/:theId" element={<Single />} />  {/* Ruta dinámica con parámetro */}
      <Route path="/register" element={<Register />} />  {/* Página de registro de usuarios */}

      {/* Rutas del catálogo y tienda */}
      <Route path="/productos" element={<Productos />} />  {/* Catálogo de productos */}
      <Route path="/producto/:id" element={<ProductDetail />} />  {/* ← NUEVA RUTA: Detalle de producto */}
      <Route path="/ofertas" element={<Ofertas />} />  {/* Página de ofertas especiales */}
      <Route path="/contacto" element={<Contacto />} />  {/* Formulario de contacto */}
      <Route path="/cesta" element={<Cesta />} />  {/* Carrito de compras */}

      {/* Rutas legales */}
      <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />  {/* Términos y condiciones */}
      <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />  {/* Política de privacidad */}

      {/* Rutas del proceso de pago con Stripe */}
      <Route path="/checkout" element={<Checkout />} />  {/* Página de checkout/pago */}
      <Route path="/checkout/success" element={<CheckoutSuccess />} />  {/* Pago exitoso */}
      <Route path="/checkout/cancel" element={<CheckoutCancel />} />  {/* Pago cancelado */}

    </Route>
  )
);
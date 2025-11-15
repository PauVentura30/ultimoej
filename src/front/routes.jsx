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
import ProductosPage from './pages/ProductosPage.jsx';
import { ProductDetail } from './pages/ProductDetail.jsx';
import { Contacto } from './pages/Contacto.jsx';
import { Cesta } from './pages/Cesta.jsx';
import TerminosCondiciones from './pages/TerminosCondiciones.jsx';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad.jsx';
import { Checkout } from './pages/Checkout.jsx';
import { CheckoutSuccess } from './pages/CheckoutSuccess.jsx';
import { CheckoutCancel } from './pages/CheckoutCancel.jsx';
import { Devoluciones } from './pages/Devoluciones.jsx';

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements permite crear rutas de forma declarativa
    // Layout es el componente padre que mantiene Navbar y Footer en todas las vistas
    // Las rutas hijas reemplazan el <Outlet> component en Layout
    // errorElement será la página por defecto cuando no se encuentra una ruta

    // Ruta raíz: todas las navegaciones parten de aquí
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Rutas principales de la aplicación */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/private" element={<Private />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas del catálogo y tienda */}
      <Route path="/productos" element={<ProductosPage />} />
      <Route path="/producto/:id" element={<ProductDetail />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/cesta" element={<Cesta />} />

      {/* Rutas legales */}
      <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
      <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
      <Route path="/devoluciones" element={<Devoluciones />} />

      {/* Rutas del proceso de pago con Stripe */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout/success" element={<CheckoutSuccess />} />
      <Route path="/checkout/cancel" element={<CheckoutCancel />} />

    </Route>
  )
);
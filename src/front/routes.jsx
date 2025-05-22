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
import { Productos } from './pages/Productos.jsx';
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
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path= "/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<Private />} />
        <Route path="/single/:theId" element={ <Single />} />  
        <Route path="/register" element={<Register />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/cesta" element={<Cesta />} /> 
        <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
      </Route>
    )
);
// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Login } from "./pages/Login"
import { Private } from "./pages/Private"
import { Register } from "./pages/Register"
import { Productos } from './pages/Productos.jsx';
import { Categorias } from './pages/Categorias.jsx';
import { Ofertas } from './pages/Ofertas.jsx';
import { Contacto } from './pages/Contacto.jsx';
import { ShoppingCart } from './components/ShoppingCart.jsx';

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path= "/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<Private />} />
        <Route path="/single/:theId" element={ <Single />} />  
        <Route path="/demo" element={<Demo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/cesta" element={<ShoppingCart />} />
      </Route>
    )
);
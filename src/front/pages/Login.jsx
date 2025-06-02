import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Login = () => {
   // Estados para manejar el formulario y su estado
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   
   // Hooks para navegación y dispatch de acciones
   const navigate = useNavigate()
   const { dispatch } = useGlobalReducer()
   
   // URL del backend desde variables de entorno
   const backendUrl = import.meta.env.VITE_BACKEND_URL

   // Función principal para manejar el envío del formulario de login
   const handleSubmit = async(e) => {
       e.preventDefault()
       setLoading(true)
       setError("")
       
       try {
           const response = await login(email, password)
           
           // Validación de respuesta del servidor
           if (!response.ok) {
               const errorData = await response.json().catch(() => ({}))
               throw new Error(errorData.message || `Error HTTP: ${response.status}`)
           }
           
           const data = await response.json()
           console.log('Login exitoso:', data)
           
           // Manejo de datos de usuario existentes vs nuevos
           const existingUserData = localStorage.getItem('user_data');
           let userData = null;
           
           if (existingUserData) {
               // Mantener datos del registro y actualizar email
               userData = JSON.parse(existingUserData);
               userData.email = data.user;
               console.log('Datos existentes encontrados:', userData);
           } else {
               // Crear objeto básico de usuario si no existe
               userData = {
                   email: data.user,
                   name: null,
                   lastName: null,
                   phone: null,
                   birthDate: null,
                   avatar: null
               };
               console.log('Creando datos básicos:', userData);
           }
           
           // Guardar token y datos en localStorage y estado global
           if (data.access_token) {
               localStorage.setItem('auth_token', data.access_token);
               localStorage.setItem('user_data', JSON.stringify(userData));
               
               // Actualizar el store global con datos completos
               dispatch({ 
                   type: "login", 
                   payload: { 
                       token: data.access_token, 
                       user: userData
                   }
               });
               
               console.log('Datos completos guardados en store:', userData);
           }
           
           // Redirección al área privada tras login exitoso
           navigate("/private")
           
       } catch (error) {
           console.error("Error en el login", error)
           
           // Manejo de diferentes tipos de errores con mensajes específicos
           if (error.message.includes('Failed to fetch')) {
               setError('No se puede conectar al servidor. Verifica que el backend esté ejecutándose.')
           } else if (error.message.includes('ERR_CONNECTION_REFUSED')) {
               setError('El servidor no está disponible. Asegúrate de que tu backend esté corriendo.')
           } else if (error.message.includes('401')) {
               setError('Email o contraseña incorrectos.')
           } else if (error.message.includes('404')) {
               setError('Endpoint no encontrado. Verifica que la ruta /api/login exista en el backend.')
           } else {
               setError(error.message || 'Error inesperado durante el inicio de sesión')
           }
       } finally {
           setLoading(false)
       }
   }

   // Función auxiliar para realizar la petición de login al backend
   const login = async(email, password) => {
       const url = `${backendUrl}/api/login`
       
       const response = await fetch(url, {
           method: "POST",
           headers: { 
               "Content-Type": "application/json",
               "Accept": "application/json"
           },
           body: JSON.stringify({ email, password })
       })
       return response
   }

   return (
       <div className="bg-light py-5">
           <div className="container">
               <div className="row justify-content-center">
                   <div className="col-md-6 col-lg-5">
                       <div className="card border-0 shadow-lg rounded-3">
                           <div className="card-body p-5">
                               {/* Logo de la empresa */}
                               <div className="text-center mb-4">
                                   <img 
                                       src="/img/logo-zapatillas.png"
                                       alt="BambasSop Logo" 
                                       className="img-fluid" 
                                       style={{ maxHeight: "120px" }} 
                                   />
                               </div>
                               
                               {/* Título del formulario */}
                               <h2 className="card-title text-center fw-bold mb-4">Iniciar sesión</h2>
                               
                               {/* Alert de errores condicional */}
                               {error && (
                                   <div className="alert alert-danger">
                                       <i className="bi bi-exclamation-triangle me-2"></i>
                                       {error}
                                   </div>
                               )}
                               
                               {/* Formulario de login */}
                               <form onSubmit={handleSubmit}>
                                   {/* Campo de email con icono */}
                                   <div className="mb-4">
                                       <label htmlFor="login-email" className="form-label small fw-bold">Email</label>
                                       <div className="input-group">
                                           <span className="input-group-text bg-light border-end-0">
                                               <i className="bi bi-envelope"></i>
                                           </span>
                                           <input
                                               type="email"
                                               id="login-email"
                                               className="form-control bg-light border-start-0"
                                               placeholder="correo@ejemplo.com"
                                               value={email}
                                               onChange={(e) => setEmail(e.target.value)}
                                               required
                                               disabled={loading}
                                           />
                                       </div>
                                   </div>
                                   
                                   {/* Campo de contraseña con enlace de recuperación */}
                                   <div className="mb-4">
                                       <div className="d-flex justify-content-between">
                                           <label htmlFor="login-password" className="form-label small fw-bold">Contraseña</label>
                                           <a href="#" className="text-decoration-none small text-dark">¿Olvidaste tu contraseña?</a>
                                       </div>
                                       <div className="input-group">
                                           <span className="input-group-text bg-light border-end-0">
                                               <i className="bi bi-lock"></i>
                                           </span>
                                           <input
                                               type="password"
                                               id="login-password"
                                               className="form-control bg-light border-start-0"
                                               placeholder="Introduce tu contraseña"
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                               required
                                               disabled={loading}
                                           />
                                       </div>
                                   </div>
                                   
                                   {/* Checkbox para recordar sesión */}
                                   <div className="mb-4 form-check">
                                       <input type="checkbox" className="form-check-input" id="remember-me" />
                                       <label className="form-check-label small" htmlFor="remember-me">
                                           Mantener sesión iniciada
                                       </label>
                                   </div>
                                   
                                   {/* Botón de envío con spinner de carga */}
                                   <div className="d-grid gap-2 mt-4">
                                       <button
                                           type="submit"
                                           className="btn btn-dark btn-lg py-2 fw-bold"
                                           disabled={loading}
                                       >
                                           {loading ? (
                                               <>
                                                   <span className="spinner-border spinner-border-sm me-2"></span>
                                                   Iniciando sesión...
                                               </>
                                           ) : (
                                               'Iniciar sesión'
                                           )}
                                       </button>
                                   </div>
                                   
                                   {/* Enlace para registro de nuevos usuarios */}
                                   <div className="text-center mt-4">
                                       <p className="small text-muted">
                                           ¿No tienes cuenta? <a href="/register" className="text-decoration-none fw-bold text-dark">Regístrate</a>
                                       </p>
                                   </div>
                               </form>
                           </div>
                       </div>
                       
                       {/* Enlaces legales en el footer del formulario */}
                       <div className="text-center mt-4">
                           <p className="small text-muted">
                               Al iniciar sesión, aceptas nuestros <a href="#" className="text-decoration-none text-dark">Términos y condiciones</a> y <a href="#" className="text-decoration-none text-dark">Política de privacidad</a>.
                           </p>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   );
}

export default Login;
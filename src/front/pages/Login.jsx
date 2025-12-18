import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Login = () => {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   
   const navigate = useNavigate()
   const { dispatch } = useGlobalReducer()
   
   const backendUrl = import.meta.env.VITE_BACKEND_URL

   const handleSubmit = async(e) => {
       e.preventDefault()
       setLoading(true)
       setError("")
       
       try {
           const response = await login(email, password)
           
           if (!response.ok) {
               const errorData = await response.json().catch(() => ({}))
               throw new Error(errorData.message || `Error HTTP: ${response.status}`)
           }
           
           const data = await response.json()
           console.log('Login exitoso:', data)
           
           const existingUserData = localStorage.getItem('user_data');
           let userData = null;
           
           if (existingUserData) {
               userData = JSON.parse(existingUserData);
               userData.email = data.user;
               console.log('Datos existentes encontrados:', userData);
           } else {
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
           
           if (data.access_token) {
               localStorage.setItem('auth_token', data.access_token);
               localStorage.setItem('user_data', JSON.stringify(userData));
               
               dispatch({ 
                   type: "login", 
                   payload: { 
                       token: data.access_token, 
                       user: userData
                   }
               });
               
               console.log('Datos completos guardados en store:', userData);
           }
           
           navigate("/private")
           
       } catch (error) {
           console.error("Error en el login", error)
           
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
       <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)' }}>
           <div className="container">
               <div className="row justify-content-center">
                   <div className="col-md-6 col-lg-5">
                       <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                           <div className="card-body p-5">
                               {/* Título estilo Nike */}
                               <div className="text-center mb-5">
                                   <h1 style={{ 
                                       fontFamily: "'Bebas Neue', sans-serif",
                                       fontSize: '3.5rem',
                                       fontWeight: '400',
                                       letterSpacing: '2px',
                                       color: '#000',
                                       marginBottom: '0.5rem'
                                   }}>
                                       INICIAR SESIÓN
                                   </h1>
                               </div>
                               
                               {error && (
                                   <div className="alert alert-danger border-0 mb-4" style={{ borderRadius: '8px', background: '#FEE', color: '#c00' }}>
                                       <i className="bi bi-exclamation-triangle me-2"></i>
                                       <strong>Error:</strong> {error}
                                   </div>
                               )}
                               
                               <form onSubmit={handleSubmit}>
                                   <div className="mb-4">
                                       <label htmlFor="login-email" className="form-label" style={{ 
                                           fontWeight: '700',
                                           fontSize: '0.8rem',
                                           textTransform: 'uppercase',
                                           letterSpacing: '0.5px',
                                           color: '#000'
                                       }}>
                                           Email
                                       </label>
                                       <input
                                           type="email"
                                           id="login-email"
                                           className="form-control form-control-lg"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           required
                                           disabled={loading}
                                           style={{
                                               border: '2px solid #e5e5e5',
                                               borderRadius: '8px',
                                               padding: '0.75rem 1rem',
                                               fontSize: '1rem',
                                               transition: 'all 0.3s ease'
                                           }}
                                           onFocus={(e) => {
                                               e.target.style.borderColor = '#000';
                                               e.target.style.boxShadow = '0 0 0 3px rgba(0, 0, 0, 0.1)';
                                           }}
                                           onBlur={(e) => {
                                               e.target.style.borderColor = '#e5e5e5';
                                               e.target.style.boxShadow = 'none';
                                           }}
                                       />
                                   </div>
                                   
                                   <div className="mb-4">
                                       <div className="d-flex justify-content-between align-items-center mb-2">
                                           <label htmlFor="login-password" className="form-label mb-0" style={{ 
                                               fontWeight: '700',
                                               fontSize: '0.8rem',
                                               textTransform: 'uppercase',
                                               letterSpacing: '0.5px',
                                               color: '#000'
                                           }}>
                                               Contraseña
                                           </label>
                                           <a href="#" className="text-decoration-none" style={{ 
                                               fontSize: '0.85rem',
                                               color: '#6b6b6b',
                                               fontWeight: '600'
                                           }}>
                                               ¿Olvidaste tu contraseña?
                                           </a>
                                       </div>
                                       <input
                                           type="password"
                                           id="login-password"
                                           className="form-control form-control-lg"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                           required
                                           disabled={loading}
                                           style={{
                                               border: '2px solid #e5e5e5',
                                               borderRadius: '8px',
                                               padding: '0.75rem 1rem',
                                               fontSize: '1rem',
                                               transition: 'all 0.3s ease'
                                           }}
                                           onFocus={(e) => {
                                               e.target.style.borderColor = '#000';
                                               e.target.style.boxShadow = '0 0 0 3px rgba(0, 0, 0, 0.1)';
                                           }}
                                           onBlur={(e) => {
                                               e.target.style.borderColor = '#e5e5e5';
                                               e.target.style.boxShadow = 'none';
                                           }}
                                       />
                                   </div>
                                   
                                   <div className="mb-4 form-check">
                                       <input type="checkbox" className="form-check-input" id="remember-me" style={{ cursor: 'pointer' }} />
                                       <label className="form-check-label" htmlFor="remember-me" style={{ 
                                           fontSize: '0.9rem',
                                           color: '#6b6b6b',
                                           fontWeight: '500',
                                           cursor: 'pointer'
                                       }}>
                                           Mantener sesión iniciada
                                       </label>
                                   </div>
                                   
                                   <div className="d-grid gap-2 mt-4">
                                       <button
                                           type="submit"
                                           className="btn btn-lg"
                                           disabled={loading}
                                           style={{
                                               background: '#000',
                                               color: '#fff',
                                               border: 'none',
                                               borderRadius: '50px',
                                               padding: '0.9rem 2rem',
                                               fontWeight: '700',
                                               fontSize: '0.95rem',
                                               textTransform: 'uppercase',
                                               letterSpacing: '1.5px',
                                               transition: 'all 0.3s ease',
                                               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                           }}
                                           onMouseEnter={(e) => {
                                               e.target.style.background = '#333';
                                               e.target.style.transform = 'translateY(-2px)';
                                               e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
                                           }}
                                           onMouseLeave={(e) => {
                                               e.target.style.background = '#000';
                                               e.target.style.transform = 'translateY(0)';
                                               e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                                           }}
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
                                   
                                   <div className="text-center mt-4">
                                       <p style={{ fontSize: '0.9rem', color: '#6b6b6b', fontWeight: '500' }}>
                                           ¿No tienes cuenta?{' '}
                                           <a href="/register" className="text-decoration-none" style={{ 
                                               color: '#000',
                                               fontWeight: '700'
                                           }}>
                                               Regístrate
                                           </a>
                                       </p>
                                   </div>
                               </form>
                           </div>
                       </div>
                       
                       <div className="text-center mt-4">
                           <p style={{ fontSize: '0.8rem', color: '#8e8e8e' }}>
                               Al iniciar sesión, aceptas nuestros{' '}
                               <a href="/terminos-condiciones" className="text-decoration-none" style={{ color: '#6b6b6b', fontWeight: '600' }}>
                                   Términos y condiciones
                               </a>
                               {' '}y{' '}
                               <a href="/politica-privacidad" className="text-decoration-none" style={{ color: '#6b6b6b', fontWeight: '600' }}>
                                   Política de privacidad
                               </a>.
                           </p>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   );
}

export default Login;
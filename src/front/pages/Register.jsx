import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Register = () => {
   const [formData, setFormData] = useState({
       name: "",
       lastName: "",
       email: "",
       phone: "",
       birthDate: "",
       password: "",
       confirmPassword: ""
   })
   
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   
   const navigate = useNavigate()
   const { dispatch } = useGlobalReducer()
   
   const backendUrl = import.meta.env.VITE_BACKEND_URL
   
   const handleSubmit = async(e) => {
       e.preventDefault()
       setLoading(true)
       setError("")
       
       if (formData.password !== formData.confirmPassword) {
           setError('Las contraseñas no coinciden')
           setLoading(false)
           return
       }
       
       if (formData.password.length < 6) {
           setError('La contraseña debe tener al menos 6 caracteres')
           setLoading(false)
           return
       }
       
       try {
           const response = await signup(formData)
           if (!response.ok){
               const errorData = await response.json().catch(() => ({}))
               throw new Error(errorData.message || `Error HTTP: ${response.status}`)
           }
           const data = await response.json()
           console.log('Usuario registrado:', data)
           
           const userData = {
               name: formData.name,
               lastName: formData.lastName,
               email: formData.email,
               phone: formData.phone,
               birthDate: formData.birthDate,
               avatar: null
           };
           
           console.log('Guardando datos completos en localStorage:', userData);
           localStorage.setItem('user_data', JSON.stringify(userData));
           
           dispatch({ 
               type: "signup_access", 
               payload: { user: userData }
           });
           
           console.log('Datos guardados exitosamente');
           
           navigate("/login")
           
       } catch (error) {
           console.error("Error en el registro", error)
           
           if (error.message.includes('Failed to fetch')) {
               setError('No se puede conectar al servidor. Verifica que el backend esté ejecutándose.')
           } else if (error.message.includes('ERR_CONNECTION_REFUSED')) {
               setError('El servidor no está disponible. Asegúrate de que tu backend esté corriendo.')
           } else {
               setError(error.message || 'Error inesperado durante el registro')
           }
       } finally {
           setLoading(false)
       }
   } 
   
   const signup = async(userData) => {
       const url = `${backendUrl}/api/signup`
       
       const response = await fetch(url, {
           method: "POST",
           headers: { 
               "Content-Type": "application/json",
               "Accept": "application/json"
           },
           body: JSON.stringify({
               name: userData.name,
               lastName: userData.lastName,
               email: userData.email,
               phone: userData.phone,
               birthDate: userData.birthDate,
               password: userData.password
           })
       })
       return response
   }
   
   const handleChange = (e) => {
       setFormData({
           ...formData,
           [e.target.name]: e.target.value
       })
   }

   const inputStyle = {
       border: '2px solid #e5e5e5',
       borderRadius: '8px',
       padding: '0.75rem 1rem',
       fontSize: '0.95rem',
       transition: 'all 0.3s ease'
   };

   return (
       <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)', padding: '3rem 0' }}>
           <div className="container">
               <div className="row justify-content-center">
                   <div className="col-md-8 col-lg-7">
                       <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                           <div className="card-body p-5">
                               <div className="text-center mb-5">
                                   <h1 style={{ 
                                       fontFamily: "'Bebas Neue', sans-serif",
                                       fontSize: '3.5rem',
                                       fontWeight: '400',
                                       letterSpacing: '2px',
                                       color: '#000',
                                       marginBottom: '0.5rem'
                                   }}>
                                       CREAR CUENTA
                                   </h1>
                                   <p className="text-muted" style={{ fontWeight: '500', fontSize: '0.95rem' }}>
                                       Únete a la familia BambasShop
                                   </p>
                               </div>
                               
                               {error && (
                                   <div className="alert alert-danger border-0 mb-4" style={{ borderRadius: '8px', background: '#FEE', color: '#c00' }}>
                                       <i className="bi bi-exclamation-triangle me-2"></i>
                                       <strong>Error:</strong> {error}
                                   </div>
                               )}
                               
                               <form onSubmit={handleSubmit}>
                                   <div className="row mb-3">
                                       <div className="col-md-6 mb-3 mb-md-0">
                                           <label htmlFor="name" className="form-label" style={{ 
                                               fontWeight: '700',
                                               fontSize: '0.8rem',
                                               textTransform: 'uppercase',
                                               letterSpacing: '0.5px',
                                               color: '#000'
                                           }}>Nombre</label>
                                           <input
                                               type="text"
                                               id="name"
                                               name="name"
                                               className="form-control"
                                               value={formData.name}
                                               onChange={handleChange}
                                               required
                                               disabled={loading}
                                               style={inputStyle}
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
                                       <div className="col-md-6">
                                           <label htmlFor="lastName" className="form-label" style={{ 
                                               fontWeight: '700',
                                               fontSize: '0.8rem',
                                               textTransform: 'uppercase',
                                               letterSpacing: '0.5px',
                                               color: '#000'
                                           }}>Apellidos</label>
                                           <input
                                               type="text"
                                               id="lastName"
                                               name="lastName"
                                               className="form-control"
                                               value={formData.lastName}
                                               onChange={handleChange}
                                               required
                                               disabled={loading}
                                               style={inputStyle}
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
                                   </div>

                                   <div className="mb-3">
                                       <label htmlFor="email" className="form-label" style={{ 
                                           fontWeight: '700',
                                           fontSize: '0.8rem',
                                           textTransform: 'uppercase',
                                           letterSpacing: '0.5px',
                                           color: '#000'
                                       }}>Email</label>
                                       <input
                                           type="email"
                                           id="email"
                                           name="email"
                                           className="form-control"
                                           value={formData.email}
                                           onChange={handleChange}
                                           required
                                           disabled={loading}
                                           style={inputStyle}
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

                                   <div className="row mb-3">
                                       <div className="col-md-6 mb-3 mb-md-0">
                                           <label htmlFor="phone" className="form-label" style={{ 
                                               fontWeight: '700',
                                               fontSize: '0.8rem',
                                               textTransform: 'uppercase',
                                               letterSpacing: '0.5px',
                                               color: '#000'
                                           }}>Teléfono</label>
                                           <input
                                               type="tel"
                                               id="phone"
                                               name="phone"
                                               className="form-control"
                                               value={formData.phone}
                                               onChange={handleChange}
                                               disabled={loading}
                                               style={inputStyle}
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
                                       <div className="col-md-6">
                                           <label htmlFor="birthDate" className="form-label" style={{ 
                                               fontWeight: '700',
                                               fontSize: '0.8rem',
                                               textTransform: 'uppercase',
                                               letterSpacing: '0.5px',
                                               color: '#000'
                                           }}>Fecha de nacimiento</label>
                                           <input
                                               type="date"
                                               id="birthDate"
                                               name="birthDate"
                                               className="form-control"
                                               value={formData.birthDate}
                                               onChange={handleChange}
                                               disabled={loading}
                                               style={inputStyle}
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
                                   </div>

                                   <div className="row mb-3">
                                       <div className="col-md-6 mb-3 mb-md-0">
                                           <label htmlFor="password" className="form-label" style={{ 
                                               fontWeight: '700',
                                               fontSize: '0.8rem',
                                               textTransform: 'uppercase',
                                               letterSpacing: '0.5px',
                                               color: '#000'
                                           }}>Contraseña</label>
                                           <input
                                               type="password"
                                               id="password"
                                               name="password"
                                               className="form-control"
                                               value={formData.password}
                                               onChange={handleChange}
                                               required
                                               disabled={loading}
                                               minLength="6"
                                               style={inputStyle}
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
                                       <div className="col-md-6">
                                           <label htmlFor="confirmPassword" className="form-label" style={{ 
                                               fontWeight: '700',
                                               fontSize: '0.8rem',
                                               textTransform: 'uppercase',
                                               letterSpacing: '0.5px',
                                               color: '#000'
                                           }}>Confirmar contraseña</label>
                                           <input
                                               type="password"
                                               id="confirmPassword"
                                               name="confirmPassword"
                                               className="form-control"
                                               value={formData.confirmPassword}
                                               onChange={handleChange}
                                               required
                                               disabled={loading}
                                               minLength="6"
                                               style={inputStyle}
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
                                   </div>
                                   
                                   <div className="d-grid gap-2 mt-5">
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
                                                   Registrando...
                                               </>
                                           ) : (
                                               'Registrarse'
                                           )}
                                       </button>
                                   </div>
                                   
                                   <div className="text-center mt-4">
                                       <p style={{ fontSize: '0.9rem', color: '#6b6b6b', fontWeight: '500' }}>
                                           ¿Ya tienes cuenta?{' '}
                                           <a href="/login" className="text-decoration-none" style={{ 
                                               color: '#000',
                                               fontWeight: '700'
                                           }}>
                                               Iniciar sesión
                                           </a>
                                       </p>
                                   </div>
                               </form>
                           </div>
                       </div>
                       
                       <div className="text-center mt-4">
                           <p style={{ fontSize: '0.8rem', color: '#8e8e8e' }}>
                               Al registrarte, aceptas nuestros{' '}
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
};

export default Register;
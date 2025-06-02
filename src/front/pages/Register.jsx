import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Register = () => {
   // Estado para manejar todos los campos del formulario de registro
   const [formData, setFormData] = useState({
       name: "",
       lastName: "",
       email: "",
       phone: "",
       birthDate: "",
       password: "",
       confirmPassword: ""
   })
   
   // Estados para controlar la interfaz y errores
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   
   // Hooks para navegación y dispatch de acciones
   const navigate = useNavigate()
   const { dispatch } = useGlobalReducer()
   
   // URL del backend desde variables de entorno
   const backendUrl = import.meta.env.VITE_BACKEND_URL
   
   // Función principal para manejar el envío del formulario de registro
   const handleSubmit = async(e) => {
       e.preventDefault()
       setLoading(true)
       setError("")
       
       // Validación de coincidencia de contraseñas
       if (formData.password !== formData.confirmPassword) {
           setError('Las contraseñas no coinciden')
           setLoading(false)
           return
       }
       
       // Validación de longitud mínima de contraseña
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
           
           // Crear objeto completo de datos del usuario para localStorage
           const userData = {
               name: formData.name,
               lastName: formData.lastName,
               email: formData.email,
               phone: formData.phone,
               birthDate: formData.birthDate,
               avatar: null // Sin avatar inicial
           };
           
           console.log('Guardando datos completos en localStorage:', userData);
           localStorage.setItem('user_data', JSON.stringify(userData));
           
           // Actualizar el estado global con los datos del usuario
           dispatch({ 
               type: "signup_access", 
               payload: { user: userData }
           });
           
           console.log('Datos guardados exitosamente');
           
           // Redirección al login tras registro exitoso
           navigate("/login")
           
       } catch (error) {
           console.error("Error en el registro", error)
           
           // Manejo de diferentes tipos de errores con mensajes específicos
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
   
   // Función auxiliar para realizar la petición de registro al backend
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
   
   // Función para manejar cambios en cualquier campo del formulario
   const handleChange = (e) => {
       setFormData({
           ...formData,
           [e.target.name]: e.target.value
       })
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
                               <h2 className="card-title text-center fw-bold mb-4">Crear una cuenta</h2>
                               
                               {/* Alert de errores condicional */}
                               {error && (
                                   <div className="alert alert-danger">
                                       <i className="bi bi-exclamation-triangle me-2"></i>
                                       {error}
                                   </div>
                               )}
                               
                               {/* Formulario de registro completo */}
                               <form onSubmit={handleSubmit}>
                                   {/* Campos de nombre y apellidos */}
                                   <div className="row mb-3">
                                       <div className="col-md-6">
                                           <label htmlFor="name" className="form-label small fw-bold">Nombre</label>
                                           <div className="input-group">
                                               <span className="input-group-text bg-light border-end-0">
                                                   <i className="bi bi-person"></i>
                                               </span>
                                               <input
                                                   type="text"
                                                   id="name"
                                                   name="name"
                                                   className="form-control bg-light border-start-0"
                                                   placeholder="Tu nombre"
                                                   value={formData.name}
                                                   onChange={handleChange}
                                                   required
                                                   disabled={loading}
                                               />
                                           </div>
                                       </div>
                                       <div className="col-md-6">
                                           <label htmlFor="lastName" className="form-label small fw-bold">Apellidos</label>
                                           <div className="input-group">
                                               <span className="input-group-text bg-light border-end-0">
                                                   <i className="bi bi-person"></i>
                                               </span>
                                               <input
                                                   type="text"
                                                   id="lastName"
                                                   name="lastName"
                                                   className="form-control bg-light border-start-0"
                                                   placeholder="Tus apellidos"
                                                   value={formData.lastName}
                                                   onChange={handleChange}
                                                   required
                                                   disabled={loading}
                                               />
                                           </div>
                                       </div>
                                   </div>

                                   {/* Campo de email */}
                                   <div className="mb-3">
                                       <label htmlFor="email" className="form-label small fw-bold">Email</label>
                                       <div className="input-group">
                                           <span className="input-group-text bg-light border-end-0">
                                               <i className="bi bi-envelope"></i>
                                           </span>
                                           <input
                                               type="email"
                                               id="email"
                                               name="email"
                                               className="form-control bg-light border-start-0"
                                               placeholder="correo@ejemplo.com"
                                               value={formData.email}
                                               onChange={handleChange}
                                               required
                                               disabled={loading}
                                           />
                                       </div>
                                   </div>

                                   {/* Campos de teléfono y fecha de nacimiento */}
                                   <div className="row mb-3">
                                       <div className="col-md-6">
                                           <label htmlFor="phone" className="form-label small fw-bold">Teléfono</label>
                                           <div className="input-group">
                                               <span className="input-group-text bg-light border-end-0">
                                                   <i className="bi bi-telephone"></i>
                                               </span>
                                               <input
                                                   type="tel"
                                                   id="phone"
                                                   name="phone"
                                                   className="form-control bg-light border-start-0"
                                                   placeholder="+34 123 456 789"
                                                   value={formData.phone}
                                                   onChange={handleChange}
                                                   disabled={loading}
                                               />
                                           </div>
                                       </div>
                                       <div className="col-md-6">
                                           <label htmlFor="birthDate" className="form-label small fw-bold">Fecha de nacimiento</label>
                                           <div className="input-group">
                                               <span className="input-group-text bg-light border-end-0">
                                                   <i className="bi bi-calendar"></i>
                                               </span>
                                               <input
                                                   type="date"
                                                   id="birthDate"
                                                   name="birthDate"
                                                   className="form-control bg-light border-start-0"
                                                   value={formData.birthDate}
                                                   onChange={handleChange}
                                                   disabled={loading}
                                               />
                                           </div>
                                       </div>
                                   </div>

                                   {/* Campos de contraseña y confirmación */}
                                   <div className="row mb-3">
                                       <div className="col-md-6">
                                           <label htmlFor="password" className="form-label small fw-bold">Contraseña</label>
                                           <div className="input-group">
                                               <span className="input-group-text bg-light border-end-0">
                                                   <i className="bi bi-lock"></i>
                                               </span>
                                               <input
                                                   type="password"
                                                   id="password"
                                                   name="password"
                                                   className="form-control bg-light border-start-0"
                                                   placeholder="Mínimo 6 caracteres"
                                                   value={formData.password}
                                                   onChange={handleChange}
                                                   required
                                                   disabled={loading}
                                                   minLength="6"
                                               />
                                           </div>
                                       </div>
                                       <div className="col-md-6">
                                           <label htmlFor="confirmPassword" className="form-label small fw-bold">Confirmar contraseña</label>
                                           <div className="input-group">
                                               <span className="input-group-text bg-light border-end-0">
                                                   <i className="bi bi-lock"></i>
                                               </span>
                                               <input
                                                   type="password"
                                                   id="confirmPassword"
                                                   name="confirmPassword"
                                                   className="form-control bg-light border-start-0"
                                                   placeholder="Repite tu contraseña"
                                                   value={formData.confirmPassword}
                                                   onChange={handleChange}
                                                   required
                                                   disabled={loading}
                                                   minLength="6"
                                               />
                                           </div>
                                       </div>
                                   </div>
                                   
                                   {/* Botón de envío con spinner de carga */}
                                   <div className="d-grid gap-2 mt-5">
                                       <button
                                           type="submit"
                                           className="btn btn-dark btn-lg py-2 fw-bold"
                                           disabled={loading}
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
                                   
                                   {/* Enlace para usuarios existentes */}
                                   <div className="text-center mt-4">
                                       <p className="small text-muted">
                                           ¿Ya tienes cuenta? <a href="/login" className="text-decoration-none fw-bold text-dark">Iniciar sesión</a>
                                       </p>
                                   </div>
                               </form>
                           </div>
                       </div>
                       
                       {/* Enlaces legales en el footer del formulario */}
                       <div className="text-center mt-4">
                           <p className="small text-muted">
                               Al registrarte, aceptas nuestros <a href="#" className="text-decoration-none text-dark">Términos y condiciones</a> y <a href="#" className="text-decoration-none text-dark">Política de privacidad</a>.
                           </p>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   );
};

export default Register;
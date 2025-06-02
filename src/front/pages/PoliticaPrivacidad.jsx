import React from 'react';

const PoliticaPrivacidad = () => {
 return (
   <div className="container py-5">
     <div className="row justify-content-center">
       <div className="col-lg-8">
         
         {/* Header */}
         <div className="text-center mb-5">
           <h1 className="display-4 fw-bold">Política de Privacidad</h1>
           <p className="text-muted">Última actualización: 29 de mayo de 2025</p>
         </div>

         {/* Alerta importante */}
         <div className="alert alert-dark mb-4">
           <h5 className="alert-heading">
             <i className="bi bi-shield-check me-2"></i>
             Su Privacidad es Importante
           </h5>
           <p className="mb-0">
             En BambasSop, respetamos y protegemos su privacidad. Esta política explica cómo 
             recopilamos, utilizamos y protegemos su información personal.
           </p>
         </div>

         {/* Contenido principal */}
         <div className="card shadow-sm mb-4">
           <div className="card-body p-4">
             
             <h3 className="fw-bold mb-3">1. Información que Recopilamos</h3>
             <p className="text-muted mb-2">Recopilamos información que nos proporciona:</p>
             <ul className="text-muted mb-4">
               <li>Nombre completo y datos de contacto</li>
               <li>Dirección de entrega y facturación</li>
               <li>Información de pago (procesada de forma segura)</li>
               <li>Historial de compras y preferencias</li>
             </ul>
             
             <p className="text-muted mb-2">También recopilamos automáticamente:</p>
             <ul className="text-muted mb-4">
               <li>Dirección IP y datos de navegación</li>
               <li>Cookies para mejorar la experiencia</li>
               <li>Páginas visitadas y tiempo de permanencia</li>
             </ul>

             <h3 className="fw-bold mb-3">2. Cómo Utilizamos su Información</h3>
             <div className="row mb-4">
               <div className="col-md-6">
                 <h6 className="fw-bold">Usamos sus datos para:</h6>
                 <ul className="text-muted">
                   <li>Procesar y gestionar pedidos</li>
                   <li>Brindar atención al cliente</li>
                   <li>Mejorar nuestros productos</li>
                   <li>Personalizar su experiencia</li>
                 </ul>
               </div>
               <div className="col-md-6">
                 <h6 className="fw-bold">Comunicaciones:</h6>
                 <ul className="text-muted">
                   <li>Confirmaciones de pedidos</li>
                   <li>Notificaciones importantes</li>
                   <li>Ofertas especiales (opcional)</li>
                   <li>Actualizaciones de cuenta</li>
                 </ul>
               </div>
             </div>

             <h3 className="fw-bold mb-3">3. Cookies</h3>
             <p className="text-muted mb-4">
               Utilizamos cookies para mejorar su experiencia. Estas incluyen cookies esenciales para 
               el funcionamiento del sitio, cookies de análisis para entender su uso, y cookies de 
               marketing para personalizar ofertas (con su consentimiento).
             </p>

             <h3 className="fw-bold mb-3">4. Compartir Información</h3>
             <p className="text-muted mb-4">
               <strong>No vendemos sus datos.</strong> Solo compartimos información con:
             </p>
             <ul className="text-muted mb-4">
               <li>Proveedores de servicios esenciales (envío, pagos)</li>
               <li>Autoridades legales cuando sea requerido por ley</li>
               <li>Empresas de análisis (datos anonimizados)</li>
             </ul>

             <h3 className="fw-bold mb-3">5. Seguridad</h3>
             <p className="text-muted mb-4">
               Protegemos su información con cifrado SSL/TLS, servidores seguros, firewalls avanzados 
               y acceso limitado solo a empleados autorizados.
             </p>

             <h3 className="fw-bold mb-3">6. Sus Derechos</h3>
             <p className="text-muted mb-2">Usted tiene derecho a:</p>
             <ul className="text-muted mb-4">
               <li><strong>Acceder</strong> a sus datos personales</li>
               <li><strong>Corregir</strong> información inexacta</li>
               <li><strong>Eliminar</strong> sus datos personales</li>
               <li><strong>Descargar</strong> sus datos en formato portable</li>
               <li><strong>Retirar consentimiento</strong> en cualquier momento</li>
             </ul>

             <h3 className="fw-bold mb-3">7. Retención de Datos</h3>
             <p className="text-muted mb-4">
               Conservamos sus datos solo el tiempo necesario: datos de cuenta hasta que elimine su cuenta, 
               historial de compras por 7 años (obligaciones legales), y datos de navegación por 2 años.
             </p>

             <h3 className="fw-bold mb-3">8. Menores de Edad</h3>
             <p className="text-muted mb-4">
               Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos 
               intencionalmente información de menores de edad.
             </p>

             <h3 className="fw-bold mb-3">9. Cambios en esta Política</h3>
             <p className="text-muted mb-4">
               Podemos actualizar esta política ocasionalmente. Le notificaremos sobre cambios 
               significativos mediante aviso en el sitio web o por email.
             </p>

           </div>
         </div>

         {/* Información de contacto */}
         <div className="card border-dark shadow-sm mb-4">
           <div className="card-header bg-dark text-white">
             <h4 className="mb-0">
               <i className="bi bi-person-check me-2"></i>
               Contacto para Privacidad
             </h4>
           </div>
           <div className="card-body">
             <p className="text-muted mb-3">
               Si tiene preguntas sobre esta política o el tratamiento de sus datos:
             </p>
             <div className="row">
               <div className="col-md-6">
                 <h6 className="fw-bold">Email de Privacidad:</h6>
                 <p className="text-muted">privacidad@bambassop.com</p>
               </div>
               <div className="col-md-6">
                 <h6 className="fw-bold">Teléfono:</h6>
                 <p className="text-muted">+34 123 456 789</p>
               </div>
             </div>
             <div className="alert alert-info border-0 mt-3">
               <p className="mb-0">
                 <strong>Tiempo de Respuesta:</strong> Responderemos a sus consultas dentro de 30 días.
               </p>
             </div>
           </div>
         </div>

         {/* Botones de acción */}
         <div className="text-center">
           <div className="bg-light p-4 rounded">
             <p className="text-muted mb-3">
               <small>
                 <i className="bi bi-calendar3 me-1"></i>
                 Política efectiva desde el 29 de mayo de 2025
               </small>
             </p>
             <div className="d-flex justify-content-center gap-3 flex-wrap">
               <button 
                 className="btn btn-dark btn-sm"
                 onClick={() => window.print()}
               >
                 <i className="bi bi-printer me-1"></i>
                 Imprimir
               </button>
               <button 
                 className="btn btn-outline-dark btn-sm"
                 onClick={() => window.history.back()}
               >
                 <i className="bi bi-arrow-left me-1"></i>
                 Volver
               </button>
               <a 
                 href="/terminos-condiciones" 
                 className="btn btn-outline-dark btn-sm"
               >
                 <i className="bi bi-file-text me-1"></i>
                 Términos y Condiciones
               </a>
             </div>
           </div>
         </div>

       </div>
     </div>
   </div>
 );
};

export default PoliticaPrivacidad;
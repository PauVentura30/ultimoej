import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("perfil");
    
    // Solo mostrar pedidos si el usuario realmente tiene (por ahora vacío hasta que implemente backend)
    const [orders] = useState([]);

    useEffect(() => {
        console.log('Token:', store.token);
        console.log('User:', store.user);
        
        // Si no hay token en el store, verificar localStorage
        const savedToken = localStorage.getItem('auth_token');
        if (!store.token && savedToken) {
            // Cargar token desde localStorage al store
            dispatch({ 
                type: "load_from_storage", 
                payload: { token: savedToken }
            });
        } else if (!store.token && !savedToken) {
            // Si no hay token ni en store ni en localStorage, redirigir
            navigate("/login");
        }   
    }, [store.token, navigate, dispatch]);

    const handleLogout = () => {
        // Limpiar localStorage
        localStorage.removeItem('auth_token');
        // Limpiar el store
        dispatch({ type: "logout" });
        navigate("/login");
    };

    const renderContent = () => {
        switch (activeTab) {
            case "perfil":
                return (
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="row">
                                <div className="col-md-4 text-center mb-4">
                                    <div className="position-relative d-inline-block">
                                        <img 
                                            src="/api/placeholder/120/120" 
                                            alt="Avatar" 
                                            className="rounded-circle border border-3 border-light shadow"
                                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                        />
                                        <button className="btn btn-dark btn-sm rounded-circle position-absolute bottom-0 end-0">
                                            <i className="bi bi-camera"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <h4 className="fw-bold mb-3">Información Personal</h4>
                                    <p className="text-muted mb-4">Gestiona tu información personal y preferencias de cuenta.</p>
                                    
                                    <form>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">Nombre</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    value={store.user || "Usuario"}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">Apellidos</label>
                                                <input type="text" className="form-control" placeholder="Tus apellidos" />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold">Email</label>
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                value={store.user || "usuario@bambasshop.com"}
                                                readOnly
                                            />
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">Teléfono</label>
                                                <input type="tel" className="form-control" placeholder="+34 123 456 789" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">Fecha de nacimiento</label>
                                                <input type="date" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <button type="button" className="btn btn-dark">
                                                Guardar cambios
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "pedidos":
                return (
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h4 className="fw-bold mb-4">Mis Pedidos</h4>
                            <p className="text-muted mb-4">Revisa el estado de tus pedidos y descargas facturas.</p>
                            
                            {orders.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="bi bi-bag-x fs-1 text-muted mb-3"></i>
                                    <h5 className="text-muted">No tienes pedidos todavía</h5>
                                    <p className="text-muted">¡Empieza a comprar y encuentra tus zapatillas favoritas!</p>
                                    <button 
                                        className="btn btn-dark"
                                        onClick={() => navigate('/productos')}
                                    >
                                        Ver productos
                                    </button>
                                </div>
                            ) : (
                                <div className="row g-3">
                                    {orders.map((order, index) => (
                                        <div key={index} className="col-12">
                                            <div className="card border">
                                                <div className="card-body">
                                                    <div className="row align-items-center">
                                                        <div className="col-md-3">
                                                            <h6 className="mb-1 fw-bold">{order.id}</h6>
                                                            <small className="text-muted">{order.date}</small>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <span className={`badge ${
                                                                order.status === 'Entregado' ? 'bg-success' :
                                                                order.status === 'En tránsito' ? 'bg-warning' :
                                                                'bg-secondary'
                                                            }`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <h6 className="mb-0 fw-bold">${order.total}</h6>
                                                        </div>
                                                        <div className="col-md-3 text-end">
                                                            <button className="btn btn-outline-dark btn-sm">
                                                                Ver detalles
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <hr className="my-3" />
                                                    <div className="row">
                                                        {order.items.map((item, itemIndex) => (
                                                            <div key={itemIndex} className="col-auto">
                                                                <div className="d-flex align-items-center">
                                                                    <img 
                                                                        src={item.image} 
                                                                        alt={item.name}
                                                                        className="rounded me-2"
                                                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                                    />
                                                                    <div>
                                                                        <small className="fw-bold">{item.name}</small>
                                                                        <br />
                                                                        <small className="text-muted">Cantidad: {item.quantity}</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );

            case "carrito":
                return (
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h4 className="fw-bold mb-4">Mi Carrito</h4>
                            {store.cart && store.cart.length > 0 ? (
                                <>
                                    <p className="text-muted mb-4">Tienes {store.cart.length} productos en tu carrito.</p>
                                    <div className="row g-3">
                                        {store.cart.map((item, index) => (
                                            <div key={index} className="col-12">
                                                <div className="card border">
                                                    <div className="card-body">
                                                        <div className="row align-items-center">
                                                            <div className="col-md-2">
                                                                <img 
                                                                    src={item.image} 
                                                                    alt={item.name}
                                                                    className="rounded"
                                                                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                                                />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <h6 className="fw-bold mb-1">{item.name}</h6>
                                                                <small className="text-muted">${item.price.toFixed(2)}</small>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <small className="text-muted">Cantidad: {item.quantity || 1}</small>
                                                            </div>
                                                            <div className="col-md-3 text-end">
                                                                <h6 className="fw-bold text-dark">
                                                                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                                                                </h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-center mt-4">
                                        <button 
                                            className="btn btn-dark me-2"
                                            onClick={() => navigate('/cesta')}
                                        >
                                            Ir al carrito completo
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-5">
                                    <i className="bi bi-cart-x fs-1 text-muted mb-3"></i>
                                    <h5 className="text-muted">Tu carrito está vacío</h5>
                                    <p className="text-muted">¡Añade algunos productos y vuelve aquí!</p>
                                    <button 
                                        className="btn btn-dark"
                                        onClick={() => navigate('/productos')}
                                    >
                                        Ver productos
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case "configuracion":
                return (
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h4 className="fw-bold mb-4">Configuración de Cuenta</h4>
                            <p className="text-muted mb-4">Gestiona la seguridad y privacidad de tu cuenta.</p>
                            
                            <form>
                                <div className="mb-4">
                                    <h6 className="fw-bold mb-3">Cambiar contraseña</h6>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Contraseña actual</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Nueva contraseña</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small fw-bold">Confirmar nueva contraseña</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-dark">
                                        Actualizar contraseña
                                    </button>
                                </div>
                                
                                <hr className="my-4" />
                                
                                <div className="mb-4">
                                    <h6 className="fw-bold mb-3">Preferencias de notificaciones</h6>
                                    <div className="form-check mb-2">
                                        <input className="form-check-input" type="checkbox" id="newsletter" defaultChecked />
                                        <label className="form-check-label" htmlFor="newsletter">
                                            Recibir newsletter con ofertas y novedades
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input className="form-check-input" type="checkbox" id="recommendations" defaultChecked />
                                        <label className="form-check-label" htmlFor="recommendations">
                                            Recibir recomendaciones personalizadas
                                        </label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" id="promotions" />
                                        <label className="form-check-label" htmlFor="promotions">
                                            Recibir notificaciones de promociones especiales
                                        </label>
                                    </div>
                                    <button type="button" className="btn btn-dark">
                                        Guardar preferencias
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-light py-5">
            <div className="container">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-lg-3 mb-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-0">
                                <div className="text-center p-4 border-bottom">
                                    <img 
                                        src="/api/placeholder/80/80" 
                                        alt="Avatar" 
                                        className="rounded-circle mb-2"
                                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                    />
                                    <h6 className="fw-bold mb-1">¡Hola, {store.user || "Usuario"}!</h6>
                                    <small className="text-muted">Bienvenido a tu área personal</small>
                                </div>
                                
                                <div className="list-group list-group-flush">
                                    <button
                                        className={`list-group-item list-group-item-action border-0 ${
                                            activeTab === "perfil" ? "active" : ""
                                        }`}
                                        onClick={() => setActiveTab("perfil")}
                                    >
                                        <i className="bi bi-person me-2"></i>
                                        Mi perfil
                                    </button>
                                    <button
                                        className={`list-group-item list-group-item-action border-0 ${
                                            activeTab === "pedidos" ? "active" : ""
                                        }`}
                                        onClick={() => setActiveTab("pedidos")}
                                    >
                                        <i className="bi bi-bag me-2"></i>
                                        Mis pedidos
                                        {orders.length > 0 && (
                                            <span className="badge bg-dark ms-2">{orders.length}</span>
                                        )}
                                    </button>
                                    <button
                                        className={`list-group-item list-group-item-action border-0 ${
                                            activeTab === "carrito" ? "active" : ""
                                        }`}
                                        onClick={() => setActiveTab("carrito")}
                                    >
                                        <i className="bi bi-cart me-2"></i>
                                        Mi carrito
                                        {store.cart && store.cart.length > 0 && (
                                            <span className="badge bg-dark ms-2">{store.cart.length}</span>
                                        )}
                                    </button>
                                    <button
                                        className={`list-group-item list-group-item-action border-0 ${
                                            activeTab === "configuracion" ? "active" : ""
                                        }`}
                                        onClick={() => setActiveTab("configuracion")}
                                    >
                                        <i className="bi bi-gear me-2"></i>
                                        Configuración
                                    </button>
                                    
                                    <div className="dropdown-divider"></div>
                                    
                                    <button
                                        className="list-group-item list-group-item-action border-0 text-danger"
                                        onClick={handleLogout}
                                    >
                                        <i className="bi bi-box-arrow-right me-2"></i>
                                        Cerrar sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="col-lg-9">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};
import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Private = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { isLoggedIn, user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState("perfil");
    const [avatar, setAvatar] = useState(user?.avatar || null);
    const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    // Solo mostrar pedidos si el usuario realmente tiene
    const [orders] = useState([]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
        // Cargar avatar y teléfono cuando cambie el usuario
        setAvatar(user?.avatar || null);
        setPhoneNumber(user?.phone || "");
    }, [isLoggedIn, navigate, user]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Función para manejar la subida de avatar
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Verificar que sea una imagen
            if (!file.type.startsWith('image/')) {
                alert('Por favor, selecciona un archivo de imagen válido.');
                return;
            }
            
            // Verificar tamaño (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('La imagen es demasiado grande. El tamaño máximo es 5MB.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const newAvatar = e.target.result;
                setAvatar(newAvatar);
                
                // Guardar inmediatamente el avatar
                saveAvatar(newAvatar);
            };
            reader.readAsDataURL(file);
        }
    };

    // Función para guardar el avatar
    const saveAvatar = async (avatarData) => {
        try {
            const updatedUser = { ...user, avatar: avatarData };
            
            // Guardar en localStorage
            localStorage.setItem('user_data', JSON.stringify(updatedUser));
            
            // Actualizar el store
            dispatch({
                type: "login", // Reutilizamos la acción login para actualizar datos
                payload: {
                    token: store.token,
                    user: updatedUser
                }
            });
            
            console.log('Avatar guardado exitosamente');
        } catch (error) {
            console.error('Error guardando avatar:', error);
            alert('Error al guardar la imagen. Inténtalo de nuevo.');
        }
    };

    // Función para guardar cambios (teléfono)
    const handleSaveChanges = async () => {
        setIsSaving(true);
        
        try {
            const updatedUser = { ...user, phone: phoneNumber };
            
            // Guardar en localStorage
            localStorage.setItem('user_data', JSON.stringify(updatedUser));
            
            // Actualizar el store
            dispatch({
                type: "login",
                payload: {
                    token: store.token,
                    user: updatedUser
                }
            });
            
            setIsEditing(false);
            alert('¡Cambios guardados exitosamente!');
        } catch (error) {
            console.error('Error guardando cambios:', error);
            alert('Error al guardar los cambios. Inténtalo de nuevo.');
        } finally {
            setIsSaving(false);
        }
    };

    // Función auxiliar para obtener el nombre del usuario
    const getUserName = () => {
        if (user?.name) return user.name;
        if (user?.email) return user.email.split('@')[0];
        if (typeof user === 'string') return user.split('@')[0];
        return "Usuario";
    };

    // Función auxiliar para obtener el email del usuario
    const getUserEmail = () => {
        if (user?.email) return user.email;
        if (typeof user === 'string') return user;
        return "usuario@bambasshop.com";
    };

    const renderContent = () => {
        switch (activeTab) {
            case "perfil":
                return (
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-5">
                            <div className="row">
                                <div className="col-md-4 text-center mb-5">
                                    <div className="position-relative d-inline-block">
                                        <img 
                                            src={avatar || "/api/placeholder/140/140"} 
                                            alt="Avatar" 
                                            className="rounded-circle border border-3 border-light shadow"
                                            style={{ width: "140px", height: "140px", objectFit: "cover" }}
                                        />
                                        <input
                                            type="file"
                                            id="avatar-upload"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            style={{ display: 'none' }}
                                        />
                                        <label
                                            htmlFor="avatar-upload"
                                            className="btn btn-dark btn-sm rounded-circle position-absolute bottom-0 end-0 p-2"
                                            style={{ cursor: 'pointer' }}
                                            title="Cambiar foto de perfil"
                                        >
                                            <i className="bi bi-camera"></i>
                                        </label>
                                    </div>
                                    <small className="text-muted d-block mt-2">
                                        Haz clic en <i className="bi bi-camera"></i> para cambiar tu foto
                                    </small>
                                </div>
                                <div className="col-md-8">
                                    <h3 className="fw-bold mb-4">Información Personal</h3>
                                    <p className="text-muted mb-5 fs-6">Gestiona tu información personal y preferencias de cuenta.</p>
                                    
                                    <form>
                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold fs-6">Nombre</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-lg" 
                                                    value={user?.name || getUserName()}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold fs-6">Apellidos</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-lg" 
                                                    value={user?.lastName || ""}
                                                    placeholder="Tus apellidos"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="form-label fw-bold fs-6">Email</label>
                                            <input 
                                                type="email" 
                                                className="form-control form-control-lg" 
                                                value={getUserEmail()}
                                                readOnly
                                            />
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold fs-6">Teléfono</label>
                                                <div className="input-group">
                                                    <input 
                                                        type="tel" 
                                                        className="form-control form-control-lg" 
                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                        placeholder="+34 123 456 789"
                                                        readOnly={!isEditing}
                                                        style={{
                                                            backgroundColor: isEditing ? '#fff' : '#f8f9fa'
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => setIsEditing(!isEditing)}
                                                    >
                                                        <i className={`bi ${isEditing ? 'bi-x' : 'bi-pencil'}`}></i>
                                                    </button>
                                                </div>
                                                {isEditing && (
                                                    <small className="text-muted">
                                                        Edita tu número y haz clic en "Guardar cambios"
                                                    </small>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold fs-6">Fecha de nacimiento</label>
                                                <input 
                                                    type="date" 
                                                    className="form-control form-control-lg" 
                                                    value={user?.birthDate || ""}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <button 
                                                type="button" 
                                                className="btn btn-dark btn-lg px-5"
                                                onClick={handleSaveChanges}
                                                disabled={isSaving || !isEditing}
                                            >
                                                {isSaving ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                                        Guardando...
                                                    </>
                                                ) : (
                                                    'Guardar cambios'
                                                )}
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
                        <div className="card-body p-5">
                            <h3 className="fw-bold mb-4">Mis Pedidos</h3>
                            <p className="text-muted mb-5 fs-6">Revisa el estado de tus pedidos y descargas facturas.</p>
                            
                            {orders.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="bi bi-bag-x display-1 text-muted mb-4"></i>
                                    <h4 className="text-muted mb-3">No tienes pedidos todavía</h4>
                                    <p className="text-muted fs-5 mb-4">¡Empieza a comprar y encuentra tus zapatillas favoritas!</p>
                                    <button 
                                        className="btn btn-dark btn-lg px-5"
                                        onClick={() => navigate('/productos')}
                                    >
                                        Ver productos
                                    </button>
                                </div>
                            ) : (
                                <div className="row g-4">
                                    {orders.map((order, index) => (
                                        <div key={index} className="col-12">
                                            <div className="card border">
                                                <div className="card-body p-4">
                                                    <div className="row align-items-center">
                                                        <div className="col-md-3">
                                                            <h5 className="mb-2 fw-bold">{order.id}</h5>
                                                            <span className="text-muted fs-6">{order.date}</span>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <span className={`badge fs-6 px-3 py-2 ${
                                                                order.status === 'Entregado' ? 'bg-success' :
                                                                order.status === 'En tránsito' ? 'bg-warning' :
                                                                'bg-secondary'
                                                            }`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <h5 className="mb-0 fw-bold">${order.total}</h5>
                                                        </div>
                                                        <div className="col-md-3 text-end">
                                                            <button className="btn btn-outline-dark btn-lg">
                                                                Ver detalles
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <hr className="my-4" />
                                                    <div className="row">
                                                        {order.items.map((item, itemIndex) => (
                                                            <div key={itemIndex} className="col-auto">
                                                                <div className="d-flex align-items-center">
                                                                    <img 
                                                                        src={item.image} 
                                                                        alt={item.name}
                                                                        className="rounded me-3"
                                                                        style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                                                    />
                                                                    <div>
                                                                        <h6 className="fw-bold mb-1">{item.name}</h6>
                                                                        <span className="text-muted fs-6">Cantidad: {item.quantity}</span>
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
                        <div className="card-body p-5">
                            <h3 className="fw-bold mb-4">Mi Carrito</h3>
                            {store.cart && store.cart.length > 0 ? (
                                <>
                                    <p className="text-muted mb-5 fs-6">Tienes {store.cart.length} productos en tu carrito.</p>
                                    <div className="row g-4">
                                        {store.cart.map((item, index) => (
                                            <div key={index} className="col-12">
                                                <div className="card border">
                                                    <div className="card-body p-4">
                                                        <div className="row align-items-center">
                                                            <div className="col-md-2">
                                                                <img 
                                                                    src={item.image} 
                                                                    alt={item.name}
                                                                    className="rounded"
                                                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                                                />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <h5 className="fw-bold mb-2">{item.name}</h5>
                                                                <span className="text-muted fs-6">${item.price.toFixed(2)}</span>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <span className="text-muted fs-6">Cantidad: {item.quantity || 1}</span>
                                                            </div>
                                                            <div className="col-md-3 text-end">
                                                                <h5 className="fw-bold text-dark mb-0">
                                                                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-center mt-5">
                                        <button 
                                            className="btn btn-dark btn-lg px-5"
                                            onClick={() => navigate('/cesta')}
                                        >
                                            Ir al carrito completo
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-5">
                                    <i className="bi bi-cart-x display-1 text-muted mb-4"></i>
                                    <h4 className="text-muted mb-3">Tu carrito está vacío</h4>
                                    <p className="text-muted fs-5 mb-4">¡Añade algunos productos y vuelve aquí!</p>
                                    <button 
                                        className="btn btn-dark btn-lg px-5"
                                        onClick={() => navigate('/productos')}
                                    >
                                        Ver productos
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-light py-5">
            <div className="container-fluid px-5">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-lg-2 mb-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-0">
                                <div className="text-center p-5 border-bottom">
                                    <img 
                                        src={avatar || "/api/placeholder/100/100"} 
                                        alt="Avatar" 
                                        className="rounded-circle mb-3"
                                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                    />
                                    <h5 className="fw-bold mb-2">¡Hola, {getUserName()}!</h5>
                                    <small className="text-muted fs-6">Bienvenido a tu área personal</small>
                                </div>
                                
                                <div className="list-group list-group-flush">
                                    <button
                                        className={`list-group-item list-group-item-action border-0 py-3 ${
                                            activeTab === "perfil" ? "active" : ""
                                        }`}
                                        onClick={() => setActiveTab("perfil")}
                                    >
                                        <i className="bi bi-person me-3 fs-5"></i>
                                        <span className="fs-6">Mi perfil</span>
                                    </button>
                                    <button
                                        className={`list-group-item list-group-item-action border-0 py-3 ${
                                            activeTab === "pedidos" ? "active" : ""
                                        }`}
                                        onClick={() => setActiveTab("pedidos")}
                                    >
                                        <i className="bi bi-bag me-3 fs-5"></i>
                                        <span className="fs-6">Mis pedidos</span>
                                        {orders.length > 0 && (
                                            <span className="badge bg-dark ms-2">{orders.length}</span>
                                        )}
                                    </button>
                                    <button
                                        className={`list-group-item list-group-item-action border-0 py-3 ${
                                            activeTab === "carrito" ? "active" : ""
                                        }`}
                                        onClick={() => setActiveTab("carrito")}
                                    >
                                        <i className="bi bi-cart me-3 fs-5"></i>
                                        <span className="fs-6">Mi carrito</span>
                                        {store.cart && store.cart.length > 0 && (
                                            <span className="badge bg-dark ms-2">{store.cart.length}</span>
                                        )}
                                    </button>
                                    
                                    <div className="dropdown-divider my-2"></div>
                                    
                                    <button
                                        className="list-group-item list-group-item-action border-0 text-danger py-3"
                                        onClick={handleLogout}
                                    >
                                        <i className="bi bi-box-arrow-right me-3 fs-5"></i>
                                        <span className="fs-6">Cerrar sesión</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="col-lg-10">{renderContent()}</div>
                </div>
            </div>
        </div>
    );
};
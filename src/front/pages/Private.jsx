import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Private = () => {
    // Hooks para estado global, navegación y autenticación
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { isLoggedIn, user, logout } = useAuth();
    
    // Estados para controlar la interfaz y edición
    const [activeTab, setActiveTab] = useState("perfil");
    const [avatar, setAvatar] = useState(user?.avatar || null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    // Estados para campos editables del formulario
    const [formData, setFormData] = useState({
        name: user?.name || "",
        lastName: user?.lastName || "",
        birthDate: user?.birthDate || "",
        phone: user?.phone || ""
    });

    // Efecto para verificar autenticación y sincronizar datos
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
        
        setAvatar(user?.avatar || null);
        setFormData({
            name: user?.name || "",
            lastName: user?.lastName || "",
            birthDate: user?.birthDate || "",
            phone: user?.phone || ""
        });
    }, [isLoggedIn, navigate, user]);

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Función para manejar cambios en los campos del formulario
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Función para manejar el cambio de avatar con validaciones
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecciona un archivo de imagen válido.');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            alert('La imagen es demasiado grande. El tamaño máximo es 5MB.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const newAvatar = e.target.result;
            setAvatar(newAvatar);
            saveUserData({ avatar: newAvatar });
        };
        reader.readAsDataURL(file);
    };

    // Función para guardar datos del usuario en localStorage y estado global
    const saveUserData = (updates) => {
        try {
            const updatedUser = { ...user, ...updates };
            localStorage.setItem('user_data', JSON.stringify(updatedUser));
            dispatch({
                type: "login",
                payload: {
                    token: store.token,
                    user: updatedUser
                }
            });
        } catch (error) {
            console.error('Error guardando datos:', error);
            alert('Error al guardar. Inténtalo de nuevo.');
        }
    };

    // Función para guardar cambios del formulario
    const handleSaveChanges = async () => {
        setIsSaving(true);
        
        try {
            saveUserData(formData);
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

    // Función para renderizar estados vacíos con botones de acción
    const renderEmptyState = (icon, title, subtitle, buttonText, buttonAction) => (
        <div className="text-center py-5">
            <div className="mb-4">
                <i className={`bi ${icon} text-muted`} style={{ fontSize: '5rem' }}></i>
            </div>
            <h3 className="fw-bold text-muted mb-4">{title}</h3>
            <p className="text-muted fs-4 mb-5" style={{ maxWidth: '500px', margin: '0 auto' }}>{subtitle}</p>
            <button 
                className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm"
                style={{ fontSize: '18px' }}
                onClick={buttonAction}
            >
                <i className="bi bi-arrow-right-circle me-3"></i>
                {buttonText}
            </button>
        </div>
    );

    // Función para renderizar la sección de perfil del usuario
    const renderProfile = () => (
        <div className="card border-0 shadow-lg h-100" style={{ borderRadius: '20px' }}>
            <div className="card-body p-5">
                <div className="row g-5">
                    {/* Sección de avatar y bienvenida */}
                    <div className="col-lg-4 text-center">
                        <div className="position-relative d-inline-block mb-4">
                            <img 
                                src={avatar || "/api/placeholder/180/180"} 
                                alt="Avatar" 
                                className="rounded-circle border border-4 border-white shadow-lg"
                                style={{ width: "180px", height: "180px", objectFit: "cover" }}
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
                                className="btn btn-dark btn-lg rounded-circle position-absolute shadow-sm"
                                style={{ 
                                    cursor: 'pointer',
                                    bottom: '10px',
                                    right: '10px',
                                    width: '50px',
                                    height: '50px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                title="Cambiar foto de perfil"
                            >
                                <i className="bi bi-camera fs-5"></i>
                            </label>
                        </div>
                        <h4 className="fw-bold text-dark mb-2">¡Hola, {getUserName()}!</h4>
                        <p className="text-muted mb-4">Bienvenido a tu área personal</p>
                        <small className="text-muted d-block">
                            <i className="bi bi-camera me-2"></i>
                            Haz clic en el icono para cambiar tu foto
                        </small>
                    </div>
                    
                    {/* Formulario de información personal */}
                    <div className="col-lg-8">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                            <div>
                                <h2 className="fw-bold mb-3 text-dark">Información Personal</h2>
                                <p className="text-muted fs-5">Gestiona tu información personal y preferencias de cuenta.</p>
                            </div>
                            <button
                                type="button"
                                className={`btn btn-lg px-4 py-2 rounded-pill shadow-sm ${
                                    isEditing ? 'btn-outline-secondary' : 'btn-outline-primary'
                                }`}
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                <i className={`bi ${isEditing ? 'bi-x' : 'bi-pencil'} me-2`}></i>
                                {isEditing ? 'Cancelar' : 'Editar perfil'}
                            </button>
                        </div>
                        
                        <form>
                            {/* Campos de nombre y apellidos */}
                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold fs-5 text-dark mb-3">Nombre</label>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg border-2 py-3"
                                        style={{ 
                                            backgroundColor: isEditing ? '#fff' : '#f8f9fa',
                                            borderRadius: '12px',
                                            fontSize: '16px'
                                        }}
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        readOnly={!isEditing}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold fs-5 text-dark mb-3">Apellidos</label>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg border-2 py-3"
                                        style={{ 
                                            backgroundColor: isEditing ? '#fff' : '#f8f9fa',
                                            borderRadius: '12px',
                                            fontSize: '16px'
                                        }}
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        placeholder="Tus apellidos"
                                        readOnly={!isEditing}
                                    />
                                </div>
                            </div>
                            
                            {/* Campo de email (solo lectura) */}
                            <div className="mb-4">
                                <label className="form-label fw-bold fs-5 text-dark mb-3">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control form-control-lg border-2 py-3"
                                    style={{ 
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '12px',
                                        fontSize: '16px'
                                    }}
                                    value={getUserEmail()}
                                    readOnly
                                />
                                <small className="text-muted">El email no se puede modificar</small>
                            </div>
                            
                            {/* Campos de teléfono y fecha de nacimiento */}
                            <div className="row g-4 mb-5">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold fs-5 text-dark mb-3">Teléfono</label>
                                    <input 
                                        type="tel" 
                                        className="form-control form-control-lg border-2 py-3"
                                        style={{ 
                                            backgroundColor: isEditing ? '#fff' : '#f8f9fa',
                                            borderRadius: '12px',
                                            fontSize: '16px'
                                        }}
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        placeholder="+34 123 456 789"
                                        readOnly={!isEditing}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold fs-5 text-dark mb-3">Fecha de nacimiento</label>
                                    <input 
                                        type="date" 
                                        className="form-control form-control-lg border-2 py-3"
                                        style={{ 
                                            backgroundColor: isEditing ? '#fff' : '#f8f9fa',
                                            borderRadius: '12px',
                                            fontSize: '16px'
                                        }}
                                        value={formData.birthDate}
                                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                        readOnly={!isEditing}
                                    />
                                </div>
                            </div>
                            
                            {/* Botón de guardar cambios (solo visible en modo edición) */}
                            {isEditing && (
                                <div className="text-center">
                                    <button 
                                        type="button" 
                                        className="btn btn-dark btn-lg px-5 py-3 rounded-pill shadow-sm"
                                        style={{ fontSize: '18px' }}
                                        onClick={handleSaveChanges}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-3"></span>
                                                Guardando cambios...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check-circle me-3"></i>
                                                Guardar cambios
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

    // Función para renderizar la sección del carrito
    const renderCart = () => (
        <div className="card border-0 shadow-lg h-100" style={{ borderRadius: '20px' }}>
            <div className="card-body p-5">
                <div className="d-flex align-items-center mb-5">
                    <i className="bi bi-cart3 fs-1 text-primary me-4"></i>
                    <div>
                        <h2 className="fw-bold mb-2 text-dark">Mi Carrito</h2>
                        <p className="text-muted fs-5 mb-0">Gestiona los productos de tu carrito de compras</p>
                    </div>
                </div>
                
                {/* Renderiza productos del carrito o estado vacío */}
                {store.cart && store.cart.length > 0 ? (
                    <>
                        <div className="alert alert-info border-0 rounded-3 mb-5" style={{ backgroundColor: '#e3f2fd' }}>
                            <i className="bi bi-info-circle me-2"></i>
                            <strong>Tienes {store.cart.length} productos</strong> en tu carrito de compras
                        </div>
                        <div className="row g-4">
                            {store.cart.map((item, index) => (
                                <div key={index} className="col-12">
                                    <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                                        <div className="card-body p-4">
                                            <div className="row align-items-center">
                                                <div className="col-md-2">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name}
                                                        className="rounded-3 shadow-sm"
                                                        style={{ width: "90px", height: "90px", objectFit: "cover" }}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <h5 className="fw-bold mb-2 text-dark">{item.name}</h5>
                                                    <span className="text-muted fs-6">Precio unitario: ${item.price.toFixed(2)}</span>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="d-flex align-items-center">
                                                        <i className="bi bi-box me-2 text-muted"></i>
                                                        <span className="fs-6 fw-medium">Cantidad: {item.quantity || 1}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 text-end">
                                                    <h4 className="fw-bold text-primary mb-0">
                                                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-5">
                            <button 
                                className="btn btn-dark btn-lg px-5 py-3 rounded-pill shadow-sm"
                                style={{ fontSize: '18px' }}
                                onClick={() => navigate('/cesta')}
                            >
                                <i className="bi bi-arrow-right-circle me-3"></i>
                                Ir al carrito completo
                            </button>
                        </div>
                    </>
                ) : 
                    renderEmptyState(
                        "bi-cart-x", 
                        "Tu carrito está vacío", 
                        "¡Añade algunos productos y vuelve aquí!", 
                        "Ver productos",
                        () => navigate('/productos')
                    )
                }
            </div>
        </div>
    );

    // Función para renderizar el contenido basado en la pestaña activa
    const renderContent = () => {
        switch (activeTab) {
            case "perfil": 
                return renderProfile();
            case "carrito": 
                return renderCart();
            default: 
                return null;
        }
    };

    // Configuración de elementos del sidebar
    const sidebarItems = [
        { key: "perfil", icon: "bi-person", label: "Mi perfil" },
        { key: "carrito", icon: "bi-cart", label: "Mi carrito", badge: store.cart?.length }
    ];

    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container-fluid px-4">
                <div className="row g-4">
                    {/* Sidebar de navegación */}
                    <div className="col-lg-3 col-xl-2">
                        <div className="card border-0 shadow-lg sticky-top" style={{ borderRadius: '20px', top: '20px' }}>
                            <div className="card-body p-0">
                                <div className="text-center p-5 border-bottom">
                                    <img 
                                        src={avatar || "/api/placeholder/120/120"} 
                                        alt="Avatar" 
                                        className="rounded-circle mb-4 shadow-lg border border-4 border-white"
                                        style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                    />
                                    <h4 className="fw-bold mb-2 text-dark">¡Hola, {getUserName()}!</h4>
                                    <p className="text-muted fs-6 mb-0">Bienvenido a tu área personal</p>
                                </div>
                                
                                <div className="list-group list-group-flush">
                                    {sidebarItems.map(item => (
                                        <button
                                            key={item.key}
                                            className={`list-group-item list-group-item-action border-0 py-4 px-4 ${
                                                activeTab === item.key ? "active" : ""
                                            }`}
                                            onClick={() => setActiveTab(item.key)}
                                            style={{ 
                                                borderRadius: activeTab === item.key ? '0' : '0',
                                                fontSize: '16px'
                                            }}
                                        >
                                            <i className={`bi ${item.icon} me-3 fs-4`}></i>
                                            <span className="fw-medium">{item.label}</span>
                                            {item.badge > 0 && (
                                                <span className="badge bg-primary ms-2 rounded-pill">{item.badge}</span>
                                            )}
                                        </button>
                                    ))}
                                    
                                    <div className="dropdown-divider my-3 mx-3"></div>
                                    
                                    <button
                                        className="list-group-item list-group-item-action border-0 text-danger py-4 px-4"
                                        onClick={handleLogout}
                                        style={{ fontSize: '16px' }}
                                    >
                                        <i className="bi bi-box-arrow-right me-3 fs-4"></i>
                                        <span className="fw-medium">Cerrar sesión</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Área de contenido principal */}
                    <div className="col-lg-9 col-xl-10">
                        <div style={{ minHeight: '80vh' }}>
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
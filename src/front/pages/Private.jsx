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
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    // Estados para modal de devolución
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]); // Items seleccionados para devolver
    const [returnReason, setReturnReason] = useState('');
    const [returnComments, setReturnComments] = useState('');
    
    const [formData, setFormData] = useState({
        name: user?.name || "",
        lastName: user?.lastName || "",
        birthDate: user?.birthDate || "",
        phone: user?.phone || ""
    });

    // Leer pedidos del localStorage
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('user_orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    // Leer devoluciones del localStorage
    const [returns, setReturns] = useState(() => {
        const savedReturns = localStorage.getItem('user_returns');
        return savedReturns ? JSON.parse(savedReturns) : [];
    });

    // Leer direcciones del localStorage
    const [addresses] = useState([]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }
        
        setAvatar(user?.avatar || null);
        setFormData({
            name: user?.name || "",
            lastName: user?.lastName || "",
            birthDate: user?.birthDate || "",
            phone: user?.phone || ""
        });

        // Sincronizar pedidos desde localStorage
        const savedOrders = localStorage.getItem('user_orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }

        // Sincronizar devoluciones desde localStorage
        const savedReturns = localStorage.getItem('user_returns');
        if (savedReturns) {
            setReturns(JSON.parse(savedReturns));
        }

        // Limpiar devoluciones antiguas (más de 30 días)
        cleanOldReturns();
    }, [isLoggedIn, navigate, user]);

    // Función para limpiar devoluciones antiguas (más de 30 días)
    const cleanOldReturns = () => {
        try {
            const savedReturns = localStorage.getItem('user_returns');
            if (!savedReturns) return;

            const returns = JSON.parse(savedReturns);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            // Filtrar solo devoluciones recientes
            const recentReturns = returns.filter(returnItem => {
                const returnDate = new Date(returnItem.returnDate);
                return returnDate > thirtyDaysAgo;
            });

            // Si se eliminó algo, actualizar localStorage
            if (recentReturns.length !== returns.length) {
                localStorage.setItem('user_returns', JSON.stringify(recentReturns));
                setReturns(recentReturns);
                console.log(`🗑️ Limpiadas ${returns.length - recentReturns.length} devoluciones antiguas`);
            }
        } catch (error) {
            console.error('Error limpiando devoluciones:', error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

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

    const getUserName = () => {
        if (user?.name) return user.name;
        if (user?.email) return user.email.split('@')[0];
        if (typeof user === 'string') return user.split('@')[0];
        return "Usuario";
    };

    const getUserEmail = () => {
        if (user?.email) return user.email;
        if (typeof user === 'string') return user;
        return "usuario@bambasshop.com";
    };

    const getStatusColor = (status) => {
        switch(status) {
            case "Entregado": return "success";
            case "En tránsito": return "primary";
            case "Procesando": return "warning";
            case "Cancelado": return "danger";
            case "Devolución solicitada": return "warning";
            case "Devolución aprobada": return "info";
            case "Reembolsado": return "success";
            default: return "secondary";
        }
    };

    // Función para abrir modal de devolución
    const handleOpenReturnModal = (order) => {
        setSelectedOrder(order);
        // Inicializar todos los items como NO seleccionados
        setSelectedItems(order.items.map(() => false));
        setReturnReason('');
        setReturnComments('');
        setShowReturnModal(true);
    };

    // Función para toggle selección de item
    const toggleItemSelection = (index) => {
        const newSelection = [...selectedItems];
        newSelection[index] = !newSelection[index];
        setSelectedItems(newSelection);
    };

    // Función para enviar solicitud de devolución
    const handleSubmitReturn = () => {
        // Verificar que al menos un item esté seleccionado
        const hasSelectedItems = selectedItems.some(selected => selected);
        
        if (!hasSelectedItems) {
            alert('Por favor selecciona al menos un producto para devolver');
            return;
        }

        if (!returnReason) {
            alert('Por favor selecciona un motivo de devolución');
            return;
        }

        // Filtrar solo los items seleccionados
        const itemsToReturn = selectedOrder.items.filter((item, index) => selectedItems[index]);
        const itemsToKeep = selectedOrder.items.filter((item, index) => !selectedItems[index]);

        // Calcular total de items a devolver
        const returnTotal = itemsToReturn.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0
        );

        // Crear objeto de devolución
        const returnId = `DEV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
        const newReturn = {
            id: returnId,
            orderId: selectedOrder.id,
            date: selectedOrder.date,
            returnDate: new Date().toISOString().split('T')[0],
            returnReason: returnReason,
            returnComments: returnComments,
            returnStatus: "Devolución solicitada",
            total: parseFloat(returnTotal.toFixed(2)),
            items: itemsToReturn
        };

        // Añadir a la lista de devoluciones y guardar en localStorage
        const updatedReturns = [...returns, newReturn];
        setReturns(updatedReturns);
        localStorage.setItem('user_returns', JSON.stringify(updatedReturns));

        // Si se devuelven TODOS los items, eliminar el pedido completo
        if (itemsToKeep.length === 0) {
            const updatedOrders = orders.filter(order => order.id !== selectedOrder.id);
            setOrders(updatedOrders);
            localStorage.setItem('user_orders', JSON.stringify(updatedOrders));
        } else {
            // Si quedan items, actualizar el pedido con los items restantes
            const updatedOrders = orders.map(order => {
                if (order.id === selectedOrder.id) {
                    const newTotal = itemsToKeep.reduce((sum, item) => 
                        sum + (item.price * item.quantity), 0
                    );
                    return {
                        ...order,
                        items: itemsToKeep,
                        total: parseFloat(newTotal.toFixed(2))
                    };
                }
                return order;
            });
            setOrders(updatedOrders);
            localStorage.setItem('user_orders', JSON.stringify(updatedOrders));
        }

        alert('✅ Solicitud de devolución enviada. Te contactaremos pronto.');
        setShowReturnModal(false);
    };

    // PERFIL
    const renderProfile = () => (
        <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
                <div className="row">
                    <div className="col-md-3 text-center mb-4 mb-md-0">
                        <div className="position-relative d-inline-block">
                            <img 
                                src={avatar || "https://via.placeholder.com/150"} 
                                alt="Avatar" 
                                className="rounded-circle"
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
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
                                className="btn btn-sm btn-dark rounded-circle position-absolute"
                                style={{ 
                                    cursor: 'pointer',
                                    bottom: '5px',
                                    right: '5px',
                                    width: '35px',
                                    height: '35px',
                                    padding: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <i className="bi bi-camera"></i>
                            </label>
                        </div>
                        <h5 className="mt-3 mb-1">{getUserName()}</h5>
                        <p className="text-muted small">{getUserEmail()}</p>
                    </div>
                    
                    <div className="col-md-9">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mb-0">Información Personal</h4>
                            <button
                                type="button"
                                className={`btn btn-sm ${isEditing ? 'btn-secondary' : 'btn-outline-dark'}`}
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                <i className={`bi ${isEditing ? 'bi-x' : 'bi-pencil'} me-1`}></i>
                                {isEditing ? 'Cancelar' : 'Editar'}
                            </button>
                        </div>
                        
                        <form>
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Nombre</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        readOnly={!isEditing}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Apellidos</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        placeholder="Tus apellidos"
                                        readOnly={!isEditing}
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control"
                                    value={getUserEmail()}
                                    readOnly
                                />
                                <small className="text-muted">El email no se puede modificar</small>
                            </div>
                            
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Teléfono</label>
                                    <input 
                                        type="tel" 
                                        className="form-control"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        placeholder="+34 123 456 789"
                                        readOnly={!isEditing}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Fecha de nacimiento</label>
                                    <input 
                                        type="date" 
                                        className="form-control"
                                        value={formData.birthDate}
                                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                        readOnly={!isEditing}
                                    />
                                </div>
                            </div>
                            
                            {isEditing && (
                                <div className="text-end">
                                    <button 
                                        type="button" 
                                        className="btn btn-dark"
                                        onClick={handleSaveChanges}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Guardando...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check-circle me-2"></i>
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

    // PEDIDOS Y DEVOLUCIONES
    const renderOrders = () => (
        <>
            <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                    <h4 className="mb-4">Pedidos y Devoluciones</h4>
                    
                    {/* SECCIÓN DE PEDIDOS */}
                    <div className="mb-5">
                        <div className="d-flex align-items-center mb-3">
                            <i className="bi bi-box-seam fs-4 me-2"></i>
                            <h5 className="mb-0">Mis Pedidos</h5>
                        </div>
                        
                        {orders.length > 0 ? (
                            <div className="row g-3">
                                {orders.map((order) => (
                                    <div key={order.id} className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <div>
                                                        <h6 className="mb-1">Pedido #{order.id}</h6>
                                                        <small className="text-muted">
                                                            Pedido: {new Date(order.date).toLocaleDateString('es-ES', { 
                                                                year: 'numeric', 
                                                                month: 'long', 
                                                                day: 'numeric' 
                                                            })}
                                                        </small>
                                                        {order.deliveryDate && (
                                                            <>
                                                                <br />
                                                                <small className="text-muted">
                                                                    Entregado: {new Date(order.deliveryDate).toLocaleDateString('es-ES', { 
                                                                        year: 'numeric', 
                                                                        month: 'long', 
                                                                        day: 'numeric' 
                                                                    })}
                                                                </small>
                                                            </>
                                                        )}
                                                    </div>
                                                    <span className={`badge bg-${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                
                                                <div className="mb-3">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="d-flex align-items-center mb-2">
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.name}
                                                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                                className="rounded me-3"
                                                            />
                                                            <div className="flex-grow-1">
                                                                <div className="fw-medium">{item.name}</div>
                                                                <div className="d-flex align-items-center gap-2 flex-wrap mt-1">
                                                                    <small className="text-muted">
                                                                        <i className="bi bi-box me-1"></i>
                                                                        Cantidad: {item.quantity}
                                                                    </small>
                                                                    {item.size && (
                                                                        <span className="badge bg-secondary">
                                                                            <i className="bi bi-rulers me-1"></i>
                                                                            Talla {item.size}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="fw-bold">${item.price.toFixed(2)}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                                                    <div>
                                                        <span className="fw-bold">Total: ${order.total.toFixed(2)}</span>
                                                        {order.canReturn && (
                                                            <div className="mt-2">
                                                                <button 
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    onClick={() => handleOpenReturnModal(order)}
                                                                >
                                                                    <i className="bi bi-arrow-return-left me-1"></i>
                                                                    Solicitar devolución
                                                                </button>
                                                            </div>
                                                        )}
                                                        {!order.canReturn && order.status === "Entregado" && (
                                                            <div className="mt-2">
                                                                <small className="text-muted">
                                                                    <i className="bi bi-info-circle me-1"></i>
                                                                    Plazo de devolución expirado
                                                                </small>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-4 bg-light rounded">
                                <i className="bi bi-box-seam text-muted" style={{ fontSize: '3rem' }}></i>
                                <p className="mt-2 text-muted mb-2">No tienes pedidos activos</p>
                                <button className="btn btn-dark btn-sm" onClick={() => navigate('/productos')}>
                                    Ver productos
                                </button>
                            </div>
                        )}
                    </div>

                    {/* SECCIÓN DE DEVOLUCIONES */}
                    <div>
                        <div className="d-flex align-items-center mb-3">
                            <i className="bi bi-arrow-return-left fs-4 me-2"></i>
                            <h5 className="mb-0">Mis Devoluciones</h5>
                        </div>
                        
                        {returns.length > 0 ? (
                            <div className="row g-3">
                                {returns.map((returnItem) => (
                                    <div key={returnItem.id} className="col-12">
                                        <div className="card border-warning">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <div>
                                                        <h6 className="mb-1">Devolución #{returnItem.id}</h6>
                                                        <small className="text-muted">
                                                            Pedido original: #{returnItem.orderId}
                                                        </small>
                                                        <br />
                                                        <small className="text-muted">
                                                            Solicitada: {new Date(returnItem.returnDate).toLocaleDateString('es-ES', { 
                                                                year: 'numeric', 
                                                                month: 'long', 
                                                                day: 'numeric' 
                                                            })}
                                                        </small>
                                                        <br />
                                                        <small className="text-muted">
                                                            Motivo: <strong>{returnItem.returnReason}</strong>
                                                        </small>
                                                    </div>
                                                    <span className={`badge bg-${getStatusColor(returnItem.returnStatus)}`}>
                                                        {returnItem.returnStatus}
                                                    </span>
                                                </div>
                                                
                                                <div className="mb-3">
                                                    {returnItem.items.map((item, idx) => (
                                                        <div key={idx} className="d-flex align-items-center mb-2">
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.name}
                                                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                                className="rounded me-3"
                                                            />
                                                            <div className="flex-grow-1">
                                                                <div className="fw-medium">{item.name}</div>
                                                                <div className="d-flex align-items-center gap-2 mt-1">
                                                                    <small className="text-muted">Cantidad: {item.quantity}</small>
                                                                    {item.size && (
                                                                        <span className="badge bg-secondary">
                                                                            <i className="bi bi-rulers me-1"></i>
                                                                            Talla {item.size}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="fw-bold">${item.price.toFixed(2)}</div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {returnItem.returnComments && (
                                                    <div className="alert alert-light border mb-3">
                                                        <small><strong>Comentarios:</strong> {returnItem.returnComments}</small>
                                                    </div>
                                                )}
                                                
                                                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                                                    <span className="fw-bold">Total a reembolsar: ${returnItem.total.toFixed(2)}</span>
                                                    <small className="text-muted">
                                                        <i className="bi bi-info-circle me-1"></i>
                                                        Recibirás instrucciones por email
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-4 bg-light rounded">
                                <i className="bi bi-arrow-return-left text-muted" style={{ fontSize: '3rem' }}></i>
                                <p className="mt-2 text-muted mb-0">No tienes devoluciones pendientes</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de devolución con selector de productos */}
            {showReturnModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Solicitar Devolución</h5>
                                <button 
                                    type="button" 
                                    className="btn-close"
                                    onClick={() => setShowReturnModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p className="text-muted mb-4">
                                    Pedido: <strong>#{selectedOrder?.id}</strong>
                                </p>

                                {/* Selector de productos */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold">
                                        Selecciona los productos a devolver <span className="text-danger">*</span>
                                    </label>
                                    <div className="border rounded p-3">
                                        {selectedOrder?.items.map((item, index) => (
                                            <div key={index} className="form-check mb-3">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox"
                                                    id={`item-${index}`}
                                                    checked={selectedItems[index] || false}
                                                    onChange={() => toggleItemSelection(index)}
                                                />
                                                <label className="form-check-label w-100" htmlFor={`item-${index}`}>
                                                    <div className="d-flex align-items-center">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.name}
                                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                            className="rounded me-3"
                                                        />
                                                        <div className="flex-grow-1">
                                                            <div className="fw-medium">{item.name}</div>
                                                            <div className="d-flex align-items-center gap-2 mt-1">
                                                                <small className="text-muted">
                                                                    Cantidad: {item.quantity} | Precio: ${item.price.toFixed(2)}
                                                                </small>
                                                                {item.size && (
                                                                    <span className="badge bg-secondary">
                                                                        Talla {item.size}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        Motivo de devolución <span className="text-danger">*</span>
                                    </label>
                                    <select 
                                        className="form-select"
                                        value={returnReason}
                                        onChange={(e) => setReturnReason(e.target.value)}
                                    >
                                        <option value="">-- Selecciona un motivo --</option>
                                        <option value="Talla incorrecta">Talla incorrecta</option>
                                        <option value="Producto defectuoso">Producto defectuoso</option>
                                        <option value="Color diferente">Color diferente al esperado</option>
                                        <option value="No cumple expectativas">No cumple expectativas</option>
                                        <option value="Pedido duplicado">Pedido duplicado</option>
                                        <option value="Otro motivo">Otro motivo</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        Comentarios adicionales (opcional)
                                    </label>
                                    <textarea 
                                        className="form-control"
                                        rows="3"
                                        placeholder="Cuéntanos más detalles..."
                                        value={returnComments}
                                        onChange={(e) => setReturnComments(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="alert alert-info border-0 small">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Recibirás un email con las instrucciones para devolver los productos seleccionados.
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => setShowReturnModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    onClick={handleSubmitReturn}
                                >
                                    <i className="bi bi-send me-2"></i>
                                    Enviar solicitud
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    // DIRECCIONES
    const renderAddresses = () => (
        <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">Mis Direcciones</h4>
                    <button className="btn btn-sm btn-dark">
                        <i className="bi bi-plus-circle me-1"></i>
                        Añadir dirección
                    </button>
                </div>
                
                {addresses.length > 0 ? (
                    <div className="row g-3">
                        {addresses.map((address) => (
                            <div key={address.id} className="col-md-6">
                                <div className={`card h-100 ${address.isDefault ? 'border-dark' : ''}`}>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <h6 className="mb-0">{address.name}</h6>
                                            {address.isDefault && (
                                                <span className="badge bg-dark">Predeterminada</span>
                                            )}
                                        </div>
                                        <p className="mb-1 small">{address.street}</p>
                                        <p className="mb-1 small">{address.city}, {address.postalCode}</p>
                                        <p className="mb-3 small text-muted">{address.country}</p>
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-sm btn-outline-dark">
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4 bg-light rounded">
                        <i className="bi bi-geo-alt text-muted" style={{ fontSize: '3rem' }}></i>
                        <p className="mt-2 text-muted mb-0">No tienes direcciones guardadas</p>
                    </div>
                )}
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case "perfil": return renderProfile();
            case "pedidos": return renderOrders();
            case "direcciones": return renderAddresses();
            default: return null;
        }
    };

    const sidebarItems = [
        { key: "perfil", icon: "bi-person", label: "Mi perfil" },
        { key: "pedidos", icon: "bi-box-seam", label: "Pedidos y devoluciones", badge: orders.length + returns.length },
        { key: "direcciones", icon: "bi-geo-alt", label: "Direcciones" }
    ];

    return (
        <div className="bg-light min-vh-100 py-4">
            <div className="container">
                <div className="row g-4">
                    {/* Sidebar */}
                    <div className="col-lg-3">
                        <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
                            <div className="card-body p-0">
                                <div className="text-center p-4 border-bottom">
                                    <img 
                                        src={avatar || "https://via.placeholder.com/80"} 
                                        alt="Avatar" 
                                        className="rounded-circle mb-2"
                                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                    />
                                    <h6 className="mb-0">{getUserName()}</h6>
                                    <small className="text-muted">{getUserEmail()}</small>
                                </div>
                                
                                <div className="list-group list-group-flush">
                                    {sidebarItems.map(item => (
                                        <button
                                            key={item.key}
                                            className={`list-group-item list-group-item-action border-0 ${
                                                activeTab === item.key ? "active" : ""
                                            }`}
                                            onClick={() => setActiveTab(item.key)}
                                        >
                                            <i className={`bi ${item.icon} me-2`}></i>
                                            {item.label}
                                            {item.badge > 0 && (
                                                <span className="badge bg-dark ms-2">{item.badge}</span>
                                            )}
                                        </button>
                                    ))}
                                    
                                    <hr className="my-2" />
                                    
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
                    
                    {/* Content */}
                    <div className="col-lg-9">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};
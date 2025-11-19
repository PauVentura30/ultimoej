import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

export const Cesta = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
        dispatch({ type: 'SET_CART', payload: savedCart });
    }, []);

    const updateQuantity = (productId, size, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = cart.map(item => {
            if (item.id === productId && item.size === size) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        dispatch({ type: 'SET_CART', payload: updatedCart });
    };

    const removeFromCart = (productId, size) => {
        const updatedCart = cart.filter(item => !(item.id === productId && item.size === size));
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        dispatch({ type: 'SET_CART', payload: updatedCart });
    };

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateIVA = () => {
        return calculateSubtotal() * 0.21;
    };

    const calculateShipping = () => {
        const subtotal = calculateSubtotal();
        return subtotal >= 150 ? 0 : 4.99;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateIVA() + calculateShipping();
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (cart.length === 0) {
        return (
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body py-5">
                                <i className="bi bi-cart-x display-1 text-muted mb-4"></i>
                                <h2 className="mb-3">Tu carrito está vacío</h2>
                                <p className="text-muted mb-4">
                                    Todavía no has añadido ningún producto a tu carrito.
                                    ¡Explora nuestro catálogo y encuentra lo que buscas!
                                </p>
                                <button 
                                    onClick={() => navigate('/productos')}
                                    className="btn btn-dark btn-lg"
                                >
                                    <i className="bi bi-shop me-2"></i>
                                    Ir a productos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="display-5 fw-bold">
                        <i className="bi bi-cart3 me-3"></i>
                        Mi Carrito
                    </h1>
                    <p className="text-muted">
                        Tienes {cart.length} {cart.length === 1 ? 'producto' : 'productos'} en tu carrito
                    </p>
                </div>
            </div>

            <div className="row g-4">
                {/* Lista de productos */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table align-middle">
                                    <thead className="border-bottom">
                                        <tr>
                                            <th scope="col" className="border-0">Producto</th>
                                            <th scope="col" className="border-0 text-center">Precio</th>
                                            <th scope="col" className="border-0 text-center">Cantidad</th>
                                            <th scope="col" className="border-0 text-center">Total</th>
                                            <th scope="col" className="border-0"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item, index) => (
                                            <tr key={`${item.id}-${item.size}-${index}`} className="border-bottom">
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.name}
                                                            className="rounded me-3"
                                                            style={{ 
                                                                width: '80px', 
                                                                height: '80px', 
                                                                objectFit: 'cover' 
                                                            }}
                                                        />
                                                        <div>
                                                            <h6 className="mb-0">{item.name}</h6>
                                                            <small className="text-muted d-block">{item.brand}</small>
                                                            
                                                            <div className="d-flex align-items-center gap-2 mt-2 flex-wrap">
                                                                {/* Badge condicional para ofertas o productos nuevos */}
                                                                {item.badge && (
                                                                    <span className={`badge ${
                                                                        item.badge === 'Oferta' ? 'bg-danger' :
                                                                        item.badge === 'Nuevo' ? 'bg-success' :
                                                                        'bg-dark'
                                                                    }`}>
                                                                        {item.badge}
                                                                    </span>
                                                                )}
                                                                {/* Mostrar talla si existe */}
                                                                {item.size && (
                                                                    <span className="badge bg-secondary">
                                                                        <i className="bi bi-rulers me-1"></i>
                                                                        Talla {item.size}
                                                                    </span>
                                                                )}
                                                                {/* Mostrar color si existe */}
                                                                {item.color && (
                                                                    <span className="badge bg-light text-dark border">
                                                                        <i className="bi bi-palette me-1"></i>
                                                                        {item.color}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <strong>{item.price.toFixed(2)}€</strong>
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                                        <button 
                                                            className="btn btn-sm btn-outline-dark"
                                                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                            style={{ width: '32px', height: '32px', padding: 0 }}
                                                        >
                                                            <i className="bi bi-dash"></i>
                                                        </button>
                                                        <span className="fw-bold" style={{ minWidth: '30px', textAlign: 'center' }}>
                                                            {item.quantity}
                                                        </span>
                                                        <button 
                                                            className="btn btn-sm btn-outline-dark"
                                                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                            style={{ width: '32px', height: '32px', padding: 0 }}
                                                        >
                                                            <i className="bi bi-plus"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <strong className="text-dark">
                                                        {(item.price * item.quantity).toFixed(2)}€
                                                    </strong>
                                                </td>
                                                <td className="text-center">
                                                    <button 
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => removeFromCart(item.id, item.size)}
                                                        title="Eliminar del carrito"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Botón seguir comprando */}
                            <div className="mt-3">
                                <button 
                                    onClick={() => navigate('/productos')}
                                    className="btn btn-outline-dark"
                                >
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Seguir comprando
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resumen del pedido */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
                        <div className="card-body">
                            <h5 className="card-title mb-4">
                                <i className="bi bi-receipt me-2"></i>
                                Resumen del pedido
                            </h5>

                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal</span>
                                <strong>{calculateSubtotal().toFixed(2)}€</strong>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <span>IVA (21%)</span>
                                <strong>{calculateIVA().toFixed(2)}€</strong>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <span>Envío</span>
                                <strong>
                                    {calculateShipping() === 0 ? (
                                        <span className="text-success">Gratis</span>
                                    ) : (
                                        `${calculateShipping().toFixed(2)}€`
                                    )}
                                </strong>
                            </div>

                            {calculateSubtotal() < 150 && (
                                <div className="alert alert-info py-2 px-3 mb-3" role="alert">
                                    <small>
                                        <i className="bi bi-info-circle me-2"></i>
                                        Añade {(150 - calculateSubtotal()).toFixed(2)}€ más para envío gratis
                                    </small>
                                </div>
                            )}

                            <hr />

                            <div className="d-flex justify-content-between mb-4">
                                <strong className="fs-5">Total</strong>
                                <strong className="fs-5 text-dark">
                                    {calculateTotal().toFixed(2)}€
                                </strong>
                            </div>

                            <button 
                                onClick={handleCheckout}
                                className="btn btn-dark btn-lg w-100 mb-3"
                            >
                                <i className="bi bi-credit-card me-2"></i>
                                Proceder al pago
                            </button>

                            {/* Información adicional */}
                            <div className="border-top pt-3">
                                <small className="text-muted d-block mb-2">
                                    <i className="bi bi-shield-check me-2"></i>
                                    Pago seguro con Stripe
                                </small>
                                <small className="text-muted d-block mb-2">
                                    <i className="bi bi-truck me-2"></i>
                                    Envío en 24-48h
                                </small>
                                <small className="text-muted d-block">
                                    <i className="bi bi-arrow-repeat me-2"></i>
                                    Devoluciones gratuitas 30 días
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
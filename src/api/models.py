from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Float, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

# Instancia principal de SQLAlchemy para la base de datos
db = SQLAlchemy()


class User(db.Model):
    # ID único y clave primaria del usuario
    id: Mapped[int] = mapped_column(primary_key=True)

    # Email del usuario, único y obligatorio, máximo 120 caracteres
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)

    # Contraseña del usuario, campo obligatorio
    password: Mapped[str] = mapped_column(nullable=False)

    # Estado activo/inactivo del usuario
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    # Relación con pedidos (un usuario puede tener múltiples pedidos)
    orders = relationship('Order', back_populates='user', lazy=True)

    # Método para convertir el objeto User a diccionario JSON
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }


class Product(db.Model):
    """Modelo para productos de la tienda"""
    id: Mapped[int] = mapped_column(primary_key=True)

    # Información básica del producto
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    brand: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)

    # Precios e información comercial
    price: Mapped[float] = mapped_column(Float, nullable=False)
    old_price: Mapped[float] = mapped_column(
        Float, nullable=True)  # Para ofertas

    # Imágenes (múltiples, separadas por comas)
    image: Mapped[str] = mapped_column(String(500), nullable=False)
    additional_images: Mapped[str] = mapped_column(
        Text, nullable=True)  # JSON o CSV de URLs

    # Colores disponibles (separados por comas)
    colors: Mapped[str] = mapped_column(String(200), nullable=True)

    # Inventario y disponibilidad
    stock: Mapped[int] = mapped_column(Integer, default=0)
    is_available: Mapped[bool] = mapped_column(Boolean(), default=True)

    # Categorización y badges
    category: Mapped[str] = mapped_column(String(100), nullable=True)
    is_new: Mapped[bool] = mapped_column(Boolean(), default=False)
    is_featured: Mapped[bool] = mapped_column(Boolean(), default=False)
    # "Oferta", "Nuevo", etc.
    badge: Mapped[str] = mapped_column(String(50), nullable=True)

    # Valoraciones
    rating: Mapped[float] = mapped_column(Float, default=0.0)
    reviews_count: Mapped[int] = mapped_column(Integer, default=0)

    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relación con items de pedido
    order_items = relationship(
        'OrderItem', back_populates='product', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "brand": self.brand,
            "description": self.description,
            "price": self.price,
            "old_price": self.old_price,
            "image": self.image,
            "additional_images": self.additional_images.split(',') if self.additional_images else [],
            "colors": self.colors.split(',') if self.colors else [],
            "stock": self.stock,
            "is_available": self.is_available,
            "category": self.category,
            "is_new": self.is_new,
            "is_featured": self.is_featured,
            "badge": self.badge,
            "rating": self.rating,
            "reviews_count": self.reviews_count,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

    def serialize_simple(self):
        """Versión simplificada para listados"""
        return {
            "id": self.id,
            "name": self.name,
            "brand": self.brand,
            "price": self.price,
            "old_price": self.old_price,
            "image": self.image,
            "rating": self.rating,
            "reviews_count": self.reviews_count,
            "badge": self.badge,
            "is_new": self.is_new,
        }


class Order(db.Model):
    """Modelo para pedidos de clientes"""
    id: Mapped[int] = mapped_column(primary_key=True)

    # Relación con usuario
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    user = relationship('User', back_populates='orders')

    # Número de orden único
    order_number: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False)

    # Información de pago Stripe
    payment_intent_id: Mapped[str] = mapped_column(String(200), nullable=True)
    payment_status: Mapped[str] = mapped_column(
        String(50), default='pending')  # pending, paid, failed

    # Montos
    subtotal: Mapped[float] = mapped_column(Float, nullable=False)
    tax: Mapped[float] = mapped_column(Float, default=0.0)
    shipping: Mapped[float] = mapped_column(Float, default=0.0)
    total: Mapped[float] = mapped_column(Float, nullable=False)

    # Estado del pedido
    status: Mapped[str] = mapped_column(String(50), default='pending')
    # pending, processing, shipped, delivered, cancelled

    # Información de envío
    shipping_name: Mapped[str] = mapped_column(String(200), nullable=False)
    shipping_email: Mapped[str] = mapped_column(String(200), nullable=False)
    shipping_phone: Mapped[str] = mapped_column(String(50), nullable=True)
    shipping_address: Mapped[str] = mapped_column(String(300), nullable=False)
    shipping_city: Mapped[str] = mapped_column(String(100), nullable=False)
    shipping_postal_code: Mapped[str] = mapped_column(
        String(20), nullable=False)
    shipping_country: Mapped[str] = mapped_column(String(2), default='ES')

    # Información de seguimiento
    tracking_number: Mapped[str] = mapped_column(String(100), nullable=True)

    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    shipped_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    delivered_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)

    # Relaciones
    items = relationship('OrderItem', back_populates='order',
                         lazy=True, cascade='all, delete-orphan')
    returns = relationship('Return', back_populates='order', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "order_number": self.order_number,
            "user_id": self.user_id,
            "payment_status": self.payment_status,
            "status": self.status,
            "subtotal": self.subtotal,
            "tax": self.tax,
            "shipping": self.shipping,
            "total": self.total,
            "shipping_info": {
                "name": self.shipping_name,
                "email": self.shipping_email,
                "phone": self.shipping_phone,
                "address": self.shipping_address,
                "city": self.shipping_city,
                "postal_code": self.shipping_postal_code,
                "country": self.shipping_country,
            },
            "tracking_number": self.tracking_number,
            "items": [item.serialize() for item in self.items],
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "shipped_at": self.shipped_at.isoformat() if self.shipped_at else None,
            "delivered_at": self.delivered_at.isoformat() if self.delivered_at else None,
        }


class OrderItem(db.Model):
    """Modelo para items individuales dentro de un pedido"""
    id: Mapped[int] = mapped_column(primary_key=True)

    # Relaciones
    order_id: Mapped[int] = mapped_column(
        ForeignKey('order.id'), nullable=False)
    order = relationship('Order', back_populates='items')

    product_id: Mapped[int] = mapped_column(
        ForeignKey('product.id'), nullable=False)
    product = relationship('Product', back_populates='order_items')

    # Información del producto en el momento de la compra
    product_name: Mapped[str] = mapped_column(String(200), nullable=False)
    product_price: Mapped[float] = mapped_column(Float, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    subtotal: Mapped[float] = mapped_column(Float, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "product_name": self.product_name,
            "product_price": self.product_price,
            "quantity": self.quantity,
            "subtotal": self.subtotal,
            "product": self.product.serialize_simple() if self.product else None,
        }


class Return(db.Model):
    """Modelo para gestión de devoluciones"""
    id: Mapped[int] = mapped_column(primary_key=True)

    # Relación con pedido
    order_id: Mapped[int] = mapped_column(
        ForeignKey('order.id'), nullable=False)
    order = relationship('Order', back_populates='returns')

    # Información de la devolución
    reason: Mapped[str] = mapped_column(String(50), nullable=False)
    # defective, wrong_size, not_as_described, changed_mind, other

    description: Mapped[str] = mapped_column(Text, nullable=True)

    # Estado
    status: Mapped[str] = mapped_column(String(50), default='pending')
    # pending, approved, rejected, refunded, completed

    # Reembolso
    refund_amount: Mapped[float] = mapped_column(Float, nullable=True)
    refund_id: Mapped[str] = mapped_column(
        String(200), nullable=True)  # Stripe refund ID

    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    resolved_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "reason": self.reason,
            "description": self.description,
            "status": self.status,
            "refund_amount": self.refund_amount,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "resolved_at": self.resolved_at.isoformat() if self.resolved_at else None,
        }
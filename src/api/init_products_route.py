from flask import Blueprint, jsonify
from api.models import db, Product

init_bp = Blueprint('init', __name__)

@init_bp.route('/init-products', methods=['GET'])
def init_products():
    """Endpoint para inicializar productos en la base de datos"""
    
    products_data = [
        {
            "name": "Air Jordan 1 Retro High OG",
            "brand": "Nike",
            "price": 180.00,
            "image": "/img/airjordan-1.webp",
            "description": "El icónico Air Jordan 1 que revolucionó el baloncesto. Diseño clásico con cuero premium.",
            "stock": 45,
            "rating": 4.9,
            "reviews_count": 2847,
            "category": "Basketball",
            "badge": "Nuevo"
        },
        {
            "name": "Air Force 1 '07",
            "brand": "Nike",
            "price": 110.00,
            "image": "/img/airforce-1.png",
            "description": "El clásico de 1982 que nunca pasa de moda. Estilo atemporal con amortiguación Air.",
            "stock": 120,
            "rating": 4.8,
            "reviews_count": 5234,
            "category": "Casual",
            "badge": None
        },
        {
            "name": "Air Max 90",
            "brand": "Nike",
            "price": 140.00,
            "image": "/img/airmax-90.png",
            "description": "El icónico diseño con la legendaria unidad Air visible. Un clásico de los 90.",
            "stock": 78,
            "rating": 4.7,
            "reviews_count": 3421,
            "category": "Sport",
            "badge": "Oferta"
        },
        {
            "name": "Dunk Low Retro Panda",
            "brand": "Nike",
            "price": 115.00,
            "image": "/img/dunklow-panda.webp",
            "description": "El Dunk más buscado del año. Combinación blanco y negro icónica.",
            "stock": 92,
            "rating": 4.9,
            "reviews_count": 1876,
            "category": "Casual",
            "badge": "Nuevo"
        },
        {
            "name": "Air Max 97 Silver Bullet",
            "brand": "Nike",
            "price": 185.00,
            "image": "/img/airmax-97.avif",
            "description": "Inspirado en las líneas de velocidad de los trenes bala. Estilo futurista inconfundible.",
            "stock": 34,
            "rating": 4.8,
            "reviews_count": 2103,
            "category": "Sport",
            "badge": None
        },
        {
            "name": "Blazer Mid '77 Vintage",
            "brand": "Nike",
            "price": 105.00,
            "image": "/img/blazermid-77.png",
            "description": "El clásico del baloncesto de los 70 con acabado vintage. Suela de goma vulcanizada.",
            "stock": 67,
            "rating": 4.6,
            "reviews_count": 987,
            "category": "Casual",
            "badge": None
        },
        {
            "name": "Air Jordan 4 Retro Military Black",
            "brand": "Nike",
            "price": 210.00,
            "image": "/img/airjordan-4.jfif",
            "description": "El Jordan 4 combina estilo y rendimiento. Malla transpirable y soportes laterales.",
            "stock": 28,
            "rating": 4.9,
            "reviews_count": 1654,
            "category": "Basketball",
            "badge": "Nuevo"
        },
        {
            "name": "Air Max 270",
            "brand": "Nike",
            "price": 160.00,
            "image": "/img/airmax-270.png",
            "description": "La unidad Air más grande de Nike. Diseño moderno con máxima comodidad.",
            "stock": 89,
            "rating": 4.7,
            "reviews_count": 2456,
            "category": "Sport",
            "badge": "Oferta"
        },
        {
            "name": "React Infinity Run Flyknit 3",
            "brand": "Nike",
            "price": 170.00,
            "image": "/img/react-infinity-run.avif",
            "description": "Running de alto rendimiento con espuma React. Diseñado para reducir lesiones.",
            "stock": 56,
            "rating": 4.8,
            "reviews_count": 1234,
            "category": "Running",
            "badge": None
        },
        {
            "name": "Cortez Leather White",
            "brand": "Nike",
            "price": 75.00,
            "image": "/img/cortez.png",
            "description": "El primer gran éxito de Nike desde 1972. Diseño retro con estilo atemporal.",
            "stock": 110,
            "rating": 4.6,
            "reviews_count": 876,
            "category": "Casual",
            "badge": None
        },
        {
            "name": "Air Max Plus Triple Black",
            "brand": "Nike",
            "price": 180.00,
            "image": "/img/airmax-plus.webp",
            "description": "El legendario TN con su diseño agresivo de ondas. Máxima amortiguación Air.",
            "stock": 41,
            "rating": 4.8,
            "reviews_count": 1567,
            "category": "Sport",
            "badge": "Nuevo"
        },
        {
            "name": "Pegasus 40 Running",
            "brand": "Nike",
            "price": 140.00,
            "image": "/img/Pegasus-40.avif",
            "description": "El caballo de batalla del running. Amortiguación reactiva para todo tipo de corredores.",
            "stock": 95,
            "rating": 4.7,
            "reviews_count": 3201,
            "category": "Running",
            "badge": None
        }
    ]
    
    added = 0
    for p in products_data:
        # Verificar si ya existe
        existing = Product.query.filter_by(name=p["name"]).first()
        if not existing:
            product = Product(**p)
            db.session.add(product)
            added += 1
    
    db.session.commit()
    
    return jsonify({"message": f"✅ {added} productos añadidos correctamente. Total: {Product.query.count()}"}), 200

@init_bp.route('/delete-bad-products', methods=['GET'])
def delete_bad_products():
    """Borrar los 5 productos incorrectos"""
    ids_to_delete = [1, 2, 3, 4, 5]
    deleted = 0
    
    for product_id in ids_to_delete:
        product = Product.query.get(product_id)
        if product:
            db.session.delete(product)
            deleted += 1
    
    db.session.commit()
    return jsonify({"message": f"✅ {deleted} productos incorrectos borrados"}), 200
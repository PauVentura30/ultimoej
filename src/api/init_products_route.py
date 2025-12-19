from flask import Blueprint, jsonify
from api.models import db, Product

init_bp = Blueprint('init', __name__)

@init_bp.route('/init-products', methods=['GET'])
def init_products():
    """Endpoint para inicializar productos en la base de datos"""
    
    # Verificar si ya hay productos
    if Product.query.count() > 0:
        return jsonify({"message": f"Ya hay {Product.query.count()} productos en la BD"}), 200
    
    products_data = [
        {"name": "Nike Air Jordan 1", "brand": "Nike", "description": "Icónicas Air Jordan 1", "price": 189.99, "image": "/img/Jordan-1.webp", "stock": 50, "category": "Basketball", "rating": 4.8, "reviews_count": 324},
        {"name": "Adidas Superstar", "brand": "Adidas", "description": "Clásicas Superstar", "price": 89.99, "image": "/img/adidas-superstar.webp", "stock": 100, "category": "Casual", "rating": 4.6, "reviews_count": 512},
        {"name": "Converse Chuck Taylor", "brand": "Converse", "description": "Modelo icónico", "price": 69.99, "image": "/img/converseallstar.webp", "stock": 80, "category": "Casual", "rating": 4.5, "reviews_count": 478},
        {"name": "Nike Air Force 1", "brand": "Nike", "description": "Legendarias Air Force 1", "price": 109.99, "image": "/img/Nike-Air-Force-One.webp", "stock": 75, "category": "Lifestyle", "rating": 4.7, "reviews_count": 389},
        {"name": "Vans Old Skool", "brand": "Vans", "description": "Modelo más vendido", "price": 79.99, "image": "/img/vans-old-skool.webp", "stock": 90, "category": "Skate", "rating": 4.4, "reviews_count": 421}
    ]
    
    added = 0
    for p in products_data:
        product = Product(**p)
        db.session.add(product)
        added += 1
    
    db.session.commit()
    
    return jsonify({"message": f"✅ {added} productos añadidos correctamente"}), 200
from flask import Blueprint, jsonify, request
from api.models import db, Product
from api.utils import APIException

# Blueprint para las rutas de productos
api_products = Blueprint('api_products', __name__)

@api_products.route('/products', methods=['GET'])
def get_all_products():
    """Obtener todos los productos"""
    try:
        # Query todos los productos disponibles
        products = Product.query.filter_by(is_available=True).all()
        
        # Serializar productos
        products_list = [product.serialize() for product in products]
        
        return jsonify({
            "success": True,
            "products": products_list,
            "total": len(products_list)
        }), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@api_products.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Obtener un producto específico por ID"""
    try:
        product = Product.query.get(product_id)
        
        if not product:
            return jsonify({
                "success": False,
                "error": "Producto no encontrado"
            }), 404
        
        return jsonify({
            "success": True,
            "product": product.serialize()
        }), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@api_products.route('/products/featured', methods=['GET'])
def get_featured_products():
    """Obtener productos destacados"""
    try:
        featured = Product.query.filter_by(is_featured=True, is_available=True).all()
        
        return jsonify({
            "success": True,
            "products": [p.serialize() for p in featured],
            "total": len(featured)
        }), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@api_products.route('/products/new', methods=['GET'])
def get_new_products():
    """Obtener productos nuevos"""
    try:
        new_products = Product.query.filter_by(is_new=True, is_available=True).limit(8).all()
        
        return jsonify({
            "success": True,
            "products": [p.serialize() for p in new_products],
            "total": len(new_products)
        }), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@api_products.route('/products/category/<string:category>', methods=['GET'])
def get_products_by_category(category):
    """Obtener productos por categoría"""
    try:
        products = Product.query.filter_by(category=category, is_available=True).all()
        
        return jsonify({
            "success": True,
            "products": [p.serialize() for p in products],
            "category": category,
            "total": len(products)
        }), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@api_products.route('/products/search', methods=['GET'])
def search_products():
    """Buscar productos por nombre o marca"""
    try:
        query = request.args.get('q', '')
        
        if not query:
            return jsonify({
                "success": False,
                "error": "Query parameter 'q' is required"
            }), 400
        
        # Buscar en nombre y marca (case insensitive)
        products = Product.query.filter(
            db.or_(
                Product.name.ilike(f'%{query}%'),
                Product.brand.ilike(f'%{query}%')
            ),
            Product.is_available == True
        ).all()
        
        return jsonify({
            "success": True,
            "products": [p.serialize() for p in products],
            "query": query,
            "total": len(products)
        }), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
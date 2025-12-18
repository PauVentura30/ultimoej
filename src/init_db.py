from app import app, db
from api.models import Product

with app.app_context():
    db.create_all()
    print("✅ Tablas creadas correctamente")
    
    # Verificar si ya hay productos
    if Product.query.count() == 0:
        print("🛍️  No hay productos, ejecutando insert-products...")
        from api.commands import insert_products
        # Ejecutar el comando directamente
        with app.app_context():
            insert_products.callback()
    else:
        print(f"✅ Ya hay {Product.query.count()} productos en la base de datos")
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from datetime import timedelta
from api.routes_products import api_products

# Determinar entorno de ejecución (desarrollo o producción)
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"

# Configurar directorio de archivos estáticos para el frontend
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')

# Crear instancia principal de la aplicación Flask
app = Flask(__name__)
app.url_map.strict_slashes = False

# Configurar CORS para permitir peticiones desde el frontend
CORS(app, 
     resources={r"/api/*": {"origins": "*"}},
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////workspaces/ultimoej/database.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
print("✅ database.db ready")

# Configuración adicional para producción
if ENV == "production":
    # Configuraciones específicas para producción
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'pool_pre_ping': True,
        'pool_recycle': 300,
    }

# Inicializar migraciones de base de datos
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Configuración de JWT para autenticación de usuarios
app.config["JWT_SECRET_KEY"] = os.getenv("FLASK_APP_KEY", "super-secret")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
jwt = JWTManager(app)

# Inicializar Bcrypt para encriptación de contraseñas
bcrypt = Bcrypt(app)

# Configurar panel de administración Flask-Admin
try:
    setup_admin(app)
except Exception as e:
    print(f"⚠️ Error configurando admin: {e}")

# Configurar comandos CLI personalizados
try:
    setup_commands(app)
except Exception as e:
    print(f"⚠️ Error configurando comandos: {e}")

# Registrar rutas principales de la API con prefijo '/api'
app.register_blueprint(api, url_prefix="/api")
app.register_blueprint(api_products, url_prefix='/api')

# Importar y registrar rutas de Stripe de forma segura
try:
    # Solo importar si Stripe está disponible
    stripe_key = os.getenv('STRIPE_SECRET_KEY')
    if stripe_key:
        from api.stripe_routes import stripe_bp
        app.register_blueprint(stripe_bp, url_prefix='/api')
        print("✅ Rutas de Stripe registradas correctamente")
    else:
        print("⚠️ STRIPE_SECRET_KEY no configurada, saltando rutas de Stripe")
except ImportError as e:
    print(f"⚠️ No se pudieron cargar las rutas de Stripe: {e}")
except Exception as e:
    print(f"⚠️ Error configurando Stripe: {e}")

# Manejador global de errores para APIException personalizada
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Manejador de errores 500 para producción
@app.errorhandler(500)
def handle_500_error(error):
    if ENV == "production":
        return jsonify({"error": "Error interno del servidor"}), 500
    else:
        return jsonify({"error": str(error)}), 500

# Manejador de errores 404
@app.errorhandler(404)
def handle_404_error(error):
    return jsonify({"error": "Endpoint no encontrado"}), 404


# Crear tablas automáticamente
with app.app_context():
    try:
        db.create_all()
        print("✅ Tablas de base de datos creadas exitosamente")
    except Exception as e:
        print(f"⚠️ Error creando tablas: {e}")

# Ruta principal que genera sitemap en desarrollo o sirve index.html en producción
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Ruta catch-all para servir archivos estáticos del frontend
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Evitar caché para desarrollo
    return response

# Endpoint de salud para verificar que la app está funcionando
@app.route('/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "environment": ENV,
        "database": "connected" if db else "disconnected"
    })


# Punto de entrada principal cuando se ejecuta directamente
if __name__ == '__main__':
    import sys

    # Verificar si se pasó el comando insert-products
    if len(sys.argv) > 1 and sys.argv[1] == 'insert-products':
        from api.models import Product

        print("🛍️  Insertando productos en la base de datos...")

        # Lista de productos a insertar CON IMÁGENES LOCALES
        productos_iniciales = [
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

        # Insertar cada producto en la base de datos
        productos_agregados = 0
        with app.app_context():
            for producto_data in productos_iniciales:
                # Verificar si el producto ya existe
                existing = Product.query.filter_by(
                    name=producto_data["name"]).first()
                if existing:
                    print(
                        f"⏭️  Saltando '{producto_data['name']}' (ya existe)")
                    continue

                # Crear nuevo producto
                nuevo_producto = Product(
                    name=producto_data["name"],
                    brand=producto_data["brand"],
                    price=producto_data["price"],
                    image=producto_data["image"],
                    description=producto_data["description"],
                    stock=producto_data["stock"],
                    rating=producto_data["rating"],
                    reviews_count=producto_data["reviews_count"],
                    category=producto_data["category"],
                    badge=producto_data["badge"]
                )

                try:
                    db.session.add(nuevo_producto)
                    db.session.commit()
                    print(f"✅ Producto '{producto_data['name']}' agregado")
                    productos_agregados += 1
                except Exception as e:
                    db.session.rollback()
                    print(f"❌ Error agregando '{producto_data['name']}': {e}")

        print(
            f"\n🎉 ¡Completado! {productos_agregados} productos agregados a la base de datos.")

    else:
        # Ejecutar servidor Flask normalmente
        PORT = int(os.environ.get('PORT', 3001))
        app.run(host='0.0.0.0', port=PORT, debug=(ENV == "development"))
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

# Importación segura de Stripe con manejo de errores
try:
    import stripe
    from dotenv import load_dotenv
    load_dotenv()
    # Configurar Stripe solo si la clave secreta está disponible
    if os.getenv('STRIPE_SECRET_KEY'):
        stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
        print("✅ Stripe configurado correctamente")
    else:
        print("⚠️ STRIPE_SECRET_KEY no encontrada en .env")
except ImportError:
    print("⚠️ Stripe no instalado - instalarlo con: pipenv install stripe")
    stripe = None

# Determinar entorno de ejecución (desarrollo o producción)
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"

# Configurar directorio de archivos estáticos para el frontend
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')

# Crear instancia principal de la aplicación Flask
app = Flask(__name__)
app.url_map.strict_slashes = False

# Configurar CORS para permitir peticiones desde el frontend
CORS(app, origins=[
    "https://ubiquitous-space-doodle-4jwj6wq5rw9q26jp-3000.app.github.dev",
    "https://ubiquitous-space-doodle-4jwj6wq5rw9q26jp-3001.app.github.dev",
    "http://localhost:3000",
    "http://localhost:3001"
])

# Configuración de la base de datos con soporte para PostgreSQL y SQLite
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

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
setup_admin(app)

# Configurar comandos CLI personalizados
setup_commands(app)

# Registrar rutas principales de la API con prefijo '/api'
app.register_blueprint(api, url_prefix='/api')

# Importar y registrar rutas de Stripe de forma segura
try:
    from api.stripe_routes import stripe_bp
    app.register_blueprint(stripe_bp, url_prefix='/api')
    print("✅ Rutas de Stripe registradas correctamente")
except ImportError as e:
    print(f"⚠️ No se pudieron cargar las rutas de Stripe: {e}")
except Exception as e:
    print(f"⚠️ Error configurando Stripe: {e}")

# Manejador global de errores para APIException personalizada
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Ruta principal que genera sitemap en desarrollo o sirve index.html en producción
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Ruta catch-all para servir archivos estáticos del frontend
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Evitar caché para desarrollo
    return response

# Punto de entrada principal cuando se ejecuta directamente
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
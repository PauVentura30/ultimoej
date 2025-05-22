"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS  # AÑADIR ESTA LÍNEA
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from datetime import timedelta

# Importaciones para Stripe (añadidas de forma segura)
try:
    import stripe
    from dotenv import load_dotenv
    load_dotenv()
    # Solo configurar Stripe si la clave existe
    if os.getenv('STRIPE_SECRET_KEY'):
        stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
        print("✅ Stripe configurado correctamente")
    else:
        print("⚠️ STRIPE_SECRET_KEY no encontrada en .env")
except ImportError:
    print("⚠️ Stripe no instalado - instalarlo con: pipenv install stripe")
    stripe = None

# from models import Person
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# CONFIGURAR CORS - AÑADIR ESTAS LÍNEAS
CORS(app, origins=[
    "https://ubiquitous-space-doodle-4jwj6wq5rw9q26jp-3000.app.github.dev",
    "https://ubiquitous-space-doodle-4jwj6wq5rw9q26jp-3001.app.github.dev",
    "http://localhost:3000",
    "http://localhost:3001"
])

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# inicializar el token
app.config["JWT_SECRET_KEY"] = os.getenv("FLASK_APP_KEY", "super-secret")  # AÑADIR ESTA LÍNEA
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
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

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import stripe
import os

# Blueprint principal para organizar las rutas de la API
api = Blueprint('api', __name__)

# Instancia de Bcrypt para encriptar contraseñas
bcrypt = Bcrypt()

# Configuración de la clave secreta de Stripe para pagos
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

# Habilita CORS para permitir peticiones desde el frontend
CORS(api)

# Endpoint para registro de nuevos usuarios
@api.route("/signup", methods= ["POST"])
def signup():
    body = request.get_json()
    # Encripta la contraseña antes de guardarla
    hashpass = bcrypt.generate_password_hash(body["password"]).decode("utf-8")
    # Crea nuevo usuario con contraseña encriptada
    new_user = User(email=body["email"], password = hashpass, is_active = True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "Registrado"}), 201

# Endpoint para autenticación de usuarios existentes
@api.route("/login", methods= ["POST"])
def login():
    body = request.get_json()
    # Busca el usuario por email en la base de datos
    user = User.query.filter_by(email= body["email"]).first()
    # Verifica que el usuario existe y la contraseña es correcta
    if user and bcrypt.check_password_hash(user.password, body["password"]):
        # Genera token JWT para la sesión
        access_token = create_access_token(identity=user.email)
        return jsonify({"access_token": access_token, "user": user.email}), 200
    return jsonify({"msg": "Credenciales Invalidas"})

# Endpoint protegido que requiere autenticación JWT
@api.route("/private", methods= ["GET"])
@jwt_required()
def private():
    # Obtiene la identidad del usuario del token JWT
    current_user = get_jwt_identity()
    return jsonify(logged_as = current_user), 200

# Endpoint para crear intención de pago con Stripe
@api.route("/create-payment-intent", methods=["POST"])
def create_payment_intent():
    try:
        body = request.get_json()
        amount = body.get('amount')  # Monto en centavos
        
        # Crea Payment Intent en Stripe para procesar el pago
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='eur',
            metadata={'integration_check': 'accept_a_payment'}
        )
        
        # Retorna el client_secret necesario para el frontend
        return jsonify({
            'client_secret': intent.client_secret
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Endpoint para obtener detalles de una orden completada
@api.route("/order-details/<payment_intent_id>", methods=["GET"])
def get_order_details(payment_intent_id):
    try:
        # Recupera los detalles del pago desde Stripe
        intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        
        # Formatea y retorna los datos de la orden para mostrar al usuario
        return jsonify({
            'id': intent.id,
            'order_number': payment_intent_id[-8:].upper(),  # Últimos 8 caracteres como número de orden
            'total': f"{intent.amount / 100:.2f}",  # Convierte centavos a euros
            'amount': intent.amount,
            'currency': intent.currency,
            'status': intent.status,
            'created': intent.created,
            'metadata': intent.metadata
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400
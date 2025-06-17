from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

# Blueprint principal para organizar las rutas de la API
api = Blueprint('api', __name__)

# Instancia de Bcrypt para encriptar contraseñas
bcrypt = Bcrypt()

# Habilita CORS para permitir peticiones desde el frontend
CORS(api)

# Configuración de Stripe solo si está disponible
try:
    import stripe
    import os
    stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
except ImportError:
    print("⚠️ Stripe no disponible")
    stripe = None

# Endpoint para registro de nuevos usuarios - CORREGIDO
@api.route("/signup", methods=["POST"])
def signup():
    try:
        body = request.get_json()
        
        # Validación de datos requeridos
        if not body:
            return jsonify({"msg": "No se enviaron datos"}), 400
            
        email = body.get("email")
        password = body.get("password")
        
        if not email or not password:
            return jsonify({"msg": "Email y contraseña son requeridos"}), 400
        
        # Verificar si el usuario ya existe
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"msg": "El usuario ya existe"}), 400
        
        # Encripta la contraseña antes de guardarla
        hashpass = bcrypt.generate_password_hash(password).decode("utf-8")
        
        # Crea nuevo usuario con los campos básicos requeridos
        new_user = User(
            email=email, 
            password=hashpass, 
            is_active=True
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"msg": "Usuario registrado exitosamente"}), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"Error en registro: {str(e)}")
        return jsonify({"msg": "Error interno del servidor"}), 500

# Endpoint para autenticación de usuarios existentes
@api.route("/login", methods=["POST"])
def login():
    try:
        body = request.get_json()
        
        if not body:
            return jsonify({"msg": "No se enviaron datos"}), 400
            
        email = body.get("email")
        password = body.get("password")
        
        if not email or not password:
            return jsonify({"msg": "Email y contraseña son requeridos"}), 400
        
        # Busca el usuario por email en la base de datos
        user = User.query.filter_by(email=email).first()
        
        # Verifica que el usuario existe y la contraseña es correcta
        if user and bcrypt.check_password_hash(user.password, password):
            # Genera token JWT para la sesión
            access_token = create_access_token(identity=user.email)
            return jsonify({
                "access_token": access_token, 
                "user": user.email
            }), 200
        else:
            return jsonify({"msg": "Credenciales inválidas"}), 401
            
    except Exception as e:
        print(f"Error en login: {str(e)}")
        return jsonify({"msg": "Error interno del servidor"}), 500

# Endpoint protegido que requiere autenticación JWT
@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    try:
        # Obtiene la identidad del usuario del token JWT
        current_user = get_jwt_identity()
        return jsonify(logged_as=current_user), 200
    except Exception as e:
        print(f"Error en endpoint privado: {str(e)}")
        return jsonify({"msg": "Error interno del servidor"}), 500

# Endpoint para crear intención de pago con Stripe - MEJORADO
@api.route("/create-payment-intent", methods=["POST"])
def create_payment_intent():
    # Verificar si Stripe está disponible
    if not stripe:
        return jsonify({'error': 'Stripe no está configurado'}), 503
        
    try:
        body = request.get_json()
        
        if not body:
            return jsonify({'error': 'No se enviaron datos'}), 400
            
        amount = body.get('amount')
        
        if not amount:
            return jsonify({'error': 'Monto es requerido'}), 400
        
        # Crea Payment Intent en Stripe para procesar el pago
        intent = stripe.PaymentIntent.create(
            amount=int(amount),
            currency='eur',
            metadata={'integration_check': 'accept_a_payment'}
        )
        
        # Retorna el client_secret necesario para el frontend
        return jsonify({
            'client_secret': intent.client_secret
        })
        
    except stripe.error.StripeError as e:
        print(f"Error de Stripe: {str(e)}")
        return jsonify({'error': 'Error de procesamiento de pago'}), 400
    except Exception as e:
        print(f"Error general: {str(e)}")
        return jsonify({'error': 'Error interno del servidor'}), 500

# Endpoint para obtener detalles de una orden completada - MEJORADO
@api.route("/order-details/<payment_intent_id>", methods=["GET"])
def get_order_details(payment_intent_id):
    # Verificar si Stripe está disponible
    if not stripe:
        return jsonify({'error': 'Stripe no está configurado'}), 503
        
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
        
    except stripe.error.StripeError as e:
        print(f"Error de Stripe: {str(e)}")
        return jsonify({'error': 'Error obteniendo detalles del pago'}), 400
    except Exception as e:
        print(f"Error general: {str(e)}")
        return jsonify({'error': 'Error interno del servidor'}), 500
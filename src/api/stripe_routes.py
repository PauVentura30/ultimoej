import os
import stripe
import json
from datetime import datetime
from functools import wraps
from flask import Blueprint, request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity

# Blueprint específico para manejar todas las rutas relacionadas con Stripe
stripe_bp = Blueprint('stripe', __name__)

# Configuración de la API key de Stripe con variable de entorno
if os.getenv('STRIPE_SECRET_KEY'):
    stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

def stripe_token_required(f):
    """Decorador personalizado para verificar autenticación JWT en endpoints de Stripe"""
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            verify_jwt_in_request()
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({'message': 'Token is invalid'}), 401
    return decorated

@stripe_bp.route('/create-payment-intent', methods=['POST'])
@stripe_token_required
def create_payment_intent():
    """Endpoint para crear intención de pago con información de envío detallada"""
    try:
        data = request.get_json()
        
        # Validación de datos obligatorios del frontend
        if not data.get('amount') or not data.get('items'):
            return jsonify({'error': 'Faltan datos requeridos'}), 400
        
        # Creación del Payment Intent con metadatos y dirección de envío
        intent = stripe.PaymentIntent.create(
            amount=int(data['amount']),  # Monto en centavos
            currency=data.get('currency', 'eur'),
            metadata={
                'user_email': data.get('shipping', {}).get('email', ''),
                'items_count': len(data['items']),
                'order_type': 'ecommerce'
            },
            # Información de envío estructurada para Stripe
            shipping={
                'name': f"{data.get('shipping', {}).get('name', '')} {data.get('shipping', {}).get('lastName', '')}",
                'phone': data.get('shipping', {}).get('phone', ''),
                'address': {
                    'line1': data.get('shipping', {}).get('address', ''),
                    'city': data.get('shipping', {}).get('city', ''),
                    'postal_code': data.get('shipping', {}).get('postalCode', ''),
                    'country': data.get('shipping', {}).get('country', 'ES'),
                }
            } if data.get('shipping') else None
        )
        
        return jsonify({
            'client_secret': intent.client_secret,
            'payment_intent_id': intent.id
        })
        
    except stripe.error.StripeError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        print(f"Error creando Payment Intent: {str(e)}")
        return jsonify({'error': 'Error interno del servidor'}), 500

@stripe_bp.route('/order-details/<payment_intent_id>', methods=['GET'])
@stripe_token_required
def get_order_details(payment_intent_id):
    """Endpoint para obtener detalles completos de una orden pagada"""
    try:
        # Recupera el Payment Intent desde Stripe usando el ID
        intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        
        # Solo retorna detalles si el pago fue exitoso
        if intent.status == 'succeeded':
            return jsonify({
                'order_number': f"ORD-{payment_intent_id[-8:].upper()}",
                'total': f"{intent.amount / 100:.2f}",
                'status': 'paid',
                'items': [],  # Placeholder para items desde base de datos
                'shipping': intent.shipping,
                'created': datetime.fromtimestamp(intent.created).isoformat()
            })
        else:
            return jsonify({'error': 'Pago no completado'}), 400
            
    except stripe.error.StripeError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        print(f"Error obteniendo detalles: {str(e)}")
        return jsonify({'error': 'Error interno del servidor'}), 500

@stripe_bp.route('/stripe-webhook', methods=['POST'])
def stripe_webhook():
    """Webhook para recibir notificaciones de eventos de Stripe"""
    payload = request.get_data()
    sig_header = request.headers.get('Stripe-Signature')
    
    # Obtiene el secreto del webhook desde variables de entorno
    webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')
    
    # Continúa sin webhook si no está configurado
    if not webhook_secret:
        print("⚠️ STRIPE_WEBHOOK_SECRET no configurado")
        return jsonify({'status': 'success'})
    
    try:
        # Verifica la autenticidad del webhook usando la firma
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except ValueError:
        return jsonify({'error': 'Invalid payload'}), 400
    except stripe.error.SignatureVerificationError:
        return jsonify({'error': 'Invalid signature'}), 400
    except Exception as e:
        print(f"Webhook error: {str(e)}")
        return jsonify({'error': 'Webhook error'}), 400
    
    # Procesa eventos de pago exitoso
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        print(f"✅ Pago exitoso: {payment_intent['id']}")
        # Placeholder para guardar orden en base de datos
    
    return jsonify({'status': 'success'})

@stripe_bp.route('/user-orders', methods=['GET'])
@stripe_token_required
def get_user_orders():
    """Endpoint para obtener historial de pedidos del usuario autenticado"""
    try:
        # Obtiene el email del usuario desde el token JWT
        user_email = get_jwt_identity()
        
        # Placeholder para consultar pedidos desde base de datos
        orders = []
        
        return jsonify({
            'orders': orders
        })
        
    except Exception as e:
        print(f"Error obteniendo pedidos: {str(e)}")
        return jsonify({'error': 'Error obteniendo pedidos'}), 500
"""
Stripe routes for payment processing
"""
import os
import stripe
import json
from datetime import datetime
from functools import wraps
from flask import Blueprint, request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity

# Crear Blueprint para Stripe
stripe_bp = Blueprint('stripe', __name__)

# Configurar Stripe (redundante pero seguro)
if os.getenv('STRIPE_SECRET_KEY'):
    stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

def stripe_token_required(f):
    """Decorator para verificar JWT en endpoints de Stripe"""
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
    """Crear Payment Intent en Stripe"""
    try:
        data = request.get_json()
        
        # Validar datos requeridos
        if not data.get('amount') or not data.get('items'):
            return jsonify({'error': 'Faltan datos requeridos'}), 400
        
        # Crear Payment Intent en Stripe
        intent = stripe.PaymentIntent.create(
            amount=int(data['amount']),  # Cantidad en centavos
            currency=data.get('currency', 'eur'),
            metadata={
                'user_email': data.get('shipping', {}).get('email', ''),
                'items_count': len(data['items']),
                'order_type': 'ecommerce'
            },
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
    """Obtener detalles de la orden"""
    try:
        # Obtener el Payment Intent de Stripe
        intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        
        if intent.status == 'succeeded':
            return jsonify({
                'order_number': f"ORD-{payment_intent_id[-8:].upper()}",
                'total': f"{intent.amount / 100:.2f}",
                'status': 'paid',
                'items': [],  # TODO: Implementar con base de datos
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
    """Webhook para confirmar pagos"""
    payload = request.get_data()
    sig_header = request.headers.get('Stripe-Signature')
    
    webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')
    
    if not webhook_secret:
        print("⚠️ STRIPE_WEBHOOK_SECRET no configurado")
        return jsonify({'status': 'success'})  # Continuar sin webhook por ahora
    
    try:
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
    
    # Manejar el evento
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        print(f"✅ Pago exitoso: {payment_intent['id']}")
        # TODO: Guardar en base de datos
    
    return jsonify({'status': 'success'})

@stripe_bp.route('/user-orders', methods=['GET'])
@stripe_token_required
def get_user_orders():
    """Obtener pedidos del usuario"""
    try:
        user_email = get_jwt_identity()
        
        # TODO: Implementar con base de datos
        orders = []
        
        return jsonify({
            'orders': orders
        })
        
    except Exception as e:
        print(f"Error obteniendo pedidos: {str(e)}")
        return jsonify({'error': 'Error obteniendo pedidos'}), 500
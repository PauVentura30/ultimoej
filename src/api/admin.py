import os
from flask_admin import Admin
from .models import db, User
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    # Configura la clave secreta de la aplicación para sesiones seguras
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    
    # Establece el tema visual del panel de administración
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    
    # Crea la instancia del panel administrativo con Bootstrap 3
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Agrega la vista del modelo User al panel administrativo
    admin.add_view(ModelView(User, db.session))
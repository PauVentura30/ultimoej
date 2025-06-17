import os
from flask import Flask
from flask_migrate import Migrate, init, migrate, upgrade
from api.models import db

def create_app():
    app = Flask(__name__)
    
    # Configuración de base de datos
    db_url = os.getenv("DATABASE_URL")
    if db_url and db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql://", 1)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url or "sqlite:///test.db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    migrate = Migrate(app, db)
    
    return app

def initialize_database():
    """Inicializa la base de datos y ejecuta migraciones"""
    app = create_app()
    
    with app.app_context():
        try:
            # Crear todas las tablas
            db.create_all()
            print("✅ Tablas creadas exitosamente")
            
            # Si existe el directorio migrations, ejecutar upgrade
            if os.path.exists('migrations'):
                from flask_migrate import upgrade
                upgrade()
                print("✅ Migraciones ejecutadas exitosamente")
            else:
                print("ℹ️ No hay migraciones que ejecutar")
                
        except Exception as e:
            print(f"❌ Error inicializando base de datos: {e}")
            return False
    
    return True

if __name__ == "__main__":
    initialize_database()
# Archivo de configuración WSGI para despliegue en servidores de producción
# Necesario para herramientas como Gunicorn, uWSGI, y plataformas como Heroku

# Importa la instancia principal de la aplicación Flask desde src/app.py
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from app import app as application

app = application

# Punto de entrada para ejecución directa (desarrollo local)
if __name__ == "__main__":
    application.run()
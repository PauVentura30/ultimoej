# Archivo de configuración WSGI para despliegue en servidores de producción
# Necesario para herramientas como Gunicorn, uWSGI, y plataformas como Heroku

# Importa la instancia principal de la aplicación Flask
from app import app as application

# Punto de entrada para ejecución directa (desarrollo local)
if __name__ == "__main__":
    application.run()
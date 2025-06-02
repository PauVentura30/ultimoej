import click
from api.models import db, User

def setup_commands(app):
    
    # Comando CLI para insertar usuarios de prueba desde la terminal
    @app.cli.command("insert-test-users")
    @click.argument("count")  # Parámetro que define cuántos usuarios crear
    def insert_test_users(count):
        print("Creating test users")
        
        # Itera según el número especificado para crear usuarios
        for x in range(1, int(count) + 1):
            # Crea una nueva instancia de usuario
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            
            # Guarda el usuario en la base de datos
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    # Comando CLI placeholder para insertar datos de prueba adicionales
    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass
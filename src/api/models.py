from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

# Instancia principal de SQLAlchemy para la base de datos
db = SQLAlchemy()

class User(db.Model):
    # ID único y clave primaria del usuario
    id: Mapped[int] = mapped_column(primary_key=True)
    
    # Email del usuario, único y obligatorio, máximo 120 caracteres
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    
    # Contraseña del usuario, campo obligatorio
    password: Mapped[str] = mapped_column(nullable=False)
    
    # Estado activo/inactivo del usuario
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    # Método para convertir el objeto User a diccionario JSON
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }
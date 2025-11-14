import click
from api.models import db, User, Product


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

    # ⭐ NUEVO COMANDO: Insertar productos reales
    @app.cli.command("insert-products")
    def insert_products():
        """Inserta todos los productos del catálogo en la base de datos"""
        print("🛍️  Insertando productos en la base de datos...")

        # Array de productos (los mismos que tienes hardcodeados en Productos.jsx)
        products_data = [
            {
                "name": "Nike Air Jordan 1",
                "brand": "Nike",
                "description": "Las icónicas Air Jordan 1 en su colorway clásico. Perfectas para coleccionistas y sneakerheads.",
                "price": 189.99,
                "image": "/img/Jordan-1.webp",
                "colors": "Rojo,Negro,Blanco",
                "stock": 50,
                "category": "Basketball",
                "is_new": True,
                "rating": 4.8,
                "reviews_count": 324,
                "badge": "Nuevo"
            },
            {
                "name": "Adidas Superstar",
                "brand": "Adidas",
                "description": "Las clásicas Superstar con las icónicas tres rayas. Un must-have atemporal.",
                "price": 89.99,
                "image": "/img/adidas-superstar.webp",
                "colors": "Blanco,Negro,Azul",
                "stock": 100,
                "category": "Casual",
                "is_new": False,
                "rating": 4.6,
                "reviews_count": 512
            },
            {
                "name": "Converse Chuck Taylor All Star",
                "brand": "Converse",
                "description": "El modelo más icónico de Converse. Estilo vintage que nunca pasa de moda.",
                "price": 69.99,
                "image": "/img/converseallstar.webp",
                "colors": "Negro,Blanco,Rojo",
                "stock": 80,
                "category": "Casual",
                "is_new": False,
                "rating": 4.5,
                "reviews_count": 478
            },
            {
                "name": "Nike Air Force 1",
                "brand": "Nike",
                "description": "Las legendarias Air Force 1. Diseño clásico con comodidad suprema.",
                "price": 109.99,
                "image": "/img/Nike-Air-Force-One.webp",
                "colors": "Blanco,Negro,Gris",
                "stock": 75,
                "category": "Lifestyle",
                "is_new": True,
                "rating": 4.7,
                "reviews_count": 389,
                "badge": "Nuevo"
            },
            {
                "name": "Vans Old Skool",
                "brand": "Vans",
                "description": "El modelo más vendido de Vans. Perfecto para skate y uso diario.",
                "price": 79.99,
                "image": "/img/vans-old-skool.webp",
                "colors": "Negro,Blanco,Azul",
                "stock": 90,
                "category": "Skate",
                "is_new": False,
                "rating": 4.4,
                "reviews_count": 421
            },
            {
                "name": "Puma Suede Classic",
                "brand": "Puma",
                "description": "Las legendarias Suede de Puma. Estilo retro con máximo confort.",
                "price": 84.99,
                "image": "/img/Suede-Classic-Sneakers.webp",
                "colors": "Negro,Azul,Rojo",
                "stock": 60,
                "category": "Casual",
                "is_new": False,
                "rating": 4.3,
                "reviews_count": 287
            },
            {
                "name": "New Balance 574",
                "brand": "New Balance",
                "description": "El modelo más icónico de New Balance. Comodidad y estilo en cada paso.",
                "price": 99.99,
                "image": "/img/zapatilla-new-balance-574-gris-1.webp",
                "colors": "Gris,Azul,Negro",
                "stock": 70,
                "category": "Running",
                "is_new": False,
                "rating": 4.5,
                "reviews_count": 342
            },
            {
                "name": "Reebok Classic Leather",
                "brand": "Reebok",
                "description": "Las Classic Leather de Reebok. Diseño minimalista y elegante.",
                "price": 94.99,
                "image": "/img/reebok-classic-leather-zapatillas-deportivas.webp",
                "colors": "Blanco,Negro,Beige",
                "stock": 55,
                "category": "Casual",
                "is_new": False,
                "rating": 4.2,
                "reviews_count": 265
            },
            {
                "name": "Nike Air Max 90",
                "brand": "Nike",
                "description": "Las Air Max 90 con su característica ventana de aire visible.",
                "price": 139.99,
                "image": "/img/WMNS+AIR+MAX+90.webp",
                "colors": "Negro,Blanco,Gris",
                "stock": 65,
                "category": "Lifestyle",
                "is_new": False,
                "rating": 4.6,
                "reviews_count": 356
            },
            {
                "name": "Adidas Yeezy Boost 350",
                "brand": "Adidas",
                "description": "Las exclusivas Yeezy Boost 350 diseñadas por Kanye West.",
                "price": 249.99,
                "image": "/img/yeezy-boost-350.webp",
                "colors": "Gris,Negro,Beige",
                "stock": 30,
                "category": "Lifestyle",
                "is_new": True,
                "rating": 4.9,
                "reviews_count": 467,
                "badge": "Nuevo"
            },
            {
                "name": "Adidas NMD R1",
                "brand": "Adidas",
                "description": "Las futuristas NMD R1 con tecnología Boost.",
                "price": 149.99,
                "image": "/img/nmd-r1.webp",
                "colors": "Negro,Blanco,Rojo",
                "stock": 45,
                "category": "Running",
                "is_new": False,
                "rating": 4.7,
                "reviews_count": 312
            },
            {
                "name": "Gucci Ace Sneakers",
                "brand": "Gucci",
                "description": "Las lujosas Ace Sneakers de Gucci con bordado icónico.",
                "price": 299.99,
                "image": "/img/gucci.webp",
                "colors": "Blanco,Negro,Verde",
                "stock": 20,
                "category": "Luxury",
                "is_new": True,
                "rating": 4.8,
                "reviews_count": 217,
                "badge": "Nuevo"
            }
        ]

        # Insertar cada producto
        added_count = 0
        for product_data in products_data:
            # Verificar si el producto ya existe
            existing = Product.query.filter_by(
                name=product_data["name"]).first()
            if existing:
                print(f"⏭️  Saltando '{product_data['name']}' (ya existe)")
                continue

            # Crear nuevo producto
            product = Product(
                name=product_data["name"],
                brand=product_data["brand"],
                description=product_data.get("description", ""),
                price=product_data["price"],
                image=product_data["image"],
                colors=product_data.get("colors", ""),
                stock=product_data.get("stock", 0),
                is_available=True,
                category=product_data.get("category", ""),
                is_new=product_data.get("is_new", False),
                badge=product_data.get("badge", None),
                rating=product_data.get("rating", 0.0),
                reviews_count=product_data.get("reviews_count", 0)
            )

            db.session.add(product)
            added_count += 1
            print(f"✅ Producto '{product_data['name']}' agregado")

        # Guardar todos los cambios
        db.session.commit()
        print(
            f"\n🎉 ¡Completado! {added_count} productos agregados a la base de datos.")

    # Comando CLI placeholder para insertar datos de prueba adicionales
    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass

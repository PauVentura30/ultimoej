from flask import jsonify, url_for

class APIException(Exception):
    """Clase personalizada para manejar excepciones de la API con códigos de estado HTTP"""
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        # Mensaje de error descriptivo
        self.message = message
        # Código de estado HTTP personalizado (por defecto 400)
        if status_code is not None:
            self.status_code = status_code
        # Datos adicionales opcionales para la respuesta
        self.payload = payload

    def to_dict(self):
        """Convierte la excepción a diccionario para respuestas JSON"""
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def has_no_empty_params(rule):
    """Verifica si una ruta tiene parámetros vacíos o sin valores por defecto"""
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

def generate_sitemap(app):
    """Genera automáticamente un sitemap HTML con todos los endpoints disponibles de la API"""
    # Incluye siempre la ruta del panel de administración
    links = ['/admin/']
    
    # Itera sobre todas las rutas registradas en la aplicación
    for rule in app.url_map.iter_rules():
        # Filtra solo rutas GET navegables sin parámetros requeridos
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            # Excluye rutas del admin para evitar duplicados
            if "/admin/" not in url:
                links.append(url)

    # Genera HTML de la lista de enlaces
    links_html = "".join(["<li><a href='" + y + "'>" + y + "</a></li>" for y in links])
    
    # Retorna página HTML completa con bienvenida y lista de endpoints
    return """
        <div style="text-align: center;">
        <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
        <h1>Rigo welcomes you to your API!!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""+links_html+"</ul></div>"
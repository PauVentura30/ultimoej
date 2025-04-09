"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)

@api.route("/signup", methods= ["POST"])
def signup():
    body = request.get_json()
    hashpass = bcrypt.generate_password_hash(body["password"]).decode("utf-8")
    new_user = User(email=body["email"], password = hashpass, is_active = True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "Registrado"}), 201

@api.route("/login", methods= ["POST"])
def login():
    body = request.get_json()
    user = User.query.filter_by(email= body["email"]).first()
    if user and bcrypt.check_password_hash(user.password, body["password"]):
        access_token = create_access_token(identity=user.email)
        return jsonify({"access_token": access_token, "user": user.email}), 200
    return jsonify({"msg": "Credenciales Invalidas"})

@api.route("/private", methods= ["GET"])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    return jsonify(logged_as = current_user), 200
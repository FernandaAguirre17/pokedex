#Crea 
#Elimina
#Modificar la clase del modelo y evitar que se usen metodos indebidos 
from flask import Blueprint, request, jsonify
from app.models.factory import ModelFactory
from bson import ObjectId

bp = Blueprint('pokemon_favorites', __name__, url_prefix='/pokemon_favorites')
pokemon_favorite_model = ModelFactory.get_model("pokemon_favorite")

@bp.route('/get_all', methods=["GET"])
def get_all():
    favorites = pokemon_favorite_model.find_all()
    return jsonify(favorites, 200)

@bp.route('/create', methods=["POST"])
def create():
    data = request.json
    favorite_id = pokemon_favorite_model.create(data)
    return jsonify({"favorite_id": str(favorite_id)}, 200)

@bp.route('/delete/<string:favorite_id>', methods=["DELETE"])
def delete(favorite_id):
    pokemon_favorite_model.delete(ObjectId(favorite_id))
    return jsonify("Pokémon favorito eliminado con éxito", 200)
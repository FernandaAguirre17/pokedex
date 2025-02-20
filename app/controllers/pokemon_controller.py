from flask import Blueprint, request, jsonify
from app.models.factory import ModelFactory
from bson import ObjectId

bp = Blueprint('pokemons', __name__, url_prefix='/pokemons')
pokemon_model = ModelFactory.get_model("pokemon")

@bp.route('/get_all', methods=["GET"])
def get_all():
    pokemons = pokemon_model.find_all()
    return jsonify(pokemons, 200)

@bp.route('/get/<string:pokemon_id>', methods=["GET"])
def get(pokemon_id):
    pokemon = pokemon_model.find_by_id(ObjectId(pokemon_id))
    if not pokemon:
        return jsonify("No se encontró el Pokémon", 404)
    return jsonify(pokemon, 200)

@bp.route('/create', methods=["POST"])
def create():
    data = request.json
    pokemon_id = pokemon_model.create(data)
    return jsonify({"pokemon_id": str(pokemon_id)}, 200)

@bp.route('/update/<string:pokemon_id>', methods=["PUT"])
def update(pokemon_id):
    data = request.json
    updated_pokemon = pokemon_model.update(ObjectId(pokemon_id), data)
    return jsonify({"data": updated_pokemon}, 200)

@bp.route('/delete/<string:pokemon_id>', methods=["DELETE"])
def delete(pokemon_id):
    pokemon_model.delete(ObjectId(pokemon_id))
    return jsonify("Pokémon eliminado con éxito", 200)
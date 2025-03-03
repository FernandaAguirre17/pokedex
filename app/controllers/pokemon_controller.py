from flask import Blueprint
from app.models.factory import ModelFactory
from bson import ObjectId
from app.tools.response_manager import ResponseManager
from flask_jwt_extended import jwt_required

RM = ResponseManager()
bp = Blueprint("pokemon", __name__, url_prefix="/pokemon")
POKEMON_MODEL = ModelFactory.get_model("pokemons")

    
@bp.route("/get_pokemons/<string:pokemon_id>", methods=["GET"])
@jwt_required()
def get_pokemon(pokemon_id):
        pokemon = POKEMON_MODEL.find_by_id(ObjectId(pokemon_id))
        return RM.success(pokemon)


@bp.route("/", methods=["GET"])
@jwt_required()
def get_all():
    data = POKEMON_MODEL.find_all()
    return RM.success(data)
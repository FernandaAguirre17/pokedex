from flask import Blueprint, request
from app.tools.response_manager import ResponseManager
from app.schemas.pokemon_favorite_schema import PokemonFavoriteSchema
from bson import ObjectId
from marshmallow import ValidationError
from app. models.factory import ModelFactory
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

bp = Blueprint("Favorite_pokemon", __name__, url_prefix="/favorite-pokemons")
RM = ResponseManager()
FP_MODEL = ModelFactory.get_model("pokemones_favorites")
FP_SCHEMA = PokemonFavoriteSchema()

#Crea 
@bp.route('/', methods=["POST"])
@jwt_required()
def create():
    try: 
        data = request.json
        data = FP_SCHEMA.validate(data)
        fp = FP_MODEL.create(data)
        return RM.succes({"_id":fp})
    except ValidationError as err:
        print(err)
        return RM.error("Es necesario enviar todos los parametros ")

#Elimina

@bp.route('/<string:id>', methods=["DELETE"])
@jwt_required()
def delete(id):
    FP_MODEL.delete(ObjectId(id))
    return RM.succes("Pokemon eliminado con exito")
#Get All

@bp.route('/<string:user_id>', methods=["GET"])
@jwt_required()
def get_all():
    user_id = get_jwt_identity()
    data = FP_MODEL.find_all(user_id)
    return RM.succes(data)

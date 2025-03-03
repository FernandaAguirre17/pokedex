from marshmallow import Schema, fields, validate

class PokemonFavoriteSchema(Schema):
    user_id = fields.Str(
        required=True,
        error_messages={
            "required": "El ID del usuario es obligatorio"
        }
    )

    pokemons = fields.Str(
        required=True,
        validate=lambda x: len(x) > 0,
        error_messages={
            "required": "El nombre del Pokémon es requerido"
        }
    )

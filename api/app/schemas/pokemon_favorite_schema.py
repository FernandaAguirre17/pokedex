from marshmallow import Schema, fields

class PokemonFavoriteSchema(Schema):
    pokemon_id = fields.Str(
        required=True,
        error_messages={
            "required": "El ID del pokemon es obligatorio"
        }
    )


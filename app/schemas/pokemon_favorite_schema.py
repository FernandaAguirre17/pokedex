from marshmallow import Schema, fields, validate

class PokemonFavoriteSchema(Schema):
    user_id = fields.Str(
        required=True,
        error_messages={
            "required": "El ID del usuario es obligatorio"
        }
    )


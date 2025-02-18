from marshmallow import Schema, fields, validate

class PokemonSchema(Schema):
    pokemon_id = fields.Int(
        required=True,
        validate=lambda x: len(x) > 0,
        error_messages={
            "required": "El ID del Pokémon es requerido"
        }
    )

    name = fields.Str(
        required=True,
        validate=lambda x: len(x) > 0,
        error_messages={
            "required": "El nombre del Pokémon es requerido"
        }
    )

    types = fields.List(
        required=True,
        validate=lambda x: len(x) > 0,
        error_messages={
            "required": "El Pokémon debe tener al menos un tipo"
        }
    )

    abilities = fields.List(
        required=True,
        validate=lambda x: len(x) > 0,
        error_messages={
            "required": "El Pokémon debe tener al menos una habilidad"
        }
    )

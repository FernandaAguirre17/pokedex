from marshmallow import Schema, fields, ValidationError

class UserSchema(Schema):
    name = fields.Str(
        required=True,
        #lambda es una funcion flecha 
        validate=lambda x: len(x) > 0,
        error_messages={
            "required": "El nombre es requerido"
        }
    )

    password = fields.Str(
        required=True,
        #lambda es una funcion flecha 
        validate=lambda x: len(x) > 0,
        error_messages={
            "required": "La contraseña es requerida"
        }
    )

    email = fields.Str(
        required=True,
        #lambda es una funcion flecha 
        validate=lambda x: "@utma.edu.mx" in x,
        error_messages={
            "required": "El email es requerido"
        }
    )
from app import mongo
from app.models.super_clase import SuperClass

class User(SuperClass):
    def __init__(self):
        super().__init__("pokemons_users")

    def find_all(self):
        raise NotImplementedError ("No es necesario obtener todos los usuarios ")
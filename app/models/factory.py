from app.models.pokemon import Pokemon
from app.models.pokemon_favorite import PokemonFavorites
from app.models.users import User

class ModelFactory:
    @staticmethod
    def get_model(collection_name):
        models = {
            "users":User,
            "pokemons":Pokemon,
            "pokemones_favorites":PokemonFavorites
        }
        if collection_name in models:
            return models[collection_name]()
        raise ValueError (f"La coleccion enviada: {collection_name} no existe")
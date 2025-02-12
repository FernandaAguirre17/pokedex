from app import mongo 

class Pokemon:
    collection = mongo.db.pokemons

    #un decorador es una funcion estatica que no se puede modificar
    @staticmethod
    def find_all():
        #Pokemon.collection.find() esto devuelve un cursor (el que maneja los objetos), y lo cambia a una lista
        pokemons = Pokemon.collection.find()
        #Esto lo devuelve como arreglo 
        return list(pokemons)
    
    @staticmethod
    def find_by_id(pokemon_id):
        pokemon = Pokemon.collection.find_one({
            "_id" : pokemon_id
        })
        return pokemon 
    
    @staticmethod
    def create(data):
        pokemon = Pokemon.collection.insert_one(data)
        return pokemon.inserted_id
    
    @staticmethod
    def update(pokemon_id, data):
        pokemon = Pokemon.collection.update_one({
            "_id":pokemon_id
        },{
            "$set":data
        })
        return pokemon 
    
    @staticmethod
    def delete(pokemon_id):
        return Pokemon.collection.delete_one({"_id":pokemon_id})
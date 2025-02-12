from app import mongo

class saved_pokemon:
    collection = mongo.db.saved

    @staticmethod
    def find_all():
        saved = saved_pokemon.collection.find()
        return list(saved)
    
    @staticmethod
    def find_by_id(saved_id):
        saved = saved_pokemon.collection.find_one({
            "_id": saved_id
        })
        return saved
    
    @staticmethod
    def create(data):
        saved = saved_pokemon.collection.insert_one(data)
        return saved.inserted_id
    
    @staticmethod
    def update(saved_id, data):
        pokemon = saved_pokemon.collection.update_one({
            "_id":saved_id
        },{
            "$set":data
        })
        return pokemon 
    
    @staticmethod
    def delete(saved_id):
        return saved_pokemon.collection.delete_one({"_id": saved_id})
                                                                                
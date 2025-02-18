from app import mongo
from app.models.super_clase import SuperClass

class pokemon(SuperClass):
    def _init_(self, collection):
        self.collection = mongo.db[collection]

    #metodo para encontrar todos los pokemons
    def find_all(self):
        data = self.collection.find()
        return list(data)
    
    def find_by_id(self, object_id):
        datum = self.collection.find_one({
            "_id": object_id
            })
        return datum

    def create(self, data):
        datun = self.collection.insert_one(data)
        return datun.inserted_id
    
    def update(self, object_id, data):
        datun = self.collection.update_one({
            "_id":object_id
        },{
            "$set":data
        })
        return datun  
    
    def delete(self, object_id):
        return self.collection.delete_one({"_id":object_id})
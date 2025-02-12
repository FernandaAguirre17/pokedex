from app import mongo

class users:
    collection = mongo.db.users

    @staticmethod
    def find_all():
        users = users.collection.find()
        return list(users)
    
    @staticmethod
    def find_by_id(user_id):
        users = users.collection.find_one({
            "_id": user_id
            })
        return users
    
    @staticmethod
    def create(data):
        users = users.collection.insert_one(data)
        return users.inserted_id
    
    @staticmethod
    def update(user_id, data):
        users = users.collection.update_one({
            "_id": user_id
        }, {
            "$set": data
        })
        return users
    
    @staticmethod
    def delete(user_id):
        return users.collection.delete_one({"_id": user_id})
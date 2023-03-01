class BaseService{
    async findAll(where){
        return await this.model.find(where || {}); //TIP: with where, we can use filters for lists(bring with user id etc..)
    }
    async add(item){
        return await this.model.create(item);
    }
    async delete(itemId){
        return await this.model.findByIdAndDelete(itemId);
    }
    async saveModel(){
        return await this.model.save();
    }
    async find(itemId=1){
        return await this.model.findById(itemId);
    }
    async update(where, updateInfo){
        return await this.model.findOneAndUpdate(where,updateInfo, {
            new:true, //INFO: response should contain the updated object
            runValidators:true //INFO: update should run the validation rules.
        });
    }
}

export default BaseService;
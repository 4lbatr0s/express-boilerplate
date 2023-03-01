import UserModel from "../models/Users.js";
import BaseService from "../services/BaseService.js";


class UserService extends BaseService{
    model = UserModel;
    
    async findAll(){
        return await this.model.find().select('-password');//TIP: exclude password field.
    }

    async loginUser(userEmail){
        const user= await this.model.findOne({email:userEmail}); //TIP:retunrs data or returns null
        return user;
    }
}

export default new UserService(); //INFO: we can use the "this" keywod in the BaseService, because we create object instance here.